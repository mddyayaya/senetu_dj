/* 顶部和左侧导航 */
import Layout from "@/pages/layout"


/* 左侧导航 */
export const slideBar = [
	{
		path:"/",
		name:"组织概况",
		redirect:"/zbgk",
		meta: {
			title: '新时代党建',
		},
		component: Layout,
		children:[
			{
				path:"/zbgk",
				name:"zbgk",
				meta: {
					title: '组织概况',
					permission: true,
				},
				component: () => import('@/pages/zbgk')
			}
		]
	},
	{
		path:"",
		name:"党建宣传",
		redirect:"/djxc_ywzx",
		meta: {
			title: '党建宣传',
		},
		component: Layout,
		children:[
			{
				path:"/djxc_ywzx",
				name:"djxc_ywzx",
				meta: {
					title: '支部要闻',
					index:'/djxc_ywzx'
				},
				component: () => import('@/pages/djxc/djxc_ywzx/')
			},
			{
				path:"/ywzx_detail",
				name:"ywzx_detail",
				meta: {
					title: '支部要闻详情',
					index:'/djxc_ywzx'
				},
				component: () => import('@/pages/djxc/djxc_ywzx/ywzx_detail.vue')
			},
			{
				path:"/ywzx_add",
				name:"ywzx_add",
				meta: {
					title: '新增要闻详情',
					index:'/djxc_ywzx'
				},
				component: () => import('@/pages/djxc/djxc_ywzx/ywzx_add.vue')
			},
			{
				path:"/djxc_zbfc",
				name:"djxc_zbfc",
				meta: {
					title: '支部风采',
					index:'/djxc_zbfc'
				},
				component: () => import('@/pages/djxc/djxc_zbfc/')
			},
			{
				path:"/zbfc_add",
				name:"zbfc_add",
				meta: {
					title: '新增支部风采',
					index:'/djxc_zbfc'
				},
				component: () => import('@/pages/djxc/djxc_zbfc/zbfc_add.vue')
			},
			{
				path:"/zbfc_detail",
				name:"zbfc_detail",
				meta: {
					title: '支部风采详情',
					index:'/djxc_zbfc'
				},
				component: () => import('@/pages/djxc/djxc_zbfc/zbfc_detail.vue')
			},
			{
				path:"/djxc_dyfc",
				name:"djxc_dyfc",
				meta: {
					title: '党员风采',
					index:'/djxc_dyfc'
				},
				component: () => import('@/pages/djxc/djxc_dyfc')
			},
			{
				path:"/dyfc_add",
				name:"dyfc_add",
				meta: {
					title: '新增党员风采',
					index:'/djxc_dyfc'
				},
				component: () => import('@/pages/djxc/djxc_dyfc/dyfc_add.vue')
			},
			{
				path:"/dyfc_detail",
				name:"dyfc_detail",
				meta: {
					title: '党员风采详情',
					index:'/djxc_dyfc'
				},
				component: () => import('@/pages/djxc/djxc_dyfc/dyfc_detail.vue')
			}
		]
	},
	{
		path:"/dwgl",
		name:"党务管理",
		redirect:"/dzz",
		meta: {
			title: '党务管理',
		},
		component: Layout,
		children:[
			{
				path:"/dzz",
				name:"dzz",
				meta: {
					title: '党组织管理',
					index:"/dzz",
				},
				component: () => import('@/pages/dwgl/dzz')
			},
			{
				path:"/dzz_detail",
				name:"dzz_detail",
				meta: {
					title: '党组织详情',
					index:"/dzz",
				},
				component: () => import('@/pages/dwgl/dzz/dzz_detail.vue')
			},
			{
				path:"/dftj",
				name:"dftj",
				meta: {
					title: '党费统计',
					index:"/dftj",
				},
				component: () => import('@/pages/dwgl/dftj')
			},
			{
				path:"/jfxb",
				name:"jfxb",
				meta: {
					title: '经费下拨',
					index:"/jfxb",
				},
				component: () => import('@/pages/dwgl/jftj/jfxb.vue')
			},
			{
				path:"/jfzc",
				name:"jfzc",
				meta: {
					title: '经费支出',
					index:"/jfzc",
				},
				component: () => import('@/pages/dwgl/jftj/jfzc.vue')
			},
			{
				path:"/zzhd",
				name:"zzhd",
				meta: {
					title: '活动管理',
					index:"/zzhd",
				},
				component: () => import('@/pages/dwgl/zzhd')
			},
			{
				path:"/zzhd_detaill",
				name:"zzhd_detaill",
				meta: {
					title: '活动详情',
					index:"/zzhd",
				},
				component: () => import('@/pages/dwgl/zzhd/zzhd_detaill.vue')
			},
			{
				path:"/zzhd_add",
				name:"zzhd_add",
				meta: {
					title: '新增活动',
					index:"/zzhd",
				},
				component: () => import('@/pages/dwgl/zzhd/zzhd_add.vue')
			},
			{
				path:"/xjpd_xjsd",
				name:"xjpd_xjsd",
				meta: {
					title: '星级评定',
					index:"/xjpd_xjsd",
				},
				component: () => import('@/pages/dwgl/xjpd_xjsd')
			},
			{
				path:"/xjpd_gzsz",
				name:"xjpd_gzsz",
				meta: {
					title: '规则设置',
					index:"/xjpd_xjsd",
				},
				component: () => import('@/pages/dwgl/xjpd_xjsd/xjpd_gzsz')
			},
			{
				path:"/mbkh",
				name:"mbkh",
				meta: {
					title: '党建目标考核',
					index:"/mbkh",
				},
				component: () => import('@/pages/dwgl/mbkh')
			},
			{
				path:"/mbkh_gzsz",
				name:"mbkh_gzsz",
				meta: {
					title: '规则设置',
					index:"/mbkh_gzsz",
				},
				component: () => import('@/pages/dwgl/mbkh/mbkh_gzsz')
			},
			{
				path:"/dftz",
				name:"dftz",
				meta: {
					title: '台账经费',
					index:'/dftz'
				},
				component: () => import('@/pages/dwgl/dftz')
			},
			{
				path:"/gztz",
				name:"gztz",
				meta: {
					title: '工作台账',
					index:'/gztz'
				},
				component: () => import('@/pages/dwgl/gztz')
			},
			{
				path:"/zztz",
				name:"zztz",
				meta: {
					title: '党员统计',
					index:'/zztz'
				},
				component: () => import('@/pages/dwgl/zztz')
			},
		]
	},
	{
		path:"/dygl",
		name:"党员管理",
		redirect:"/ldbz",
		meta: {
			title: '党员管理',
		},
		component: Layout,
		children:[
			{
				path:"/ldbz",
				name:"ldbz",
				meta: {
					title: '领导班子',
					index:"/ldbz",
				},
				component: () => import('@/pages/dygl/ldbz')
			},
			{
				path:"/gxzy",
				name:"gxzy",
				meta: {
					title: '组织关系转移',
					index:"/gxzy",
				},
				component: () => import('@/pages/dygl/gxzy')
			},
			{
				path:"/gxzy_detail",
				name:"gxzy_detail",
				meta: {
					title: '组织关系转移详情',
					index:"/gxzy",
				},
				component: () => import('@/pages/dygl/gxzy/gxzy_detail')
			},
			{
				path:"/gxzy_add",
				name:"gxzy_add",
				meta: {
					title: '新增关系转移',
					index:"/gxzy",
				},
				component: () => import('@/pages/dygl/gxzy/gxzy_add')
			},
			{
				path:"/dyxxgl",
				name:"dyxxgl",
				meta: {
					title: '党员信息管理',
					index:"/dyxxgl",
				},
				component: () => import('@/pages/dygl/dyxxgl')
			},
			{
				path:"/dyxx_add",
				name:"dyxx_add",
				meta: {
					title: '新增党员',
					index:"/dyxxgl",
				},
				component: () => import('@/pages/dygl/dyxxgl/dyxx_add')
			},
			{
				path:"/dyxx_detail",
				name:"dyxxgl",
				meta: {
					title: '党员信息管理详情',
					index:"/dyxxgl",
				},
				component: () => import('@/pages/dygl/dyxxgl/dyxx_detail.vue')
			},
			{
				path:"/fzdy_charge",
				name:"fzdy_charge",
				meta: {
					title: '发展党员管理',
					index:"/fzdy_charge",
				},
				component: () => import('@/pages/dygl/fzdy_charge')
			},
			{
				path:"/fzdy_detail",
				name:"fzdy_detail",
				meta: {
					title: '发展党员详情',
					index:"/fzdy_charge",
				},
				component: () => import('@/pages/dygl/fzdy_charge/fzdy_detail')
			},
		]
	},
	{
		path:"/xxjy",
		name:"学习教育",
		redirect:"/zbxxjl",
		meta: {
			title: '学习教育',
		},
		component: Layout,
		children:[
			{
				path:"/zbxxjl",
				name:"zbxxjl",
				meta: {
					title: '支部学习记录',
					index:"/zbxxjl",
				},
				component: () => import('@/pages/xxjy/zbxxjl')
			},
			{
				path:"/grxxjl",
				name:"grxxjl",
				meta: {
					title: '个人学习任务',
					index:"/grxxjl",
				},
				component: () => import('@/pages/xxjy/grxxjl')
			},
			{
				path:"/grxx_detaill",
				name:"grxx_detaill",
				meta: {
					title: '个人学习任务详情',
					index:"/grxxjl",
				},
				component: () => import('@/pages/xxjy/grxxjl/grxx_detaill')
			},
			{
				path:"/grxx_add",
				name:"grxx_add",
				meta: {
					title: '个人学习任务新增',
					index:"/grxxjl",
				},
				component: () => import('@/pages/xxjy/grxxjl/grxx_add')
			},
			{
				path:"/xxjy_zxks",
				name:"xxjy_zxks",
				meta: {
					title: '在线考试',
					index:"/xxjy_zxks",
				},
				component: () => import('@/pages/xxjy/xxjy_zxks')
			},
			{
				path:"/zxks_detail",
				name:"zxks_detail",
				meta: {
					title: '在线考试详情',
					index:"/xxjy_zxks",
				},
				component: () => import('@/pages/xxjy/xxjy_zxks/zxks_detail')
			},
			{
				path:"/add_ks",
				name:"add_ks",
				meta: {
					title: '新增考试',
					index:"/xxjy_zxks",
				},
				component: () => import('@/pages/xxjy/xxjy_zxks/components/add_ks')
			},
			{
				path:"/xxjy_ztlist",
				name:"xxjy_ztlist",
				meta: {
					title: '专题资料库',
					index:"/xxjy_ztlist",
				},
				component: () => import('@/pages/xxjy/xxjy_ztlist')
			},
			{
				path:"/ztlist",
				name:"ztlist",
				meta: {
					title: '专题内容',
					index:"/xxjy_ztlist",
				},
				component: () => import('@/pages/xxjy/xxjy_ztlist/ztlist.vue')
			},
			{
				path:"/add_zt",
				name:"add_zt",
				meta: {
					title: '新建专题',
					index:"/xxjy_ztlist",
				},
				component: () => import('@/pages/xxjy/xxjy_ztlist/components/add_zt')
			},
			{
				path:"/add_nr",
				name:"add_nr",
				meta: {
					title: '新建内容',
					index:"/xxjy_ztlist",
				},
				component: () => import('@/pages/xxjy/xxjy_ztlist/components/add_nr')
			},
			{
				path:"/xxjy_sjgl",
				name:"xxjy_sjgl",
				meta: {
					title: '试卷管理',
					index:"/xxjy_sjgl",
				},
				component: () => import('@/pages/xxjy/xxjy_sjgl')
			},
			{
				path:"/add_sj",
				name:"add_sj",
				meta: {
					title: '新增试卷',
					index:"/xxjy_sjgl",
				},
				component: () => import('@/pages/xxjy/xxjy_sjgl/components/add_sj')
			},
			{
				path:"/add_sjzj",
				name:"add_sjzj",
				meta: {
					title: '新增随即组卷',
					index:"/xxjy_sjgl",
				},
				component: () => import('@/pages/xxjy/xxjy_sjgl/components/add_sjzj')
			},
			{
				path:"/xxjy_stgl",
				name:"xxjy_stgl",
				meta: {
					title: '试题管理',
					index:"/xxjy_stgl",
				},
				component: () => import('@/pages/xxjy/xxjy_stgl')
			},
			{
				path:"/add_st",
				name:"add_st",
				meta: {
					title: '试题管理',
					index:"/xxjy_stgl",
				},
				component: () => import('@/pages/xxjy/xxjy_stgl/components/add_st')
			},
			{
				path:"/stlist",
				name:"stlist",
				meta: {
					title: '试题题干列表',
					index:"/xxjy_stgl",
				},
				component: () => import('@/pages/xxjy/xxjy_stgl/stlist')
			},
			{
				path:"/add_tg",
				name:"add_tg",
				meta: {
					title: '新增题干',
					index:"/xxjy_stgl",
				},
				component: () => import('@/pages/xxjy/xxjy_stgl/components/add_tg')
			},
		]
	},
	{
		path:"/rcbg",
		name:"日常办公",
		redirect:"/rcbg_fbtz",
		meta: {
			title: '日常办公',
		},
		component: Layout,
		children:[
			{
				path:"/rcbg_fbtz",
				name:"rcbg_fbtz",
				meta: {
					title: '通知公告',
					index:"/rcbg_fbtz",
				},
				component: () => import('@/pages/rcbg/rcbg_fbtz')
			},
			{
				path:"/add_tz",
				name:"add_tz",
				meta: {
					title: '发布通知公告',
					index:"/rcbg_fbtz",
				},
				component: () => import('@/pages/rcbg/rcbg_fbtz/add_tz')
			},
			{
				path:"/fbtz_detail",
				name:"fbtz_detail",
				meta: {
					title: '通知公告详情',
					index:"/rcbg_fbtz",
				},
				component: () => import('@/pages/rcbg/rcbg_fbtz/fbtz_detail')
			},
			{
				path:"/rcbg_mess",
				name:"rcbg_mess",
				meta: {
					title: '消息中心',
					index:"/rcbg_mess",
				},
				component: () => import('@/pages/rcbg/rcbg_mess')
			},
			{
				path:"/rcbg_gzhb",
				name:"rcbg_gzhb",
				meta: {
					title: '工作汇报',
					index:"/rcbg_gzhb",
				},
				component: () => import('@/pages/rcbg/rcbg_gzhb')
			},
			{
				path:"/add_hb",
				name:"add_hb",
				meta: {
					title: '新增工作汇报',
					index:"/rcbg_gzhb",
				},
				component: () => import('@/pages/rcbg/rcbg_gzhb/add_hb')
			},
			{
				path:"/gzhb_detail",
				name:"gzhb_detail",
				meta: {
					title: '工作汇报详情',
					index:"/rcbg_gzhb",
				},
				component: () => import('@/pages/rcbg/rcbg_gzhb/gzhb_detail')
			},
		]
	},
	{
		path:"/xtsz",
		name:"系统设置",
		redirect:"/xtsz_dyzhgl",
		meta: {
			title: '系统设置',
		},
		component: Layout,
		children:[
			{
				path:"/xtsz_dyzhgl",
				name:"xtsz_dyzhgl",
				meta: {
					title: '党员账号管理',
					index:"/xtsz_dyzhgl",
				},
				component: () => import('@/pages/xtsz/zhgl/xtsz_dyzhgl')
			},
			{
				path:"/xtsz_dzzzhgl",
				name:"xtsz_dzzzhgl",
				meta: {
					title: '党组织账号管理',
					index:"/xtsz_dzzzhgl",
				},
				component: () => import('@/pages/xtsz/zhgl/xtsz_dzzzhgl')
			},
			{
				path:"/xtsz_dlrz",
				name:"xtsz_dlrz",
				meta: {
					title: '登录日志',
					index:"/xtsz_dlrz",
				},
				component: () => import('@/pages/xtsz/xtsz_dlrz')
			},
			{
				path:"/xtsz_xgmm",
				name:"xtsz_xgmm",
				meta: {
					title: '修改密码',
					index:"/xtsz_xgmm",
				},
				component: () => import('@/pages/xtsz/xtsz_xgmm')
			}
		]
	},
	{
		path:"/login",
		name:"login",
		meta: {
			title: '新时代党建后台登录',
		},
		component: () => import('@/pages/login')
	},
	{
		path:"*",
		name:"error",
		meta:{
			title:"错误"
		},
		component: () => import('@/pages/error') 
	},
]

export const routers = slideBar
