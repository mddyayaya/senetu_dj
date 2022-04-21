<template>
	<view class="container">
		<view class="notime" @click="notime" v-if="istime"></view>
		<view class="uselist">
		  <view class="useitem">
		  <!-- 名称 -->
		    <view class="usenames">
		      <view class="mastname">
		        <text>{{homeinfo.hall_name}}</text>
		        <text>({{homeinfo.hid}})</text>
		      </view>
		      <view class="status">
		        <text class="has" v-if="homeinfo.type==2">已预约</text>
		        <text class="playing" v-if="homeinfo.type==0||homeinfo.type==1">进行中</text>
		        <van-icon name="arrow"  v-if="homeinfo.type!=3"/>
		      </view>
		    </view>
		    <!-- 地址 -->
		    <view class="other">
		    <van-icon name="location-o" />
		    <text>地址：{{homeinfo.hall_address}}</text>
		    </view>
		    <!-- 时间 -->
		    <view class="other">
		    <van-icon name="underway-o" />
		    <text>{{homeinfo.day}} {{homeinfo.one_time}}-{{homeinfo.end_time}}</text>
		    </view>
		  </view>
		  <!-- 控制 -->
		  <view class="btnlist" v-if="homeinfo.type==0||homeinfo.type==1">
		    <view class="over" @click.top="ending()">结束使用</view>
		  </view>
		</view>
		<view class="animate">
			<view class="lock" v-if="status == 'lock'" @click="start()">
				<!-- 开锁 -->
				<image class="circle" :src="locking"></image>
				<view class="center">
					<image class="icons" :src="icon1"></image>
					<view class="locktext">点击开锁</view>
				</view>
			</view>
			<view class="lock locking" v-if="status == 'locking'">
				<!-- 正在开锁 -->
				<image :src="point" class="point"></image>
				<image class="circle" :src="locking"></image>
				<view class="center">
					<image class="icons" :src="icon2"></image>
					<view class="locktext">正在开锁</view>
				</view>
			</view>
			<view class="lock locked" v-if="status == 'locked'" @click="ending()">
				<!-- 关锁 -->
				<image class="circle" :src="lockeded"></image>
				<view class="center">
					<image class="icons" :src="icon3"></image>
					<view class="locktext">一键关闭</view>
				</view>
			</view>
			<view class="lock closeing" v-if="status == 'closeing'">
				<!-- 正在关锁 -->
				<image :src="point1" class="point"></image>
				<image class="circle" :src="lockeded"></image>
				<view class="center">
					<image class="icons" :src="icon4"></image>
					<view class="locktext">正在关锁</view>
				</view>
			</view>
		</view>
		<view class="" >
			<my-controlBox ref="device" :mstid="mstid"></my-controlBox>
		</view>
	</view>
</template>

<script>
	import {appointList,endAppoint} from '@/setting/request/api'
	import base_url from '@/setting/request/config.js'
	import { oneKey,getHomeDevicesList } from '@/setting/common/controls.js' 
	import { stamps } from '@/setting/common/index.js' 
	let that;
	export default {
		data(){
			return{
				lists:[""],
				lockStatus:"lock",
				mstid:"",
				homeinfo:{},
				timeStamp:"",
				lockeded:base_url+"zyfxminiicon/lockeded.png",
				locking:base_url+"zyfxminiicon/locking.png",
				point:base_url+"zyfxminiicon/point.png",
				point1:base_url+"zyfxminiicon/point1.png",
				
				icon1:base_url+"zyfxminiicon/lock1.png",
				icon2:base_url+"zyfxminiicon/locked.png",
				icon3:base_url+"zyfxminiicon/locked1.png",
				icon4:base_url+"zyfxminiicon/locked11.png",
				locktext:"正在开锁",
				status:'lock',
				deviceList:[],
				startTime:"",
				endTime:"",
				nowTime:"",
				istime:false,
			}
		},
		async onLoad({item}) {
			that = this;
			that.nowTime = stamps()
			that.homeinfo = JSON.parse(item);
			that.mstid = that.homeinfo.home_id;
			that.startTime = new Date(that.homeinfo.day+' '+that.homeinfo.one_time).getTime();
			that.endTime = new Date(that.homeinfo.day+' '+that.homeinfo.end_time).getTime();
		},
		async onShow() {
			that.getAnimate();
			if(that.nowTime >= that.startTime && that.nowTime<=that.endTime){
				that.istime = false;
			}
		},
		methods:{
			// 判断是显示动画样式
			async getAnimate(){
				if(uni.getStorageSync("open")){
					that.status = 'locked'
				}else{
					if(that.nowTime >= that.startTime && that.nowTime<=that.endTime){
						const res = await that.deviceLists();
						if(res){
							// 使用中
							that.status = 'locked'
						}else{
							that.status = 'lock'
						}
						that.istime = false;
					}else{
						that.istime = true;
					}
				}
			},
			// 一键开锁
			start(){
				that.controlLock('open')
			},
			async controlLock(type){
				that.status = type == 'open'?'locking':'closeing';
				const succ = await oneKey(that.mstid,type);
				if(succ){
					that.status = type == 'open'?'locked':'lock';
					that.getAnimate();
					that.$refs.device.getHomeDevices(that.mstid);
				}
			},
			notime(){
				uni.showToast({
					title:"未到预约时间",
					icon:"none"
				})
			},
			async deviceLists(){
				const arr = await getHomeDevicesList(that.mstid);
				let truth = false;
				for(let i in arr){
					if(arr[i].deviceName == "门锁"){
						if(arr[i].status.value){
							truth = true;
						}else{
							truth = false;
						}
					}
				}
				return truth
			},
			getinfos(){
				appointList({
					uid:app.globalData.userinfo.uid
				}).then(res => {
					if(that.page == 1){
						if(res.data.pagedata.length>0){
							that.lists = res.data.pagedata
							that.loadingStatus = 'finish'
						} else{
							that.lists = []
							that.loadingStatus = 'null'
						}
					}else{
						if(res.pagedata.length>0){
							that.lists = that.lists.concat(res.data.pagedata)
						}else{
							that.lists = that.data.lists
						}
						that.loadingStatus = 'finish'
					}
					that.totalPage = res.data.total
				})
			},
			// 关闭设备修改状态
			closeDev(){
				that.controlLock('close')
				endAppoint({
					order_id:that.homeinfo.order_id,
					ending:1
				}).then(res => {
					if(res.data.info){
						uni.navigateBack()
					}else{
						uni.showToast({
							title:res.messae,
							icon:"none"
						})
					}
				})
			},
			// 结束使用
			ending(){
				if(that.nowTime<that.endTime){
					uni.showModal({
						content:"未到结束时间，确认结束吗？",
						title:"结束使用",
						showCancel:true,
						success(res) {
							if(res.confirm){
								that.closeDev()
							}
						}
					})
				}else{
					that.closeDev()
				}
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss';
	.uselist{
	  background-color: #ffffff;
	  padding: 15px;
	  border-radius: 4px;
	  margin-bottom: 15px;
	}
	.usenames{
	  display: flex;
	  align-items: flex-start;
	  justify-content: space-between;
	}
	.status{
	  display: flex;
	  align-items: center;
	  font-size: 14px;
	}
	.has{
	  color: #45C08C;
	}
	.playing{
	  color: #38A0FE;
	}
	.finish{
	  color: #FEB749;
	}
	.mastname{
	  display: flex;
	  align-items: center;
	  margin-bottom: 15px;
	}
	.mastname>text:nth-child(1){
	  margin-right: 5px;
	  font-size: 16px;
	  font-weight: bold;
	  color: #333333;
	}
	.mastname>text:nth-child(2){
	  font-size: 14px;
	  color: #999;
	}
	.other{
	  display: flex;
	  align-items: center;
	  color: #999;
	  font-size: 14px;
	  margin-bottom: 8px;
	}
	.btnlist{
	  display: flex;
	  align-items: center;
	  justify-content: flex-end;
	  margin-top: 10px;
	  padding-top: 10px;
	  font-size: 14px;
	  border-top: 1px solid #DEDEDE;
	}
	.cancel{
	  width: 80px;
	  line-height: 30px;
	  color: #45C08C;
	  border: 1px solid #45C08C;
	  text-align: center;
	  margin-right: 10px;
	  border-radius: 2px;
	}
	.over{
	  width: 80px;
	  line-height: 30px;
	  color: #fff;
	  background: #FB6A6A;
	  text-align: center;
	  margin-right: 10px;
	  border-radius: 2px;
	
	}
	.notime{
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 1000;
		top: 0;
		left: 0;
	}
</style>