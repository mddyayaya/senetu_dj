<template>
	<view class="wrapper">
		<view class="myOrange">
			<view 
				v-if="type=='selectMember'" 
				@click="checkAllData" 
				:class="{checked:checkAll}" class="checkBox">
				<u-icon name="checkmark" v-if="checkAll" color="#fff" ></u-icon>
			</view>
			<view class="organ_pic"><image :src="morenzb" mode=""></image></view>
			<view class="organ_name">中国民航大学党支部</view>
		</view>
		<u-index-list
			active-color="#DE1C42"
			:scrollTop="scrollTop">
			<view v-for="(item, index) in indexList" :key="index">
				<u-index-anchor :index="item.indexs" />
				<view class="myOrange" v-for="(items,indexs) in  item.options">
					<view class="list-cell">
						<view class="checkBox" @click="checkone(index,indexs)" :class="{checked:items.checked}" v-if="type=='selectMember'">
							<u-icon v-if="items.checked" name="checkmark" color="#fff" ></u-icon>
						</view>
						<view class="organ_pic"><image :src="morenzb" mode=""></image></view>
						<view class="organ_name">张大大</view>
						<view v-if="type!='selectMember'"><u-icon color="#999" size="40" name="edit-pen"></u-icon></view>
					</view>
				</view>
			</view>
		</u-index-list>
		<view class="addbtn" v-if="type!='selectMember'">
			<view class="circle_item">
				<view>
					添加<br>成员
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config_url from '@/request/config.js'
	export default {
		data() {
			return {
				morenzb:config_url+"statics/xcx_new/morenzb.png",
				indexList: [
					{indexs:"A",options:[
						{name:"张大仙",checked:false},
						{name:"张大仙",checked:false},
					]},
					{indexs:"B",options:[
						{name:"张大仙",checked:false},
						{name:"张大仙",checked:false},
					]},
					{indexs:"C",options:[
						{name:"张大仙",checked:false},
						{name:"张大仙",checked:false},
					]},
					{indexs:"D",options:[
						{name:"张大仙",checked:false},
						{name:"张大仙",checked:false},
					]},
					{indexs:"E",options:[
						{name:"张大仙",checked:false},
						{name:"张大仙",checked:false},
					]},
					{indexs:"F",options:[
						{name:"张大仙",checked:false},
						{name:"张大仙",checked:false},
					]},
					{indexs:"G",options:[
						{name:"张大仙",checked:false},
						{name:"张大仙",checked:false},
					]},
				],
				scrollTop: 0,
				type:"selectMember",
				checkAll:false,
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			// 全选
			checkAllData(){
				var that = this;
				that.checkAll = !that.checkAll;
				that.indexList.forEach(item => {
					item.options.forEach(items => {
						if(that.checkAll){
							items.checked = true
						}else{
							items.checked = false
						}
					})
				})
			},
			// 判断是否全选
			checkAllSelect(){
				var that = this,arr1 = [],arr = [];
				that.indexList.forEach(item => {
					item.options.forEach(items => {
						if(items.checked)
						arr1.push(items)
					})
				})
				that.indexList.forEach(item => {
					item.options.forEach(items => {
						arr.push(items)
					})
				})
				if(arr1.length == arr.length){
					that.checkAll = true;
				}else{
					that.checkAll = false;
				}
			},
			//单选
			checkone(index,indexs){
				var that = this;
				that.indexList[index].options[indexs].checked = !that.indexList[index].options[indexs].checked; 
				that.checkAllSelect()
			}
		}
	}
</script>

<style lang="scss">
	.myOrange{
		height: 128rpx;
		width: 100%;
		padding: 0 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.organ_pic{
			height: 80rpx;
			width: 80rpx;
			margin-right: 16rpx;
			border-radius: 50%;
			image{
				background: #EDEDED;
				width: 100%;
				height: 100%;
				border-radius: inherit;
			}
		}
		.organ_name{
			flex: 1;
			margin-right: 10rpx;
			color: #333333;
			font-size: 28rpx;
			font-weight: bold;
		}
	}
	.list-cell{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 2rpx solid #EDEDED;
		.organ_pic{
			height: 80rpx;
			width: 80rpx;
			margin-right: 16rpx;
			border-radius: 50%;
			image{
				background: #EDEDED;
				width: 100%;
				height: 100%;
				border-radius: inherit;
			}
		}
		.organ_name{
			flex: 1;
			margin-right: 10rpx;
			color: #333333;
			font-size: 28rpx;
			font-weight: 400 !important;
		}
	}
	.checkBox{
		width: 40rpx;
		height: 40rpx;
		margin-right: 15rpx;
		border: 2rpx solid #EDEDED;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.addbtn{
		position: fixed;
		bottom: 200rpx;
		right: 60rpx;
		height: 104rpx;
		width: 104rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(180deg, #D71127 0%, #DE1C42 100%);
		border-radius: 50%;
		.circle_item{
			width: 92rpx;
			height: 92rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: bold;
			background: linear-gradient(180deg, #970515 0%, #DB153C 100%);			border-radius: 50%;
			color: #fff;
			font-size: 26rpx;
		}
	}
	.checked{
		background: #CE2741;
		border: none !important;
	}
</style>
