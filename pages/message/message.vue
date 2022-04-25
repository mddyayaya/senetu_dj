<template>
	<view class="wrapper">
		<view class="top_item">
			<view class="clear">清除未读（10）</view>
			<view class="only"><u-switch 
			active-color="#CE2741"
			style="margin-right: 10rpx;" size="40" v-model="checked"></u-switch>只看本月</view>
		</view>
		<view class="mess_box" v-for="item in 4">
			<view class="box_title">
				<view class="box_left">
					<view class="isread">	
						<u-badge :offset="[0,20]" :is-dot="true" type="error"></u-badge>
						<image :src="ksicon" mode=""></image>
					</view>
					<view>在线考试</view>
				</view>
				<view class="box_time">12:30</view>
			</view>
			<view class="box_content">
				您好，您在12：30分于北京森图教育参与第三十届选举大会分于北京森图教育参与第三十届选举大会分于北京森图教育参与第三十届选举大会，请按时到场
			</view>
			<view class="box_bottom">
				<view>查看详情</view>
				<u-icon name="arrow-right" size="30" color="#666"></u-icon>
			</view>
		</view>
		<u-loadmore  :load-text="loadText" margin-top="40" margin-bottom="40" :status="status" />
	</view>
</template>

<script>
	import config_url from '@/request/config.js'
	export default {
		data() {
			return {
				ksicon:config_url+"statics/xcx_new/bjzl.png",
				checked:false,
				loadText: {
					loadmore: '没有更多了',
					loading: '努力加载中',
					nomore: '上拉加载'
				},
				status: 'loadmore',
				page:1,
				total:0
			}
		},
		onReachBottom(){
			var that = this;
			that.status = 'loading'
			that.page++;
			if(that.page <= that.total){
				// that.datalist();
			}else{
				that.status = 'loadmore'
				that.page = that.total
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page{
		background: #EDEDED;
	}
	.wrapper{
		height: 100%;
		width: 100%;
		.top_item{
			width: 100%;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 32rpx 0 32rpx;
			font-size:26rpx;
			color: #666666;
			.only{
				display: flex;
				align-items: center;
			}
		}
		.mess_box{
			border-radius: 25rpx;
			margin: 32rpx;
			width: auto;
			padding: 20rpx 20rpx 0 20rpx;
			box-sizing: border-box;
			background: #fff;
			.box_title{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.box_left{
					display: flex;
					align-items: center;
					.isread{
						position: relative;
						image{
							width: 60rpx;
							height: 60rpx;
							margin-right: 15rpx;
						}
					}
					font-size: 28rpx;
					font-weight: bold;
					color: #333333;
				}
				.box_time{
					font-size: 24rpx;
					color: #666666;
				}
			}
			.box_content{
				margin: 20rpx 0 30rpx 0;
				font-size: 26rpx;
				color: #999;
			}
			.box_bottom{
				font-size: 24rpx;
				color: #333;
				border-top: 2rpx solid #EDEDED;
				padding: 25rpx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}
</style>
