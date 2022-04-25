<template>
	<view class="wrapper">
		<view class="additem">
			<view>
				<image :src="addwx" mode=""></image>
				微信邀请成员
			</view>
			<view>
				<u-icon name="arrow-right" color="#333" size="30"></u-icon>
			</view>
		</view>
		<view class="additem" @click="goadd">
			<view>
				<image :src="addhandle" mode=""></image>
				手动添加成员
			</view>
			<view>
				<u-icon name="arrow-right" color="#333" size="30"></u-icon>
			</view>
		</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import config_url from '@/request/config.js'
	export default {
		data() {
			return {
				addhandle:config_url+'statics/xcx_new/addhandle.png',
				addwx:config_url+'statics/xcx_new/addwx.png'
			}
		},
		methods: {
			goadd(){
				uni.navigateTo({
					url:"handleAdd/handleAdd"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		.wrapper{
			background: #EDEDED;
			width: 100%;
			height: 100%;
			.additem{
				width: 100%;
				height: 120rpx;
				background: #fff;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 40rpx;
				box-sizing: border-box;
				margin-bottom: 12rpx;
				font-size: 28rpx;
				color: #333333;font-weight: bold;
				>view:nth-child(1){
					display: flex;
					align-items: center;
					image{
						height: 80rpx;
						width: 80rpx;
						margin-right: 16rpx;
					}
				}
			}
		}
	}
</style>
