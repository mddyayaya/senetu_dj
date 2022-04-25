import { get , post } from './api';

export const userControl = {
	// 登录
	login:(data) => post('?c=d_two_api&m=login', data),
	// 左侧导航
	slide_bar:(data) => post('?c=d_two_api&m=columnList', data),
}
// 组织概况
export const zzgk = {
	// 传入user_id  flag   year
	zzgkData:(data) => post('?c=d_two_api&m=organProfile', data),
	// 修改党委信息   
	editDw:(data) => post('?c=d_two_api&m=updateDw', data),
}

// 党建宣传
export const djxc = {
	// 支部要闻
	zbNews:(data) => post('?c=d_two_api&m=news', data),
	// 支部要闻详情
	zbNewsDetail:(data) => get('?c=d_two_api&m=updateNews&id='+data),
	// 新增支部要闻
	zbNewsAdd:(data) => post('?c=d_two_api&m=addNews',data),
	// 编辑支部要闻
	zbNewsUpdate:(data) => post('?c=d_two_api&m=updateNews',data),
	// 删除支部要闻
	zbNewsDel:(data) => post('?c=d_two_api&m=delNews',data),
	
	// 支部风采
	zbfc:(data) => post('?c=d_two_api&m=zbfc', data),
	// 支部风采详情
	zbfcDetail:(data) => get('?c=d_two_api&m=updateZbfc&id='+data),
	// 支部列表无分页
	partyOrgan:(data) => post('?c=d_two_api&m=partyOrgan', data),
	// 新增支部风采
	zbfcAdd:(data) => post('?c=d_two_api&m=addZbfc',data),
	// 编辑支部风采
	zbfcUpdate:(data) => post('?c=d_two_api&m=updateZbfc',data),
	// 删除支部风采
	zbfcDel:(data) => post('?c=d_two_api&m=delZbfc',data),
	
	// 党员风采
	dyfc:(data) => post('?c=d_two_api&m=dyfc', data),
	// 党员风采详情
	dyfcDetail:(data) => get('?c=d_two_api&m=updateDyfc&id='+data),
	// 新增党员风采
	dyfcAdd:(data) => post('?c=d_two_api&m=addDyfc',data),
	// 编辑党员风采
	dyfcUpdate:(data) => post('?c=d_two_api&m=updateDyfc',data),
	// 删除党员风采
	dyfcDel:(data) => post('?c=d_two_api&m=delDyfc',data),


	// 新增品牌保障
	// 品牌保障详情
	updateBrand:(data) => get('?c=d_two_api&m=updateBrand&id='+data.id),
	// 新增品牌保障
	updateBrands:(data) => post('?c=d_two_api&m=updateBrand',data),
}

/* 党务管理 */
 
export const dwgl = {
	// 党费统计
	dftj:(data) => post('?c=d_two_api&m=parties', data),
	// 删除党费统计
	dftjDel:(data) => post('?c=d_two_api&m=delParties', data),
	// 导出表格
	dftjDaochu:(data) => post('?c=d_two_api&m=exportPartyOrgan', data),
	// 党员列表
	dyList:(data) => post('?c=d_two_api&m=memberAdmin', data),
	// 组织类型列表
	organClass:() => get('?c=d_two_api&m=organClass').then(res => {
		return res.data
	}),
	// 上级组织
	pOrgan:(data) => post('?c=d_two_api&m=pOrgan', data),
	// 删除组织
	delOrgan:(data) => post('?c=d_two_api&m=delOrgan', data),
	// 新增党组织
	addOrgan:(data) => post('?c=d_two_api&m=addOrgan', data),
	// 支部列表有分页
	partyOrgan:(data) => post('?c=d_two_api&m=partyOrgan2', data),
	// 查看党组织数据
	updateOrgan:(data) => get('?c=d_two_api&m=updateOrgan&id='+data.id+'&flag='+data.flag+'&pid='+data.p_id),
	// 导出党组织详情页表格
	exportPartyOrgan:(data) => post('?c=d_two_api&m=exportPartyOrgan', data).then(res => {
		window.location.href = res.link;
	}),
	// 编辑支部信息
	updateOrgan1:(data) => post('?c=d_two_api&m=updateOrgan', data),
	// 查看党组织成员
	memberAdmin:(data) => post('?c=d_two_api&m=memberAdmin',data),
	// 活动记录
	activity:(data) => post('?c=d_two_api&m=activity',data),
	// 删除互动
	delActivity:(data) => post('?c=d_two_api&m=delActivity',data),
	// 活动人员选择
	organMember:(data) => post('?c=d_two_api&m=organMember',data),
	// 活动类型列表
	hyClass:() => get('?c=d_two_api&m=hyClass').then(res => {
		return res.data
	}),
	// 新增活动
	addActivity:(data) => post('?c=d_two_api&m=addActivity',data),
	// 编辑活动数据绑定
	updateActivity:(data) => get('?c=d_two_api&m=updateActivity&flag='+data.flag+'&hyid='+data.hyid+'&pub_flag='+data.pub_flag),
	// 编辑提交
	updateActivity1:(data) => post('?c=d_two_api&m=updateActivity',data),
	// 提交会议记录
	addHyLog:(data) => post('?c=d_two_api&m=addHyLog',data),
	// 星级评定列表
	starApproval:(data) => post('?c=d_two_api&m=starApproval',data),
	// 星级规则列表
	starDefault:(data) => post('?c=d_two_api&m=starDefault',data),
	// 星级规则更新
	updateStarRole:(data) => post('?c=d_two_api&m=updateStarRole',data),
	// 党委重新打分
	starDoApproval:(data) => post('?c=d_two_api&m=starDoApproval',data),
	
	// 经费下拨列表
	funds:(data) => post('?c=d_two_api&m=funds',data),
	// 新增党费
	addParties:(data) => post('?c=d_two_api&m=addParties',data),
	// 批量新增党费
	excelPutData:(data) => post('?c=d_two_api&m=excelPutData',data),
	// 编辑党费
	updateParties:(data) => post('?c=d_two_api&m=updateParties',data),
	// 新增经费下拨
	addFunds:(data) => post('?c=d_two_api&m=addFunds',data),
	// 经费下拨修改
	updateFunds:(data) => post('?c=d_two_api&m=updateFunds',data),
	// 经费删除
	delFunds:(data) => post('?c=d_two_api&m=delFunds',data),
	// 组织所在地列表
	provinceList:(data) => post('?c=d_two_api&m=provinceList',data),
	// 新增组织所在地列表
	addProvince:(data) => post('?c=d_two_api&m=addProvince',data),
	// 台账经费单位列表
	standCompany:(data) => post('?c=d_two_api&m=standCompany',data),
	// 台账经费列表
	standPartiesList:(data) => post('?c=d_two_api&m=standPartiesList',data),
	// 删除台账经费
	delStandParties:(data) => post('?c=d_two_api&m=delStandParties',data),
	// 新增台账经费
	addStandParties:(data) => post('?c=d_two_api&m=addStandParties',data),
	// 编辑台账经费
	updateStandParties:(data) => post('?c=d_two_api&m=updateStandParties',data),
	// 导出台账
	exportStandParites:(data) => post('?c=d_two_api&m=exportStandParites',data).then(res => {
		window.location.href = res.link;
	}),
	
	//黔江烟草列表
	scoreCheckList:(data) => post('?c=d_two_api&m=scoreCheckList',data),
	//黔江烟草打分
	addMemberScore:(data) => post('?c=d_two_api&m=addMemberScore',data),
	//黔江烟草重新打分
	updateMemberScore:(data) => post('?c=d_two_api&m=updateMemberScore',data),
	//黔江烟草重新打分绑定
	updateMemberScoreGet:(data) => get('?c=d_two_api&m=updateMemberScore&uid='+data.uid),
	starSelectApproval:(data) => post('?c=d_two_api&m=starSelectApproval',data),

	// 活动应参与人员
	memberAttendMeet:(data) => post('?c=d_two_api&m=memberAttendMeet',data),
	// 查看请假人员
	updateAttentMeetGet:(data) => get('?c=d_two_api&m=updateAttentMeet&hyid='+data.hyid+'&hyflag='+data.hyflag),
	// 请假
	updateAttentMeet:(data) => post('?c=d_two_api&m=updateAttentMeet',data),
	// 党员得分列表
	memberStarList:(data) => post('?c=d_two_api&m=memberStarList',data),
	// 党员打分分类列表
	memberSelectStar:(data) => post('?c=d_two_api&m=memberSelectStar',data),
	// 党员打分
	memberDoStar:(data) => post('?c=d_two_api&m=memberDoStar',data),
}

// 树形结构
export const treeData = {
	treeData:(data) => post('?c=d_two_api&m=childList', data),
}

// 资源库
export const databank = {
	// 资源分类
	resouceClass:() => get('?c=d_two_api&m=resouceClass', ),
	// 资源列表  class_id: 2 page: 1 title
	resouceList:(data) => post('?c=d_two_api&m=resouceAll ',data),
}

// 党员管理
export const dygl = {
	// 党员身份列表
	dyclass:() => {
		var arr = [
			{level:"书记",zhiwu:1},
			{level:"副书记",zhiwu:2},
			{level:"委员",zhiwu:3},
		]
		return arr
	},
	// 领导班子
	leaderList:(data) => post('?c=d_two_api&m=leaderList ',data),
	// 党员信息详情
	updateMemberBind:(data) => get('?c=d_two_api&m=updateMember&id='+data.id),
	// 党员信息详情
	excelPutData:(data) => post('?c=d_two_api&m=excelPutData',data),
	// 删除党员
	delMember:(data) => post('?c=d_two_api&m=delMember ',data),
	// 党员学习记录详情type: 4活动记录   1：集中学习  id: 党员id
	leaderHyLog:(data) => post('?c=d_two_api&m=leaderHyLog ',data),
	// 发展党员管理列表
	userDevelop:(data) => post('?c=d_two_api&m=userDevelop ',data),
	// 发展党员审核通过 uid: 4021 u_zhiwu_status: 15
	userHave:(data) => post('?c=d_two_api&m=userHave',data),
	// 党员转出列表
	transferOutList:(data) => post('?c=d_two_api&m=transferOutList',data),
	// 党员转入列表
	transferIntoList:(data) => post('?c=d_two_api&m=transferIntoList',data),
	// 党员转入详情
	transferDetail:(data) => post('?c=d_two_api&m=transferDetail',data),
	// 党员转出提交
	transferOut:(data) => post('?c=d_two_api&m=transferOut',data),
	// 党员转入通过
	transferExamine:(data) => post('?c=d_two_api&m=transferExamine',data),
	// 民族列表
	nation:(data) => get('?c=d_two_api&m=nation'),
	// 新增党员
	addMember:(data) => post('?c=d_two_api&m=addMember',data),
	// 编辑党员
	updateMember:(data) => post('?c=d_two_api&m=updateMember',data),
	// 扫码新增党员
	generateQrcode:(data) => get('?c=d_two_api&m=generateQrcode&zbid='+data),
}

// 学习教育
export const xxjy = {
	// 支部学习记录列表
	branchStudyDetail:(data) => post('?c=d_two_api&m=branchStudyDetail',data),
	// 党员学习记录列表
	taskPersonStudy:(data) => post('?c=d_two_api&m=taskPersonStudy',data),
	// 专题资料库列表
	special:(data) => post('?c=d_two_api&m=special ',data),
	// 新增专题
	addSpecial:(data) => post('?c=d_two_api&m=addSpecial ',data),
	// 专题编辑绑定
	updateSpecial:(data) => get('?c=d_two_api&m=updateSpecial&id='+data.id),
	// 专题编辑保存
	updateSpecial1:(data) => post('?c=d_two_api&m=updateSpecial',data),
	// 删除专题
	delSpecial:(data) => post('?c=d_two_api&m=delSpecial ',data),
	// 专题内容
	selectSpecialContent:(data) => post('?c=d_two_api&m=selectSpecialContent ',data),
	// 专栏列表
	selectSpecialColumn:(data) => post('?c=d_two_api&m=selectSpecialColumn ',data),
	// 新增专题内内容
	addSpecialContent:(data) => post('?c=d_two_api&m=addSpecialContent ',data),
	// 删除专题内内容
	delContent:(data) => post('?c=d_two_api&m=delContent ',data),
	// 编辑内容绑定数据
	updateSpecialContent1:(data) => get('?c=d_two_api&m=updateSpecialContent&id='+data.id),
	// 编辑内容提交
	updateSpecialContent:(data) => post('?c=d_two_api&m=updateSpecialContent',data),
	// 新增专题内专栏
	addSpecialColumn:(data) => post('?c=d_two_api&m=addSpecialColumn ',data),
	
	// 在线考试列表
	assessmentList:(data) => post('?c=d_two_api&m=assessmentList ',data),
	// 在线考试新增
	addAssessment:(data) => post('?c=d_two_api&m=addAssessment ',data),
	// 在线考试编辑绑定
	updateAssessment1:(data) => get('?c=d_two_api&m=updateAssessment&id='+data.id),
	// 在线考试编辑
	updateAssessment:(data) => post('?c=d_two_api&m=updateAssessment ',data),
	// 在线考试详情
	selectAssessment:(data) => post('?c=d_two_api&m=selectAssessment ',data),
	// 在线考试参与人员
	selectAssessmentUser:(data) => post('?c=d_two_api&m=selectAssessmentUser ',data),
	// 删除在线考试
	delassessment:(data) => post('?c=d_two_api&m=delassessment ',data),
	// 新增试卷
	addTest:(data) => post('?c=d_two_api&m=addTest ',data),
	// 删除试卷
	delTest:(data) => post('?c=d_two_api&m=delTest ',data),
	// 编辑试卷绑定
	updateTest:(data) => get('?c=d_two_api&m=updateTest&id='+data.id),
	// 编辑试提交
	updateTest1:(data) => post('?c=d_two_api&m=updateTest ',data),
	
	// 试题管理列表
	questionClassList:(data) => post('?c=d_two_api&m=questionClassList ',data),
	// 新增试题分类
	addQuestionClass:(data) => post('?c=d_two_api&m=addQuestionClass ',data),
	// 删除试题分类
	delQuestionClass:(data) => post('?c=d_two_api&m=delQuestionClass ',data),
	// 试题题干列表
	questionList:(data) => post('?c=d_two_api&m=questionList ',data),
	// 删除题干
	delQuestion:(data) => post('?c=d_two_api&m=delQuestion ',data),
	// 全部试题题干列表
	allQuestionList:(data) => post('?c=d_two_api&m=allQuestionList ',data),
	// 新增题干
	addQuestion:(data) => post('?c=d_two_api&m=addQuestion ',data),
	// 编辑题干
	updateQuestion1:(data) => post('?c=d_two_api&m=updateQuestion ',data),
	// 编辑题干绑定数据
	updateQuestion:(data) => get('?c=d_two_api&m=updateQuestion&id='+data.id),
	// 试卷列表
	testList:(data) => post('?c=d_two_api&m=testList ',data),
	// 新增随即组卷
	randomTest:(data) => post('?c=d_two_api&m=randomTest ',data),
}

// 日常办公
export const rcbg = {
	// 上级通知
	notice:(data) => post('?c=d_two_api&m=notice ',data),
	// 我发布的通知
	myNotice:(data) => post('?c=d_two_api&m=myNotice ',data),
	// 通知详情
	noticeDetail:(data) => post('?c=d_two_api&m=noticeDetail ',data),
	// 新增通知
	pubNotice:(data) => post('?c=d_two_api&m=pubNotice ',data),
	// 查看汇报
	updateMyNotice:(data) => get('?c=d_two_api&m=updateMyNotice&id='+data.id+'&zbid='+data.zbid+'&flag='+data.flag),
	// 下级汇报
	suboNotice:(data) => post('?c=d_two_api&m=suboNotice ',data),
	// 删除通知、回报
	delNotice:(data) => post('?c=d_two_api&m=delNotice ',data),
	// 消息列表
	information:(data) => post('?c=d_two_api&m=information ',data),
	// 删除消息
	delInformation:(data) => post('?c=d_two_api&m=delInformation ',data),
}

// 系统设置
export const xtsz = {
	// 登录日志
	loginLog:(data) => post('?c=d_two_api&m=loginLog ',data),
	// 禁用账号党组织
	startDisable:(data) => post('?c=d_two_api&m=startDisable ',data),
	// 重置组织账号
	rePwd:(data) => post('?c=d_two_api&m=rePwd ',data),
	// 禁用账号党员
	updateMemberStatu:(data) => post('?c=d_two_api&m=updateMemberStatu ',data),
	// 重置党员账号
	resetUserPwd:(data) => post('?c=d_two_api&m=resetUserPwd ',data),
	// 修改密码
	updatePwd:(data) => post('?c=d_two_api&m=updatePwd ',data),
	// 同步过期时间
	synchroTime:(data) => post('?c=d_two_api&m=synchroTime ',data),
}

