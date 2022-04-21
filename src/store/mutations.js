import router from '@/router';
import { userlist , news ,resource ,shenhe } from '@/axios';
import { Message } from 'element-ui'

export default {
	setUserInfo(state,data){
		if(data){
			state.is_login = true;
			state.userinfo = data;
			localStorage.setItem("IS_LOGIN",true);
			localStorage.setItem("userinfo",JSON.stringify(data));
			router.push('/')
			location.reload()
		}else{
			state.is_login = false;
			state.userinfo = null;
			localStorage.setItem("IS_LOGIN",false);
			localStorage.setItem("userinfo",null);
		}
	},
}