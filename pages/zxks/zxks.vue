<template>
	<view class="wrapper" style="position: relative;">
		<u-toast ref="uToast"></u-toast>
		<my-myinfo
		 :uid="uid"
		 :u_name="u_name"
		 type="ks" :average="average" :accuracy="accuracy"></my-myinfo>
		<view class="main_body mine_main">
			<view class="shadow_box">
				<view class="shadow_title">
					<view class="left">
						<view class="line"></view>
						<view class="left_title">未进行</view>
					</view>
				</view>
				<view class="shadow_content" v-if="testList.length > 0">
					<view class="zxks">
						<image :src="ksicon" mode=""></image>
						<swiper
							class="zxkswiper"
							@change="changeTest"
							:indicator-dots="false" 
							:autoplay="true" 
							:interval="3000" 
							:duration="500">
							<swiper-item v-for="item in testList">
								<view class="swiper-item">
									<view class="kstitle">{{item.title}}</view>
									<view class="kstime">{{item.k_time}}</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<my-nodata v-if="testList.length == 0"></my-nodata>
				<view class="shodetail" @click="shodetail" 
				v-if="testList.length > 0" hover-class="hoverClass">查看详情</view>
			</view>
			<view class="shadow_box index_box">
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
				<view class="finish">
					<view class="ksnumber">次数：{{finshedlist.length}}次</view>
					<view class="answer_list" v-if="finshedlist.length > 0">
						<view class="answer_item">
							<view>考核名称</view>
							<view>排名</view>
							<view>分数</view>
						</view>
						<view class="answer_item" v-for="item in finshedlist" @click="finishTest(item.aid)">
							<view>{{item.title}}</view>
							<view>{{item.ord_number}}</view>
							<view>{{item.numbers}}</view>
						</view>
					</view>
					<my-nodata v-if="finshedlist.length == 0"></my-nodata>
				</view>
			</view>
		</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import { zxks } from '@/request/api.js'
	import config_url from '@/request/config.js'
	export default {
		data() {
			return {
				selectValue:new Date().getFullYear(),
				page:1,
				average:0,
				accuracy:0,
				testList:[],
				finshedlist:[],
				ksicon:config_url+'statics/xcx_new/zxks.png',
				testId:"",
				u_name:"",
				uid:"",
				stime:"",
				u_picture:""
			}
		},
		onLoad() {
			this.$store.dispatch("checkXw")
			this.$store.dispatch("appLogin");
			this.u_name = this.$store.state.u_name;
			this.uid = this.$store.state.uid;
			this.u_picture = this.$store.state.u_picture;
		},
		onShow() {
			this.testList = [];
			this.finshedlist = [];
			this.ksinfo();
			this.finishExamList();
			this.incompleteExamList();
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
			changeYear(e){
				this.selectValue = this.yearList[e.target.value]
				this.finshedlist = [];
				this.page = 1;
				this.finishExamList()
			},
			changeTest(e){
				this.testId = this.testList[e.detail.current].id;
				this.stime = new Date(this.testList[e.detail.current].k_time).getTime();
			},
			shodetail(){
				var that = this;
				uni.navigateTo({
					url:"zxksdetail/zxksdetail?id="+that.testId+"&stime="+this.stime
				})
			},
			// 正确率
			ksinfo(){
				var that = this;
				zxks.average({
					uid:that.$store.state.uid
				}).then(res => {
					that.accuracy = res.data.data.accuracy;
					that.average = res.data.data.numbers;
				})
			},
			// 已完成考试
			finishExamList(){
				var that = this;
				zxks.finishExam({
					uid:that.$store.state.uid,
					page:that.page,
					year:that.selectValue
				}).then(res => {
					if(res.data.data.pagedata!=null){
						if(res.data.data.pagedata.length > 0){
							that.finshedlist=that.finshedlist.concat(res.data.data.pagedata);
						}
					}
					that.total = res.data.total;
				})
			},
			// 未完成考试
			incompleteExamList(){
				var that = this;
				zxks.incompleteExam({
					uid:that.$store.state.uid
				}).then(res => {
					that.testList= res.data.data;
					that.testId= res.data.data[0].id;
					that.stime= new Date(res.data.data[0].k_time).getTime();
				})
			},
			// 已完成考试跳转详情
			finishTest(id){
				var that = this;
				uni.navigateTo({
					url:"finishks/finishks?id="+id
				})
			}
		},
		mounted() {
		}
	}
</script>

<style lang="scss">
	.index_top_bg{
		z-index: 8;
		width: 100%;
		height: 274rpx;
		background: url(~@/static/home_top.png) no-repeat;
		background-size: 100% 100%;
		.users{
			padding: 20rpx 40rpx 0 40rpx;
			width: 100%;
			color: #F1F9FF;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			.userpic{
				width: 136rpx;
				height: 136rpx;
				border-radius: 50%;
				image{
					background: $loadingBg;
					border-radius: inherit;
					width: 100%;
					height: 100%;
				}
			}
			.userinfo{
				margin-left: 28rpx;
				flex: 1;
				.username{
					font-size: 36rpx;
					font-weight: bold;
					margin-bottom: 16rpx;
				}
				.user_score{
					font-size: 26rpx;
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
	.mine_main{
		z-index: 10;
		margin-top: -120rpx;
	}
	.index_box{
		margin-top: 24rpx;
	}
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
			padding: 0 28rpx;
			box-sizing: border-box;
		}
		.answer_item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 88rpx;
			color: #444444;
			font-size: 26rpx;
			padding: 0 28rpx;
			box-sizing: border-box;
			>view:nth-child(1){
				width: 460rpx;
				overflow: hidden;
			}
			>view:nth-child(2){
				width: 60rpx;
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
</style>
