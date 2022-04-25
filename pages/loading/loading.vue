<template>
	<view class="loading">
		<image src="@/static/loading.png" mode="widthFix"></image>
		<view class="logo">
			<image src="@/static/app_icon/ico.png" mode=""></image>
			<view class="text">新时代党建</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		computed:{
			
		}
	}
</script>

<style lang="scss">
	.loading{
		width: 100%;
		height: 100%;
		background-color: #fff;
		image{
			width: 100%;
		}
		.logo{
			margin: 60rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 100rpx;
				height: 100rpx;
			}
			.text{
				font-weight: bold;
				font-size: 30rpx;
				color: #333;
				margin-left: 20rpx;
			}
		}
	}
</style>
