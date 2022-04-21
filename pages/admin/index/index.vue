<template>
	<view class="containers">
	  <view class="searcherbar"  @click="goSearch">
		  <u-icon name="search" color="#666" size="25"></u-icon>
		  <view style="flex: 1;font-size: 14px;color: #666;margin-left: 5px;">
		  	<text>搜索学校</text>
		  </view>
	  </view>
	  <!-- 统计 -->
	  <view class="counts">
	    <view class="icons">
	      <image :src="datas" mode=""></image>
	    </view>
	    <view class="datas">
	      <view>
	        <view>学校</view>
	        <view><text>{{schoolCount}}</text>所</view>
	      </view>
	      <view>
	        <view>面试厅</view>
	        <view><text>{{mstCount}}</text>个</view>
	      </view>
	    </view>
	  </view>
	  
	  <!-- 学校列表 -->
	  <view class="school_list">
	    <view class="school_item" 
	    v-for="item in schoolList" 
	      @click="goSchool(item)" >
	      <image :src="schoolIcon"></image>
	      <view>{{item.name}}</view>
	      <view><u-icon name="arrow-right" /></view>
	    </view>
	  </view>
	  <my-loading :status="loadingStatus"></my-loading>
	</view>
</template>
<script>
	import Index from './index.js'
	export default {
		mixins:[Index]
	}
</script>

<style lang="scss">
	@import './index.scss';
</style>