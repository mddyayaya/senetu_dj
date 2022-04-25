<template>
	<view class="wrapper">
		<view class="shadow_box">
			<view class="shadow_title">
				<view class="left">
					<view class="line"></view>
					<view class="ksnumber">类型：{{type}}</view>
				</view>
				<view class="right">
					2020-10-13
				</view>
			</view>
			<view class="content">
				<view class="title">标题内容关于XX的建言献策</view>
				<view class="contents">第一：什么是为民?主要内容以总书记所引用郑板桥的诗“衙斋卧听萧萧竹，疑是民间疾苦声。些小吾曹州县吏，一枝一叶总关情”为切入点，通过讲述总书记曾在梁家河修建第一口沼气池的故事，阐释总书记以人民为中心的理论实践。

第二：为什么为民?主要内容以总书记引用的"政之所兴在顺民心，政之所废在逆民心”为切入点，通过讲述总书记弘扬焦裕禄精神，阐释如何做到以造福人民为最大政绩。

第二：为什么为民?主要内容以总书记引用的"政之所兴在顺民心，政之所废在逆民心”为切入点，通过讲述总书记弘扬焦裕禄精神，阐释如何做到以造福人民为最大政绩。</view>
			</view>
		</view>
		<view class="shadow_box">
			<view class="shadow_title">
				<view class="left">
					<view class="line"></view>
					<view class="ksnumber">反馈</view>
				</view>
			</view>
			<view class="content">
				<view class="contents">我们已经收到您的建议，正在制定相关政策</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:"建言献策"
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.shadow_box{
		width: auto;
		box-sizing: border-box;
		margin:23rpx 23rpx;
		.shadow_title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #CE2741;
			font-size: 28rpx;
		}
		.content{
			.title{
				color: #333333;
				font-size: 28rpx;
				font-weight: bold;
				margin: 40rpx 0 14rpx 0;
				font-weight: bold;
			}
			.contents{
				font-size: 26rpx;
				margin-top: 26rpx;
				font-family: SourceHanSansCN-Regular, SourceHanSansCN;
				color: #333333;
				line-height: 44rpx;
			}
		}
	}
</style>
