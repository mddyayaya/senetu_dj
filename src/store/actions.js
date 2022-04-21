import { userControl } from '@/axios';
export default {
	// 登录
	login_sys({ commit },userinfo){
		userControl.login(userinfo).then(res => {
			commit('setUserInfo',res.data);
		})
	},
}