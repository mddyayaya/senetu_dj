<template>
	<view class="wrapper">
		<view class="audio_wrap">
			<view class="sz_img">
				<image src="@/static/app_icon/ico.png" mode=""></image>
			</view>
			<view class="play_area">
				<view class="play_title">不忘初心、牢记使命的历史维度：总结中国共产党长期制度建设的经验所得</view>
				<view class="play_progress">
					<view class="text">
						{{loading}}
					</view>
					<view class="play_time">
						<view class="play_now">{{play_now}}</view>
						<view class="play_total">{{total}}</view>
					</view>
					<u-slider
						@end="changePlayTime"
						active-color="#CE2741"
						block-color="#E0003B"
						block-width="18"
						inactive-color="#D8D8D8"
						v-model="value"></u-slider>
				</view>
				<view class="play_btnlist">
					<view class="pre">
						<u-icon 
							color="#5C5C66" size="60"
							name="play-left-fill">
						</u-icon>
					</view>
					<view class="play" @click="controls">
						<u-icon 
							v-if="play"
							color="#BC2233" size="140"
							name="pause-circle-fill">
						</u-icon>
						<u-icon 
							v-if="!play"
							color="#BC2233" size="140"
							name="play-circle-fill">
						</u-icon>
					</view>
					<view class="next">
						<u-icon 
							color="#5C5C66" 
							size="60"
							name="play-right-fill">
						</u-icon>
					</view>
				</view>
			</view>
			<view class="play_bottom">
				<view class="play_top">
					<view class="play_other">
						<view class="play_other_left">
							<view style="display: flex;align-items: center;">
								<u-icon name="play-circle-fill" color="#D2D2D2" size="40"></u-icon>
								123456
							</view>
						</view>
						<view></view>
						<view class="play_other_right">
							<view v-if="isCollect == 0" @click="saveResource">收藏</view>
							<view v-if="isCollect == 1">已收藏</view>
							<view class="share" @click="$shareResouce()">
								<!-- #ifdef APP-PLUS -->
									<image :src="sharebtn" mode=""></image>分享
								<!-- #endif -->
								<!-- #ifdef MP-WEIXIN -->
									<button open-type='share' >	
										<image :src="sharebtn" mode=""></image>
									分享</button>
								<!-- #endif -->
							</view>
						</view>
					</view>
				</view>
				<view class="play_bottoms">
					<view class="xgtj">相关推荐</view>
					<view class="recommend_list">
						<view class="recommend_item" v-for="item in 5" >
							<view class="recommend_left">
								<image src="item.sz_img" mode=""></image>
								<view class="bsid">音频</view>
							</view>
							<view class="recommend_right">
								<view class="resource_title">牢记使命的历史维度</view>
								<view class="resource_play">
									<view>
										<u-icon name="play-circle-fill" color="#D2D2D2" size="40"></u-icon>
										123456
									</view>
									<view >正在播放...</view>
								</view>
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
	import config_url from '@/request/config.js'
	export default {
		data() {
			return {
				sharebtn:config_url+'statics/xcx_new/sharebtn.png',
				value:0,
				srollHeight:0,
				isCollect:0,
				play:false,
				playId:"",
				total:"00:00",
				play_now:'00:00',
				loading:"缓冲中...",
				audio:'http://dj.gxsentu.net/dj2.0/statics/images/test.flac',
				innerAudioContext:uni.createInnerAudioContext()
			}
		},
		onLoad() {
			var that = this;
			that.musice();
		},
		onUnload() {
			this.innerAudioContext.destroy();
		},
		methods: {
			// 音频播放
			musice(){
				var that = this;
				this.innerAudioContext.autoplay = true;
				this.innerAudioContext.src = this.audio;
				this.innerAudioContext.onCanplay((res) => {
					that.total = that.changeTime(that.innerAudioContext.duration)
					this.innerAudioContext.onPlay(() => {
						console.log('开始播放');
						that.loading = "";
						that.play = true;
					});
				});
				this.innerAudioContext.onPause(() => {
					console.log('暂停播放');
					that.play = false;
				});
				this.innerAudioContext.onError((res) => {
					that.loading = "播放失败";
					console.log('播放失败');
					that.play = false;
				});
				this.innerAudioContext.onEnded((res) => {
					console.log('播放结束');
					that.play = false;
					that.value = 0;
				});
				this.innerAudioContext.onWaiting((res) => {
					that.loading = "缓冲中...";
				});
				this.innerAudioContext.onTimeUpdate(() => {
					this.play_now = this.changeTime(this.innerAudioContext.currentTime)
					this.value = this.innerAudioContext.currentTime/that.innerAudioContext.duration*100
				});
			},
			// 暂停播放
			controls(){
				if(this.innerAudioContext.paused){
					this.play=true;
					this.innerAudioContext.play();
				}else{
					this.play=false;
					this.innerAudioContext.pause();
				}
			},
			// 转换音频时长
			changeTime(time){
				var hour = 0, minuets = 0,second=0;
				time = Math.ceil(time);
				hour = Math.floor(time / 3600);
				minuets = Math.floor((time - (hour*3600)) / 60);
				second = time-hour*3600-minuets*60;
				if(hour<10)
				hour = "0"+hour
				if(minuets<10)
				minuets = "0"+minuets
				if(second<10)
				second = "0"+second;
				if(hour == 0){
					return minuets+":"+second
				}else{
					return hour+":"+minuets+":"+second
				}
			},
			// 滑动改变播放位置
			changePlayTime(){
				this.innerAudioContext.seek = ({
					position:parseInt(this.value/100*this.innerAudioContext.duration)
				});
			},
			moving(){
				
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
		}
	}
</script>

<style lang="scss">
	.audio_wrap{
		width: 100%;
		height: 100%;
		padding: 0 26rpx;
		box-sizing: border-box;
		.sz_img{
			background: rgba($color: #000000, $alpha: 0.1);
			width: 480rpx;
			height: 270rpx;
			border-radius: 8rpx;
			margin: 80rpx auto 40rpx auto;
			image{
				width: 100%;
				height: 100%;
				border-radius: inherit;
			}
		}
		.play_area{
			padding: 0 26rpx;
			.play_title{
				color: #333333;
				font-weight: bold;
				text-align: center;
				font-size: 30rpx;
				line-height: 46rpx;
			}
			.play_progress{
				position: relative;
				margin-top: 80rpx;
				.play_time{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 20rpx;
					font-size: 28rpx;
					color: #999999;
				}
				.text{
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					width: 100%;
					text-align: center;
					color: #999999;
					font-size: 24rpx;
				}
			}
			.play_btnlist{
				width: 100%;
				margin:36rpx auto 0 auto;
				display: flex;
				align-items: center;
				justify-content: center;
				.play{
					margin: 0 100rpx;
				}
			}
		}
		
		.play_bottom{
			padding: 36rpx 0;
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
					margin-bottom: 10rpx;
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
							display: flex;
							align-items: center;
							color: #999999;
							font-size: 24rpx;
							image{
								height: 28rpx;
								width: 28rpx;
								margin-right: 8rpx;
							}
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
	}
</style>
