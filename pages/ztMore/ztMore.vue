<template>
	<view class="wrapper">
		<u-toast ref="uToast"></u-toast>
		<view class="top_bars">
			<u-tabs
				:list="list" 
				bar-height="8"
				:current="current" 
				@change="tabsChange" 
				height="100"
				font-size="28"
				inactive-color="#fff"
				bg-color=""
				active-color="#fff"
				:is-scroll="false">
			</u-tabs>
		</view>
		<view class="scroll_view shadow_box">
			<view scroll-y="true" class="scroll_views">
				<view class="resource_item" hover-class="hoverClass" 
					@click="goDetail(item.bs_id,item.id,item.bsid==8?items.ment_url:'',item.ft_id)" v-for="item in datalists">
					<view class="top_img">
						<image v-if="total==1" :src="item.sz_img" mode=""></image>
						<u-lazy-load
							v-if="total>1"
							border-radius="8"
							class="lazyimg"
							height="172"
							threshold="50"
							img-mode="widthFill"
							:image="item.sz_img" >
						</u-lazy-load>
						<view class="bsid">{{$changeBsid(item.bs_id)}}</view>
					</view>
					<view class="bottom_words">{{item.title}}</view>
				</view>
			</view>
			<my-nodata v-if="datalists.length == 0"></my-nodata>
			<u-loadmore v-if="datalists.length>0" :load-text="loadText" margin-top="40" :status="status" />
		</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import { zhaunti } from '@/request/api.js'
	export default {
		data() {
			return {
				list: [{
					name: '全部',
					bsid:0
					},{
						name: 'PPT',
						bsid:1
					},{
						name: '音频',
						bsid:4
					},{
						name: 'PDF',
						bsid:8
					},{
						name: '图文',
						bsid:4
					},{
						name: '视频',
						bsid:3
					}],
				loadText: {
					loadmore: '没有更多了',
					loading: '努力加载中',
					nomore: '上拉加载'
				},
				current:0,
				height:"",
				ftid:"",
				id:"",
				bsid:0,
				page:1,
				total:0,
				status: 'loadmore',
				datalists:[]
			};
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
		onLoad(options) {
			this.id = options.id;
			this.ftid = options.ftid;
			this.datalist();
		},
		mounted() {
			var that = this;
			uni.getSystemInfo({
				success(res) {
					that.height = res.windowHeight - 80
				}
			});
		},
		onReachBottom(){
			var that = this;
			that.status = 'loading'
			that.page++;
			if(that.page <= that.total){
				that.datalist();
			}else{
				that.status = 'loadmore'
				that.page = that.total
			}
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.current = index;
				this.page = 1;
				this.bsid = this.list[index].bsid;
				this.datalists = [];
				this.datalist();
			},
			datalist(){
				var that = this;
				zhaunti.moreList({
					page:that.page,
					id:that.id,
					ftid:that.ftid,
					bsid:that.bsid
				}).then(res => {
					if(res.data.data.pagedata!=null){
						if(res.data.data.pagedata.length > 0){
							that.datalists = that.datalists.concat(res.data.data.pagedata);
						}
					}
					that.total = res.data.data.total;
				})
			},
			goDetail(bsid,id,url,cid){
				getApp().goDetail(bsid,id,url,cid)
			}
		}
	};
</script>

<style lang="scss" scoped>
	.top_bars{
		position: fixed;
		top: 0;
		z-index: 10;
	}
	.scroll_view{
		box-sizing: border-box;
		width: auto;
		margin: 120rpx 26rpx 0 26rpx;
		border-radius: 12rpx;
		padding-bottom: 40rpx;
		.scroll_views{
			width: 100%;
			.resource_item{
				display: inline-block;
				vertical-align: top;
			}
		}
	}
</style>
