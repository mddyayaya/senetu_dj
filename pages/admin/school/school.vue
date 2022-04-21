<template>
	<view class="container">
	  <view class="cardwrap">
	    <view class="card">
	      <view class="card_title">学校信息</view>
	      <view class="card_content">
	        <view class="cards_item">
	          <view>院校名称</view>
	          <view>{{schoolname}}</view>
	        </view>
	        <view class="cards_item">
	          <view>院校代码</view>
	          <view>{{schoolid}}</view>
	        </view>
	      </view>
	    </view>
	    <!-- 此处循环 -->
	    <view class="mstlist" v-for="item in mstList" 
	      @click="goDetail(item)">
	      <view class="mstleft">
	        <view class="mst_title">
	         <view>{{item.hall_name}}</view>
	          <view class="status normal" v-if="item.status == 1">正常</view>
	          <view class="status forbide" v-if="item.status == 2">禁用</view>
	          <view class="status perpare" v-if="item.status == 3">待配置</view>
	         </view>
	         <view class="mst_address">
	          <van-icon name="location-o" />
	         <view>地址：{{item.hall_address}}</view>
	        </view>
	      </view>
	      <view class="mstright" @click.stop="goSet(item)" v-if="item.status == 3">点击配置</view>
	      <view class="mstright" @click.stop="goSet(item)" v-if="item.status == 1&&auth == 1">重新配置</view>
	    </view>
		<my-loading :status="loadingStatus"></my-loading>
	  </view>
	
	  <view class="createviewWrap" @click="goAdd">
	    <view class="createview">
	    <van-icon name="add" size="20"/>
	    <text>创建面试厅</text>
	  </view>
	  </view>
	  
	</view>
</template>

<script>
	let that;
	import {setDevice} from '@/setting/request/toyapi'
	import { mstList,setState } from '@/setting/request/api'
	import {getHomeDevicesList} from '@/setting/common/controls.js'
	import {homeDevices} from '@/setting/request/toyahomeapi.js'
	
	export default {
		data(){
			return{
				schoolname:"",
				schoolid:"",
				auth:getApp().globalData.userinfo.auth,
				sid:"",
				mstid:"",
				loadingStatus:'loading',
				mstList:[],
				opentime:""
			}
		},
		onLoad({schoolid,schoolname,sid}) {
			that = this;
			that.schoolid = schoolid
			that.schoolname = schoolname
			that.sid = sid
		},
		onShow() {
			that.schoolMstList();
		},
		methods:{
			goDetail(item){
				if(item.status == 1){
					getApp().signed('/pages/admin/mstdetail/mstdetail?hid='+item.id+'&mstname='+item.hall_name+'&mstid='+item.home_id+'&mstadd='+item.hall_address+'&sid='+that.sid+'&opentime='+that.opentime)
				}else{
					uni.showToast({
						title: '设备禁用或未配置',
						icon:'none'
					})
				}
			},
			goSet(item){
				that.mstid = item.home_id;
				that.hid = item.id;
				setDevice(item.home_id);
			},
			goAdd(){
				getApp().signed('/pages/admin/addmst/addmst?sid='+that.sid)
			},
			// 学校面试亭列表
			schoolMstList(){
				mstList({
					sid:that.sid
				}).then(res => {
					if(res.data.length>0){
						that.mstList = res.data;
						that.opentime = res.time
						that.loadingStatus = "finish"
					}else{
						that.mstList = []
						that.loadingStatus = "null"
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	@import './school.scss';
</style>