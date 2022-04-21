import {mstDetail,appoint,updateAppoint,selectAppoint} from '@/setting/request/api'
import {tom,now,comput,limitMin} from '@/setting/common/index.js'

let app = getApp()
let that;
export default {
	data(){
		return{
			timeList:[],//可选时间列表
			getdata:{},
			selectTime:"选择预约时间",
			selectTimes:"预约时长",
			today:[],
			selecTimesList:[{text:"30分钟",value:0},
					{text:"1小时",value:1},
					{text:"1小时30分钟",value:2},
					{text:"2小时",value:3}],
			tom:[],
			selectTimesValue:0,
			selectDay:"",
			subTimes:[],
			formData:{
				order_id:"",
				time:"",
				uid:app.globalData.userinfo.uid,
				sid:app.globalData.userinfo.sid,
				hid:"",
				day:"",
			}
		}
	},
	onLoad(options){
		that = this;
		that.formData.hid = options.hid;
		if(options.order_id){
			// 编辑时查询数据
			that.formData.order_id = options.order_id;
			that.getdata.hid = options.hid;
			that.getApp();
		}else{
			that.getdata = options;
			if(that.getdata.type1 == 1){
				that.selectDays(that.getdata.type1)
			}else{
				that.selectDays(that.getdata.type2)
			}
		}
	},
	mounted(){that.timesList();},
	methods:{
		// 提交表单
		submit(){
			if(that.formData.day == ""){
				uni.showToast({
					title:"请选择日期",
					icon:"none"
				})
			}else if(that.formData.time == ""){
				uni.showToast({
					title:"请选择时间",
					icon:"none"
				})
			}else{
				if(that.formData.order_id != ""){
					// 修改
					updateAppoint(that.formData).then(res => {
						if(res.data.info){
							uni.navigateBack()
						}else{
							uni.showToast({
								title:res.message,
								icon:"none"
							})
						}
					})
				}else{
					// 新增
					appoint(that.formData).then(res => {
						if(res.data.info==true){
							uni.showToast({
								title:"预约成功",
								icon:"none"
							})
							uni.navigateBack()
						}else{
							uni.showToast({
								title:res.message,
								icon:"none"
							})
						}
					})
				}
			}
		},
		// 可选时间列表
		timesList(){
			mstDetail({
				hid:that.formData.hid
			}).then(res => {
				that.today = limitMin(res.data["day"]);
				that.tom = res.data["tom"];
			})
		},
		// 选择天
		selectDays(index){
			if(that.getdata.type1==1&&index==1){
				that.selectDay = 1
				that.formData.day = now();
			}else if(that.getdata.type2==1&&index==2){
				that.selectDay = 2
				that.formData.day = tom()
			}else{
				uni.showToast({
					title:"不可选",
					icon:"none"
				})
			}
		},
		// 查询预约
		getApp(){
			selectAppoint({
				order_id:that.formData.order_id
			}).then(res => {
				that.getdata = {
					mstname:res.data.hall_name,
					mstaddress:res.data.hall_address,
					type1:res.data.type1,
					type2:res.data.type2,
				}
			})
		},
		sureTime(data){
			that.subTimes=[];
			if(that.selectDay == 1){
				that.subTimes.push(that.today[parseInt(data.detail.value)].id);
				that.selectTime = that.today[parseInt(data.detail.value)].time
			}else{
				that.subTimes.push(that.tom[parseInt(data.detail.value)].id);
				that.selectTime = that.tom[parseInt(data.detail.value)].time
			}
			that.selectTimes = that.selecTimesList[0].text;
			that.selectTimesValue = that.selecTimesList[0].value;
			that.formData.time = comput(that.subTimes,that.selectTimesValue);
		},
		sureTimes(data){
			that.selectTimes = that.selecTimesList[parseInt(data.detail.value)].text;
			that.selectTimesValue = that.selecTimesList[parseInt(data.detail.value)].value;
			that.formData.time = comput(that.subTimes,that.selectTimesValue);
		}
	}
}