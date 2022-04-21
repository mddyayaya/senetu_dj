<script>
	let that;
	import {getInfos} from '@/setting/request/api.js'
	export default {
		onLaunch: async function() {
			that = this;
			wx.cloud.init();
			const res = await that.getUserinfo();
		},
		onShow: function() {
			that.getUserinfo()
		},
		onHide: function() {
		},
		methods:{
			// 获取用户信息
		  	getUserinfo(){
				return new Promise((resolve,reject) => {
					if(uni.getStorageSync("user_id")){
						getInfos({
							uid:uni.getStorageSync("user_id")
						}).then(res => {
							that.globalData.userinfo.uid = res.data.gu_id;
							that.globalData.userinfo.sid = res.data.s_id;
							that.globalData.userinfo.phone = res.data.gu_phone;
							that.globalData.userinfo.auth = res.data.auth;
							uni.setStorageSync("usernickName",res.data.gu_name)
							if(res.data.s_id == null){
								uni.showModal({
									title:"完善信息",
									content:"完善信息，查看更多设备",
									showCancel:false,
									success(res) {
										if (res.confirm) {
											uni.navigateTo({
												url:"/pages/infomession/infomession"
											})
										} else if (res.cancel) {
											
										}
									}
								})
							}
							resolve(true)
						})
					}else{
						resolve(false)
					}
				})
			},
			// 先判断授权后进行操作
			signed(url){
				if(uni.getStorageSync("user_id")){
					uni.navigateTo({
						url:url
					})
				}else{
					uni.navigateTo({
						url:'/pages/getPermission/getPermission'
					})
				}
			},
		},
		globalData:{
			userinfo:{
				sid:"",
				uid:"",
				phone:"",
				auth:""
			}
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	page{
		width: 100%;
		height: 100%;
		background: #f6f6f6;
		box-sizing: border-box;
	}
	.container {
	  width: 100%;
	  height: 100%;
	  padding: 25rpx 30rpx;
	} 
	view{
	  box-sizing: border-box;
	}
	.userpic{
	  margin-right: 10px;
	  width: 186rpx;
	  height: 186rpx;
	  border-radius: 50%;
	  overflow: hidden;
	}
</style>
