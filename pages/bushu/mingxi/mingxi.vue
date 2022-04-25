<template>
	<view class="wrapper">
		<u-toast ref="uToast"></u-toast>
		<!-- <u-collapse
			:item-style="style">
			<u-collapse-item v-for="(item, index) in itemList" :key="index">
			<view class="header" slot="title">
				<view class="header_title">
					{{item.head}}
				</view>
				<view class="bushu">
					<image :src="bushu2" mode=""></image>
					<view>6步</view>
				</view>
			</view>
			<view class="gz_item" v-for="item in 8">
				<view class="gz_left">
					<view class="gz_name">
						<view>学习</view>
						<view>+2步数/次</view>
					</view>
					<view class="gz_text">有效观看（3分钟以上）视频资源</view>
				</view>
				<view class="cricle">+0</view>
			</view>
			</u-collapse-item>
		</u-collapse> -->
		<view class="gz_item" v-for="item in itemList">
			<view class="gz_left">
				<view class="gz_name">
					<view>{{item.class_name}}</view>
					<view>+{{item.integral}}步数/次</view>
				</view>
				<view class="gz_text">{{item.content}}</view>
			</view>
			<view class="cricle hasFinish">+{{item.integral}}</view>
		</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
		<u-loadmore  :load-text="loadText" margin-top="40" margin-bottom="40" :status="status" />
	</view>
</template>

<script>
	import config_url from '@/request/config.js'
	import { userinfo } from '@/request/api.js'
	export default {
		data() {
			return {
				bushu2:config_url+"statics/xcx_new/bushu2.png",
				style:{
					boxShadow:"0px 4rpx 12rpx 0px rgba(98, 0, 0, 0.1)",
					margin:"26rpx 26rpx",
					padding:"26rpx 26rpx",
					boxSizing:'border-box'
				},
				itemList: [],
				loadText: {
					loadmore: '没有更多了',
					loading: '努力加载中',
					nomore: '上拉加载'
				},
				// datalist:[],
				status: 'loadmore',
				page:1,
				total:0
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
		onLoad() {
			this.$store.dispatch("checkXw");
			this.$store.dispatch("appLogin");
			this.datalist()
		},
		methods: {
			// 下拉加载
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
			datalist(){
				var that = this;
				userinfo.stepList({
					uid:that.$store.state.uid,
					page:that.page
				}).then(res => {
					if(res.data.data.pagedata!=null){
						if(res.data.data.pagedata.length > 0){
							that.itemList = that.itemList.concat(res.data.data.pagedata);
						}
					}
					that.total = res.data.data.total;
				})
			}
		}
	}
</script>

<style lang="scss">
	.mingxi{
		margin:26rpx;
		width: auto;
	}
	.header{
		display: flex;
		justify-content: space-between;
		align-items: center;
		&_title{
			width: 440rpx;
			margin-right: 8rpx;
			font-size: 30rpx;
			color: #333333;
			font-weight: bold;
			border-left: 4rpx solid #CE2741;
			padding-left: 8rpx;
		}
		.bushu{
			display: flex;
			align-items: center;
			color: #CE2741;
			font-size: 30rpx;
			font-weight: bold;
			image{
				height: 36rpx;
				width: 36rpx;
				margin-right: 8rpx;
			}
		}
	}
	.gz_item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 34rpx 0;
		margin: 0 26rpx;
		border-bottom: 2rpx solid #EDEDED;
		.gz_left{
			flex: 1;
			.gz_name{
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;
				view:nth-child(1){
					color: #333;
					font-size: 30rpx;
					font-weight: bold;
				}
				view:nth-child(2){
					color: #CE2741;
					font-size: 24rpx;
					margin-left: 10rpx;
				}
			}
			.gz_text{
				color: #333333;
				font-size: 24rpx;
			}
		}
		.cricle{
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			font-weight: bold;
			text-align: center;
			line-height: 80rpx;
			font-size: 30rpx;
			margin-left: 10rpx;
			color: #333333;
		}
		.hasFinish{
			color: #fff;
			background: linear-gradient(180deg, #E94F76 0%, #CE2741 100%);
		}
	}
	.gz_item:last-child{
		border: none;
	}
</style>
