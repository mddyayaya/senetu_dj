<template>
	<view class="wrapper">
		<u-toast ref="toast"></u-toast>
		<view class="logo">
			<image :src="logo" mode="widthFix"></image>
		</view>
		<view class="pr_name">人民视讯新时代党建</view>
		<button class="shouquan_btn" 
			open-type="getUserInfo" lang="zh_CN"
			hover-class="shouquan_btn1"
			@click="shouquan">
			<image :src="wx" mode="widthFix"></image>
		微信一键授权</button>
		<!-- <view class="agree">
			<image v-if="!ischeck" :src="nosq" @click="isss" mode="widthFix"></image>
			<image v-if="ischeck" :src="issq" @click="isss" mode="widthFix"></image>
			<view>已阅读并同意</view>
			<view class="xieyi">《人民视讯新时代党建服务协议》</view>
		</view> -->
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import config_url from '@/request/config.js'
	export default {
		data() {
			return {
				ischeck:true,
				logo:config_url+"statics/xcx_new/logo.png",
				nosq:config_url+"statics/xcx_new/nosq.png",
				issq:config_url+"statics/xcx_new/issq.png"
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
					that.$refs.uToast.show({title:"分享失败"})
				}
			}
		},
		methods: {
			shouquan(){
				if(this.ischeck){
					this.$store.dispatch("getInfo");
				}else{
					this.$refs.toast.show({
						title:"请阅读服务协议"
					})
				}
			},
			// 勾选授权
			isss(){
				this.ischeck = !this.ischeck
			}
		}
	}
</script>

<style lang="scss">
	.logo{
		margin:220rpx auto 0 auto;
		width: 152rpx;
		height: 152rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.pr_name{
		width: 100%;
		color: #333333;
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
		margin-top: 46rpx;
	}
	.shouquan_btn{
		position: fixed;
		bottom: 200rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 640rpx;
		height: 84rpx;
		background: linear-gradient(180deg, #B4091C 0%, #DB153C 100%);
		border-radius: 60rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		font-weight: bold;
		image{
			width: 48rpx;
			height: 48rpx;
			margin-right: 20rpx;
		}
	}
	.shouquan_btn1{
		background: linear-gradient(180deg, #DB153C  0%, #B4091C 100%);
	}
	.agree{
		position: fixed;
		bottom: 140rpx;
		left: 50%;
		justify-content: center;
		transform: translateX(-50%);
		width: 640rpx;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		color: #666666;
		image{
			height: 24rpx;
			border-radius: 4rpx;
			width: 24rpx;
			background: rgb(216,216,216);
			margin-right: 16rpx;
		}
		.xieyi{
			color: #0B57A4 !important;
		}
	}
</style>
