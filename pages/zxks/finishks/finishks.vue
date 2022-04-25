<template>
	<view class="wrapper">
		<u-toast ref="uToast"></u-toast>
		<view class="kstitle">{{testtitle}}</view>
		<view class="main_body mine_main">
			<view class="shadow_box">
				<view class="shadow_title" style="border: none;">
					<view class="left">
						<view class="line"></view>
						<view class="left_title">考试结果</view>
					</view>
				</view>
				<view class="result">
					<view>成绩：{{score}}</view>
					<view>错题数：{{err_num}}</view>
					<view>正确率：{{avg}}%</view>
				</view>
			</view>
			<view class="shadow_box index_box" style="margin-top: 26rpx;">
				<view class="shadow_title">
					<view class="left">
						<view class="line"></view>
						<view class="left_title">题目</view>
					</view>
				</view>
				<view class="testList">
					<view class="tests" v-for="(item,index) in singleList">
						<view class="tests_title">{{index+1}}.{{item.title}}（单选）
							<view class="corroct">{{item.answer}}</view>
						</view>
						<view class="test_options">
							<view class="test_item" :class="{erroritem:items.title == '选项'+item.com_answer}" v-for="items in item.option">
								<view class="test_point" :class="{error:items.title == '选项'+item.com_answer}"></view>
								<view class="">{{items.title}}:{{items.content}}</view>
							</view>
						</view>
					</view>
					<view class="tests" v-for="(item,index) in morelist">
						<view class="tests_title">{{singleList.length+index+1}}.{{item.title}}（多选）
							<view class="corroct">{{item.answer.toString()}}</view>
						</view>
						<view class="test_options">
							<view class="test_item":class="{erroritem:item.com_answer.indexOf(items.title.split('选项')[1])!=-1}" v-for="items in item.option">
								<view class="test_point"  :class="{error:item.com_answer.indexOf(items.title.split('选项')[1])!=-1}"></view>
								<view class="">{{items.title}}:{{items.content}}</view>
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
	import { zxks } from '@/request/api.js'
	export default {
		data() {
			return {
				khid:"",
				err_num:"--",//错题数
				score:'--',//成绩
				avg:"--",//正确率
				morelist:[],
				singleList:[],
				testtitle:"加载中...",
			}
		},
		onLoad(options) {
			this.khid = options.id;
			this.$store.dispatch("checkXw");
			this.$store.dispatch("appLogin");
			this.ksDetail();
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
			// 试题
			ksDetail(){
				var that = this;
				zxks.examineDetail({
					uid:that.$store.state.uid,
					id:that.khid
				}).then(res => {
					that.testtitle = res.data.data.title;
					that.avg = res.data.data.com_avg;
					that.score = res.data.data.com_number;
					that.err_num = res.data.data.com_error;
					if(res.data.data.more.length > 0){
						res.data.data.more.forEach(item => {
							item.answer = item.answer.split(",");
						})
						that.morelist = res.data.data.more;
					}
					if(res.data.data.single.length > 0){
						that.singleList = res.data.data.single;
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.kstitle{
		text-align: center;
		padding:0 26rpx;
		margin: 52rpx auto;
		font-size: 36rpx;
		color: #CE2741;
		font-weight: bold;
	}
	.shadow_box{
		.result{
			display: flex;
			justify-content: space-between;
			color: #333333;
			font-size: 28rpx;
		}
		.testList{
			.tests{
				.tests_title{
					color: #333;
					font-weight: bold;
					font-size: 28rpx;
					margin: 32rpx 0;
					display: flex;
					align-items: center;
					.corroct{
						color: green !important;
					}
				}
				.test_options{
					margin-top: 20rpx;
					.erroritem{
						background: #EDEDED !important;
					}
					.test_item{
						box-sizing: border-box;
						padding: 0 24rpx;
						box-sizing: border-box;
						height: 72rpx;
						line-height: 72rpx;
						display: flex;
						align-items: center;
						border-radius: 6rpx;
						margin-top: 16rpx;
						border: 1px solid rgba(237, 237, 237, 0.9);
						font-size: 26rpx;
						color: #333333;
						.test_point{
							width: 16rpx;
							height: 16rpx;
							background: #D8D8D8;
							margin-right: 8rpx;
							border-radius: 50%;
						}
						.error{
							background: #CE2741 !important;
						}
					}
				}
			}
		}
	}
</style>
