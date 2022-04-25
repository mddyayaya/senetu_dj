<template>
	<u-modal v-model="show" :show-cancel-button="true" confirm-text="立即升级"
		title="发现新版本" @cancel="cancel" @confirm="confirm"
	>
		<view class="u-update-content">
			<rich-text :nodes="content"></rich-text>
		</view>
	</u-modal>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				// 传递给uni-app"rich-text"组件的内容，可以使用"<br>"进行换行
				content: `,
					1. 修复badge组件的size参数无效问题<br>
					2. 新增Modal模态框组件<br>
					3. 新增压窗屏组件，可以在APP上以弹窗的形式遮盖导航栏和底部tabbar<br>
					4. 修复键盘组件在微信小程序上遮罩无效的问题
				`,
				updateType:"",
				wgtUrl:""
			}
		},
		onLoad(options) {
			console.log(options)
			this.downLoad = options.wgtUrl;
			this.updateType = options.updateType;
		},
		onReady() {
			this.show = true;
		},
		methods: {
			cancel() {
				this.closeModal();
			},
			confirm() {
				var that = this;
				that.closeModal();
				uni.downloadFile({
				    url: that.wgtUrl,  
				    success: (downloadResult) => {
				        if (downloadResult.statusCode === 200) {  
				            plus.runtime.install(downloadResult.tempFilePath, {  
				                force: false  
				            }, function() {
								if(that.updateType){
									// 全量更新重启应用
									plus.runtime.restart();
								}else{
									// 增量更新不重启  再次打开应用更新
								}
				            }, function(e) {
								uni.showToast({
									title:JSON.stringify(e.message),
									icon:"none",
									position:"bottom",
									duration:3000
								}) 
				            });  
				        }  
				    }  
				});  
			},
			closeModal() {
				uni.navigateBack();
			}
		}
	}
</script>

<style scoped lang="scss">
	.u-full-content {
		background-color: #00C777;
	}
	
	.u-update-content {
		font-size: 26rpx;
		color: $u-content-color;
		line-height: 1.7;
		padding: 30rpx;
	}
</style>