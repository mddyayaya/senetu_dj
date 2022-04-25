import { shouquan } from "@/request/api.js"
import store from "vuex"

export default {
	// 判断用户是否授权
	checkXw({commit},data){
		// 判断是否授权
		//#ifdef MP-WEIXIN
		uni.login({
			provider: 'weixin',
			success(loginRes) {
				shouquan.getwx({
					code:loginRes.code,
					pid:""
				}).then(res => {
					uni.setStorageSync('openid',res.data.data.openid)
					uni.setStorageSync('session_key',res.data.data.session_key)
					uni.getUserInfo({
						success(res) {
							uni.setStorageSync("avatarUrl",JSON.parse(res.rawData).avatarUrl)
						}
					})
					if(res.data.code == -1){
						// 未授权用户信息
						uni.getSetting({
							success(res) {
								if(res.authSetting["scope.userInfo"]){
									commit('changeAoth',true)
								}else{
									commit('changeAoth',false)
								}
							}
						})
					}else{
						// 已授权用户信息
						commit('changeAoth',true)
						if(res.data.data.info.length == 0 || res.data.data.info==''){
							// 未绑定手机号
							commit('changePhone',false)
						}else{
							// 已绑定手机号
							commit('changePhone',true)
							// 改变用户信息
							commit('changeUserInfo',res.data.data.info);
						}
					}
				})
			}
		});
		// #endif
	},
	// 拉取用户授权
	getInfo({ commit },userinfo){
		uni.getUserProfile({
			desc:"获取用户基本资料",
			success(res) {
				// 点击确定授权
				commit('changeAoth',true)
				uni.navigateBack()
			},
			fail(error) {
				uni.showToast({
					title:"用户拒绝授权",
					icon:"none"
				})
			}
		})
	},
	// 获取手机号
	getPhone({ commit },data){
		shouquan.getPhone({
			openid:uni.getStorageSync("openid"),
			session_key:uni.getStorageSync("session_key"),
			avatarUrl:uni.getStorageSync("avatarUrl"),
			iv:data.iv,
			encryptedData:data.encryptedData,
		}).then(res => {
			// 改变登录状态
			commit('changePhone',true)
			// 改变用户信息
			commit('changeUserInfo',res.data.data.info);
		})
	},
	// app一键登录
	appLogin({commit},data){
		// 显示一键登录选项
		//#ifdef APP-PLUS
		if(uni.getStorageSync("number")){
			shouquan.getapp({
				phone:uni.getStorageSync("number")
			}).then(res => {
				uni.hideLoading()
				commit('changeUserInfo',res.data.data.info);
			})
		}else{
			uni.login({
				provider: 'univerify',
				univerifyStyle: { // 自定义登录框样式
					//参考`univerifyStyle 数据结构`
					"fullScreen": true,
					"icon": {  
						"path": "static/app_icon/ico.png" // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo   
					}, 
					"authButton": {  
						"normalColor": "#BC2233", // 授权按钮正常状态背景颜色 默认值：#3479f5  
						"highlightColor": "#DB153C",  // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）  
						"disabledColor": "#DB153C",  // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）  
						"textColor": "#ffffff",  // 授权按钮文字颜色 默认值：#ffffff  
						"title": "本机号码一键登录/注册", // 授权按钮文案 默认值：“本机号码一键登录”  
						"borderRadius": "24px"    // 授权按钮圆角 默认值："24px" （按钮高度的一半）
					},  
					 "otherLoginButton": {
						"visible": true, // 是否显示其他登录按钮，默认值：true  
						"title": "其他手机登录",
					},  
					"privacyTerms": {  
						"defaultCheckBoxState":true, // 条款勾选框初始状态 默认值： true
						"uncheckedImage":"", // 可选 条款勾选框未选中状态图片（仅支持本地图片 建议尺寸 24x24px）(3.2.0+ 版本支持)   
						"checkedImage":"", // 可选 条款勾选框选中状态图片（仅支持本地图片 建议尺寸24x24px）(3.2.0+ 版本支持)   
						"textColor": "#BBBBBB", // 文字颜色 默认值：#BBBBBB  
						"termsColor": "#DB153C", //  协议文字颜色 默认值： #5496E3  
						"prefix": "我已阅读并同意", // 条款前的文案 默认值：“我已阅读并同意”  
						"suffix": "并使用本机号码登录" // 条款后的文案 默认值：“并使用本机号码登录”  
					},
				},
				success(res){
					// 登录成功
					uniCloud.callFunction({
						name:"login",
						data:{
							access_token:res.authResult.access_token,
							openid:res.authResult.openid
						},
						success(ress) {
							uni.setStorageSync("number",ress.result.phoneNumber);
							shouquan.getapp({
								phone:ress.result.phoneNumber
							}).then(info => {
								console.log(123)
								uni.hideLoading()
								commit('changeUserInfo',info.data.data.info);
								uni.closeAuthView();
							})
						}
					})
				},
				fail(res){
					uni.navigateTo({
						url:"/pages/login/login.vue"
					})
				}
			})
		}
		//#endif
	}
}