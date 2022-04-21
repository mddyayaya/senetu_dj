<template>
	<view class="container">
		<view class="formData">
			<view class="form_item">
				<view>面试厅名称</view>
				<view>{{getdata.mstname}}</view>
			</view>
			<view class="form_item">
				<view>地址</view>
				<view>{{getdata.mstaddress}}</view>
			</view>
			<view class="form_item">
				<view>日期</view>
				<view class="days_list">
					<view @click="selectDays(1)" 
					:class="{selectDay:selectDay == 1}">今天</view>
					<view @click="selectDays(2)" 
					:class="{selectDay:selectDay == 2}">明天</view>
				</view>
			</view>
			<view class="form_item">
				<view>预约时间</view>
				<view class="needCenter">
					<picker mode="selector" range-key="time" value="id" :range="selectDay==1?today:tom" @change="sureTime">
						<view>{{selectTime}}</view>
					</picker>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="form_item">
				<view>时长</view>
				<view class="needCenter">
					<picker mode="selector" range-key="text" value="id" :range="selecTimesList" @change="sureTimes">
						<view>{{selectTimes}}</view>
					</picker>
				<u-icon name="arrow-right"></u-icon></view>
			</view>
		</view>
		<view class="btn" @click="submit">确定</view>
	</view>
</template>

<script>
	import Appoint from './appoint.js'
	export default {
		mixins:[Appoint],
	}
</script>

<style lang="scss">
	@import './appoint.scss';
</style>