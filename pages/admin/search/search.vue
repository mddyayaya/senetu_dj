<template>
	<view class="container">
	  <view class="searchWrap">
		<van-icon name="search" size="20" color="#666"/>
		<input placeholder="请输入学校名称" v-model="keys" @input="seach"/>
	  </view>
	  <view class="searchCont">
		<view class="searchItem" v-for="item in seachList"
		  @click="goShool(item)"
		>{{item.name}}</view>
		<my-loading :status="loadingStatus"></my-loading>
	  </view>
	</view>
</template>


<script>
	import {getSchoolList } from '@/setting/request/api'
	let that;
	export default{
		data(){
			return{
				seachList:[],
				loadingStatus:"loading",
				totalPage:0,
				page:1,
				keys:"",
				type:"search"
			}
		},
		onLoad: function ({type}) {
			that = this;
			that.type = type
			that.getdata()
		},
		methods:{
			seach(){
				that.seachList = []
				that.loadingStatus = 'loading'
				that.page = 1
				that.getdata();
			},
			getdata(){
				getSchoolList({
					keys:that.keys,
					page:that.page
				}).then(res => {
					if(that.page == 1){
						if(res.data.pagedata.length > 0){
							that.seachList = res.data.pagedata
							that.loadingStatus = "finish"
						}else{
							that.seachList = []
							that.loadingStatus = "null"
						}
					}else{
						if(res.data.pagedata.length > 0){
							that.seachList = that.seachList.concat(res.data.pagedata)
							that.loadingStatus = "finish"
						}else{
							that.seachList = that.seachList
							that.loadingStatus = "finish"
						}
					}
					that.totalPage = res.data.total
				})
			},
			goShool(item){
				if(that.type == "search"){
					uni.navigateTo({
						url: '/pages/admin/school/school?schoolid='+item.school_id+'&schoolname='+item.name+'&sid='+item.id,
					})
				}else{
					let pages = getCurrentPages();
					let prePage = pages[pages.length - 2];
					prePage.$vm.schoolName = item.name;
					prePage.$vm.schoolid = item.id;
					uni.navigateBack({
						delta:1
					})
				}
			},
		},
		onReachBottom() {
			that.page = that.page+1
			that.loadingStatus = 'loading'
			if(that.page>that.totalPage){
				that.page = that.totalPage
				that.loadingStatus = 'finish'
			}else{
				that.getdata();
			}
		},
	}
</script>

<style lang="scss">
	@import './search.scss';
</style>