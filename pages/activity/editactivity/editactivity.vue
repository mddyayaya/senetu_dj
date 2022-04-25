<template>
	<view class="wrapper">
		<u-toast ref='uToast'></u-toast>
		<view class="main_body">
			<view class="xdth">
				<uni-easyinput  
					style="height: 400rpx !important;"
					:inputBorder="false"
					type="textarea"
					v-model="formData.experience" 
					placeholder="请输入您的心得体会…" />
			</view>
			<view class="upload">
				<u-upload 
				:auto-upload="true"
				ref="uUpload"
				:file-list="fileList"
				@on-remove="removeImg"
				:multiple="true"
				@on-success="uploadSuccess" :action="action" :max-count='9'></u-upload>
			</view>
			<view class="upload_btn">
				<view class="uploads uploads_xd" hover-class="uploads_xds" @click="submit">保存</view>
				<view class="uploads cancel_xd" hover-class="hoverclass" @click="back">取消</view>
			</view>
		</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import config_url from '@/request/config.js'
	import { activity } from '@/request/api.js'
	export default {
		data() {
			return {
				action: config_url+'?c=api_new&m=uploadImg',
				fileList: [],
				formData:{
					flag:"",
					uid:"",
					hyid:"",
					experience:"",
					img:[]
				}
			}
		},
		onLoad(options) {
			this.$store.dispatch("checkXw");
			this.$store.dispatch("appLogin");
			this.formData.flag = options.flag;
			this.formData.hyid = options.hyid;
			this.formData.uid = this.$store.state.uid;
		},
		mounted() {
			this.getxde();
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
			// 提交心得
			submit(){
				var that = this;
				if(that.formData.experience != ''){
					if(that.formData.img.length!=0){
						that.formData.img = that.formData.img.toString();
					}
					activity.experience(that.formData).then(res => {
						if(res.data.code == 200) uni.navigateBack()
						else uni.showToast({
							title:res.data.msg,
							icon:"none",
							position:"bottom"
						})
					})
				}else{
					that.$refs.uToast.show({
						title:"请输入您的心得体会"
					})
					return false;
				}
			},
			// 图片上传成功
			uploadSuccess(data, index, lists, name){
				var that = this;
				if(data.code == 200){
					that.formData.img.push(data.data.src)
				}else{
					that.$refs.uToast.show({
						title:"上传失败"
					})
				}
			},
			// 移除图片
			removeImg(index){
				var that = this;
				that.formData.img.splice(index,1)
			},
			// 获取心得体会
			getxde(){
				var that = this;
				activity.getExperience({
					uid:this.$store.state.uid,
					flag:this.formData.flag,
					hyid:this.formData.hyid,
				}).then(res => {
					if(res.data.data.data!=''){
						if(res.data.data.img!=''){
							that.fileList = []
							for(var i in res.data.data.img.split(",")){
								that.fileList.push({
									url:res.data.data.img.split(",")[i]
								})
							}
							that.formData.img = res.data.data.img.split(",")
						}
						that.formData.experience = res.data.data.experience;
					}
				})
			},
			back(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.xdth{
		width: 100%;
		margin-bottom: 26rpx;
	}
	.upload_btn{
		position: fixed;
		width: 94%;
		bottom: 200rpx;
		padding: 3% 3%;
		display: flex;
		justify-content: center;
		.uploads{
			width: 336rpx;
			height: 76rpx;
			text-align: center;
			line-height: 76rpx;
			font-size: 28rpx;
			border-radius: 60rpx;
		}
		.uploads_xd{
			color: #fff;
			background: linear-gradient(180deg, #B4091C 0%, #DB153C 100%);
			border-radius: 30px;
		}
		.uploads_xds{
			color: #fff;
			background: linear-gradient(180deg, #DB153C 0%, #B4091C 100%);
			border-radius: 30px;
		}
		.cancel_xd{
			margin-left: 22rpx;
			border: 1px solid #B4091C;
			color: #B4091C;
		}
	}
</style>
