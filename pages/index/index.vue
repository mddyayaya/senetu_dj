<template>
	<view class="container">
	  <view class="lists">
		   <view class="lists_item" v-for="item in lists" v-if="item.status==1">
			<view class="item_left">
			  <view class="item_title">
				<text class="title_name">{{item.hall_name}}</text>
				<text class="title_status status_1" 
				v-if="item.type1==1||item.type2==1">可预约</text>
				<text class="title_status status_2" v-if="item.type1!=1&&item.type2!=1">不可预约</text>
			  </view>
			  <view class="item_adress">
				<u-icon name="map" size="20"></u-icon>
				<text class="adress">地址：{{item.hall_address}}</text>
			  </view>
			</view>
			<view class="item_right" v-if="item.type1==1||item.type2==1">
			  <view class="cont_btn" 
			  @click="jumpSet(item)">立即预约</view>
			</view>
			<view class="item_right forbiden" v-if="item.type1!=1&&item.type2!=1">>立即预约</view>
		   </view>
		   <my-loading :status="loadingStatus"></my-loading>
		 <view class="sure" v-if="showBtn" @click.stop="getusers">微信授权</view>
	  </view>
	</view>
</template>

<script>
	import Index from './index.js'
	
	export default {
		mixins:[Index]
	}
</script>

<style lang="scss">
	@import  './index.scss';
</style>