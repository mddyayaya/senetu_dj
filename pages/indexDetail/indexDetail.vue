<template>
	<view class="wrapper">
		<u-toast ref="uToast"></u-toast>
		<!-- 播放区域 -->
		<view class="play_area">
			<!-- #ifdef MP-WEIXIN -->
			<video :src="playurl"
			autoplay
			 controls></video>
			<!-- #endif -->
		</view>
		<view class="play_bottom">
			<view class="play_top">
				<view class="play_title">{{playTitle}}</view>
				<view class="play_other">
					<view class="play_other_left">
						<view style="display: flex;align-items: center;">
							<u-icon name="play-circle-fill" color="#D2D2D2" size="40"></u-icon>
							{{play_num}}
						</view>
					</view>
					<view></view>
					<!-- <view class="play_other_right">
						<view v-if="isCollect == 0" @click="saveResource">收藏</view>
						<view v-if="isCollect == 1">已收藏</view>
						<view class="share" @click="share_zy">
							<button open-type='share' >	
								<image src="@/static/sharebtn.png" mode=""></image>
							分享</button>
						</view>
					</view> -->
				</view>
			</view>
			<view class="xuanji" v-if="playList.length > 1">
				<view class="xj_title">选集</view>
				<view class="xj_list">
					<view class="xj_item" :class="{xjnow:play_now == index}" v-for="(item,index) in playList">{{play_now+1}}</view>
				</view>
			</view>
			<view class="play_bottoms">
				<view class="xgtj">相关推荐</view>
				<view class="recommend_list">
					<view class="recommend_item"
					 v-if="recommend.length>0"v-for="item in recommend" 
								@click="goDetail(item.bs_id,item.id)">
						<view class="recommend_left">
							<image :src="item.sz_img" mode=""></image>
							<view class="bsid">视频</view>
						</view>
						<view class="recommend_right">
							<view class="resource_title">{{item.title}}</view>
							<view class="resource_play">
								<view>
									<u-icon name="play-circle-fill" color="#D2D2D2" size="40"></u-icon>
									{{item.ck_num}}
								</view>
								<view v-if="item.id == playId">正在播放...</view>
							</view>
						</view>
					</view>
					<my-nodata v-if="recommend.length==0"></my-nodata>
				</view>
			</view>
		</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import { indexs } from '@/request/api.js'
	export default {
		data() {
			return {
				playId:"",
				playTitle:"",
				playList:[],
				play_num:0,
				play_now:0,
				playurl:"",
				cid:"",
				bsid:"",
				recommend:[],
				isCollect:0 //0 未收藏  1已收藏
			}
		},
		destroyed() {
			uni.getSubNVueById("videoplayss").hide()
		},
		onLoad(options) {
			var that = this;
			that.playId = options.id
			that.cid = options.cid
			that.bsid = options.bsid
			that.$store.dispatch("checkXw");
			that.$store.dispatch("appLogin");
			that.datalist()
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
		watch:{
			playurl(){
				var that = this;
				this.$nextTick(function(){
					//#ifdef APP-PLUS
						uni.$emit('subPlayData', {
							url:that.playurl,
							title:that.playTitle,
						});
					//#endif
				})
			}
		},
		methods: {
			// 数据列表
			datalist(){
				var that = this;
				indexs.recommenDetail({
					id:that.playId
				}).then(res => {
					// that.playList = res.data.data.resouce;
					that.playTitle = res.data.data.title;
					that.playurl = res.data.data.ment_url;
					that.play_num = res.data.data.ck_num;
					that.isCollect = res.data.data.collect;
					that.recommend = res.data.data.recommend;
				})
			},
			goDetail(bsid,id){
				var that = this;
				that.playId = id;
				that.datalist();
			},
			share_zy(){
				// 分享
				var that = this;
				zhaunti.shareLog({
					uid:that.$store.state.uid,
					title:that.playTitle,
					rid:that.playId,
				}).then(res => {
					
				})
			}
		},
		// 收藏
		saveResource(){
			var that = this;
			zhaunti.collection({
				uid:that.$store.state.uid,
				rid:that.playId,
				bsid:that.bsid,
				flag:1,
				ft_id:that.cid,
				title:that.playTitle
			}).then(res => {
				uni.showToast({
					title:"收藏成功"
				})
			})
		},
		//分享配置
		onShareAppMessage(res) {
			var that = this;
			return{
				title: that.playTitle,
				success(res){
					console.log(456)
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
		}
	}
</script>

<style lang="scss">
	.play_area{
		z-index: 100;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 400rpx;
		background: #000000;
		video{
			position: fixed;
			top: 0;
			left: 0;
			height: 400rpx;
			width: 100%;
		}
	}
	.play_bottom{
		padding: 420rpx 40rpx 40rpx 40rpx;
		box-sizing: border-box;
		width: 100%;
		.play_top{
			padding-bottom: 40rpx;
			border-bottom: 4rpx solid #EDEDED;
			width: 100%;
			.play_title{
				color: #333333;
				font-size: 30rpx;
				font-weight: bold;
				line-height: 46rpx;
				margin-bottom: 30rpx;
			}
			.play_other{
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #999999;
				font-size: 24rpx;
				.play_other_left{
					view{
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
				}
				.play_other_right{
					width: 172rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.share{
						button{
							display: flex;
							align-items: center;
							padding: 0;
							margin: 0;
							background: rgba($color: #000000, $alpha: 0);
							border: none;
							color: #999999;
							font-size: 24rpx;
							image{
								height: 28rpx;
								width: 28rpx;
								margin-right: 8rpx;
							}
						}
						button::after {
						    border: 1px solid rgba(0,0,0,0);
						}
					}
				}
			}
		}
		.xuanji{
			width: 100%;
			.xj_title{
				line-height: 84rpx;
				font-size: 24rpx;
				font-weight: bold;
				color: #333333;
			}
			.xj_list{
				display: flex;
				.xj_item{
					height: 56rpx;
					width: 56rpx;
					border-radius: 8rpx;
					line-height: 56rpx;
					text-align: center;
					margin-right: 8rpx;
					background: #EDEDED;
					color: #999999;
					font-size: 24rpx;
				}
				.xjnow{
					background: #CE2741;
					color: #fff;
				}
			}
		}
		.play_bottoms{
			width: 100%;
			.xgtj{
				line-height: 120rpx;
				font-size: 28rpx;
				color: #333333;
				font-weight: bold;
			}
			.recommend_list{
				.recommend_item{
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 32rpx;
					.recommend_left{
						position: relative;
						width: 304rpx;
						height: 172rpx;
						border-radius: 8rpx;
						margin-right: 34rpx;
						image{
							background: $loadingBg;
							position: absolute;
							width: 100%;
							height: 100%;
							border-radius: inherit;
						}
						.bsid{
							position: absolute;
							right: 10rpx;
							top: 10rpx;
							color: #fff;
							width: 50rpx;
							height: 30rpx;
							border-radius: 4rpx;
							background: #FBBC05;
							text-align: center;
							line-height: 30rpx;
							font-size: 20rpx;
						}
					}
					.recommend_right{
						flex: 1;
						.resource_title{
							font-size: 24rpx;
							color: #333333;
							font-weight: bold;
							line-height: 32rpx;
							max-height: 64rpx;
							overflow: hidden;
							margin-bottom: 50rpx;
						}
						.resource_play{
							display: flex;
							justify-content: space-between;
							align-items: center;
							color: #999999;
							font-size: 24rpx;
							view{
								display: flex;
								align-items: center;
							}
						}
					}
				}
			}
		}
	}
</style>
