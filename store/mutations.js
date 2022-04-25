
import { shouquan } from "@/request/api.js"

export default {
	// 修改用户授权状态
	changeAoth(state,data){
		state.hasAoth = data;
		uni.setStorageSync("hasAoth",data);
	},
	// 修改用户手机号授权状态
	changePhone(state,data){
		state.hasPhone = data;
		uni.setStorageSync("hasPhone",data);
	},
	// 修改用户个人信息
	changeUserInfo(state,data){
		state.uid = data.id;
		state.u_name = data.u_name;
		state.u_picture = data.u_picture;
		state.cy_zz = data.cy_zz;
		state.integral = data.integral;
		state.flag = data.flag;
		state.zbid = data.uid;
	},
}