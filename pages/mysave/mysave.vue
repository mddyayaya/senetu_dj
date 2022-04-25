<template>
	<view class="wrapper">
		<u-toast ref="uToast"></u-toast>
		<view class="top_bars">
			<u-tabs ref="uTabs"
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
				width="750rpx"
				item-width="125">
			</u-tabs>
			<view class="checkAll" @click="selectAll" >
				<u-icon name="list-dot" color="#fff" size="45"></u-icon>
			</view>
		</view>
		<view class="scroll_view " >
			<view class="pl" v-if="allCheck">
				<u-icon name="list-dot" color="#333" size="45"></u-icon>
				批量操作
			</view>
			<view scroll-y="true" class="scroll_views" :style="{style:allCheck}">
				<view class="resource_items"
				 v-for="(item,index) in saveList">
					<u-icon style="margin-right:16rpx"
					 @click="changeState(index,item.id)"
					v-if="allCheck&&!item.checked" 
					name="checkmark-circle" color="#D8D8D8" size="40"></u-icon>
					<u-icon style="margin-right:16rpx" 
					v-if="item.checked" 
					 @click="changeState(index,item.id)"
					name="checkmark-circle-fill" 
					color="#CE2741" size="40"></u-icon>
					<view class="top_img" @click="goDetail(item)">
						<u-lazy-load
						v-if="total>1"
							border-radius="8"
							class="lazyimg u-skeleton-fillet"
							height="176"
							threshold="50"
							img-mode="widthFill"
							:image="item.sz_img" >
						</u-lazy-load>
						<image :src="item.sz_img" v-if="total==1" mode=""></image>
						<view class="bsid">{{$changeBsid(item.bs_id)}}</view>
					</view>
					<view class="bottom_words" @click="goDetail(item)">
						<view class="bottom_top">{{item.title}}</view>
						<view class="bottom_s">
							<view style="display: flex;align-items: center;">
								<u-icon name="play-circle-fill" color="#999" size="40">
								</u-icon>{{item.ck_num}}</view>
							<view @click="cancel(item.id)">取消收藏</view>
						</view>
					</view>
				</view>
				<u-loadmore v-if="saveList.length > 0" :load-text="loadText" margin-top="40" :status="status" />
				<my-nodata v-if="saveList.length==0"></my-nodata>
			</view>
			<view class="selectBtn" v-if="allCheck">
				<view @click="checkall">全选</view>
				<view @click="cancelall">取消收藏<view v-if="selectList.length > 0">({{selectList.length}})</view></view>
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
				allCheck:false,
				style:{
					paddingBottom:'80rpx'
				},
				list: [{
					name: '全部',
					bsid:0
					},{
						name: 'PPT',
						bsid:1
					},{
						name: '音频',
						bsid:4
					},{
						name: 'PDF',
						bsid:8
					},{
						name: '视频',
						bsid:3
					}],
				loadText: {
					loadmore: '没有更多了',
					loading: '努力加载中',
					nomore: '上拉加载'
				},
				status: 'loadmore',
				saveList :[],
				current:0,
				height:"",
				bsid:0,
				total:0,
				selectList:[]
			};
		},
		onLoad() {
			this.$store.dispatch("checkXw");
			this.$store.dispatch("appLogin");
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
			uni.getSystemInfo({
				success(res) {
					that.height = res.windowHeight - 80
				}
			})
			that.datalist();
		},
		// 触底加载
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
			// tabs通知swiper切换
			tabsChange(index) {
				this.current = index;
				this.page = 1;
				this.saveList = [];
				this.bsid = this.list[index].bsid;
				setTimeout(()=>{
					this.datalist();
				},200)
			},
			changeState(index,id){
				var that = this;
				that.selectList = []
				if(this.saveList[index].checked)
				this.saveList[index].checked = false
				else this.saveList[index].checked = true
				this.saveList.map(val => {
					if(val.checked)
					that.selectList.push(val.id)
				})
			},
			// 列表数据
			datalist(){
				var that = this;
				userinfo.col_list({
					uid:that.$store.state.uid,
					bsid:that.bsid
				}).then(res => {
					if(res.data.data.pagedata!=null){
						if(res.data.data.pagedata.length>0){
							that.saveList = that.saveList.concat(res.data.data.pagedata);
						}
					}
					that.total = res.data.data.total;
				})
			},
			// 资源详情
			goDetail(item){
				getApp().goDetail(item.bs_id,item.rid,"",item.ft_id)
			},
			// 取消收藏
			cancel(id){
				var that = this;
				userinfo.delCol({
					id:id
				}).then(res => {
					that.page = 1;
					that.saveList = [];
					that.datalist();
				})
			},
			// 全选取消
			cancelall(){
				var that = this;
				if(that.selectList.length>0){
					userinfo.delCol({
						id:that.selectList.toString()
					}).then(res => {
						that.page = 1;
						that.saveList = [];
						that.datalist();
						that.allCheck = false;
					})
				}else{
					that.$refs.uToast.show({
						title:"请选择资源"
					})
				}
			},
			// 打开全选
			selectAll(){
				this.allCheck = !this.allCheck;
				if(!this.allCheck){
					this.saveList.map(list => {
						list.checked = false;
					})
				}
			},
			// 全选
			checkall(){
				var that = this;
				that.selectList = []
				that.saveList.map(val => {
					val.checked = true;
					that.selectList.push(val.id)
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.top_bars{
		z-index: 100;
		position: fixed;
		display: flex;
		align-items: center;
		top: 0;
	}
	.checkAll{
		margin-left: 15rpx;
	}
	.pl{
		font-size: 28rpx;
		margin-bottom: 20rpx;
		color: #333333;
		display: flex;
		align-items: center;
		font-weight: bold;
	}
	.scroll_view{
		width: auto;
		margin: 120rpx 0 0 0;
		padding: 10rpx 26rpx 0 26rpx;
		box-sizing: border-box;
		border-radius: 12rpx;
		.scroll_views{
			height: 100%;
			width: 100%;
			.resource_items{
				display: flex;
				margin-top: 32rpx;
				justify-content: space-between;
				align-items: center;
				.top_img{
					position: relative;
					width: 304rpx;
					height: 176rpx;
					margin-right: 34rpx;
					border-radius: 8rpx;
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
				.bottom_words{
					flex: 1;
					.bottom_top{
						max-height: 64rpx;
						font-size: 24rpx;
						font-weight: bold;
						color: #333333;
						line-height: 32rpx;
						overflow: hidden;
						margin-bottom: 50rpx;
					}
					.bottom_s{
						display: flex;
						justify-content: space-between;
						align-items: center;
						color: #999;
						font-size: 24rpx;
					}
				}
			}
		}
		.selectBtn{
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			bottom: 0;
			padding:80rpx 0 80rpx 0;
			font-size: 28rpx;
			text-align: center;
			background: #fff;
			height:76rpx;
			width: 94%;
			box-sizing: border-box;
			>view:nth-child(1){
				width: 336rpx;
				text-align: center;
				color: #fff;
				padding: 20rpx 0;
				border-radius: 60rpx;
				background: linear-gradient(180deg, #B4091C 0%, #DB153C 100%);
			}
			>view:nth-child(2){
				width: 336rpx;
				text-align: center;
				color: #CE2741;
				padding: 20rpx 0;
				border-radius: 60rpx;
				border: 2rpx solid #B4091C;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
