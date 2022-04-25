<template>
	<view class="wrapper">
		<u-toast ref="uToast"></u-toast>
		<!-- 播放区域 -->
		<view class="play_area">
			<!-- #ifdef MP-WEIXIN -->
			<video :src="playurl" autoplay controls v-if="bsid==3"></video>
			<!-- #endif -->
			<view class="play_img" v-if="bsid == 2">
			 	<swiper class="play_img_swiper" :indicator-dots="false" :autoplay="false" :interval="3000" :duration="1000">
			 		<swiper-item @click="open(index)" class="swiper-items" v-for="(item,index) in playList">
			 			<view class="swiper-item">
							<image :src="item.ment_url" mode=""></image>
						</view>
			 		</swiper-item>
			 	</swiper>
			</view>
		</view>
		<view class="play_bottom " :style="{height:srollHeight+'px'}">
			<view class="play_top">
				<view class="play_title ">{{playTitle}}</view>
				<view class="play_other">
					<view class="play_other_left">
						<view class="">
							<u-icon name="play-circle-fill" color="#D2D2D2" size="40"></u-icon>
							{{play_num}}
						</view>
					</view>
					<view></view>
					<view class="play_other_right">
						<view v-if="isCollect == 0" @click="saveResource">收藏</view>
						<view v-if="isCollect == 1">已收藏</view>
						<view class="share" @click="shareResouce()">
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
			<view class="xuanji" v-if="playList.length > 1&&bsid==3">
				<view class="xj_title">选集</view>
				<view class="xj_list">
					<view class="xj_item" 
						@click="xuanji(item.bs_id,item.id,index)"
						:class="{xjnow:play_now == index}" 
						v-for="(item,index) in playList">{{index+1}}</view>
				</view>
			</view>
			<view class="play_bottoms">
				<view class="xgtj">相关推荐</view>
				<view class="recommend_list">
					<view class="recommend_item" v-if="recommend.length>0" v-for="item in recommend" 
								@click="goDetail(item.bs_id,item.id)">
						<view class="recommend_left">
							<image class="" :src="item.sz_img " mode=""></image>
							<view class="bsid">{{$changeBsid(item.bs_id)}}</view>
						</view>
						<view class="recommend_right">
							<view class="resource_title">{{item.title}}</view>
							<view class="resource_play">
								<view class="">
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
	import { zhaunti } from '@/request/api.js'
	import config_url from '@/request/config.js'
	export default {
		data() {
			return {
				sharebtn:config_url+'statics/xcx_new/sharebtn.png',
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
				isCollect:0, //0 未收藏  1已收藏
				studyTime:0,
				iswaiting:true
			}
		},
		onLoad(options) {
			var that = this;
			that.playId = options.id;
			that.cid = options.cid;
			that.bsid = options.bsid;
			that.studyTime = new Date().getTime();
			that.$store.dispatch("checkXw");
			that.$store.dispatch("appLogin");
			that.datalist()
			uni.getSystemInfo({
				success(res) {
					that.srollHeight = res.windowHeight - 200
				}
			});
		},
		onUnload() {
			var that = this;
			var now = new Date().getTime() - this.studyTime
			that.studyTime = parseInt(now / 1000);
			zhaunti.studyLog({
				id:that.playId,
				uid:that.$store.state.uid,
				cid:that.cid,
				bsid:3,
				time:that.studyTime
			}).then(res => {
				
			})
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
				zhaunti.resouceDetail({
					id:that.playId,
					uid:that.$store.state.uid,
					cid:that.cid,
					bsid:3
				}).then(res => {
					that.playList = res.data.data.resouce;
					if(that.bsid == 3){
						that.playTitle = res.data.data.resouce[that.play_now].title;
					}else{
						that.playTitle = res.data.data.title;
					}
					that.playurl = res.data.data.resouce[that.play_now].ment_url;
					that.play_num = res.data.data.ck_num;
					that.isCollect = res.data.data.collect;
					that.recommend = res.data.data.recommend;
					//#ifdef APP-PLUS
					uni.getSubNVueById("videoplays").show();
					// #endif
				})
			},
			waiting(){
				this.iswaiting = true;
			},
			goDetail(bsid,id){
				var that = this;
				that.playId = id;
				that.bsid = bsid;
				that.datalist();
			},
			// 分享
			shareResouce(){
				var that = this;
				that.$shareResouce("http://sjxf.5cy.com/djapp/h5/#/pages/videoDetail/videoDetail?id="+that.playId+'&cid='+that.cid+'&uid='+that.$store.state.uid+'&bsid='+that.bsid)
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
			// 图片放大
			open(index){
				var arr = [];
				for(var i=0;i<this.playList.length;i++){
					arr.push(this.playList[i].ment_url);
				}
				this.$previewImg(index,arr)
			},
			// 选集
			xuanji(bsid,id,index){
				console.log(index)
				this.play_now = index;
				this.playId = id;
				this.bsid = bsid;
				this.playurl = this.playList[this.play_now].ment_url;
			}
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
					that.$refs.uToast.show({title:"分享失败"})
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
		// background: #000000;
		video{
			position: relative;
			height: 100%;
			width: 100%;
			.backbtn{
				color: #fff;
				position: absolute;
				left: 10rpx;
				top: 10rpx;
			}
			.loading{
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				
				left: 0;
			}
		}
		.play_img{
			width: 100%;
			height: 100%;
			.play_img_swiper{
				height: 100%;
				width: 100%;
				.swiper-items{
					width: 100%;
					height: 100%;
					.swiper-item{
						width: 100%;
						height: 100%;
						image{
							width: 100%;
							height: 100%;
						}
					}
				}
			}
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
