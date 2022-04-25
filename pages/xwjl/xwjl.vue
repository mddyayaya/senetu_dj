<template>
	<view class="wrapper">
		<u-toast ref="uToast"></u-toast>
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
				:is-scroll="true"></u-tabs>
		</view>
		<view class="scroll_view">
			<view 
				class="ztswipers shadow_box">
				<view class="swiper-item">
					<view 
						class="scroll_views"
						scroll-y="true" >
						<view class="finish">
							<view class="shadow_title">
								<view class="left">
									<view class="line"></view>
									<view class="ksnumber">次数：{{activityNum}}次</view>
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
							<view class="answer_list">
								<view class="answer_item" >
									<view v-for="item in slist">{{item}}</view>
								</view>
								<view class="answer_item"
								 @click="shodetail(item)"
								 v-if="datawrap.length > 0" v-for="item in datawrap">
									<view>{{item.title}}</view>
									<view>1</view>
									<view>80</view>
								</view>
								<my-nodata v-if="datawrap.length == 0"></my-nodata>
								<u-loadmore v-if="total>1" :load-text="loadText" margin-top="40" :status="status" />
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
	import { userinfo } from '@/request/api.js'
	export default {
		data() {
			return {
				list: [{
					name: '活动记录'
				}, {
					name: '签到记录'
				}, {
					name: '考试记录'
				},  {
					name: '党费缴纳'
				}],
				loadText: {
					loadmore: '没有更多了',
					loading: '努力加载中',
					nomore: '上拉加载'
				},
				status: 'loadmore',
				slist:["活动主题","日期","类型"],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				selectValue:new Date().getFullYear(),
				page:1,
				total:0,
				datawrap:[],
				activityNum:0
			};
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
		onLoad() {
			this.$store.dispatch("checkXw");
			this.$store.dispatch("appLogin");
		},
		mounted() {
			var that = this;
			that.datalist();
		},
		methods: {
			// 数据列表
			datalist(){
				var that = this;
				if(that.current == 0){
					// 活动记录
					userinfo.activityList({
						uid:that.$store.state.uid,
						year:that.selectValue,
						page:that.page
					}).then(res => {
						that.activityNum = res.data.data.count;
						if(res.data.pagedata!=""&&res.data.data.pagedata!=null){
							if(res.data.data.pagedata.length > 0){
								that.datawrap = that.datawrap.concat(res.data.data.pagedata);
							}else{
								
							}
						}
					})
				}else if(that.current == 1){
					// 签到记录
					
				}else if(that.current == 2){
					// 考试记录
					userinfo.examinationList({
						uid:that.$store.state.uid,
						year:that.selectValue,
						page:that.page
					}).then(res => {
						that.activityNum = res.data.data.count;
						if(res.data.pagedata!=""&&res.data.data.pagedata!=null){
							if(res.data.data.pagedata.length > 0){
								that.datawrap = that.datawrap.concat(res.data.data.pagedata);
							}else{
								
							}
						}
					})
				}else if(that.current == 3){
					// 党费缴纳
					userinfo.payList({
						uid:that.$store.state.uid,
						year:that.selectValue,
						page:that.page
					}).then(res => {
						that.activityNum = res.data.data.count;
						if(res.data.pagedata!=""&&res.data.data.pagedata!=null){
							if(res.data.data.pagedata.length > 0){
								that.datawrap = that.datawrap.concat(res.data.data.pagedata);
							}else{
								
							}
						}
					})
				}
			},
			// 查看详情
			shodetail(item){
				if(this.current == 0){
					// 活动记录
					uni.navigateTo({
						url:'../activitydetail/activitydetail?hyid='+item.id+'&hyflag='+item.hyflag
					})
				}else if(this.current == 1){
					// 签到记录
					
				}else if(this.current == 2){
					// 考试记录
					uni.navigateTo({
						url:"../zxks/finishks/finishks?id="+item.aid
					})
				}else{
					// 党费缴纳
				}
			},
			changeYear(e){
				this.selectValue = this.$yearList()[e.target.value];
				this.page = 1;
				this.total = 0;
				this.datawrap = [];
				this.datalist();
			},
			// tabs通知swiper切换
			tabsChange(current) {
				this.current = current;
				this.page = 1;
				this.total = 0;
				this.datawrap = [];
				this.selectValue=new Date().getFullYear();
				if(current == 0){
					this.slist = ["活动主题","日期","类型"];
				}else if(current == 1){
					this.slist = ["活动主题","日期","时间"]
				}else if(current == 2){
					this.slist = ["试卷名称","日期","分数"]
				}else if(current == 3){
					this.slist = ["月份","时间","实际金额"]
				}
				this.datalist()
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				
			},
		}
	};
</script>

<style lang="scss">
	.top_bars{
		position: fixed;
		top: 0;
		z-index: 10;
	}
	.ztswipers{
		border-radius: 12rpx;
		margin: 126rpx 26rpx 26rpx 26rpx;
		height: 100%;
		width: auto !important;
		box-sizing: border-box;
		.scroll_views{
			.picker_year{
				width: 144rpx;
				height: 48rpx;
				background: #CE2741;
				border-radius: 24rpx;
				color: #fff;
				line-height: 48rpx;
				text-align: center;
				font-size: 28rpx;
			}
			.finish{
				width: 100%;
				.ksnumber{
					color: #CE2741;
					font-size: 28rpx;
					font-weight: bold;
					line-height: 88rpx;
					box-sizing: border-box;
				}
				.answer_item{
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 88rpx;
					border-bottom: 2rpx solid #EDEDED;
					color: #444444;
					font-size: 26rpx;
					padding: 0 28rpx;
					box-sizing: border-box;
					>view:nth-child(1){
						max-width: 460rpx;
						min-width: 400rpx;
						overflow: hidden;
					}
					>view:nth-child(2){
						min-width: 60rpx;
						text-align: center;
					}
					>view:nth-child(3){
						flex: 1;
						text-align: center;
					}
				}
				.answer_item:first-child{
					background: rgba($color: #EE7F4B, $alpha: 0.14);
					border: none;
					font-weight: bold;
					font-size: 28rpx;
				}
				.answer_item:last-child{
					border: none;
				}
			}
		}
	}
</style>
