<template>
	<view class="nodata">
		<image :src="nodataimg" mode="widthFix"></image>
	</view>
</template>

<script>
	import config_url from '@/request/config.js'
	export default {
		name:"my-nodata",
		data() {
			return {
				nodataimg:config_url+'statics/xcx_new/nodata.png'
			};
		}
	}
</script>

<style lang="scss">
	.nodata{
		margin: 40rpx auto;
		width: 100%;
		text-align: center;
		image{
			width: 400rpx;
		}
	}
</style>
