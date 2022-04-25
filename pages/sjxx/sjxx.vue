<template>
	<view class="wrapper">
		<view class="area">
			<view class="shadow_box" v-for="(item,index) in 10">
				<view class="box_title">
					<view class="box_left">
						<image :src="jxxc" mode=""></image>
						<view>建言献策</view>
					</view>
					<view class="box_time">昨天14：14</view>
				</view>
				<view class="box_content">
					<view>关于2021年组织活动的建言献策</view>
					<view class="waiting" :class="{finish:index==8}">已处理</view>
				</view>
				<view class="show_detail"  @click="showdetail">查看详情</view>
			</view>
			<u-loadmore :load-text="loadText" margin-top="40" margin-bottom="40" :status="status" />
		</view>
		<view class="edit_wrap">
			<view class="edit edits" @click="write">
				<u-icon name="edit-pen" color="#fff"></u-icon>
				<view>给书记写信</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config_url from '@/request/config.js'
	export default {
		data() {
			return {
				jxxc:config_url+'statics/xcx_new/jxxc.png',
				status: 'loadmore',
				current:0,
				activityNum:12,
				datawrap:[],
				total:0,
				loadText: {
					loadmore: '没有更多了',
					loading: '努力加载中',
					nomore: '上拉加载'
				},
				status: 'loadmore',
			}
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
			// 查看详情
			showdetail(){
				uni.navigateTo({
					url:"../sjxxdetail/sjxxdetail"
				})
			},
			// 给书记写信
			write(){
				uni.navigateTo({
					url:"../sjxx_edit/sjxx_edit"
				})
			}
		}
	}
</script>

<style lang="scss">
	.area{
		width: 100%;
		height: 100%;
		padding: 32rpx 32rpx 135rpx 32rpx;
		background: #fff;
		box-sizing: border-box;
		.shadow_box{
			position: relative;
			padding: 32rpx 32rpx;
			margin-bottom: 30rpx;
			.box_title{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 34rpx;
				.box_left{
					display: flex;
					align-items: center;
					font-size: 36rpx;
					font-weight: bold;
					color: #333333;
					image{
						height: 48rpx;
						width: 48rpx;
						margin-right: 16rpx;
					}
				}
				.box_time{
					color: #999999;
					font-size: 24rpx;
				}
			}
			.box_content{
				display: flex;
				justify-content: space-between;
				position: relative;
				color: #333333;
				font-size: 28rpx;
				border-top: 4rpx solid #EDEDED;
				border-bottom: 4rpx solid #EDEDED;
				padding: 32rpx 0;
				.waiting{
					color: #fff;
					font-size: 22rpx;
					padding: 10rpx 20rpx;
					background: orange;
				}
				.finish{
					background: green;
				}
			}
			.show_detail{
				margin-top: 32rpx;
				color: #CE2741;
				font-size: 28rpx;
			}
		}
	}
	.edit_wrap{
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		padding: 80rpx 0;
		background: #fff;
		.edits{
			position: absolute;
			bottom: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			view{
				margin-left: 10rpx;
			}
		}
	}
</style>
