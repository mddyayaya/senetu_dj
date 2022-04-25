<template>
	<view class="wrapper ">
		<u-toast ref="uToast" />
		<view class="index_top_bg"></view>
		<view class="main_body index_body">
			<view class="swiper_container">
				<swiper
					class="swiper "
					:circular="true"
					indicator-active-color='#fff'
					@change="swiperChange"
					:indicator-dots="false" :autoplay="true" :interval="3000" :duration="500">
					<swiper-item  v-for="item in swiperlist" @click="goResourceDetail(item.bs_id,item.id,'')">
						<view class="swiper-item ">
							<image :lazy-load="true" :src="item.sz_img" mode="widthFix"></image>
						</view>
					</swiper-item>
				</swiper>
				<view class="swiper_dots">
					<view class="swiper_keys" :class="{swiper_active:swiperkey == index}" v-for="(item,index) in swiperlist"></view>
				</view>
			</view>
			<view class="shadow_box box_all" style="padding-top: 26rpx;">
				<view class="all_modules" style="min-height: 300rpx;">
					<view class="modules"
						v-for="item in allBoxList" v-if="item.isindex" 
						@click="goinfo(item.url)">
						<view class="modules_image"><image :lazy-load="true" :src="item.img" mode=""></image></view>
						<view class="modules_text"><text>{{item.name}}</text></view>
					</view>
					<view class="modules " @click="addIndex">
						<view class="modules_image "><image :lazy-load="true" :src="more" mode=""></image></view>
						<view class="modules_text"><text>添加到首页</text></view>
					</view>
				</view>
			</view>
			<!-- 日程快捷 -->
			<view class="shadow_box box_index" style="padding-top: 26rpx;" v-if="datas.length>0">
				<view class="richeng_quick">
					<image :src="quick" mode=""></image>
					<view class="quick">
						<text>日程:</text>
						<swiper
							:circular="true"
							class="swipers"
							:indicator-dots="false" :autoplay="true" :interval="5000" :duration="500">
							<swiper-item v-for="item in datas" @click="goRcdetail(item)">
								<view class="swiper-item" hover-class="hoverClass">
									<text>{{$changeTime(item.h_stime)}}{{item.title}}</text>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			<!-- 品质资源 -->
			<view class="shadow_box box_index">
				<view class="shadow_title">
					<view class="left">
						<view class="line"></view>
						<view class="left_title ">品质·资源</view>
					</view>
					<view class="right" @click="changeOther">换一批</view>
				</view>
				<view class="resource_list ">
					<view class="resource_item" @click="godetail(item.id)" v-for="item in pzlist">
						<view class="top_img">
							<image :src="item.sz_img" mode=""></image>
							<view class="bsid">视频</view>
						</view>
						<view class="bottom_words">{{item.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import { indexs,shouquan,richeng } from '@/request/api.js'
	import config_url from '@/request/config.js'
	export default {
		data() {
			return {
				more:config_url+'statics/xcx_new/more.png',
				quick:config_url+'statics/xcx_new/quick.png',
				title: 'Hello',
				swiperlist:[],
				swiperkey:0,
				recPage:1,
				loading:true,
				pzlist:[],
				allBoxList:[],
				datas:[],
				pztotal:0
			}
		},
		methods: {
			swiperChange(e){
				this.swiperkey = e.detail.current;
			},
			// 顶部轮播
			topBanner(){
				var that = this;
				indexs.banner().then(res => {
					that.swiperlist = res.data.data
				})
			},
			// 资源详情
			goResourceDetail(bsid,id,url){
				getApp().goDetail(bsid,id,url,0)
			},
			// 品质资源
			recommend(){
				var that = this;
				indexs.recommend({
					page:that.recPage,
					id:''
				}).then(res => {
					that.pzlist = res.data.data.all;
					that.pztotal = res.data.data.page;
				})
			},
			
			//换一批
			changeOther(){
				var that = this;
				if(that.pztotal > that.recPage){
					that.recPage+=1
				}else{
					if(that.recPage>1){
						that.recPage-=1
					}
				}
				that.recommend()
			},
			// 首页模块
			indexsModules(){
				var that = this;
				indexs.column_user({
					uid:that.$store.state.uid
				}).then(res => {
					that.allBoxList = res.data.data.public;
				})
			},
			// 首页模块跳转
			goinfo(url){
				var that = this;
				that.$checkUser(url)
			},
			addIndex(){
				var that = this;
				that.$checkUser("../addindex/addindex")
			},
			godetail(id){
				this.$checkUser("../indexDetail/indexDetail?id="+id)
			},
			// 用户当天登录
			loginTime(){
				var that = this;
				if(that.$store.state.uid!=''){
					shouquan.loginTime({
						uid:that.$store.state.uid
					}).then(res => {
						
					})
				}
			},
			// 用户当天日程
			userShedule(){
				var that = this;
				richeng.schedule({
					uid:that.$store.state.uid,
					time:that.$changeTime1(new Date().getTime())
				}).then(res => {
					that.datas = res.data.data
				})
			},
			// 用户日程详情
			goRcdetail(item){
				var that = this;
				if(item.branch == 4){
					if(item.status == 1){
						// 已完成考试
						uni.navigateTo({
							url:"../zxks/finishks/finishks?id="+item.id
						})
					}else{
						// 未开始考试
						uni.navigateTo({
							url:"../zxks/zxksdetail/zxksdetail?id="+item.id
						})
					}
				}else{
					uni.navigateTo({
						url:"../activitydetail/activitydetail?hyid="+item.id+'&hyflag='+item.hyflag
					})
				}
			},
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
		
		onLoad() {
			var that = this;
			that.$store.dispatch("checkXw");
			setTimeout(() => {
				that.indexsModules();
				that.loginTime();
				that.userShedule()
			},800)
			that.topBanner();
			that.recommend();
			uni.navigateTo({
				url:"../test/test"
			})
		},
		onShow() {
			var that = this;
			that.$store.dispatch("checkXw")
			setTimeout(() => {
				that.indexsModules();
				that.loginTime();
				that.userShedule()
			},800)
		},
	}
</script>

<style lang="scss" scoped>
	.index_top_bg{
		width: 100%;
		height: 274rpx;
		background: url(~@/static/home_top.png) no-repeat;
		background-size: 100% 100%;
	}
	.index_body{
		margin-top: -280rpx;
		.swiper_container{
			margin-bottom: 24rpx;
			position: relative;
			width: 100%;
			width: 100%;
			height: 392rpx;
			.swiper{
				width: 100%;
				height: 100%;
				.swiper-item{
					width: 100%;
					height: 100%;
					background: $loadingBg;
					image{
						background: $loadingBg;
						width: 100%;
						height: 100%;
					}
				}
			}
			.swiper_dots{
				position: absolute;
				display: flex;
				align-items: center;
				bottom: 20rpx;
				right: 32rpx;
				text-align: right;
				.swiper_keys{
					width: 16rpx;
					height: 8rpx;
					margin-left: 6rpx;
					border-radius: 4rpx;
					transition: all .3s;
					background: rgba($color: #fff, $alpha: 0.6);
				}
				.swiper_active{
					width: 30rpx !important;
					height: 8rpx !important;
					background: #FFFFFF;
				}
			}
		}
		.box_index{
			margin-top: 24rpx;
			.richeng_quick{
				width: 100%;
				display: flex;
				align-items: center;
				image{
					width: 88rpx;
					height: 88rpx;
					margin-right: 20rpx;
				}
			}
			.quick{
				flex: 1;
				color: #444;
				font-size: 28rpx;
				display: flex;
				text:nth-child(1){
					font-weight: bold;
				}
				.swipers{
					width: 460rpx;
					height: 40rpx;
					line-height: 40rpx;
					.swiper-item{
						width: 100%;
						height: 100%;
						overflow: hidden;
						text{
							font-weight: 400;
						}
					}
				}
			}
		}
	}
</style>
