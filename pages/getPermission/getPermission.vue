<template>
	<view class="containers">
	  <image class="logo" :src="logo" mode=""></image>
	  <view class="names">智能静音仓</view>
	  <view class="welcome">欢迎你</view>
	
	  <view class="sqs">
	    <view>请微信授权登录后放心使用</view>
	    <view>你的信息和数据将受到保护</view>
	  </view>
	  <view class="sure" @click="getusers">微信授权</view>
	  <view class="getphone" v-if="show">
		  <view class="getphone_box">
			<view class="getphone_title">授权手机号</view>
			<view class="content">{{content}}</view>
			<view class="btnlists">
			  <view class="">
				<button class="confirm" @click="show = false">取消</button>
			  </view>
			  <view class="">
				<button 
					type="default"
					class="confirm-button"
					open-type="getPhoneNumber"
					@getphonenumber="getPhoneNumber">允许</button>
			  </view>
			</view>
		  </view>
	  </view>
	</view>
</template>

<script>
	import base_url from '@/setting/request/config.js'
	import { appointCancel,getPhone } from '@/setting/request/api'
	let app = getApp();
	let that;
	export default{
		data(){
			return{
				logo:base_url+'zyfxminiicon/logo.png',
				show:false,
				content:"为更好使用体验，请先授权手机号"
			}
		},
		onLoad() {
			that = this;
		},
		methods:{
			// 获取用户信息
			getusers(){
				// 未授权
				//#ifdef MP-WEIXIN
				wx.getUserProfile({
					desc: '用于完善用户资料',
					success(res){
						that.show = true;
						uni.setStorageSync("usernickName",res.userInfo.nickName)
						uni.setStorageSync("userpic",res.userInfo.avatarUrl)
					},
					fail(error){
						return true
					}
				});
				//#endif
			},
			getPhoneNumber(e){
				if(e.detail.errMsg=="getPhoneNumber:ok"){
					getPhone({
						code:e.detail.code,
						nickname:uni.getStorageSync("usernickName"),
						avatarUrl:uni.getStorageSync("userpic")
					}).then(res => {
						uni.setStorageSync("user_id",res.data.uid)
						uni.navigateBack({
							delta:1
						})
						that.show = false;
					})
				}else{
					that.show = false
				}
			},
		}
	}
</script>

<style lang="scss">
	.containers{
	  width: 100%;
	  height: 100%;
	  text-align: center;
	}
	.logo{
	  margin-top: 50px;
	  width: 136rpx;
	  height: 140rpx;
	}
	.names{
	  font-size: 16px;
	  color: #333333;
	  margin: 15px 0 5px 0;
	}
	.welcome{
	  color: #333333;
	  font-size: 16px;
	}
	.sqs{
	  margin-top: 100px;
	  font-size: 14px;
	  line-height: 20px;
	  color: #999999;
	}
	.sure{
	  height: 40px;
	  line-height: 40px;
	  margin:20px auto;
	  width: 200px;
	  background: #38A0FE;
	  border-radius: 4px;
	  text-align: center;
	  color: #fff;
	  font-size: 14px;
	}
	.getphone{
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba($color: #000000, $alpha: 0.3);
		.getphone_box{
			width: 80%;
			text-align: center;
			background-color: #fff;
			border-radius: 10px;
			overflow: hidden;
			.getphone_title{
				font-size: 16px;
				color: #000;
				font-weight: bold;
				margin-top: 20px;
			}
			.content{
				font-size: 16px;
				padding: 30px 20px;
				margin: 10px 0;
				color: #666;
			}
			.btnlists{
				width: 100%;
				display: flex;
				border-top: 1px solid #ededed;
				height: 50px;
				view{
					width: 50%;
					height: 100%;
					text-align: center !important;
					.confirm-button{
						border-left:  1px solid #ededed;
					}
				}
				button{
					font-weight: bold;
					border-radius: 0 !important;
					height: 100% !important;
					color: #2C405A;
					font-size: 16px;
					margin: 0 !important;
					padding: 0 !important;
					background-color: #fff !important;
				}
				button::after{
					padding: 0 !important;
					border: none !important;
				}
			}
		}
	}
</style>