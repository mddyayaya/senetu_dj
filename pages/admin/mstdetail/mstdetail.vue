<template>
	<view class="container">
	  <view class="tabswrap">
	    <view class="tabs">
	      <view class="tabs_item"
		   :class="{selectBar:select == 1}"
		   @click="changeTbas(1)">面试厅详细</view>
	      <view class="tabs_item"
		   :class="{selectBar:select == 2}" @click="changeTbas(2)">预约信息</view>
	    </view>
	  </view>
	  <view class="mstinfo" v-if="select==1">
	    <view class="mstinfoitem">
	      <view>面试厅名称</view>
	      <view @click="editName = true" class="righsicon">
	        <text>{{mstname}}</text>
	        <u-icon name="arrow-right" />
	      </view>
	    </view>
	    <view class="mstinfoitem">
	      <view>面试厅ID</view>
	      <view>
	        <text>{{mstid}}</text>
	      </view>
	    </view>
	    <view class="mstinfoitem">
	      <view>开放时间</view>
	      <view @click="openTimes = true" class="righsicon">
			<picker mode="multiSelector" range-key="time" :range="columnTimes" @change="confirmTimes">
				<view>{{times}}</view>
			</picker>
	        <u-icon name="arrow-right" />
	      </view>
	    </view>
	  </view>
	  <view  v-if="select==1">
	    <my-controlBox :mstid="mstid" endTime="" startTime=""></my-controlBox>
	  </view>
	
	  <view class="userwrap" v-else>
	    <view class="yuyueinfo">
	      <view class="number">预约人数：{{apointNum}}</view>
	      <view class="selectDay">
			  <view class="" @click="showDaySelect = true">{{dayName}}</view>
			<u-action-sheet 
				 :actions="dayList" 
				 title="选择时间" 
				 @select="selectDays"
				 @close="showDaySelect = false;day=''"
				 safeAreaInsetBottom
				 :show="showDaySelect"></u-action-sheet>
	      </view>
	    </view>
	    <view class="users" v-for="item in apointList">
	      <image class="userpic" :src="'http://zyfx.5cy.com/statics/userimg/'+item.gu_pic" v-if="item.gu_pic"></image>
	      <image class="userpic" v-else :src="moricon"></image>
	      <view class="usersinfo">
	        <view class="username">{{item.gu_name?item.gu_name:'微信用户'}}</view>
	        <view class="userother">
	          <u-icon name="clock" />
	          <text>{{item.day}} {{item.one_time}}-{{item.end_time}}</text>
	        </view>
	        <view class="userother">
	          <u-icon name="home" />
	          <text>{{item.hall_name}}</text>
	        </view>
	        <view class="userother">
	          <u-icon name="map" />
	          <text>{{item.hall_address}}</text>
	        </view>
	      </view>
	    </view>
		<my-loading v-if="select==2" :status="loadingStatus"></my-loading>
	  </view>
	
	  <!-- 编辑面试屋名称 -->
	  <u-popup 
	    closeOnClickOverlay
		:show="editName" :round="10" mode="bottom" 
		@close="editName = false" 
		@open="editName = true">
	    <view class="controls">
	      <input type="text" v-model="mstname" placeholder="请输入面试厅名称"/>
	      <view class="submit" @click="editMstName">完成</view>
	    </view>
	  </u-popup>
	</view>
</template>

<script>
	import {
		orderList,
		mstDetail ,
		updateHallName,
		setOpenTime
	} from '@/setting/request/api'
	import { editHome,memberAuthority } from '@/setting/request/toyahomeapi'
	import { addUser } from '@/setting/request/toyapi'
	import {now,tom} from '@/setting/common/index.js'
	import base_url from '@/setting/request/config.js'
	
	let that;
	
	export default{
		data(){
			return{
				hid:"",
				mstname:"智能面试屋",
				mstid:"",
				mstadd:"",
				showDaySelect:false,
				sid:"",
				select:1,//选中第一个
				editName:false,
				apointNum:0,
				moricon:base_url+"zyfxminiicon/user_pic.png",
				selectTimes:false,
				openTimes:false,
				columnTimes:[],
				times:"",
				time1:"",
				time2:"",
				filter(type, options) {
					if (type === 'minute') {
						return options.filter((option) => option % 30 === 0);
					}
					return options;
				},
				voiceControl:[],
				day:now(),
				dayName:"今天",
				dayList: [
					{name:'今天',value:now()},
					{name:'明天',value:tom()}
				],
				selectDay:"",
				apointList:[],
				loadingStatus:'loading',
				page:1,
				totalPage:0,
			}
		},
		async onLoad({hid,mstname,mstid,mstadd,sid,opentime}) {
			that = this;
			that.hid = hid;
			that.mstname = mstname;
			that.mstid = mstid;
			that.mstadd = mstadd;
			that.sid = sid;
			that.times = opentime;
		},
		onShow(){
			that.timelist();
		},
		methods:{
			// 修改面试亭名称
			async editMstName(){
				if(that.mstname != ""){
					let edit = {
						home_id:that.mstid,
						geo_name:that.mstadd,
						name:that.mstname,
						lat:0,
						lon:0
					}
					const res = await editHome(edit);
					if(res.success){
						updateHallName({
							id:that.hid,
							name:that.mstname
						}).then(res => {
							that.editName = false;
						})
					}
					updateHallName({
						id:that.hid,
						name:that.mstname
					}).then(res => {
						that.editName = false;
						that.mstname = that.mstname;
					})
				}else{
					uni.showToast({
						title: '名称不能为空',
						icon:"none"
					})
				}
			},
			// 修改使用时间段
			confirmTimes(value){
				let startIndex = value.detail.value[0];
				let endIndex = value.detail.value[1];
				if(endIndex<startIndex){
					uni.showToast({
						title:"起始时间必须大于结束时间",
						icon:"none"
					})
				}else if(startIndex==endIndex){
					uni.showToast({
						title:"起始时间和结束时间不能一样",
						icon:"none"
					})
				}else{
					that.times = that.columnTimes[0][startIndex].time+'-'+that.columnTimes[1][endIndex].time;
					that.time1 = that.columnTimes[0][startIndex].id;
					that.time2 = that.columnTimes[1][endIndex].id;
					setOpenTime({
						school_id:that.sid,
						time1:that.time1,
						time2:that.time2
					}).then(res => {
						that.openTimes = false;
					})
				}
			},
			// 面试亭预约列表
			orderLists(){
				orderList({
					hid:that.hid,
					page:that.page,
					day:that.day
				}).then(res => {
					if(that.page == 1){
						if(res.data.pagedata.length > 0){
							that.apointList = res.data.pagedata
							that.loadingStatus = "finish"
						}else{
							that.apointList = []
							that.loadingStatus = "null"
						}
					}else{
						if(res.data.pagedata.length > 0){
							that.apointList = that.apointList.concat(res.data.pagedata)
							that.loadingStatus = "finish"
						}else{
							that.apointList = that.apointList
							that.loadingStatus = "finish"
						}
					}
					that.apointNum = res.data.count
					that.totalPage = res.data.total
				})
			},
			// 改变顶部选项卡
			changeTbas(index){
				that.select = index;
				that.page = 1;
				that.day = now();
				that.dayName = "今天"
				that.apointList = [];
				if(that.select1=1){
					that.orderLists();
				}
			},
			selectDays(value){
				that.day = value.value
				that.dayName = value.name
				that.page=1;
				that.apointList = [];
				that.orderLists();
			},
			// 时间列表
			timelist(){
				mstDetail({
					hid:that.hid
				}).then(res => {
					that.columnTimes = [res.data["day"],res.data["day"]]
				})
			},
		},
		
		onReachBottom() {
			that.page = that.page+1;
			if(that.page>that.totalPage){
				that.page = that.totalPage;
				that.loadingStatus = 'finish';
			}else{
				that.getSchool();
			}
		},
	}
	
</script>

<style lang="scss">
	/* pages/admin/mstdetail/mstdetail.wxss */
	.mstinfo{
	  background-color: #ffffff;
	  margin-top: 60px;
	  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.16);
	  padding: 20px;
	  font-size: 14px;
	  border-radius: 8px;
	}
	.mstinfoitem{
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  line-height: 26px;
	  color: #333333;
	  font-size: 14px;
	}
	
	.userwrap{
	  padding-top: 70px;
	  padding-bottom: 20px;
	}
	.users{
	  background-color: #ffffff;
	  margin-top: 10px;
	  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.16);
	  padding: 20px;
	  font-size: 14px;
	  border-radius: 8px;
	  display: flex;
	  align-items: flex-start;
	  justify-content: space-between;
	}
	.userpic{
	  width: 60px;
	  height: 60px;
	  border-radius: 50%;
	  margin-right: 10px;
	}
	.usersinfo{
	  flex: 1;
	  font-size: 14px;
	  color: #333333;
	  line-height: 28px;
	}
	.userother{
	  display: flex;
	  align-items: center;
	}
	.userother>text{
	  margin-left: 5px;
	}
	.tabswrap{
	  z-index: 10;
	  width: 100%;
	  position: fixed;
	  top: 0;
	  left: 0;
	  background-color: #ffffff;
	}
	.tabs{
	  margin: 25rpx 30rpx;
	  border: 1px solid #38A0FE;
	  display: flex;
	  justify-content: space-between;
	  background-color: #ffffff;
	}
	.tabs_item{
	  height: 30px;
	  line-height: 30px;
	  font-size: 14px;
	  width: 100%;
	  text-align: center;
	  color: #333333;
	}
	.selectBar{
	  background-color: #38A0FE !important;
	  color: #ffffff;
	}
	.controls{
	  padding: 20px 0;
	}
	.controls{
	  padding: 70rpx 30rpx 0 30rpx;
	
	}
	.controls>input{
	  border: 1px solid #ededed;
	  padding: 0 10px;
	  height: 30px;
	  line-height: 30px;
	  font-size: 14px;
	  color: #333333;
	}
	.submit{
	  color: #ffffff;
	  font-size: 14px;
	  background-color: #38A0FE;
	  text-align: center;
	  height: 30px;
	  line-height: 30px;
	  width: 100px;
	  margin:20px auto 0 auto;
	  border-radius: 8px;
	}
	.cont{
	  display: flex;
	  justify-content: space-between;
	}
	.cont>view{
	  width: 48%;
	  text-align: center;
	  font-size: 14px;
	  color: #333333;
	}
	.cont input{
	  margin-top: 10px;
	  border: 1px solid #ededed;
	  font-size: 14px;
	  padding: 0 10px;
	  line-height: 30px;
	  height: 30px;
	  text-align: left;
	}
	.yuyueinfo{
	  position: fixed;
	  left: 0;
	  right: 0;
	  padding: 0 30px;
	  height: 30px;
	  background-color:rgb(246,246,246) !important;
	  z-index: 10;
	  top: 55px;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  color: #333333;
	  font-size: 14px;
	}
	.selectDay{
	  background-color: none;
	}
	.van-dropdown-menu {
	  background-color:rgb(246,246,246) !important;
	 box-shadow: none !important;
	 height: 30px !important;
	}
	.righsicon{
		display: flex;
		align-items: center;
	}
</style>