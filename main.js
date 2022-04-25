import Vue from 'vue'
import App from './App'
import uView from "uview-ui"
import '@/common/push.js'
import { changeTime,yearList,changeTime1,previewImg,changeBsid,noNetReload,shareResouce,checkPhone } from '@/common/index.js'
import { checkUser } from '@/common/checkUser.js'
import store from '@/store'

Vue.use(uView);

Vue.prototype.$changeTime = changeTime
Vue.prototype.$changeTime1 = changeTime1
Vue.prototype.$yearList = yearList
Vue.prototype.$changeBsid = changeBsid
Vue.prototype.$shareResouce = shareResouce
Vue.prototype.$checkUser = checkUser
Vue.prototype.$noNetReload = noNetReload
Vue.prototype.$previewImg = previewImg
Vue.prototype.$checkPhone = checkPhone
Vue.prototype.$store = store
Vue.config.productionTip = false


App.mpType = 'app'

// setTimeout(function(){
	const app = new Vue({
		store,
	    ...App
	})
	app.$mount()
// },2000)
