<template>
	<view class="wrapper">
		<u-toast ref="uToast"></u-toast>
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
		<!-- <view class="searchres">
			<view class="searchitem"></view>
		</view> -->
		<view class="lists" v-if="title==''">
			<view class="search_list" v-if="historylist.length > 0">
				<view class="search_title">历史搜索</view>
				<view class="tagswrap">
					<view class="tags" v-for="(item,index) in historylist">
						<u-tag
						@click="clickTags(item.title)"
						border-color="#EDEDED"
						:text="item.title" type="info" bg-color="#EDEDED" color="#666666" shape="circle"/>
					</view>
				</view>
			</view>
			<view class="search_list hot">
				<view class="search_title">
					<view>热门搜索</view>
					<image :src="hot" mode=""></image>
				</view>
				<view class="hotlist">
					<view class="hotItem"
						@click="clickTags(item.name)" v-for="(item,index) in hotlist">
						<view class="point" :class="{isFirst:index<3}"></view>
						<view>{{item.name}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="lists resources" v-if="resList.length>0&&title!=''">
			<view class="resources_items" 
			 @click="goDetail(item.bs_id,item.r_id,'')"
			 v-for="item in resList">
				<view class="resources_items_top">
					<image :src="item.sz_img" v-if="total==1" mode=""></image>
					<u-lazy-load
						v-if="total>0"
						border-radius="8"
						class="lazyimg"
						height="180"
						threshold="50"
						img-mode="widthFill"
						:image="item.sz_img" >
					</u-lazy-load>
					<view class="bsid">{{$changeBsid(item.bs_id)}}</view>
				</view>
				<view class="resources_items_bottom">{{item.title}}</view>
			</view>
		</view>
		<view style="margin-top:240rpx;">
			<my-nodata v-if="resList.length == 0&&title!=''"></my-nodata>
		</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
		<u-loadmore v-if="resList.length>0&&title!=''" :load-text="loadText" margin-top="40" margin-bottom="40" :status="status" />
	</view>
</template>

<script>
	import { zhaunti } from '@/request/api.js'
	import config_url from '@/request/config.js'
	export default {
		data() {
			return {
				title:'',
				hot:config_url+'statics/xcx_new/hot.png',
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
					console.log(that.resList)
					that.total = res.data.data.total;
				})
			},
			// 资源详情
			goDetail(bsid,id,url){
				var that = this;
				if(bsid == 8){
					if(url == ""){
						that.$refs.uToast.show({title:"无资源链接"})
					}else{
						getApp().goDetail(bsid,id,url,0)
					}
				}else{
					getApp().goDetail(bsid,id,url,0)
				}
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
		margin-bottom: 30rpx;
		padding: 0 26rpx;
		width: 100%;
		box-sizing: border-box;
		.search_title{
			line-height: 116rpx;
			border-bottom: 4rpx solid #EDEDED;
			color: #333333;
			font-weight: bold;
			font-size: 36rpx;
			display: flex;
			align-items: center;
			image{
				margin-left: 10rpx;
				height: 36rpx;
				width: 28rpx;
			}
		}
		.tagswrap{
			display: flex;
			flex-wrap: wrap;
			.tags{
				margin: 28rpx 24rpx 0 0;
			}
		}
		.hotlist{
			.hotItem{
				margin-top: 30rpx;
				display: flex;
				align-items: center;
				color:#333333;
				font-size: 30rpx;
				font-weight: bold;
			}
			.point{
				height: 8rpx;
				width: 8rpx;
				margin-right: 8rpx;
				background: #EE7F4B;
			}
			.isFirst{
				background: #E0003B;
			}
		}
	}
	.searchres{
		position: fixed;
		width: 100%;
		height: 800rpx;
		background-color: #fff;
		padding: 0 26rpx;
		box-sizing: border-box;
		z-index: 10;
		top: 117rpx;
	}
	.lists{
		padding-top: 117rpx;
	}
	.resources{
		display: flex;
		flex-wrap: wrap;
		padding: 0 30rpx;
		width: 100%;
		margin-top: 145rpx;
		box-sizing: border-box;
		.resources_items{
			width: 330rpx;
			margin-right: 30rpx;
			margin-bottom: 30rpx;
			.resources_items_top{
				position: relative;
				width: 100%;
				height: 180rpx;
				border-radius: 8rpx;
				image{
					background: #EDEDED;
					left: 0;
					top: 0;
					position: absolute;
					height: 100%;
					width: 100%;
					border-radius: 8rpx;
				}
				.bsid{
					z-index: 10;
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
			.resources_items_bottom{
				color: #333333;
				font-size: 24rpx;
				font-weight: bold;
				line-height: 32rpx;
				max-height: 64rpx;
				margin-top: 10rpx;
				overflow: hidden;
			}
		}
		.resources_items:nth-child(2n){
			margin-right: 0;
		}
	}
</style>
