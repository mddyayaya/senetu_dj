import { getHomeDevicesList,controlDevice } from '@/setting/common/controls.js'
import { deviceStatus } from '@/setting/request/toyapi.js' 
import { stamps } from '@/setting/common/index.js' 
let that;

export default {
	data(){
		return{
			nowTime:stamps(),
			status:'loading'
		}
	},
	props:{
		mstid:{
			type:String,
			value:""
		}
	},
	watch:{
		mstid: {
			immediate: true,
			handler (value) {
				if(value){
					this.getHomeDevices(value);
				}
			}
		}
	},
	data(){
		return {
			controlDeviceList:[],
			voiceControl:[]
		}
	},
	created(){that = this;},
	methods: {
		// 查询面试亭下得设备信息
		async getHomeDevices(value){
			const res = await getHomeDevicesList(value);
			that.controlDeviceList = [];
			console
			.log(res)
			let arr = [],voiceControl=[];
			for(let i=0;i<res.length;i++){
				if(res[i].deviceName!="语音"){
					arr.push(res[i])
				}else{
					voiceControl.push(res[i])
				}
			}
			if(arr.length > 0){
				that.status = "finish"
			}else{
				that.status = "null"
			}
			that.controlDeviceList = arr;
			that.voiceControl = voiceControl;
		},		
		// 控制设备
		async controlDevices(item){
			if(that.status=="finish"){
				let id = item.id;
				let common = {
					code: item.status.code,
					value:!item.status.value
				};
				let deviceName = item.deviceName;
				let res;
				if(getApp().globalData.userinfo.auth == 1){
					if(that.voiceControl.length > 0){
						res = await controlDevice(id,deviceName,that.voiceControl[0].id,that.mstid,common);
					}else{
						res = await controlDevice(id,deviceName,"",that.mstid,common);
					}
				}else{
					if(that.voiceControl.length > 0){
						res = await controlDevice(id,deviceName,that.voiceControl[0].id,that.mstid,common);
					}else{
						res = await controlDevice(id,deviceName,"",that.mstid,common);
					}
				}
				if(res){
					that.getHomeDevices(that.mstid)
				}
			}else{
				uni.showToast({
					title:"设备加载中",
					icon:"none"
				})
			}
		},
	}
}