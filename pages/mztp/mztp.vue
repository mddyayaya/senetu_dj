<template>
	<view>
		<view class="top_bars">
			<u-tabs
				duration="0.2s"
				name="cate_name" 
				:list="list"
				bar-height="8" 
				:current="current" 
				@change="tabsChange"
				height="100"
				font-size="28"
				inactive-color="#fff"
				bg-color=""
				active-color="#fff"
				:is-scroll="false"></u-tabs>
		</view>
		<view class="shadow_box tpmain tpmain1">
			<view class="shadow_title">
				<view class="left">
					<view class="line"></view>
					<view class="left_title">未投票</view>
				</view>
			</view>
			<view class="shadow_content">
				<view class="zxks">
					<image :src="ksicon" mode=""></image>
					<swiper
						class="zxkswiper"
						@change="changeTest"
						:indicator-dots="false" 
						:autoplay="true" 
						:interval="3000" 
						:duration="500">
						<swiper-item v-for="item in 5">
							<view class="swiper-item">
								<view class="kstitle">关于张向阳担任一线党支部书记的投票</view>
								<view class="kstime">2021-12-12</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<!-- <my-nodata v-if="testList.length == 0"></my-nodata> -->
			<view class="shodetail" @click="shodetail" hover-class="hoverClass">查看详情</view>
		</view>
		<view class="shadow_box tpmain">
			<view class="shadow_title">
				<view class="left">
					<view class="line"></view>
					<view class="left_title">已完成</view>
				</view>
				<view class="right">
					<picker mode="selector" 
					:range="$yearList()" @change="changeYear" :value="selectValue">
						<view class="picker_year">
							{{selectValue}}
							<uni-icons color="#fff" size="16" type="arrowdown"></uni-icons>
						</view>
					</picker>
				</view>
			</view>
			<view class="tpnum">
				<view class="number">次数：243</view>
			</view>
			<view class="tplist">
				<view class="tpitem" v-for="(item,index) in 10">
					<view class="tpitemtitle">主题：关于赵兴涛被接收为党员的投票</view>
					<view class="tpitemtime">
						<view>2021-11-11</view>
						<view>
							<u-icon v-if="index%2==0" size="32" color="#24BD96" name="checkmark-circle"></u-icon>
							<u-icon v-if="index%2!=0" size="32" color="#CE2741" name="close-circle"></u-icon>
						</view>
					</view>
					<view class="tpitemps">
						<view class="ps">赞成：20票</view>
						<view class="ps">反对：20票</view>
						<view class="ps">弃权：0票</view>
					</view>
				</view>
				<u-loadmore :load-text="loadText" margin-top="40" :status="status" />
			</view>
			<!-- <my-nodata v-if="testList.length == 0"></my-nodata> -->
		</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import config_url from '@/request/config.js'
	export default {
		data() {
			return {
				selectValue:new Date().getFullYear(),
				list: [{
					name: '表决投票'
				}, {
					name: '选举投票'
				}],
				current:0,
				ksicon:config_url+'statics/xcx_new/zxks.png',
				testList:[],
				loadText: {
					loadmore: '没有更多了',
					loading: '努力加载中',
					nomore: '上拉加载'
				},
				status: 'loadmore',
			}
		},
		methods: {
			tabsChange(){
				
			},
			changeTest(){
				
			},
			shodetail(){
				
			},
			changeYear(e){
				this.selectValue = this.yearList[e.target.value]
			},
			onReachBottom(){
				var that = this;
				that.status = 'loading'
				that.page++;
				if(that.page <= that.total){
					that.datalist();
				}else{
					that.status = 'loadmore'
					that.page = that.total
				}
			},
		}
	}
</script>

<style lang="scss">
	.top_bars{
		position: fixed;
		top: 0;
		z-index: 10;
	}
	.tpmain1{
		padding-top: 100rpx;
	}
	.tpmain{
		margin: 26rpx;
		width: auto !important;
		.zxks{
			display: flex;
			width: 100%;
			align-items: center;
			image{
				width: 88rpx;
				height: 88rpx;
				margin-right: 16rpx;
			}
			.zxkswiper{
				flex: 1;
				height: 88rpx;
				line-height: 88rpx;
				.swiper-item{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.kstitle{
						font-size: 28rpx;
						color: #333333;
						font-weight: bold;
					}
					.kstime{
						color: #666666;
						font-size: 24rpx;
					}
				}
			}
		}
		.right{
			border-radius: 10rpx;
			padding: 10rpx 20rpx;
			background: #CE2741;
			color: #fff !important;
			font-size: 24rpx;
			display: flex;
			align-items: center;
		}
		.tpnum{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 30rpx 0;
			color: #CE2741;
		}
		.tplist{
			width: 100%;
			border-top: 2rpx solid #EDEDED;
			.tpitem{
				border-bottom: 2rpx solid #EDEDED;
				padding: 32rpx 0;
				.tpitemtitle{
					font-size: 28rpx;
					color: #444;
					font-weight: bold;
					line-height: 42rpx;
					margin-bottom: 28rpx;
				}
				.tpitemtime{
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #999999;
					font-size: 24rpx;
					margin-bottom: 24rpx;
				}
				.tpitemps{
					display: flex;
					justify-content: space-between;
					color: #444;
					font-size: 26rpx;
					align-items: center;
					font-weight: bold;
				}
			}
		}
	}
</style>
