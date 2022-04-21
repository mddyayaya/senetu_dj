<template>
	<view class="container">
	  <view class="add_form">
	    <view class="form_item">
	      <view class="label">面试亭名称</view>
	      <view><input type="text" 
		    v-model="mstname"
			placeholder="请输入面试亭名称"/></view>
	    </view>
	    <view class="form_item">
	      <view class="label">面试亭位置</view>
	      <view><input type="text"
		   v-model="mstaddress"
		   placeholder="请输入面试亭位置"/></view>
	    </view>
	    <view class="submit" @click="submit">确定</view>
	  </view>
	</view>
</template>

<script>
	let that;
	import { addHome } from '@/setting/request/toyahomeapi'
	import { addMst } from '@/setting/request/api'
	export default{
		data(){
			return{
				mstname:"",
				mstaddress:"",
				sid:""
			}
		},
		onLoad({sid}) {
			that = this;
			that.sid = sid
		},
		methods:{
			async submit(){
				if(that.mstname == ""){
					wx.showToast({
						title: '请输入面试亭名称',
						icon:"none"
					})
				}else if(that.mstaddress == ""){
					wx.showToast({
						title: '请输入面试亭地址',
						icon:"none"
					})
				}else{
					let home = {
						name:that.mstname,
						geo_name:that.mstaddress,
						lon:0,
						lat:0
					},rooms = []
					const home_id = await addHome(home,rooms);
					console.log(home_id)
					if(home_id){
						addMst({
							school_id:that.sid,
							hall_name:that.mstname,
							hall_address:that.mstaddress,
							status:3,//待设置
							home_id:home_id
						}).then(res => {
							uni.showToast({
								title: res.data.message,
								icon:"none"
							})
							uni.navigateBack()
						})
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	@import './addmst.scss';
</style>