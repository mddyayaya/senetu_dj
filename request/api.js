import { requests } from './index.js'


// 授权

export const shouquan = {
	// 小程序授权接口
	getwx:(data) => requests("?c=api_new&m=openid",data,'POST'),
	// 小程序获取手机号
	getPhone:(data) => requests("?c=api_new&m=getTel",data,'POST'),
	// 登录时间
	loginTime:(data) => requests("?c=api_new&m=loginTime",data,'POST'),
	// app授权
	getapp:(data) => requests("?c=api_new&m=appGeTel",data,'POST'),
	// app获取验证码
	getcode:(data) => requests("?c=api_new&m=sendPhoneCode",data,'POST'),
	// app获取验证码
	sendCode:(data) => requests("?c=api_new&m=regCodeLogin",data,'POST'),
}
// 首页
export const indexs = {
	// 首页轮播
	banner:(data) => requests("?c=api_index&m=banner",data,'POST'),
	// 用户栏目
	column_user:(data) => requests("?c=api_index&m=column_user",data,'POST'),
	// 用户栏目保存
	column_sub:(data) => requests("?c=api_index&m=column_sub",data,'POST'),
	// 品质资源
	recommend:(data) => requests("?c=api_index&m=recommend",data,'POST'),
	// 品质资源
	recommenDetail:(data) => requests("?c=api_index&m=recommenDetail",data,'POST'),
}

// 在线考试
export const zxks = {
	// 正确率数据
	average:(data) => requests("?c=api_examination&m=average",data,'POST'),
	// 已完成考试
	finishExam:(data) => requests("?c=api_examination&m=finishExam",data,'POST'),
	// 未完成考试
	incompleteExam:(data) => requests("?c=api_examination&m=incompleteExam",data,'POST'),
	// 未完成考试
	examineDetail:(data) => requests("?c=api_examination&m=examineDetail",data,'POST'),
	// 提交试卷
	makeTest:(data) => requests("?c=api_examination&m=makeTest",data,'POST'),
}

// 个人中心
export const userinfo = {
	// 基本信息
	info:(data) => requests("?c=api_info&m=info",data,'POST'),
	// 我的组织
	organ:(data) => requests("?c=api_info&m=organ",data,'POST'),
	// 我的组织成员
	memberList:(data) => requests("?c=api_member&m=memberList",data,'POST'),
	// 行为记录-活动记录
	activityList:(data) => requests("?c=api_info&m=activityList",data,'POST'),
	// 行为记录-考试记录
	examinationList:(data) => requests("?c=api_info&m=examinationList",data,'POST'),
	// 行为记录-缴费记录
	payList:(data) => requests("?c=api_info&m=payList",data,'POST'),
	// 获取用户信息
	updateInfo:(data) => requests("?c=api_info&m=updateInfo",data,'GET'),
	// 保存用户信息
	saveInfo:(data) => requests("?c=api_info&m=updateInfo",data,'POST'),
	// 我的收藏
	col_list:(data) => requests("?c=api_info&m=col_list",data,'POST'),
	// 取消收藏
	delCol:(data) => requests("?c=api_info&m=delCol",data,'POST'),
	// 步数
	daySteps:(data) => requests("?c=api_info&m=daySteps",data,'POST'),
	// 步数列表
	stepList:(data) => requests("?c=api_info&m=stepList",data,'POST'),
	// 步数进度
	stepSpeed:(data) => requests("?c=api_info&m=speed",data,'POST'),
	// 扫码签到
	sigin:(data) => requests("?c=d_three_api&m=addSign",data,'POST'),
}

// 日程
export const richeng = {
	// 日程列表
	schedule:(data) => requests("?c=api_index&m=schedule",data,'POST'),
	// 日程高亮
	scheduleTime:(data) => requests("?c=api_index&m=scheduleTime",data,'POST'),
}

// 专题
export const zhaunti = {
	// 专题分类
	specialClass:(data) => requests("?c=api_special&m=specialClass",data,'POST'), 
	// 专题分类
	classList:(data) => requests("?c=api_special&m=classList",data,'POST'), 
	// 专题更多
	moreList:(data) => requests("?c=api_special&m=moreList",data,'POST'), 
	// 资源详情
	resouceDetail:(data) => requests("?c=api_special&m=resouceDetail",data,'POST'), 
	// 资源收藏
	collection:(data) => requests("?c=api_info&m=collection",data,'POST'), 
	// 资源搜索
	search:(data) => requests("?c=api_special&m=search",data,'POST'), 
	// 资源热门搜索
	searcHot:(data) => requests("?c=api_special&m=searcHot",data,'POST'), 
	// 资源历史搜索
	searchLog:(data) => requests("?c=api_special&m=searchLog",data,'POST'), 
	// 分享资源
	shareLog:(data) => requests("?c=api_share&m=share_log",data,'POST'),
	// 学习时长
	studyLog:(data) => requests("?c=api_special&m=studyLog",data,'POST'),
	// 全景详情
	qjDetail:(data) => requests("?c=api_special&m=qjDetail",data,'POST'),
}


export const activity = {
	// 活动列表（三会一课）
	activity:(data) => requests("?c=api_shyk&m=activity",data,'POST'), 
	// 活动详情
	activityDetail:(data) => requests("?c=api_shyk&m=activityDetail",data,'POST'), 
	// 填写心得体会提交
	experience:(data) => requests("?c=api_shyk&m=experience",data,'POST'), 
	// 获取心得体会
	getExperience:(data) => requests("?c=api_shyk&m=experience",data,'GET'), 
	// 民主评议列表
	dmcraList:(data) => requests("?c=api&m=dmcraList",data,'POST'), 
}
