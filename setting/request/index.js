import base_url from './config.js'




export const get =  (url,params) => {
  return new Promise((reslove,reject) => {
    uni.request({
      url: base_url+url,
      data:params,
      header:{
        'content-type': 'application/json' // 默认值
      },
      method:'GET',
      dataType:'json',
      success(res){
        if(res.statusCode == 200){
			reslove(res.data);
        }else{
          uni.showToast({
            title: '请求失败',
            icon:"error"
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

export const post =  (url,params) => {
  return new Promise ((reslove,reject) => {
    uni.request({
      url: base_url+url,
      data:params,
      header:{
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method:'POST',
      dataType:'json',
      success(res){
        if(res.statusCode == 200){
			reslove(res.data);
        }else{
          uni.showToast({
            title: '请求失败',
            icon:"error"
          })
        }
      },
      error(error){
        uni.showToast({
          title: '网络连接失败',
          icon:"error"
        })
      }
    })
  }) 
}