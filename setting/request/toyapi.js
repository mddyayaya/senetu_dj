import {memberHomeList} from './toyahomeapi'
import request from './toyarequest.js'


// 获取设备列表 
export const getDeviceList = () => {
  return request({
    name: 'ty-service',
    data: {
      action: 'device.getDeviceList',
      params: {}
    }
  })
}
// 新增设备用户
export const addUser = (params) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'deviceUser.add',
      params: params
    }
  })
} 
// 获取设备详情
export const getDetails = (device_id) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'device.details',
      params: {device_id}
    }
  })
}

// 获取 ticket
export const reqTicket = () =>
  request({
    name: 'ty-service',
    data: {
      action: 'system.userTicket',
      params: {}
    }
  });

  
// 获取 ClientId
export const getClientId = () => {
  return request({
    name: 'ty-service',
    data: {
      action: 'dangerous.getClientId',
      params: {}
    }
  })
}  
// 获取设备支持的指令集
export const getDevicesFun = (device_id) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'device.functions',
      params: {device_id}
    }
  })
}

// 获取设备最新状态
export const deviceStatus = (device_id) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'device.status',
      params: {
        device_id
      }
    }
  })
}

// 下发设备指令
export const control = (device_id,commands) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'device.control',
      params: {
        device_id,
        commands
      }
    }
  })
}
// 查询设备功能
export const specifications = (device_id) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'device.specifications',
      params: {
        device_id
      }
    }
  })
}
// 获取多路名称
export const deviceMultipleName = (device_id) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'device.multiple-name',
      params: {
        device_id
      }
    }
  })
}


// 设备配网
export const setDevice = async (home_id) => {
	const clientId = await getClientId();
	const ticket = (await reqTicket()).ticket;
	uni.navigateTo({
		url: `plugin://tuya-ap-plugin/auto?clientId=${clientId}&ticket=${ticket}&gid=${home_id}`,
	});
}
