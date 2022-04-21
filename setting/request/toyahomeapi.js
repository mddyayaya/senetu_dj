import request from './toyarequest.js'

// 获取 ticket
export const reqTicket = () =>
  request({
    name: 'ty-service',
    data: {
      action: 'system.userTicket',
      params: {}
    }
  });

// 获取家庭成员列表
export const memberList = (home_id) =>
request({
	name: 'ty-service',
	data: {
		action: 'home.memberList',
		params: {
			home_id
		}
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

// 创建家庭
export const addHome = async (home,rooms) =>{
  return request({
    name: 'ty-service',
    data: {
      action: 'home.add',
      params: {home,rooms}
    }
  })
}
// 修改家庭
export const editHome = async (params) =>{
  return request({
    name: 'ty-service',
    data: {
      action: 'home.edit',
      params:params
    }
  })
}

// 查询用户家庭信息
export const memberHomeList = () => {
  return request({
    name: 'ty-service',
    data: {
      action: 'home.memberHomeList',
      params: {
        
      }
    }
  })
}

// 查询用户家庭信息
export const homeInfos = (home_id) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'home.infos',
      params: {
        home_id
      }
    }
  })
}

// 查询家庭下的设备详情
export const homeDevices = (home_id) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'home.devices',
      params: {
        home_id
      }
    }
  })
}
// 查询家庭下的场景列表
export const scenesInfos = (home_id) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'scenes.infos',
      params: {
        home_id
      }
    }
  })
}
