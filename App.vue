<script>
	import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update.js'
	import { checkUser } from '@/common/checkUser.js'
	import store from '@/store'
	import '@/common/push.js'
	export default {
		onLaunch: function() {
			var that = this;
			// #ifdef MP-WEIXIN
				that.$store.dispatch("checkXw")
			// #endif
			// #ifdef APP-PLUS
			checkUpdate();
				that.$store.dispatch("appLogin")
			// #endif
		},
		globalData:{
			uid:"",
			u_name:"小党同志",
			u_picture:"",
			cy_zz:"",
			errorImge:"http://dj.gxsentu.net/statics/images/xcx/moren_img.png",
			shareImg:''
		},
		onShow: function() {
		},
		onHide: function() {
			
		},
		created() {
			
		},
		methods:{
			// 详情页面跳转
			goDetail(bsid,id,url,cid){
				var that = this;
				if(bsid == 1){
					// ppt
					checkUser("../pptDetail/pptDetail?id="+id+"&cid="+cid)
				}else if(bsid == 3){
					// 视频
					checkUser("../videoDetail/videoDetail?id="+id+"&cid="+cid+"&bsid="+bsid)
				}else if(bsid == 8){
					// pdf
					if(store.state.uid!=""){
						uni.showModal({
							title:"温馨提示",
							content:"此课件将不计入学习课时,是否继续学习",
							 success: function (res) {
								 uni.showLoading({
								 	title:"正在打开文件..."
								 })
								if (res.confirm) {
									uni.downloadFile({
										url: url,
										success: function (res) {
											var filePath = res.tempFilePath;
											uni.openDocument({
												filePath: filePath,
												success: function (res) {
													uni.hideLoading();
													console.log('打开文档成功');
												}
											});
										},
										fail() {
											uni.showToast({
												title:"资源打开失败",
												icon:"none"
											})
										}
									});
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						})	
					}else{
						uni.showToast({
							title:"请先登录",
							icon:"none"
						})
					}
				}else if(bsid == 2){
					// 图文
					checkUser("../videoDetail/videoDetail?id="+id+"&cid="+cid+"&bsid="+bsid)
				}else if(bsid == 4){
					// 音频
					uni.showTabBar({
						title:"资源错误",
						icon:"none"
					})
					// checkUser("../audioDetail/audioDetail?id="+id+"&cid="+cid+"&bsid="+bsid)
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	.main_body{
		width: 100%;
		padding: 26rpx 26rpx;
		box-sizing: border-box;
	}
	.shadow_box{
		width: 100%;
		padding: 0 32rpx 32rpx 32rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		box-shadow: 0px 4rpx 12rpx 0px rgba(98, 0, 0, 0.1);
		border-radius: 12rpx;
		.all_modules{
			display: flex;
			flex-wrap: wrap;
			.modules{
				width: 120rpx;
				margin-right: 50rpx;
				margin-bottom: 36rpx;
				.modules_image{
					width: 88rpx;
					height: 88rpx;
					margin: auto;
					border-radius: 50%;
					image{
						border-radius: 50%;
						width: 100%;
						height: 100%;
					}
				}
				.modules_text{
					width: 100%;
					color: #444444;
					font-size: 24rpx;
					text-align: center;
					margin-top: 20rpx;
				}
				.modules_data{
					text-align: center;
					margin-top: 20rpx;
					color: #333333;
					font-weight: bold;
					font-size: 26rpx;
					text{
						font-size: 36rpx;
					}
				}
			}
			.modules:nth-child(4n){
				margin-right: 0 !important;
			}
		}
		.shadow_title{
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 4rpx solid #EDEDED;
			.left{
				display: flex;
				align-items: center;
				.line{
					width: 6rpx;
					height: 32rpx;
					background: #CE2741;
					border-radius: 4rpx;
					margin-right: 12rpx;
				}
				.left_title{
					color: #333333;
					font-size: 36rpx;
					font-weight: bold;
				}
			}
			.right{
				color: #8A8A8A;
				font-size: 24rpx;
			}
		}
		.shadow_content{
			border-bottom: 4rpx solid #EDEDED;
			padding: 15rpx 0 40rpx 0;
			box-sizing: border-box;
			>view{
				color: #333333;
				font-size: 28rpx;
				margin-top: 25rpx;
			}
		}
		.shodetail{
			margin-top: 20rpx;
			color: #CE2741;
			font-size: 28rpx;
		}
		.resource_list{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
		}
		.resource_item{
			width: 300rpx;
			margin-right: 34rpx;
			margin-top: 40rpx;
			.top_img{
				position: relative;
				width: 100%;
				background: #ddd;
				border-radius: 8rpx;
				height: 172rpx;
				image{
					position: absolute;
					background: #ddd;
					border-radius: inherit;
					width: 100%;
					height: 100%;
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
			.bottom_words{
				color: #333333;
				font-size: 24rpx;
				margin-top: 12rpx;
				line-height: 32rpx;
				max-height: 64rpx;
				overflow: hidden;
			}
		}
		.resource_item:nth-child(2n){
			margin-right: 0 !important;
		}
	}
	.hoverClass{
		opacity: 0.7;
	}
	.edit{
		position: fixed;
		bottom: 74rpx;
		width: 94%;
		box-sizing: border-box;
		height: 84rpx;
		left: 26rpx;
		background: linear-gradient(180deg, #B4091C 0%, #DB153C 100%);
		border-radius: 60rpx;
		color: #fff;
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
		line-height: 84rpx;
		opacity: 0.9;
	}
	.edit_hover{
		background: linear-gradient(180deg, #DB153C 0%, #B4091C 100%);
	}
	.top_bars{
		padding:  0 26rpx;
		box-sizing: border-box;
		width: 100%;
		height: 100rpx;
		background: linear-gradient(180deg, #BC2233 0%, #DB153C 100%);
	}
	.box_index{
		margin-top: 24rpx;
	}
	.nohy{
		width: 360rpx;
		margin:20rpx auto 0 auto;
		text-align: center;
		font-size: 28rpx;
		color: #ddd;
		image{
			margin-bottom: 10rpx;
			height:360rpx;
			width: 100%;
		}
	}
	.loading{
		background: rgb(235,235,235);
	}
</style>
