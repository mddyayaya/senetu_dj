import Vue from "vue"
import Router from 'vue-router'
import  {routers}  from './route'
import store from '../store'

Vue.use(Router)

const routerConfig = {
	mode:'hash',
	routes: routers
}

const router = new Router(routerConfig);


export default router

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
	return VueRouterPush.call(this, to).catch(err => err)
}

// 路由跳转前触发
router.beforeEach((to, from, next) => {
	if(to.path !== '/login'){
		if(localStorage.getItem("IS_LOGIN") == 'true'){
			next();
		}else{
			next({path:'/login'});
		}
	}else{
		if(localStorage.getItem("IS_LOGIN") == 'true'){
			next({path:'/'});
		}else{
			next();
		}
	}
});

