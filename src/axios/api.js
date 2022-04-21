import axios from 'axios'
import config  from './config'
import { Loading,Message } from 'element-ui'
import qs from 'qs'

let loadingInstance = null
// 错误状态码及提示
let httpCode = {
	 400:"请求参数错误",
	 401:"权限不足，请重新登录",
	 403:"服务器拒绝本次访问",
	 404:"未找到请求资源",
	 500:"内置服务器错误",
	 501:"服务器不支持该请求中使用的方法",
	 502:"网关错误",
	 504:"网关超时"
}
axios.defaults.timeout = 100000;
axios.defaults.baseURL = config.baseUrl;
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
 
// 添加请求拦截器
axios.interceptors.request.use(config => {
	loadingInstance = Loading.service({       // 发起请求时加载全局loading，请求失败或有响应时会关闭
		spinner: 'el-icon-loading',
		text: '加载中',
		background:"rgba(0,0,0,0)"
	})
	if(config.method === "get"){//添加时间戳，防止浏览器对get请求缓存
		config.params = {
			...config.params,
			t:new Date().getTime()
		}
	}
	config.data = qs.stringify(config.data)
	return config
},error => {
	return Promise.reject(error)
})


// 添加响应拦截器
axios.interceptors.response.use(response => {		
	loadingInstance.close()
	if(response.data.code === 0 || response.data.code === 200 ){
		return Promise.resolve(response.data)
	}else{
		Message({
			message:response.data.msg,
			type:"error"
		})
		return Promise.resolve(-1)
	}
},error => {
	loadingInstance.close();
	if(error.response){
		// 请求失败
		let tips = error.response.status in httpCode ? httpCode[error.response.status] : error.response.data.message;
		Message({
			message:tips,
			type:"error"
		})
		if(error.response === 401){
			this.$router.push('/login')
		}
		return Promise.reject(error)
	}else{
		Message({
			message: '请求超时, 请刷新重试',
			type: 'error'
		})
		return Promise.reject(new Error('请求超时, 请刷新重试'))
	}
})
// 封装get请求
export const get = (url,params,config = {}) => {
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url,
			params,
			...config
		}).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}

// 封装post请求
export const post = (url,data,config = {}) => {
	return new Promise((resolve,reject) => {
		axios({
			method:'post',
			url,
			data,
			...config
		}).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}