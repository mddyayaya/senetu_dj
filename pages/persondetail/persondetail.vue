<template>
	<view class="wrapper">
		<u-toast ref="uToast"></u-toast>
		<!-- 播放区域 -->
		<view class="play_area">
			<video v-if="bsid == 3" :src="playurl"
			autoplay
			 controls></video>
			 <view class="image"
			  @click="open"
			  v-if="bsid!=3">
				<image :src="playurl" mode=""></image>
			 </view>
		</view>
		<view class="play_bottom" :style="{height:srollHeight+'px'}">
			<view class="play_top">
				<view class="play_title">{{playTitle}}</view></view>
			</view>
		</view>
	</view>
</template>

<script>
	import { zhaunti } from '@/request/api.js'
	export default {
		data() {
			return {
				srollHeight:"",
				playTitle:"",
				playurl:"",
				bsid:3
			}
		},
		onLoad(options) {
			var that = this;
			that.playurl = options.src;
			that.playTitle = options.title;
			that.bsid = options.bsid;
			uni.getSystemInfo({
				success(res) {
					that.srollHeight = res.windowHeight - 200
				}
			})
		},
		methods:{
			// 图片放大
			open(){
				this.$previewImg(0,[this.playurl])
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
		//分享配置
		onShareAppMessage(res) {
			var that = this;
			return{
				title: that.playTitle,
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
		}
	}
</script>

<style lang="scss">
	.play_area{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 400rpx;
		background: #000000;
		video{
			height: 100%;
			width: 100%;
		}
		.image{
			width: 100%;
			height: 100%;
			image{
				background: $loadingBg;
				width: 100%;
				height: 100%;
			}
		}
	}
	.play_bottom{
		position: fixed;
		top: 400rpx;
		padding: 36rpx 40rpx;
		box-sizing: border-box;
		overflow-y: scroll;
		width: 100%;
		.play_top{
			padding-bottom: 1rpx;
			border-bottom: 4rpx solid #EDEDED;
			width: 100%;
			.play_title{
				color: #333333;
				font-size: 30rpx;
				font-weight: bold;
				line-height: 46rpx;
				padding-bottom: 20rpx;
			}
		}
	}
</style>
