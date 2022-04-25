<template>
	<view>
		<view class="wrapper">
			<u-toast ref="uToast"></u-toast>
			<web-view :src="arUrl"></web-view>
			<u-no-network @retry="$noNetReload()"></u-no-network>
		</view>
	</view>
</template>

<script>
	import { zhaunti } from '@/request/api.js'
	export default {
		data() {
			return {
				arUrl:"",
				id:""
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getdata();
			uni.showLoading({
				title:"加载中"
			})
			setTimeout(() => {
				uni.hideLoading()
			},5000)
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
		methods: {
			getdata(){
				var that = this;
				zhaunti.qjDetail({
					id:that.id
				}).then(res => {
					that.arUrl = res.data.data.ment_url;
					uni.setNavigationBarTitle({
						title:res.data.data.title
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	
</style>
