import store from '@/store/index.js';
const preLogin = () => {
	// 预登录
	uni.showToast({
		title:"",
		icon:"loading"
	})
	uni.preLogin({
		provider:"univerify",
		success(res) {
			store.dispatch("appLogin")
		},
		fail(error) {
			uni.showToast({
				title:JSON.stringify(error.message),
				icon:"none"
			})
		}
	})
}

export const checkUser = (url) => {
	// if(store.state.uid == ""){
		if(store.state.hasAoth){
			// #ifdef MP-WEIXIN
				uni.showToast({
					title:"绑定手机，解锁更多资源",
					icon:"none"
				})
				setTimeout(function(){
					uni.switchTab({
						url:"../mine/mine"
					})
				},1000)
			// #endif
		}else{
			// #ifdef MP-WEIXIN
				uni.navigateTo({
					url:"../shouquan/shouquan"
				})
			// #endif
			// #ifdef APP-PLUS
			preLogin()
			// #endif
		}
	// }else{
		if(url!=''){
			uni.navigateTo({
				url:url
			})
		}else{
			uni.showToast({
				title:"敬请期待",
				icon:"none"
			})
		}
	// }
}