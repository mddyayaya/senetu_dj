<template>
	<view class="wrapper">
		<u-toast ref='uToast'></u-toast>
		<view  class="gz_img">
			<image :src="guize" mode="widthFix"></image>
		</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import config_url from '@/request/config.js'
	export default {
		data() {
			return {
				guize:config_url+'statics/xcx_new/guize.jpg'
			}
		},
		methods: {
			
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
	}
</script>

<style lang="scss">
	.gz_img{
		image{
			width: 100%;
		}
	}
</style>
