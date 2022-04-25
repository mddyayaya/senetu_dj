<template>
	<view class="wrapper">
		<u-toast ref="uToast"></u-toast>
		<view class="top_bars">
			<u-tabs ref="uTabs"
				:list="list" 
				bar-height="8"
				:current="current" 
				@change="tabsChange" 
				height="100"
				font-size="28"
				inactive-color="#fff"
				bg-color=""
				active-color="#fff"
				:is-scroll="true"
				width="750rpx"
				item-width="230">
			</u-tabs>
		</view>
		<view class="skywrapper">
			<view class="skykswiper ">
				<view  style="height: 100% ;width: 100%;">
					<view class="swiper-item shadow_box" v-if="datalist.length > 0" v-for="item in datalist">
						<view class="shadow_title">
							<view class="left">
								<view class="line"></view>
								<view class="left_title ">{{item.title}}</view>
							</view>
						</view>
						<view class="shadow_content">
							<view class="">活动类型：{{name}}</view>
							<view class="">时间：{{$changeTime(item.h_stime)}}</view>
							<view class="">地点：{{item.address}}</view>
							<view class="">发布党组织：{{item.dw}}</view>
						</view>
						<view class="shodetail" @click="shodetail(item.id,item.hy_flag)" hover-class="hoverClass">查看详情</view>
					</view>
					<my-nodata v-if="(datalist.length == 0)&&!loading"></my-nodata>
					<u-loadmore v-if="datalist.length>0" :load-text="loadText" margin-top="40" :status="status" />
				</view>
			</view>
		</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import { activity } from '@/request/api.js'
	export default {
		data() {
			return {
				list: [{
					name: '未进行',
					bsid:0
				}, {
					name: '待汇报',
					bsid:1
				}, {
					name: '已汇报',
					bsid:2
				}],
				current:0,
				type:"",
				status: 'loadmore',
				loading:true,
				loadText: {
					loadmore: '没有更多了',
					loading: '努力加载中',
					nomore: '上拉加载'
				},
				name:"",
				total:0,
				page:1,
				datalist:[]
			}
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
					that.$refs.uToast.show({
						title:"分享失败"
					})
				}
			}
		},
		onLoad(options) {
			var that = this;
			that.type = options.type;
			that.name = options.name;
			uni.setNavigationBarTitle({
				title:options.name
			})
			that.lists();
		},
		mounted() {
			var that = this;
		},
		methods: {
			tabsChange(index){
				this.current = index;
				this.page = 1;
				this.datalist = [];
				this.lists();
			},
			// 数据列表
			lists(){
				var that = this;
				activity.activity({
					type:that.type,
					status:that.current+1,
					page:that.page,
					uid:that.$store.state.uid
				}).then(res => {
					that.total = res.data.data.total;
					if(res.data.data.pagedata!=null){
						if(res.data.data.pagedata.length > 0){
							that.datalist = that.datalist.concat(res.data.data.pagedata);
						}
					}
					setTimeout(()=>{
						that.loading = false;
					},200)
				})
			},
			// 查看详情
			shodetail(hyid,hyflag){
				uni.navigateTo({
					url:'../activitydetail/activitydetail?hyid='+hyid+'&hyflag='+hyflag
				})
			}
		}
	}
</script>

<style lang="scss">
	.top_bars{
		z-index: 100;
		position: fixed;
		width: 100%;
		top: 0;
	}
	.skywrapper{
		margin: 100rpx 0 0 0;
		padding-top: 20rpx;
		.skykswiper{
			width: 100%;
			height: 100% !important;
			overflow-y: scroll;
			.swiper-item{
				width: auto !important;
				margin: 12rpx 32rpx 32rpx 32rpx;
				box-sizing: border-box;
			}
		}
	}
</style>
