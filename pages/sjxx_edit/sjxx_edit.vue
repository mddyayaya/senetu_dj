<template>
	<view class="wrapper">
		<view class="edit_box">
			<view class="edit_title">
				<view>标题：</view>
				<view><input type="text" value="" placeholder="请输入标题" /></view>
			</view>
			<view class="edit_content">
				<textarea value="" placeholder="请输入内容" />
			</view>
		</view>
		<view class="edit_wrap">
			<view class="edit edits" @click="save">
				<view>立即提交</view>
			</view>
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
			save(){
				
			}
		}
	}
</script>

<style lang="scss">
	.edit_box{
		margin: 26rpx 26rpx;
		box-sizing: border-box;
		.edit_title{
			padding: 0 26rpx;
			box-sizing: border-box;
			height: 84rpx;
			display: flex;
			align-items: center;
			background: #FFFFFF;
			border-radius: 12rpx;
			border: 2rpx solid rgba(237, 237, 237, 0.9);
			view:nth-child(1){
				width: 100rpx;
				color: #333333;
				font-size: 28rpx;
				font-weight: bold;
			}
			input{
				font-size: 26rpx;
			}
		}
		.edit_content{
			padding: 26rpx;
			box-sizing: border-box;
			height: 896rpx;
			margin-top: 16rpx;
			background: #FFFFFF;
			border-radius: 12rpx;
			border: 2rpx solid rgba(237, 237, 237, 0.9);
			textarea{
				font-size: 26rpx;
				width: 100%;
				height: 100%;
			}
		}
	}
	.edit_wrap{
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		padding: 80rpx 0;
		background: #fff;
		.edits{
			position: absolute;
			bottom: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			view{
				margin-left: 10rpx;
			}
		}
	}
</style>
