<template>
	<view>
		<view class="uselist" v-for="(item,index) in lists" @click.native="godetail(item)">
		  <view class="useitem">
		  <!-- 名称 -->
		    <view class="usenames">
		      <view class="mastname">
		        <text>{{item.hall_name}}</text>
		        <text>({{item.hid}})</text>
		      </view>
		      <view class="status">
		        <text class="has" v-if="item.type==2">已预约</text>
		        <text class="playing" v-if="item.type==0||item.type==1">进行中</text>
		        <text class="finish" v-if="item.type==3">已完成</text>
		        <text class="cancel" v-if="item.type==4">已取消</text>
		        <van-icon name="arrow"  v-if="item.type!=3"/>
		      </view>
		    </view>
		    <!-- 地址 -->
		    <view class="other">
		    <van-icon name="location-o" />
		    <text>地址：{{item.hall_address}}</text>
		    </view>
		    <!-- 时间 -->
		    <view class="other">
		    <van-icon name="underway-o" />
		    <text>{{item.day}} {{item.one_time}}-{{item.end_time}}</text>
		    </view>
		  </view>
		  <!-- 控制 -->
		  <view class="btnlist" v-if="item.type!=3">
		    <view class="cancel" v-if="item.type==2" @click.stop="edittime(item)">修改时间</view>
		    <view class="cancel" v-if="item.type==2" @click.stop="show=true;cancels(item)">取消预约</view>
		    <view class="over" v-if="item.type==0||item.type==1" @click.stop="endUse(item)">结束使用</view>
		  </view>
		</view>
	</view>
</template>

<script>
	import AppList from './index.js'
	export default {
		mixins:[AppList]
	}
</script>

<style lang="scss">
	@import './index.scss';
</style>