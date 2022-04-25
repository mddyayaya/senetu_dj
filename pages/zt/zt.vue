<template>
	<view class="wrapper">
		<u-toast ref="uToast"></u-toast>
		<view class="seachbox">
			<u-search 
				@click="gosearch"
				:disabled="true"
				color="#999999"
				height="76"
				:show-action="false"
				placeholder="搜索关键词"
				v-model="keyword"></u-search>
		</view>
		<view class="top_bars">
			<u-tabs
				duration="0.2s"
				name="cate_name" 
				:list="classlists"
				bar-height="8" 
				:current="current" 
				@change="tabsChange"
				height="100"
				font-size="28"
				inactive-color="#fff"
				bg-color=""
				active-color="#fff"
				:is-scroll="true"></u-tabs>
		</view>
		<view class="scroll_view " :style="{height:height+'px'}">
			<view class="ztswipers">
				<view class="swiper-item">
					<scroll-view 
						class="scroll_views"
						scroll-y="true" >
						<view class="zt_top ">
							<image class="" :src="indexImg" mode=""></image>
						</view>
						<view class="shadow_box box_index zt_box"  
						v-if="datalist.length > 0" v-for="(item,index) in datalist">
							<view class="shadow_title">
								<view class="left">
									<view class="line"></view>
									<view class="left_title">{{item.title}}</view>
								</view>
								<view class="right" 
								v-if="classlists[current].name!='红色全景'"
								hover-class="hoverClass" @click="gomore(item.id)">更多</view>
							</view>
							<view class="resource_list">
								<view class="resource_item"
								@click="goDetail(items.bs_id,items.id,items.ment_url)" v-for="items in item.resouce">
									<view class="top_img">
										<image :src="items.sz_img" mode=""></image>
										<view class="bsid">{{$changeBsid(items.bs_id)}}</view>
									</view>
									<view class="bottom_words ">{{items.title}}</view>
								</view>
							</view>
						</view>
						<my-nodata v-if="datalist.length == 0 && loading == false"></my-nodata>
					</scroll-view>
				</view>
			</view>
		</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import { zhaunti } from '@/request/api.js'
	export default {
		data() {
			return {
				classlists: [],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				keyword:"",
				height:"",
				datalist:[],
				indexImg:"",
				loading:true
			};
		},
		mounted() {
			var that = this;
			uni.getSystemInfo({
				success(res) {
					that.height = res.windowHeight - 120
				}
			})
		},
		onLoad() {
			this.specialClasss();
		},
		//分享配置
		onShareAppMessage(res) {
			var that = this;
			return{
				title: "新时代党建",
				path: "pages/index/index",
				imageUrl: getApp().globalData.shareImg,
				success(res){
					uni.showToast({
						title:'分享成功'
					})
				},
				fail(res){
					that.$refs.uToast.show({title:"分享失败"})
				}
			}
		},
		methods: {
			// 专题分类列表
			specialClasss(){
				var that = this;
				zhaunti.specialClass().then(res => {
					that.classlists = res.data.data;
					that.classListData();
				})
			},
			// 专题数据
			classListData(){
				var that = this;
				that.datalist = [];
				zhaunti.classList({
					id:that.classlists[that.current].id
				}).then(res => {
					if(res.data.data.length > 0){
						that.datalist = res.data.data;
						that.indexImg = res.data.data[0].sz_img;
					}else{
						that.datalist = [];
					}
					that.loading = false;
				})
			},
			// 资源详情
			goDetail(bsid,id,url){
				console.log(bsid)
				if(bsid){
					getApp().goDetail(bsid,id,url,this.classlists[this.current].id)
				}else{
					this.$checkUser("../qjdetail/qjdetail?id="+id)
				}
			},
			gosearch(){
				this.$checkUser("../search/search")
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.current = index;
				this.loading = true;
				this.classListData();
			},
			// 更多
			gomore(ftid){
				this.$checkUser("../ztMore/ztMore?id="+this.classlists[this.current].id+'&ftid='+ftid)
			}
		}
	};
</script>

<style lang="scss">
	.seachbox{
		width: 100%;
		background: #BC2233;
		padding: 20rpx 26rpx 0 26rpx;
		box-sizing: border-box;
	}
	.scroll_view{
		border-radius: 12rpx;
		.ztswipers{
			width: 100%;
			height: 100%;
			.swiper-item{
				.scroll_views{
					width: 100%;
					height: 100%;
					overflow-y: scroll;
					.zt_top{
						margin: 26rpx 26rpx; 
						box-sizing: border-box;
						height: 390rpx;
						border-radius: 12rpx;
						background: #D8D8D8;
						image{
							object-fit: cover;
							width: 100%;
							height: 100%;
							border-radius: inherit;
						}
					}
					.zt_box{
						margin: 26rpx 26rpx; 
						width: auto !important;
					}
				}
			}
		}
	}
</style>
