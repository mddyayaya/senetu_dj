<template>
	<view class="wrapper">
		<u-toast ref="uToast"></u-toast>
		<view class="seachbox">
			<u-search 
				@click="gosearch"
				:disabled="true"
				color="#999999"
				height="76"
				:show-action="false"
				placeholder="搜索关键词"
				v-model="keyword"></u-search>
		</view>
		<view class="scroll_view">
			<view class="zt_top">
				<image class="" :src="indexImg" mode=""></image>
			</view>
			<view class="zt_box">
				<view class="zt_box_item" @click="gotext()" v-for="(item,index) in 20">
					<view class="left_text">
						<view class="text_top">全面建设社会主义现代化国家新征程已经开启全面建设社会主义现代化国家新征程已经开启全面建设社会主义现代化国家新征程已经开启</view>
						<view class="text_bottom">
							<view class="xc_type">党员风采</view>
							<view class="xc_time">2020-01-19</view>
						</view>
					</view>
					<view class="right_img" v-if="index!=15"></view>
				</view>
				<u-loadmore :load-text="loadText" margin-top="40" margin-bottom="40" :status="status" />
			</view>
			<my-nodata v-if="datalist.length == 0 && loading == false"></my-nodata>
		</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import { zhaunti } from '@/request/api.js'
	export default {
		data() {
			return {
				classlists: [],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				keyword:"",
				height:"",
				datalist:[],
				indexImg:"",
				loadText: {
					loadmore: '没有更多了',
					loading: '努力加载中',
					nomore: '上拉加载'
				},
				status: 'loadmore',
				loading:true
			};
		},
		mounted() {
			var that = this;
			uni.getSystemInfo({
				success(res) {
					that.height = res.windowHeight - 120
				}
			})
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
		onLoad() {
			
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
			gosearch(){
				this.$checkUser("../searchxc/searchxc")
			},
			// 查看详情
			gotext(){
				this.$checkUser("../djxcdetail/djxcdetail")
			}
		}
	};
</script>

<style lang="scss">
	.seachbox{
		position: fixed;
		width: 100%;
		z-index: 10;
		background: #BC2233;
		padding: 26rpx 26rpx;
		box-sizing: border-box;
	}
	.scroll_view{
		padding-top: 130rpx;
		border-radius: 12rpx;
		.zt_top{
			margin: 26rpx 26rpx; 
			box-sizing: border-box;
			height: 390rpx;
			border-radius: 12rpx;
			background: #D8D8D8;
			image{
				object-fit: cover;
				width: 100%;
				height: 100%;
				border-radius: inherit;
			}
		}
		.zt_box{
			margin: 26rpx 26rpx; 
			width: auto !important;
			.zt_box_item{
				display: flex;
				justify-content: space-between;
				padding: 32rpx 0;
				border-bottom:2rpx solid #EDEDED;
				.left_text{
					flex: 1;
					.text_top{
						font-size: 28rpx;
						color: #333333;
						font-weight: bold;
						line-height: 36rpx;
						max-height: 72rpx;
						overflow: hidden;
					}
					.text_bottom{
						margin-top: 62rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						color: #999999;
						font-size: 22rpx;
						.xc_type{
							border-radius: 18rpx;
							color: #fff;
							background: #CE2741;
							padding: 6rpx 20rpx;
						}
					}
				}
				.right_img{
					margin-left: 32rpx;
					height: 172rpx;
					width: 292rpx;
					background: $loadingBg;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>
