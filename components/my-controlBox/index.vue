<template>
	<view>
		<view class="controlsbox" v-if="controlDeviceList.length>0">
		  <view class="box" v-for="item in controlDeviceList">
		    <view class="sbname">{{item.deviceName}}</view>
		    <view class="sbcontrol">
		      <image class="icon" mode="widthFix" :src="item.deviceIcon"></image>
				<view>
					<switch 
					:checked="item.status.value"
					color="#007AFF"  
					@change="controlDevices(item)"/>
				</view>
		    </view>
		  </view>
		</view>
		<my-loading :status="status" v-else></my-loading>
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