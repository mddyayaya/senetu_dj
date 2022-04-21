import {get,post} from './index.js'


// 根据uid获取用户信息
export const getInfos = (data) => get('?c=center&m=user_detail_info',data)
// 编辑用户信息
export const editInfos = (data) => post('?c=center&m=edit_user_info',data)
// 获取手机号
export const getPhone = (data) => post('?c=hall&m=getTel2',data)
// 学校列表
export const getSchoolList = (data) => get('?c=center&m=school_list',data)
// 学校面试厅列表
export const mstList = (data) => get('?c=hall&m=halList',data)
// 新增学校面试亭
export const addMst = (data) => post('?c=hall&m=addHall',data)
// 学校面试亭详情
export const mstDetail = (data) => get('?c=hall&m=hallDetail',data)
// 学校面试亭修改名称
export const updateHallName = (data) => post('?c=hall&m=updateHallName',data)
// 学校面试亭预约列表
export const orderList = (data) => get('?c=hall&m=hallApointList',data)
// 学校面试亭使用记录
export const useLog = (data) => post('?c=hall&m=halLog',data)
// 学校面试亭开放时间
export const opentime = (data) => get('?c=hall&m=hallOpenTime',data)
// 学校面试亭预约
export const appoint = (data) => post('?c=hall&m=appointment',data)
// 学校面试亭预约列表
export const appointList = (data) => get('?c=hall&m=appointList',data)
// 学校面试亭预约取消
export const appointCancel = (data) => post('?c=hall&m=cancelAppoint',data)
// 用户中心
export const userCenter = (data) => post('?c=center&m=center_index',data)
// 学校面试亭结束使用
export const endAppoint = (data) => post('?c=hall&m=endAppoint',data)
// 学校面试亭修改时间
export const updateAppoint = (data) => post('?c=hall&m=updateAppoint',data)
// 学校面试亭查询
export const selectAppoint = (data) => get('?c=hall&m=selectAppoint',data)
// 学校面试亭设置开放时间
export const setOpenTime = (data) => post('?c=hall&m=setSchoolHallTime',data)
// 设置面试亭状态
export const setState = (data) => post('?c=hall&m=updateHall',data)

// 获取设备列表
var url = "https://xcx.jiuye.net:449/"
export const getDeviceList = (params) =>{
  return new Promise((reslove,reject) => {
	uni.request({
	  url: url+'deviceList',
	  data:params,
	  header:{
		'content-type': 'application/json' // 默认值
	  },
	  method:'GET',
	  dataType:'json',
	  success(res){
		  if(res.data.success){
			  reslove(res.data.result);
		  }else{
			  uni.showToast({
				title:"获取设备失败",
				icon:"none"
			  })
		  }
	  },
	  error(error){
		uni.showToast({
		  title: '网络连接错误',
		  icon:"error"
		})
	  }
	})
  })
}

// 控制设备
export const control =  (device_id,commands) => {
	uni.showLoading({
		title:"加载中",
		icon:"none"
	})
  return new Promise ((reslove,reject) => {
    uni.request({
	  url: url+'controlDevice',
      data:{
		  device_id:device_id,
		  code:commands.code,
		  value:commands.value
	  },
      header:{
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method:'POST',
      dataType:'json',
      success(res){
		  uni.hideLoading()
		  if(res.data.success){
				reslove(res.data)
		  }else{
			  uni.showToast({
				title:"设备离线或未配置",
				icon:"none"
			  })
		  }
      },
      error(error){
		  uni.hideLoading()
        uni.showToast({
          title: '网络连接失败',
          icon:"error"
        })
      }
    })
  }) 
}