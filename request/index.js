import config_url from './config.js'
const qs = require("../common/qs.js");

//请求封装
export const requests = (url,data,method) => {
	return new Promise((resolve,reject) => {
		// uni.showToast({
		// 	title:"加载中...",
		// 	icon:"loading",
		// 	mask:false
		// })
		let authtoken = uni.getStorageSync("authtoken");
		if(method == "GET"){
			data.t = new Date().getTime();
		}else{
			data = qs.stringify(data)
		}
		uni.request({
			url:config_url+url,
			data:data,
			method:method,
			header:{
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			dataType:'json',
			success:res => {
				if(res.data.code == 200 || res.data.code == -1 || res.data.code == -2 || res.data.status == 200){
					uni.hideToast()
					resolve(res)
				}else{
					uni.showToast({
						title:"请求失败",
						icon:"none",
						position:"bottom"
					})
				}
			},
			fail:error => {
				uni.hideToast()
				uni.showToast({
					title:"请求失败",
					icon:"none",
					position:"bottom"
				})
			}
		})
	})
}
