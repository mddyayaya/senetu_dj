<template>
	<view class="wrapper">
		<!-- 播放区域 -->
		<u-toast ref="uToast"></u-toast>
		<view class="play_area">
			<video :src="playurl"
			autoplay
			 controls></video>
		</view>
		<view class="play_bottom" :style="{height:srollHeight+'px'}">
			<view class="play_top">
				<view class="play_title">{{playTitle}}</view>
				<view class="play_other">
					<view class="play_other_left">
						<view>
							<u-icon name="play-circle-fill" color="#D2D2D2" size="40"></u-icon>
							{{play_num}}
						</view>
					</view>
					<view></view>
					<view class="play_other_right">
						<view v-if="isCollect == 0" @click="saveResource">收藏</view>
						<view v-if="isCollect == 1">已收藏</view>
						<view class="share" @click="share_zy">
							<button open-type='share' >	
								<image :src="sharebtn" mode=""></image>
							分享</button>
						</view>
					</view>
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
					<view class="recommend_item" v-for="item in recommend" 
								@click="goDetail(item.bs_id,item.id)">
						<view class="recommend_left">
							<image :src="item.sz_img" mode=""></image>
						</view>
						<view class="recommend_right">
							<view class="resource_title">{{item.title}}</view>
							<view class="resource_play">
								<view>
									<u-icon name="play-circle-fill" color="#D2D2D2" size="40"></u-icon>
									{{item.ck_num}}
								</view>
								<view v-if="item.id == playId">正在播放</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import { zhaunti } from '@/request/api.js'
	export default {
		data() {
			return {
				sharebtn:config_url+"statics/xcx_new/sharebtn.png",
				srollHeight:"",
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
		onLoad(options) {
			var that = this;
			that.playId = options.id
			that.cid = options.cid
			that.bsid = options.bsid
			this.$store.dispatch("checkXw");
			this.$store.dispatch("appLogin");
			that.datalist()
			uni.getSystemInfo({
				success(res) {
					that.srollHeight = res.windowHeight - 200
				}
			})
		},
		methods: {
			// 数据列表
			datalist(){
				var that = this;
				zhaunti.resouceDetail({
					id:that.playId,
					uid:that.$store.state.uid,
					cid:that.cid,
					bsid:3
				}).then(res => {
					that.playList = res.data.data.resouce;
					that.playTitle = res.data.data.resouce[that.play_now].title;
					that.playurl = res.data.data.resouce[that.play_now].ment_url;
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
					that.datalist();
				})
			},
		},
		//分享配置
		onShareAppMessage(res) {
			var that = this;
			return{
				title: that.playTitle,
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
		}
	}
</script>

<style lang="scss">
	.play_area{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 400rpx;
		background: #000000;
		video{
			height: 100%;
			width: 100%;
		}
	}
	.play_bottom{
		position: fixed;
		top: 400rpx;
		padding: 36rpx 40rpx;
		box-sizing: border-box;
		overflow-y: scroll;
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
				margin-bottom: 40rpx;
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
						width: 304rpx;
						height: 172rpx;
						border-radius: 8rpx;
						margin-right: 34rpx;
						image{
							background: $loadingBg;
							width: 100%;
							height: 100%;
							border-radius: inherit;
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
						}
					}
				}
			}
		}
	}
</style>
