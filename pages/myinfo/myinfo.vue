<template>
	<view class="myinfo">
		<image :src="bg" class="bgs" mode="widthFix"></image>
		<view class="infos">
			<!-- 用户信息 -->
			<view class="userinfo">
					  <image :src="userpic" v-if="userpic" class="userpic" mode=""></image>
			  <open-data class="userpic" v-else type="userAvatarUrl"></open-data>
			  <view class="username" @click="gomess">
			    <view v-if="usernickName">{{usernickName}}</view>	  
			    <view v-else>微信用户</view>	      
					  <u-icon name="arrow-right-double" color="#fff" size="16"></u-icon>
			  </view>
					<u-icon name="account-fill" size='25' color="#fff" v-if="auth == 1" @click="goAdmin"></u-icon>
			</view>
			 <!-- 预约记录 -->
			 <view class="uselog" @click="goLog">
			  <image class="uselogs" :src="uselog" mode="widthFix"></image>
			</view>
			<view class="quickuse">
			  <view class="left">
			    <view>智能面试亭</view>
			    <view>支持线上预约，可快速预约</view>
			  </view>
			  <image class="center" :src="icon" mode="widthFix"></image>
			  <view class="right">
			    <image :src="lights" mode="widthFix"></image>
			    <text>一键预约</text>
			  </view>
			</view>
		</view>
	  </view>
</template>

<script>
	import Info from './myinfo.js'
	
	export default {
		mixins:[Info]
	}
	
</script>
<style lang="scss">
	@import './myinfo.scss';
	
</style>