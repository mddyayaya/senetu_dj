<template>
	<view class="wrapper">
		<u-toast ref="uToast"></u-toast>
		<view class="main_body">
			<view class="calendar" :style="{height:calendarHeight+'rpx'}">
				<uni-calendar 
					@changeMonth="changeMonth"
					:showMonth="false"
					:selected="selected"
					:lunar="false" 
					@change="change">
				</uni-calendar>
			</view>
			<view class="shouqi" @click="shouqi">
				<view class="shouqi_item"></view>
			</view>
			<view class="rclist" :style="{height:rcheight+'px'}">
				<view class="rc_wrap">
					<view class="rc_wrap_title">
						<view class="rc_wrap_time">{{time}}</view>
						<view class="rc_wrap_legend">
							<view class="legend_item"><view class="finished"></view>活动</view>
							<view class="legend_item"><view class="prepare"></view>考试</view>
							<view class="legend_item"><view class="notstart"></view>学习</view>
						</view>
					</view>
					<view class="rc_items" v-for="item in datas" @click="godetail(item)">
						<view :class="item.branch==1?'finished_box':item.branch==2?'prepare_box':'notstart_box'">
							<view class="rc_titles">{{item.title}}</view>
							<view class="rc_starttime">时间：{{$changeTime(item.h_stime)}}</view>
						</view>
					</view>
				</view>
				<view class="nohy" v-if="datas.length == 0">
					<image :src="nodataImg" mode=""></image>
					<view>暂无日程</view>
				</view>
			</view> 
			<u-no-network @retry="$noNetReload()"></u-no-network>
			<view class="addrc" v-if="flag == 3">添加<br>活动</view>
		</view>
	</view>
</template>

<script>
	import { richeng } from '@/request/api.js'
	import config_url from '@/request/config.js'
	export default {
		data() {
			return {
				selected:[],
				rcheight:"",
				calendarHeight:670,
				nodata:false,
				datas:[],
				flag:4,
				nodataImg:config_url+'statics/xcx_new/nohy.png',
				nowMonth:"",
				time:""
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
		mounted() {
			var that = this;
			var date = new Date().getTime();
			that.time = that.$changeTime1(date)
			that.nowMonth = that.$changeTime1(date).substr(0,7);
			this.$store.dispatch("checkXw");
			that.flag = that.$store.state.flag;
			that.datalist();
			that.months();
			uni.getSystemInfo({
				success(res) {
					that.rcheight = res.windowHeight - (that.calendarHeight / 2) - 60
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
					that.$refs.uToast.show({title:"分享失败"})
				}
			}
		},
		methods: {
			// 日程列表
			datalist(){
				var that = this;
				richeng.schedule({
					uid:that.$store.state.uid,
					time:that.time
				}).then(res => {
					that.datas = res.data.data
				})
			},
			// 当月日程
			months(){
				var that = this;
				that.selected = [];
				richeng.scheduleTime({
					uid:that.$store.state.uid,
					month:that.nowMonth
				}).then(res => {
					if(res.data.data!=null){
						if(res.data.data.length > 0){
							res.data.data.forEach(item => {
								that.selected.push({
									date:item
								})
							})
						}
					}
				})
			},
			// 日历筛选
			change(date){
				this.time = date.fulldate;
				this.datalist();
			},
			// 月份筛选
			changeMonth(date){
				date = date.substr(0,7);
				this.nowMonth = date;
				this.months()
			},
			// 查看详情
			godetail(item){
				var that = this;
				if(item.branch == 4){
					if(item.status == 1){
						that.$checkUser("../zxks/finishks/finishks?id="+item.id)
					}else{
						if(parseInt(item.h_stime)>new Date().getTime()){
							that.$refs.uToast.show({title:"未到考试时间"})
						}else{
							if(parseInt(item.h_stime)<=new Date().getTime() && new Date().getTime()<=parseInt(item.e_time)){
								that.$checkUser("../zxks/zxksdetail/zxksdetail?id="+item.id)
							}else{
								that.$checkUser("../zxks/finishks/finishks?id="+item.id)
							}
						}
					}
				}else{
					that.$checkUser("../activitydetail/activitydetail?hyid="+item.id+'&hyflag='+item.hy_flag)
				}
			},
			shouqi(){
				var that = this;
				that.calendarHeight == 670
				?that.calendarHeight = 280
				:that.calendarHeight = 670;
				uni.getSystemInfo({
					success(res) {
						that.rcheight = res.windowHeight - (that.calendarHeight / 2) - 60
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.calendar{
		overflow: hidden;
		transition: all 0.2s;
	}
	.shouqi{
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;
		.shouqi_item{
			width: 72rpx;
			height: 10rpx;
			background: #CE2741;
			border-radius: 6rpx;
		}
	}
	.rclist{
		width: 100%;
		overflow-y: scroll;
		.rc_wrap{
			width: 100%;
			.rc_wrap_title{
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 2rpx solid #EDEDED;
				color: #444;
				padding-bottom: 32rpx;
				.rc_wrap_time{
					font-size: 28rpx;
				}
				.rc_wrap_legend{
					display: flex;
					align-items: center;
					.legend_item{
						margin-left: 20rpx;
						font-size: 24rpx;
						display: flex;
						align-items: center;
						view{
							width: 10rpx;
							height: 10rpx;
							margin-right: 10rpx;
							border-radius: 50%;
						}
					}
					.finished{
						background: #CE2741;
					}
					.prepare{
						background: #EE7F4B;
					}
					.notstart{
						background: #008CF0;
					}
				}
			}
			.rc_items{
				border-bottom: 2rpx solid #EDEDED;
				padding: 30rpx 0;
				width: 100%;
				box-sizing: border-box;
				>view{
					padding:0 24rpx;
					box-sizing: border-box;
					.rc_titles{
						color: #333333;
						font-size: 28rpx;
						margin-bottom: 18rpx;
					}
					.rc_starttime{
						color: #999999;
						font-size: 24rpx;
					}
				}
			}
			.finished_box{
				border-left: 4rpx solid #CE2741;
			}
			.prepare_box{
				border-left: 4rpx solid #EE7F4B;
			}
			.notstart_box{
				border-left: 4rpx solid #008CF0;
			}
			
		}
	}
	.addrc{
		position: fixed;
		bottom: 76rpx;
		right: 54rpx;
		width: 104rpx;
		height: 104rpx;
		border-radius: 50%;
		color: #fff;
		padding-top: 20rpx;
		box-sizing: border-box;
		font-size: 26rpx;
		text-align: center;
		background: linear-gradient(180deg, #970515 0%, #DB153C 100%);
	}
	.nohy{
		width: 150rpx;
		height: 150rpx;
		margin:120rpx auto 0 auto;
		image{
			width: 100%;
			height: 100%;
		}
	}
</style>
