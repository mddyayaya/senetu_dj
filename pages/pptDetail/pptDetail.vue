<template>
	<view class="wrapper">
		<u-toast ref="uToast"></u-toast>
		<web-view :src="playurl" class="play_area"></web-view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import { zhaunti } from '@/request/api.js'
	export default {
		data() {
			return {
				playurl:'',
				playId:'',
				cid:"",
				studyTime:0
			}
		},
		onLoad(options) {
			var that = this;
			that.playId = options.id;
			that.cid = options.cid;
			that.studyTime = new Date().getTime();
			that.$store.dispatch("checkXw");
			that.$store.dispatch("appLogin");
			that.datalist()
		},
		onUnload() {
			var that = this;
			var now = new Date().getTime() - this.studyTime
			that.studyTime = parseInt(now / 1000);
			zhaunti.studyLog({
				id:that.playId,
				uid:that.$store.state.uid,
				cid:that.cid,
				bsid:1,
				time:that.studyTime
			}).then(res => {
				
			})
		},
		//分享配置
		onShareAppMessage(res) {
			var that = this;
			return{
				title: "新时代党建",
				path: "pages/index/index",
				imageUrl: getApp().globalData.shareImg,
				success(res){
					uni.showToast({
						title:'分享成功'
					})
				},
				fail(res){
					that.$refs.uToast.show({
						title:"分享失败"
					})
				}
			}
		},
		methods: {
			// 数据列表
			datalist(){
				var that = this;
				zhaunti.resouceDetail({
					id:that.playId,
					uid:that.$store.state.uid,
					cid:that.cid,
					bsid:1
				}).then(res => {
					that.playurl = res.data.data.ment_url;
				})
			},
		}
	}
</script>

<style>
	.play_area{
		width: 100%;
		flex: 1;
	}
</style>
