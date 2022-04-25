<template>
	<view class="wrapper">
		<u-toast ref="uToast"></u-toast>
		<view class="top_bars">
			<u-tabs-swiper ref="uTabs"
				:list="list" 
				bar-height="8"
				:current="current" 
				@change="tabsChange" 
				height="100"
				font-size="28"
				inactive-color="#fff"
				bg-color=""
				active-color="#fff"
				:is-scroll="false"
				swiperWidth="750">
			</u-tabs-swiper>
		</view>
		<view class="scroll_view" :style="{height:height+'px'}">
			<swiper 
				class="ztswipers"
				:current="swiperCurrent"
				@transition="transition" 
				@animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
					<scroll-view 
						class="scroll_views"
						scroll-y="true" >
						<view class="shadow_box user_wrap">
							<view class="user_pic">
								<image src="@/static/app_icon/ico.png" mode=""></image>
							</view>
							<view class="userinfo">
								<view class="user_name">小党同志</view>
								<view class="user_others" v-if="current == 0">
									<view class="ks">平均分：88</view>
									<view class="ks">排名：5</view>
								</view>
								<view class="user_others" v-if="current == 1">
									<view class="ks">课时：12课时</view>
									<view class="ks">排名：未上榜</view>
								</view>
							</view>
						</view>
						<view class="user_list shadow_box">
							<view class="list_item" v-for="(item,index) in 20">
								<view class="paiming" :class="{top:index<3}">{{index+1}}</view>
								<view class="users">
									<image src="@/static/app_icon/ico.png" mode=""></image>
									<text>赵国强</text>
								</view>
								<view class="keshi">212课时</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '考试成绩'
				}, {
					name: '学习课时'
				}, {
					name: '活动次数'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				keyword:"",
				height:"",
				selectValue:new Date().getFullYear()
			};
		},
		mounted() {
			var that = this;
			uni.getSystemInfo({
				success(res) {
					that.height = res.windowHeight - 80
				}
			})
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
			changeYear(e){
				this.selectValue = this.yearList[e.target.value]
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				if(current == 0){
					this.slist = ["活动主题","日期","类型"]
				}else if(current == 1){
					this.slist = ["试卷名称","日期","分数"]
				}else if(current == 2){
					this.slist = ["活动主题","日期","时间"]
				}else if(current == 3){
					this.slist = ["月份","时间","实际金额"]
				}
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				
			},
			// 搜索页
			gosearch(){
				
			},
			// 更多
			gomore(){
				uni.navigateTo({
					url:"ztMore/ztMore"
				})
			}
		}
	};
</script>

<style lang="scss">
	.ztswipers{
		border-radius: 12rpx;
		height: 100%;
		box-sizing: border-box;
		.scroll_views{
			width: 100%;
			height: 100%;
			overflow-y: scroll;
			.user_wrap{
				margin: 26rpx 26rpx;
				padding:30rpx;
				width: auto !important;
				display: flex;
				width: 100%;
				align-items: center;
				.user_pic{
					margin-right: 24rpx;
					width: 136rpx;
					height: 136rpx;
					border-radius: 50%;
					background: $loadingBg;
					image{
						width: 100%;
						height: 100%;
						border-radius: inherit;
					}
				}
				.userinfo{
					color: #333333;
					.user_name{
						font-size: 26rpx;
						font-weight: bold;
						margin-bottom: 36rpx;
					}
					.user_others{
						display: flex;
						align-items: center;
						font-size: 24rpx;
						.ks:nth-child(2){
							margin-left: 60rpx;
						}
					}
				}
			}
			.user_list{
				margin: 26rpx 26rpx;
				padding:30rpx;
				width: auto !important;
				.list_item{
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 2rpx solid #EDEDED;
					padding: 24rpx 0;
					font-size: 28rpx;
					color: #333333;
					.paiming{
						width: 36rpx;
						height: 36rpx;
						text-align: center;
						line-height: 36rpx;
						margin-right: 22rpx;
					}
					.top{
						color: #fff;
						background: #CE2741;
						border-radius: 50%;
					}
					.keshi{
						min-width:90rpx;
						margin-left: 22rpx;
					}
					.users{
						flex: 1;
						display: flex;
						align-items: center;
						image{
							width: 136rpx;
							height: 136rpx;
							border-radius: 50%;
							background: $loadingBg;
							margin-right: 22rpx;
						}
					}
				}
			}
		}
	}
</style>
