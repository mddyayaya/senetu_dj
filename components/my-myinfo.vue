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
				<!-- #ifdef MP-WEIXIN -->
					<view class="username">{{u_name}}</view>
					<button
					class="bindPhone"
					type="default"
					v-if="uid == ''&&type=='info'"
					open-type="getPhoneNumber" @getphonenumber="get_number">
						<image :src="bindphoneIcon" mode=""></image>绑定手机</button>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
					<view class="username" v-if="uid!=''">{{u_name}}</view>
					<view class="username" v-if="uid==''" @click="gologin">未登录</view>
				<!-- #endif -->
				<view class="userzz" v-if="type == 'info'">{{cy_zz}}</view>
				<view class="user_score" v-if="type != 'info'">
					<view class="avavrage">平均分：{{average}}分</view>
					<view class="correctly">正确率：{{accuracy}}%</view>
				</view>
			</view>
		</view>
		<view class="bushu" v-if="type == 'info'" @click="gobushu">
			<image :src="bushu" mode=""></image>
			<view>步数：{{integral}}</view>
		</view>
	</view>
</template>

<script>
	import { shouquan } from '@/request/api.js'
	import config_url from '@/request/config.js'
	export default {
		name:"myinfo",
		data() {
			return {
				bindphoneIcon:config_url+"statics/xcx_new/bindphone.png",
				bushu:config_url+"statics/xcx_new/bushu.png",
				u_picture:getApp().globalData.errorImge
			};
		},
		props:{
			type:{
				type:String,
				default:"info"
			},
			average:{
				type:Number,
				default:0
			},
			accuracy:{
				type:Number,
				default:0
			},
			u_name:{
				type:String,
				default:"小党同志"
			},
			uid:{
				type:String,
				default:""
			},
			hasPhone:{
				type:Boolean,
				default:false
			},
			hasAoth:{
				type:Boolean,
				default:false
			},
			cy_zz:{
				type:String,
				default:""
			},
			integral:{
				type:String,
				default:""
			},
		},
		methods:{
			get_number(e){
				// 绑定手机
				// #ifdef MP-WEIXIN
					if(e.detail.errMsg == "getPhoneNumber:fail user deny"){
						uni.showToast({
							title:"用户拒绝绑定手机号",
							icon:"none",
							position:"bottom"
						})
					}else{
						this.$store.dispatch("getPhone",{
							iv:e.detail.iv,
							encryptedData:e.detail.encryptedData,
						})
					}
				// #endif
			},
			gobushu(){
				this.$checkUser("../bushu/bushu")
			},
			// app登录
			gologin(){
				this.$store.dispatch("appLogin");
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
				.userzz{
					font-size: 26rpx;
				}
			}
		}
		.bushu{
			position: absolute;
			right: 0;
			top: 36rpx;
			display: flex;
			align-items: center;
			font-size: 26rpx;
			padding: 0 26rpx;
			color: #fff;
			height: 64rpx;
			background: linear-gradient(270deg, #F8B682 0%, #EE7F4B 100%);
			border-radius: 32rpx 0rpx 0rpx 32rpx;
			image{
				width:36rpx;
				height: 36rpx;
				margin-right: 12rpx;
			}
		}
	}
	.bindPhone{
		font-size: 26rpx;
		color: #fff !important;
		padding: 0 !important;
		background-color: rgba($color: #000000, $alpha: 0) !important;
		border-radius: 60rpx;
		display: flex;
		align-items: center;
		image{
			width: 28rpx;
			height: 28rpx;
			margin-right: 8rpx;
		}
	}
	.bindPhone::after{
		border:1rpx solid rgba($color: #000000, $alpha: 0) !important;
	}
</style>
