
import { homeDevices,sharing ,memberList,addSharing} from '@/setting/request/toyahomeapi' 
import { deviceStatus } from '@/setting/request/toyapi' 
import { useLog,getDeviceList,control } from '@/setting/request/api' 
import base_url from '@/setting/request/config.js'
  // 查询面试亭下得设备信息
  export const getHomeDevicesList = async (home_id) => {
		const devicesList = await getDeviceList({home_id:home_id});
		let arr = [];
		for(let i=0;i<devicesList.length;i++){
		  if(devicesList[i].name){
			if(devicesList[i].name!="多模双联网关 "){
			  switch(devicesList[i].name){
				case "一路触控开关" :
				  arr.push({deviceName:"门锁",deviceIcon:base_url+"zyfxminiicon/lock.png",status:devicesList[i].status[0],id:devicesList[i].id});
				  break;
				case "两位零火ZIGBEE开关(升级版)" :
				  arr.push({deviceName:"照明",deviceIcon:base_url+"zyfxminiicon/light.png",status:devicesList[i].status[0],id:devicesList[i].id});
				  arr.push({deviceName:"换气",deviceIcon:base_url+"zyfxminiicon/breath.png",status:devicesList[i].status[1],id:devicesList[i].id});
				  break;
				case "Zigbee插座" :
				  arr.push({deviceName:"插座",deviceIcon:base_url+"zyfxminiicon/socket.png",status:devicesList[i].status[0],id:devicesList[i].id});
				  break;
				case "Zigbee插座/通断器" :
				  arr.push({deviceName:"语音",deviceIcon:base_url+"zyfxminiicon/socket.png",status:devicesList[i].status[0],id:devicesList[i].id});
				  break;
			  }
			}
		  }
	  }
	 return arr
  }
  // 一键开锁
  export const oneKey = async (home_id,status) => {
	  if(status == 'open'){
		  uni.setStorageSync("open",true);
	  }else{
		  uni.removeStorageSync('open')
	  }
	  const arr = await getHomeDevicesList(home_id);
	  for(let i=0;i<arr.length;i++){
		let commend = {},voice_device_id="";
		commend = {
			code:arr[i].status.code,
			value:status=='open'?true:false
		}
		if(arr[i].deviceName == "语音"){
			voice_device_id = arr[i].id
		}
		if(arr[i].deviceName != "语音"){
			controlDevice(arr[i].id,arr[i].deviceName,voice_device_id,home_id,commend)
		}
	  }
	  return true
  }
  // 下发设备指令(单独)
  export const controlDevice = async (device_id,devicename,voice_device_id,mstid,commend) => {
    const res = await control(device_id,commend);
    if(res){
      if(devicename == "门锁"){
		  if(voice_device_id){
			  controlVoice(voice_device_id,[commend])
		  }
       }
		//  使用记录
		let type = commend.value?'1':2;
		userLog(mstid,type,devicename)
		return res.success
    }else{
		uni.showToast({
			title:"操作失败",
			icon:"none"
		})
	}
  }
// 开门后语音控制
const controlVoice = async (voice_device_id,commend) => {
	commend[0].value = !commend[0].value
	control(device_id,commend);
}
const userLog = (mstid,type,devicename) => {
  let position="";
  switch (devicename) {
    case "门锁":
      position = 1;
      break;
    case '换气':
      position = 2;
      break;
    case '照明':
      position = 3;
      break;
    case '插座':
      position = 4;
      break;
    default:
      position = "";
      break;
  }
  useLog({
    uid:getApp().globalData.userinfo.uid,
    hall_id:mstid,
    position:position,
    type:type //1开2关
  }).then(res => {
	  
  })
}
