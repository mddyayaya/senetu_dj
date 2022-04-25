<template>
	<view class="wrapper">
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
				:is-scroll="false"></u-tabs>
		</view>
		<view class="wrappers">
			<view class="swiper-item shadow_box"
			  v-for="item in 10">
				<view class="shadow_title">
					<view class="left">
						<view class="line"></view>
						<view class="left_title ">2021届选举大会</view>
					</view>
				</view>
				<view class="shadow_content">
					<view class="">时间：2020-12-12</view>
					<view class="">发布党组织：一线党支部</view>
					<view class="">类型：党员自评</view>
				</view>
				<view class="shodetail" hover-class="hoverClass" @click="godetail">查看详情</view>
			</view>
			<!-- <my-nodata v-if="(datalist.length == 0)&&!loading"></my-nodata> -->
			<u-loadmore  :load-text="loadText" margin-top="40" margin-bottom="40" :status="status" />
		</view>
	</view>
</template>

<script>
	import { activity } from '@/request/api.js'
	let that;
	export default {
		data() {
			return {
				list: [{
					name: '待评议'
				}, {
					name: '已评议'
				}],
				current:0,
				status: 'loadmore',
				loadText: {
					loadmore: '没有更多了',
					loading: '努力加载中',
					nomore: '上拉加载'
				},
				getdata:{
					uid:this.$store.state.uid,
					page:1
				}
			}
		},
		created() {
			that = this;
		},
		mounted() {
			that.getlist();
		},
		methods: {
			// 评议列表
			getlist(){
				console.log(12)
				activity.dmcraList(that.getdata).then(res => {
					console.log(res)
				})
			},
			tabsChange(index){
				this.current = index;
			},
			godetail(){
				uni.navigateTo({
					url:"../mzpydetail/mzpydetail"
				})
			}
		}
	}
</script>

<style lang="scss">
	.top_bars{
		position: fixed;
		top: 0;
		z-index: 10;
	}
	.wrappers{
		width: 100%;
		padding-top: 100rpx;
		.swiper-item{
			width: auto !important;
			margin: 26rpx 26rpx 0 26rpx;
		}
	}
</style>
