let app = getApp();
let that;
import base_url from '@/setting/request/config.js'
export default {
	data(){
		return {
			auth:app.globalData.userinfo.auth,
			hasPhone:false,
			hasUser:false,
			uselog:base_url+"zyfxminiicon/uselog.png",
			bg:base_url+"zyfxminiicon/bg.png",
			icon:base_url+"zyfxminiicon/icon.png",
			lights:base_url+"zyfxminiicon/lights.png",
			userpic:uni.getStorageSync("userpic"),
			usernickName:uni.getStorageSync("usernickName")
		}
	},
	onLoad(){
		that = this;
	},
	onShow() {
		that.userpic = uni.getStorageSync("userpic");
		that.usernickName = uni.getStorageSync("usernickName");
	},
	methods:{
		gomess(){
		  app.signed('/pages/infomession/infomession')
		},
		goLog(){
		  app.signed('/pages/user/uselog/uselog')
		},
		goAdmin(){
		  app.signed('/pages/admin/index/index')
		},
	}
}