<template>
	<view class="">
		<view class="userwrap">
		  <view class="userpic">
			  <image :src="userpic" mode="" v-if="userpic"></image>
		   <open-data class="userpic" v-else type="userAvatarUrl"></open-data>
		  </view>
		  <view class="otherinfo">
		   <view class="formItem">
		    <text>昵称</text>
		    <input type="text" placeholder="请输入姓名" v-model="usernickName"/>
		   </view>
		   <view class="formItem" >
		    <text>手机号</text>
			<view class="phone">{{phone}}</view>
		   </view>
		   <view class="formItem" @click="selectSchool">
		    <text>学校</text>
		    <view style="display: flex;align-items: center;">
				<input disabled style="text-align: right;" type="text" v-model="schoolName" placeholder="选择学校"/><van-icon name="arrow" />
				<u-icon name="arrow-right"></u-icon>
			</view>
		   </view>
		   <view class="formItem">
		    <text>专业<van-icon name="arrow" /></text>
		    <input type="text" placeholder="请输入专业" v-model="schoolClass"/>
		   </view>
		   <view class="formItem" @click="showEdu = true">
		    <text>学历</text>
		    <view style="display: flex;align-items: center;">
				<picker mode="selector" value="" :range="eduList" @change="confirmEdu">
					<view>{{schoolEdu}}</view>
				</picker>
				<u-icon name="arrow-right"></u-icon>
			</view>
		   </view>
		  </view>
		</view>
		<view style="margin-top: 20px;">
			<view class="sure" @click="submit">保存</view>
		</view>
	</view>
</template>

<script>
	import Info from './infomession.js'
	export default {
		mixins:[Info]
	}
</script>

<style>
	@import './infomession.scss';
</style>