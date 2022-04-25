<template>
	<view class="wrapper">
		<u-toast ref="uToast"></u-toast>
		<view class="top_wrapper" :style="{height:height+'px'}">
			<view class="shadow_box box_index">
				<view class="shadow_title">
					<view class="left">
						<view class="line"></view>
						<view class="left_title">活动/学习详情</view>
					</view>
				</view>
				<view class="shadow_content">
					<view>主题：{{title}}</view>
					<view>时间：{{$changeTime(time)}}</view>
					<view>地点：{{address}}</view>
					<view class="cyry"><text>参与人员：</text><u-read-more 
						ref='moretext'
						show-height="50" 
						open-text='收起'
						close-text='更多'
						color="#CE2741"
						font-size="28rpx"
						:shadowStyle="shadowStyle"
						style="word-break: break-all;font-size: 28rpx;color: #333;"
						text-indent="0"
						:toggle="true">
						<rich-text :nodes="h_cy_name"></rich-text>
					</u-read-more></view>
					
				</view>
				<!-- <view class="shodetail shomore" @click="gomore" hover-class="hoverClass">更多</view> -->
			</view>
			<view class="shadow_box box_index">
				<view class="shadow_title">
					<view class="left">
						<view class="line"></view>
						<view class="left_title">活动/学习资料</view>
					</view>
				</view>
				<view class="resource_list">
					<view class="resource_item" 
						v-if="resourcelist.length>0"
						@click="goplay(index,item)"
						hover-class="hoverClass" v-for="(item,index) in resourcelist">
						<view class="top_img">
							<image :src="item.sz_img" mode=""></image>
						</view>
						<view class="bottom_words">{{item.title}}</view>
					</view>
					<view class="nodata" v-if="resourcelist.length==0">
						<u-empty text="暂无资料" :src="noDataImg" mode=""></u-empty>
					</view>
				</view>
			</view>
			<view class="shadow_box box_index"  v-if="isFinish">
				<view class="shadow_title">
					<view class="left">
						<view class="line"></view>
						<view class="left_title">活动/学习总结</view>
					</view>
				</view>
				<view class="shadow_content shadow_content2">
					<view style="margin-bottom: 20rpx;" v-html="experience" v-if="experience!=null&&experience!=''"></view>
					<u-grid :col="col" :border="false">
						<u-grid-item v-for="(item,index) in experienceImg" @click="$previewImg(index,experienceImg)">
							<image 
								:class="col==1?'col1':col==2?'col2':col==3?'col3':''" 
								:src="item"></image>
						</u-grid-item>
					</u-grid>
					<view class="nodata" v-if="experience==null||experience==''">
						<u-empty text="暂无总结" :src="noDataImg" mode=""></u-empty>
					</view>
				</view>
			</view>
		</view>
		<view class="edit" hover-class="edit_hover"  v-if="isFinish" @click="goedit">填写心得</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import { activity } from '@/request/api.js'
	import config_url from '@/request/config.js'
	export default {
		data() {
			return {
				shadowStyle: {
					backgroundImage: "none",
					paddingTop: "0",
					marginTop: "20rpx"
				},
				col:1,
				experienceImg:[],
				noDataImg:config_url+"statics/xcx_new/nohy.png",
				height:"",
				hyid:"",
				hyflag:"",
				resourcelist:[],
				experience:"",
				h_cy_name:"",
				address:"",
				time:"",
				title:'',
				isFinish:false
			}
		},
		onLoad(options) {
			this.hyid = options.hyid;
			this.hyflag = options.hyflag;
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
			var that = this
			uni.getSystemInfo({
				success(res) {
					that.height = res.windowHeight - 100
				}
			})
			this.$store.dispatch("checkXw");
			this.$store.dispatch("appLogin");
			that.activityDetail()
		},
		onShow() {
			this.$store.dispatch("checkXw");
			this.$store.dispatch("appLogin");
			this.activityDetail()
		},
		methods: {
			// 活动详情
			activityDetail(){
				var that = this;
				activity.activityDetail({
					uid:that.$store.state.uid,
					hyid:that.hyid,
					hyflag:that.hyflag
				}).then(res => {
					that.resourcelist = res.data.data.file;
					that.experience = res.data.data.experience;
					that.h_cy_name = res.data.data.h_cy_name;
					that.title = res.data.data.title;
					that.time = res.data.data.h_stime;
					that.address = res.data.data.address;
					that.flag = res.data.data.flag;
					that.isFinish = parseInt(res.data.data.h_stime) <= new Date().getTime()?true:false;
					if(res.data.data.img!=''){
						that.experienceImg = res.data.data.img;
						if(that.experienceImg.length == 1){
							that.col = 1
						}else if(that.experienceImg.length >= 2 && that.experienceImg.length <= 4){
							that.col = 2
						}else{
							that.col = 3
						}
					}
				})
			},
			//查看资源
			goplay(index,item){
				if(item.type == 9){
					// 自建资源
					uni.showModal({
						title:"温馨提示",
						content:"此课件将不计入学习课时,是否继续学习",
						 success: function (res) {
							if (res.confirm) {
								if(item.bs_id == 3 || item.bs_id == 2){
									uni.navigateTo({
										url:"../persondetail/persondetail?title="+item.title+"&src="+item.src+"&bsid="+item.bs_id
									})
								}else{
									if(item.src == ""){
										that.$refs.uToast.show({
											title:"资源错误"
										})
									}else{
										uni.downloadFile({
											url: item.src,
											success: function (res) {
												var filePath = res.tempFilePath;
												uni.openDocument({
													filePath: filePath,
													success: function (res) {
														console.log('打开文档成功');
													}
												});
											}
										});
									}
								}	
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}else{
					getApp().goDetail(item.bs_id,item.rid,item.src,0);
				}
			},
			// 编辑心得
			goedit(){
				uni.navigateTo({
					url:"../activity/editactivity/editactivity?flag="+this.hyflag+'&hyid='+this.hyid
				})
			}
		}
	}
</script>

<style lang="scss">
	.top_wrapper{
		width: 100%;
		overflow-y: scroll;
		overflow-x: hidden;
		.shomore{
			text-align: center;
		}
		.box_index{
			width: auto;
			margin: 24rpx;
			.shadow_content2{
				border: none;
				line-height: 50rpx;
			}
		}
	}
	.cyry{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
	.nodata{
		width: 100%;
		margin:40rpx auto;
		image{
			width: 100%;
		}
	}
	.col1{
		width: 100%;
		height: auto;
	}
	.col2{
		width: 310rpx;
		height: 310rpx;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
	}
	.col2:nth-child(2n){
		margin-right: 0;
	}
	.col3{
		width: 200rpx;
		height: 200rpx;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
	}
	.col3:nth-child(3n){
		margin-right: 0;
	}
</style>

