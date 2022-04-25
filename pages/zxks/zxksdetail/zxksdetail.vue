<template>
	<view class="wrapper">
		<u-toast ref="uToast"></u-toast>
		<view class="kstitle">{{title}}</view>
		<view class="shadow_box ks_box">
			<view class="ks_times">考试时间</view>
			<view class="ks_timess">{{time}}</view>
		</view>
		<view class="shadow_box ks_box shiti_box">
			<view class="shiti">
				<view class="shiti_item">
					<view class="shit_title">题目数量</view>
					<view class="shit_value">{{
						more.length>0 && single.length>0?more.length + single.length:
						more.length>0 && single.length==0?more.length:
						more.length==0 && single.length>0?single.length:0
					}}</view>
				</view>
			</view>
			<view class="shiti">
				<view class="shiti_item">
					<view class="shit_title">题目类型</view>
					<view class="shit_value" v-if="more.length>0 && single.length>0">单选题、多选题</view>
					<view class="shit_value" v-if="more.length>0 && single.length==0">多选题</view>
					<view class="shit_value" v-if="more.length==0 && single.length>0">单选题</view>
				</view>
			</view>
			<view class="shiti">
				<view class="shiti_item">
					<view class="shit_title">题目难度</view>
					<view class="shit_value">困难</view>
				</view>
			</view>
			<view class="shiti">
				<view class="shiti_item">
					<view class="shit_title">满分</view>
					<view class="shit_value">{{total}}分</view>
				</view>
			</view>
		</view>
		<view class="edit startks" hover-class="edit_hover" @click="startKs">开始考试</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import { zxks } from '@/request/api.js'
	export default {
		data() {
			return {
				khid:"",
				single:[],
				more:[],
				total:"",
				title:'',
				time:"",
				number:"",
				status:1,
				stime:"",
				nowtime:new Date().getTime()
			}
		},
		onLoad(options) {
			this.khid = options.id;
			this.stime = options.stime;
			this.$store.dispatch("checkXw");
			this.$store.dispatch("appLogin");
			this.ksDetail()
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
			startKs(){
				var that = this;
				if(this.nowtime<this.stime){
					that.$refs.uToast.show({title:'未到考试时间'})
				}else{
					uni.navigateTo({
						url:'../startks/startks?id='+that.khid
					})
				}
			},
			ksDetail(){
				var that = this;
				zxks.examineDetail({
					uid:that.$store.state.uid,
					id:that.khid
				}).then(res => {
					that.title = res.data.data.title;
					that.more = res.data.data.more;
					that.single = res.data.data.single;
					that.total = res.data.data.total;
					that.status = res.data.data.status;
					that.time = res.data.data.k_time+' ~ '+res.data.data.k_time1
				})
			}
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
	.ks_box{
		text-align: center;
		margin: 26rpx;
		font-size: 28rpx;
		box-sizing: border-box;
		padding-top: 40rpx;
		width: auto;
		color: #333333;
		.ks_times{
			font-weight: bold;
		}
		.ks_timess{
			margin-top: 32rpx;
			padding-bottom: 12rpx;
		}
	}
	.shiti_box{
		display: flex;
		flex-wrap: wrap;
		padding-top: 40rpx;
		.shiti{
			width: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			text-align: center;
			height: 150rpx;
			.shiti_item{
				width: 100%;
				text-align: center;
				color: #333333;
				font-size: 28rpx;
				.shit_title{
					font-weight: bold;
					margin-bottom: 30rpx;
				}
			}
		}
		.shiti:nth-child(1){
			border-right: 4rpx solid #EDEDED;
			border-bottom: 4rpx solid #EDEDED;
		}
		.shiti:nth-child(2){
			border-bottom: 4rpx solid #EDEDED;
		}
		.shiti:nth-child(3){
			border-right: 4rpx solid #EDEDED;
		}
	}
	.startks{
		bottom: 228rpx !important;
	}
</style>
