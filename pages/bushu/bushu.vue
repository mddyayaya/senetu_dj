<template>
	<view class="wrapper">
		<u-toast ref="uToast"></u-toast>
		<view class="bushu_bg">
			<image :src="bushubg" mode=""></image>
		</view>
		<view class="bushu_top shadow_box">
			<view class="bushu_title">
				<view>已完成步数</view>
				<view>
					<image :src="bushu2" mode=""></image>
					<text>{{bushu}}步</text>
				</view>
			</view>
			<view class="step_box">
				<u-steps 
				:list="numList"
				un-active-color='#999999'
				mode="number"
				:unActiveBg="unActiveBg"
				active-color="#333333"
				:icon="icon"
				@changeLocal="changeBg"
				:current="current"></u-steps>
			</view>
		</view>
		<view class="gzwrap shadow_box">
			<view class="gz_item" v-for="item in steps">
				<view class="gz_left">
					<view class="gz_name">
						<view>{{item.class_name}}</view>
						<view>+{{item.integral}}步数/次</view>
					</view>
					<view class="gz_text">{{item.content}}</view>
				</view>
				<view class="cricle" :class="{hasFinish:item.integral>0}">+{{item.integral}}</view>
			</view>
		</view>
		<view class="gz_btn_group">
			<view class=""  @click="gomingxi">步数明细</view>
			<view class="" @click="goguize">步数规则</view>
		</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import config_url from '@/request/config.js'
	import { userinfo } from '@/request/api.js'
	export default {
		data() {
			return {
				numList: [],
				steps:[],
				icon:config_url+"statics/xcx_new/finishIcon.png",
				unActiveBg:config_url+"statics/xcx_new/bushuno.png",
				bushu2:config_url+"statics/xcx_new/bushu2.png",
				bushu:0,
				current:0,
				bushubg:""
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
		onLoad() {
			this.$store.dispatch("checkXw");
			this.$store.dispatch("appLogin");
			this.bushu = this.$store.state.integral
			this.datalist();
		},
		methods: {
			// 跳转规则
			goguize(){
				uni.navigateTo({
					url:"guize/guize"
				})
			},
			// 跳转明细
			gomingxi(){
				uni.navigateTo({
					url:"mingxi/mingxi"
				})
			},
			// 改变坐标
			changeBg(index){
				var that = this;
				if(that.current<index){
					that.$refs.uToast.show({
						title:"请逐步解锁"
					})
				}else{
					that.bushubg = that.numList[index].img;
				}
			},
			// 数据
			datalist(){
				var that = this;
				userinfo.daySteps({
					uid:that.$store.state.uid
				}).then(res => {
					that.steps = res.data.data
				})
				
				userinfo.stepSpeed({
					uid:that.$store.state.uid
				}).then(res => {
					that.current = parseInt(res.data.data.step)-1;
					that.numList = res.data.data.data;
					that.bushubg = that.numList[that.current].img;
				})
			}
		}
	}
</script>

<style lang="scss">
	.bushu_bg{
		width: 100%;
		height: 438rpx;
		background: $loadingBg;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.bushu_top{
		margin: -88rpx 26rpx 0 26rpx;
		background: #fff;
		position: relative;
		width: auto !important;
		.bushu_title{
			width: 100%;
			height: 96rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 30rpx;
			color: #333333;
			font-weight: bold;
			border-bottom: 2px solid #EDEDED;
			view:nth-child(2){
				display: flex;
				align-items: center;
				image{
					width: 36rpx;
					height: 36rpx;
					margin-right: 8rpx;
				}
			}
		}
	}
	.step_box{
		width: 100%;
		margin: 48rpx 0 10rpx 0;
		overflow-x: scroll;
	}
	.gzwrap{
		margin:26rpx 26rpx;
		width: auto;
		max-height: 638rpx;
		overflow-y: scroll;
		.gz_item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 34rpx 0;
			border-bottom: 2rpx solid #EDEDED;
			.gz_left{
				flex: 1;
				.gz_name{
					display: flex;
					align-items: center;
					margin-bottom: 20rpx;
					view:nth-child(1){
						color: #333;
						font-size: 30rpx;
						font-weight: bold;
					}
					view:nth-child(2){
						color: #CE2741;
						font-size: 24rpx;
						margin-left: 10rpx;
					}
				}
				.gz_text{
					color: #333333;
					font-size: 24rpx;
				}
			}
			.cricle{
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				font-weight: bold;
				text-align: center;
				line-height: 80rpx;
				font-size: 30rpx;
				margin-left: 10rpx;
				color: #333333;
			}
			.hasFinish{
				color: #fff;
				background: linear-gradient(180deg, #E94F76 0%, #CE2741 100%);
			}
		}
		.gz_item:last-child{
			border: none;
		}
	}
	.gz_btn_group{
		position: fixed;
		bottom: 60rpx;
		display: flex;
		justify-content: space-between;
		left: 26rpx;
		right: 20rpx;
		width: 93%;
		box-sizing: border-box;
		font-size: 28rpx;
		view{
			width: 336rpx;
			text-align: center;
			line-height: 76rpx;
			height: 76rpx;
			border-radius: 60rpx;
		}
		view:nth-child(1){
			color: #fff;
			background: linear-gradient(180deg, #B4091C 0%, #DB153C 100%);
		}
		view:nth-child(2){
			color: #B4091C;
			border: 2rpx solid #B4091C;
		}
	}
</style>
