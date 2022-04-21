import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import store from '@/store/index.js'
import * as echarts from 'echarts'
import 'swiper/swiper.min.css';

import echartsGL from 'echarts-gl' // 引入echarts
Vue.prototype.$echartsGL = echartsGL

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
