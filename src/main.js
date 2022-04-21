import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import ElementUI from 'element-ui'
import  axios from '@/axios'
import * as echarts from 'echarts'
import { changeString , yearList ,monthList,chengcat,checkPhone ,changeTime,limitImg,limitFile,nodata,getCascaderObj,changeZhiwu,developer,changeDev} from '@/common/common.js'
import { Message } from 'element-ui'
import config_url from '@/axios/config.js'
import VueQuillEditor from '@/editor/config'

import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import './element-variables.scss'
import "babel-polyfill";

Vue.config.productionTip = false

Vue.use(ElementUI)
 
Vue.prototype.$store = store
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.prototype.$changeString = changeString
Vue.prototype.$yearList = yearList
Vue.prototype.$monthList = monthList
Vue.prototype.$chengcat = chengcat
Vue.prototype.$changeTime = changeTime
Vue.prototype.$limitImg = limitImg
Vue.prototype.$limitFile = limitFile
Vue.prototype.$EventBus = new Vue();
// 图片上传路径
Vue.prototype.$uploadImg = config_url.uploadImg
// 文件上传路径
Vue.prototype.$uploadFile = config_url.uploadFile
// 富文本全局引入
Vue.prototype.$VueQuillEditor = VueQuillEditor
// 检测手机正则全局
Vue.prototype.$checkPhone = checkPhone
// 全局无数据占位文字
Vue.prototype.$nodata = nodata
// 遍历成员树获取数据
Vue.prototype.$getCascaderObj = getCascaderObj
// 职务转换
Vue.prototype.$changeZhiwu = changeZhiwu
// 发展党员阶段列表
Vue.prototype.$developer = developer
// 发展党员阶段转化
Vue.prototype.$changeDev = changeDev

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
