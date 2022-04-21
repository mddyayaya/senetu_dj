import {
	getPhone
	,getSchoolList
	,getInfos
	,editInfos } from '@/setting/request/api'
let app = getApp();
let that;
export default{
	data(){
		return{
			phone:app.globalData.userinfo.phone,
			showSchool:false,//学校选择器
			schoolName:"",
			schoolClass:"",
			schoolEdu:"选择学历",
			schoolid:"",
			eduList:["小学","初中","中专/高中","专科","本科","硕士研究生","博士研究生"],
			showEdu:false,
			userpic:uni.getStorageSync("userpic"),
			usernickName:""
		}
	},
	onLoad(options){
		that = this;
		that.userCenters();
	},
	methods:{
		/* 选择学校 */
		selectSchool(){
			app.signed('/pages/admin/search/search?type=select')
		},
		// 选择学历
		confirmEdu(value){
			that.schoolEdu = that.eduList[parseInt(value.detail.value)];
		},
		submit(){
			if(that.schoolName ==""){
				uni.showToast({
					title:"请选择学校",
					icon:"none"
				})
			}else{
				editInfos({
					name:that.usernickName,
					uid:app.globalData.userinfo.uid,
					region:that.schoolEdu,
					school:that.schoolid,
					speciality:that.schoolClass
				}).then(res => {
					if(res.data.info){
						uni.showToast({
							title:"修改成功",
							icon:"none"
						})
						that.userCenters();
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				})
			}
		},
		// 用户信息
		userCenters(){
			if(app.globalData.userinfo.uid){
				getInfos({
					uid:app.globalData.userinfo.uid
				}).then(res => {
					that.schoolEdu = res.data.region?res.data.region:'选择学历';
					that.schoolName = res.data.school;
					that.schoolid = res.data.s_id;
					that.schoolClass = res.data.gu_speciality;
					that.usernickName = res.data.gu_name
					uni.setStorageSync("usernickName",res.data.gu_name)
				})
			}
		}
	}
}
