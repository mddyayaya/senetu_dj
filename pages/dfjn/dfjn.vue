<template>
	<view class="index_top_bg">
		<view class="users">
			<view class="userpic">
				<!-- #ifdef MP-WEIXIN -->
				<open-data type="userAvatarUrl"></open-data>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
					<u-lazy-load
						border-radius="68"
						class="lazyimg"
						height="136"
						img-mode="widthFill"
						:image="u_picture" >
					</u-lazy-load>
				<!-- #endif -->
			</view>
			<view class="userinfo">
				<view class="username">{{u_name}}</view>
				<view class="user_score">
					<view class="avavrage">累计：{{money}}元</view>
					<view class="correctly">本月：{{thisMonth}}元</view>
				</view>
			</view>
		</view>
		<view class="apply shadow_box">申请开通党费缴纳</view>
		
		<view class="ztswipers shadow_box">
			<view class="shadow_title">
				<view class="left">
					<view class="line"></view>
					<view class="left_title ">缴费记录</view>
				</view>
				<view class="right">
					<picker mode="selector" 
					:range="$yearList()" @change="changeYear" :value="selectValue">
						<view class="picker_year">
							{{selectValue}}
							<uni-icons color="#fff" size="16" type="arrowdown"></uni-icons>
						</view>
					</picker>
				</view>
			</view>
			<view class="swiper-item">
				<view 
					class="scroll_views"
					scroll-y="true" >
					<view class="finish">
						<view class="shadow_title">
							<view class="left">
								<view class="ksnumber">次数：{{activityNum}}次</view>
							</view>
							<view class="left">
								<view class="ksnumber">金额：{{activityNum}}元</view>
							</view>
						</view>
						<view class="answer_list">
							<view class="answer_item" >
								<view v-for="item in slist">{{item}}</view>
							</view>
							<view class="answer_item" v-for="item in 10">
								<view>01</view>
								<view>2020-12-12</view>
								<view>80元</view>
							</view>
							<my-nodata v-if="datawrap.length == 0"></my-nodata>
							<u-loadmore  :load-text="loadText" margin-top="40" :status="status" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import { shouquan } from '@/request/api.js'
	import config_url from '@/request/config.js'
	export default {
		data() {
			return {
				money:100,
				u_name:"小党同志",
				thisMonth:20,
				u_picture:getApp().globalData.errorImge,
				activityNum:12,
				loadText: {
					loadmore: '没有更多了',
					loading: '努力加载中',
					nomore: '上拉加载'
				},
				datawrap:[],
				status: 'loadmore',
				slist:["月份","时间","实缴金额"],
				selectValue:new Date().getFullYear(),
				page:1,
				total:0
			};
		},
		methods:{
			changeYear(e){
				this.selectValue = this.$yearList()[e.target.value];
				this.page = 1;
				this.total = 0;
				this.datawrap = [];
				this.datalist();
			},
			datalist(){
				
			}
		},
		onShow() {
			// #ifdef MP-WEIXIN 
			this.$store.dispatch("checkXw")
			//#endif
		},
	}
</script>

<style lang="scss">
	.index_top_bg{
		z-index: 8;
		width: 100%;
		height: 274rpx;
		background: url(~@/static/home_top.png) no-repeat;
		background-size: 100% 100%;
		.users{
			padding: 20rpx 40rpx 0 40rpx;
			width: 100%;
			color: #F1F9FF;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			.userpic{
				height: 136rpx;
				width: 136rpx;
				border-radius: 50%;
				overflow: hidden;
				overflow: hidden;
				.lazyimg{
					width: 136rpx;
					height: 100%;
				}
			}
			.userinfo{
				margin-left: 28rpx;
				.username{
					font-size: 36rpx;
					font-weight: bold;
					margin-bottom: 16rpx;
				}
				.user_score{
					display: flex;
					align-items: center;
					justify-content: space-between;
					.correctly{
						margin-left: 120rpx;
					}
				}
			}
		}
		.apply{
			margin: 32rpx !important;
			box-sizing: border-box;
			padding-top: 32rpx;
			text-align: center;
			width: auto !important;
			color: #CE2741;
			font-weight: bold;
			font-size: 30rpx;
		}
	}
	.picker_year{
		width: 144rpx;
		height: 48rpx;
		background: #CE2741;
		border-radius: 24rpx;
		color: #fff;
		line-height: 48rpx;
		text-align: center;
		font-size: 28rpx;
	}
	.ztswipers{
		border-radius: 12rpx;
		margin: 24rpx 26rpx 26rpx 26rpx;
		width: auto !important;
		box-sizing: border-box;
		.scroll_views{
			.finish{
				width: 100%;
				.ksnumber{
					color: #CE2741;
					font-size: 28rpx;
					font-weight: bold;
					line-height: 88rpx;
					box-sizing: border-box;
				}
				.answer_item{
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 88rpx;
					border-bottom: 2rpx solid #EDEDED;
					color: #444444;
					font-size: 26rpx;
					padding: 0 28rpx;
					box-sizing: border-box;
					>view:nth-child(1){
						width: 100rpx;
						overflow: hidden;
					}
					>view:nth-child(2){
						width: 200rpx;
						text-align: center;
					}
					>view:nth-child(3){
						flex: 1;
						text-align: center;
					}
				}
				.answer_item:first-child{
					background: rgba($color: #EE7F4B, $alpha: 0.14);
					border: none;
					font-weight: bold;
					font-size: 28rpx;
				}
				.answer_item:last-child{
					border: none;
				}
			}
		}
	}
</style>
