<template>
	<view class="loading">
		<view class="" v-if="statuss == 'loading'">努力加载中</view>
		<view class="" v-if="statuss == 'finish'">已加载全部</view>
		<view class="finish" v-if="statuss=='null'">
			<image :src="nullImage" mode="widthFix"></image>
			<view class="">暂无数据</view>
		</view>
	</view>
</template>

<script>
	import base_url from '@/setting/request/config.js'
	export default {
		data() {
			return {
				nullImage:base_url+'zyfxminiicon/nodatas.png',
				statuss:""
			}
		},
		props:{
			status:{
			  type:String,
			  value:"finish"
			}
		},
		watch:{
			status: {
				immediate: true,
				handler (value) {
					if(value){
						console.log(value)
						this.statuss = value;
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss';
</style>
