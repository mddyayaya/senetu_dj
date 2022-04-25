<template>
	<view class="wrapper">
		<view class="seachbox">
			<view class="searchWrap">
				<u-search 
					style="flex: 1 !important;"
					color="#999999"
					height="76"
					bgColor="#fff"
					:show-action="false"
					placeholder="搜索关键词"
					v-model="title"></u-search>
				<view class="searchBtn" @click="search">搜索</view>
			</view>
		</view>
		<view class="search_list">
			<view class="list_item" @click="goDetail()" v-for="(item,index) in 10">
				<view class="list_left">
					<view class="list_title">全面建设社会主义现代化国家新征程已经开启全面建设社会主义现代化国家新征程已经开启全面建设社会主义现代化国家新征程已经开启</view>
					<view class="list_pub">
						<view>北京大学党支部</view>
						<view>2020-12-19</view>
					</view>
				</view>
				<view class="list_right" v-if="index!=8">
					<image :src="avatar" mode=""></image>
				</view>
			</view>
			<!-- <my-nodata v-if=""></my-nodata> -->
			<u-loadmore :load-text="loadText" margin-top="40"  :status="status" />
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
				avatar:config_url+'statics/xcx_new/avatar.png',
				title:'',
				hotlist:[],
				historylist:[],
				page:1,
				loadText: {
					loadmore: '没有更多了',
					loading: '努力加载中',
					nomore: '上拉加载'
				},
				status: 'loadmore',
				resList:[]
			}
		},
		onLoad() {
			this.$store.dispatch("checkXw");
			this.$store.dispatch("appLogin");
			this.hots();
			this.history();
		},
		onReachBottom(){
			var that = this;
			that.status = 'loading'
			that.page++;
			if(that.page <= that.total){
				that.datalist();
			}else{
				that.status = 'loadmore'
				that.page = that.total
			}
		},
		methods: {
			// 热门列表
			hots(){
				var that = this;
				zhaunti.searcHot().then(res => {
					that.hotlist = res.data.data;
				})
			},
			// 历史搜索
			history(){
				var that = this;
				zhaunti.searchLog({
					uid:that.$store.state.uid
				}).then(res => {
					that.historylist = res.data.data;
				})
			},
			// 搜索
			search(){
				var that = this;
				if(that.title != ''){
					that.resList = [];
					that.page = 1;
					that.datalist()
				}
			},
			// 标签点击搜索
			clickTags(title){
				this.title = title;
				this.page = 1;
				this.datalist();
			},
			datalist(){
				var that = this;
				zhaunti.search({
					uid:that.$store.state.uid,
					title:that.title,
					page:that.page
				}).then(res => {
					if(res.data.data.pagedata!=null){
						if(res.data.data.pagedata.length > 0){
							that.resList = that.resList.concat(res.data.data.pagedata)
						}
					}
					that.total = res.data.data.total;
				})
			},
			// 资源详情
			goDetail(){
				this.$checkUser("../djxcdetail/djxcdetail")
			},
		}
	}
</script>

<style lang="scss" scoped>
	.seachbox{
		z-index: 100;
		position: fixed;
		top: 0;
		display: flex;
		width: 100%;
		background: #BC2233;
		padding: 20rpx 26rpx;
		box-sizing: border-box;
		.searchWrap{
			display: flex;
			width: 100%;
			height: 100;
			align-items: center;
			background: #fff;
			justify-content: space-between;
			border-radius: 60rpx;
			.searchBtn{
				width: 130rpx;
				padding: 10rpx 0;
				text-align:center;
				color: #fff;
				font-size: 26rpx;
				margin-left: 20rpx;
				margin-right: 20rpx;
				background: #BC2233;
				border-radius: 30rpx;
			}
		}
	}
	.search_list{
		padding: 110rpx 32rpx 32rpx 32rpx;
		width: 100%;
		box-sizing: border-box;
		.list_item{
			border-bottom: 2rpx solid #EDEDED;
			padding: 32rpx 0;
			width: 100%;
			display: flex;
			align-items: center;
			min-height: 172rpx;
			.list_left{
				flex: 1;
				.list_title{
					font-size: 28rpx;
					color: #333333;
					font-weight: bold;
					line-height: 36rpx;
					max-height: 72rpx;
					overflow: hidden;
				}
				.list_pub{
					margin-top: 40rpx;
					width: 100%;
					display: flex;
					justify-content: space-between;
					color: #999;
					font-size: 22rpx;
				}
			}
			.list_right{
				margin-left: 34rpx;
				width: 292rpx;
				height: 172rpx;
				image{
					background: #EDEDED;
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
