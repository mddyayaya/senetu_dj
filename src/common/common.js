import { Message } from 'element-ui'
// 字符串JSON互相转化
export const changeString = data =>{
	if(typeof(data) == 'string'){
		data = JSON.parse(data)
	}else{
		data = JSON.stringify(data)
	}
	return data
}

// 近五年筛选年份列表
export const yearList = () => {
	var now = new Date().getFullYear();
	var arr = [];
	for(var i=0;i<5;i++){
		arr.push(now--);
	}
	return arr
}

// 月份筛选列表
export const monthList = () => {
	var arr = [];
	for(var i=0;i<12;i++){
		arr.push(i+1);
	}
	return arr
}

// 消息已读和未读转化
export const chengcat = iscat => {
	if(iscat == 1){
		iscat = "已读"
	}else{
		iscat = "未读"
	}
	return iscat;
}


// 检测手机号
export const checkPhone = (rule, value,callback) =>{
	if (!value){
		callback(new Error('请输入电话号码'))
	}else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))){
		callback(new Error('请输入正确的11位手机号码'))
	}else {
		callback()
	}
}

// 时间戳转字符串
export const changeTime = time => {
	if(time != null && time != ''){
		if(parseFloat(time)<0){
			// 负数
			time = parseFloat(time)
		}else{
			if(time.length == 10){
				time = parseFloat(time) * 1000
			}else if(time.length >= 13){
				time = parseFloat(time)
			}else{
				time = parseFloat(time)
			}
		}
		var date = new Date(time),
		year = date.getFullYear(),
		month = (date.getMonth() + 1) < 10 ? '0'+(date.getMonth() + 1):(date.getMonth() + 1),
		day = date.getDate() < 10 ? '0'+date.getDate():date.getDate();
		return time = year + '-' +month + '-' + day;
	}else{
		time = "待填写"
	}
	return time;
}

// 图片上传限制
export const limitImg = file => {
	var isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
	var isLt2M = file.size / 1024 / 1024 < 2;
	if (!isJPG) {
		Message.error('上传头像图片只能是 JPG 或者PNG格式!');
		return false;
	}
	if (!isLt2M) {
		Message.error('上传头像图片大小不能超过 2MB!');
		return false;
	}
}

// 图片上传限制
export const limitFile = file => {
	var isJPG = file.type === 'image/jpeg' 
			 || file.type === 'image/png' 
			 || file.type === 'image/jpg' 
			 || file.type === 'application/pdf'
			 || file.type === 'video/mp4'
			 || file.type === ' application/vnd.ms-powerpoint'
			 || file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
	var isLt2M = file.size / 1024 / 1024 < 200;
	if (!isJPG) {
		Message.error('请上传体统支持的文件格式');
		return false;
	}
	if (!isLt2M) {
		Message.error('上传文件大小不能超过 200MB!');
		return false;
	}
}

// 无数据占位文字
export const nodata = obj => {
	for(var i in obj){
		if(obj[i] == "" || obj[i] == null){
			obj[i] = "暂无数据"
		}
	}
	return obj
}

// 上传文件时候的bsid 
export const bsid = filetype => {
	console.log(filetype)
	if(filetype.search('pdf') != -1){
		// pdf
		filetype = 8
	}else if(filetype.search('mp4') != -1){
		// 视频
		filetype = 3
	}else if(filetype.search('ppt') != -1){
		// 视频
		filetype = 1
	}else if(filetype.search('pptx') != -1){
		// 视频
		filetype = 1
	}else{
		// 图文
		filetype = 2
	}
	return filetype
}

// 遍历树获取用户信息
export const getCascaderObj = (val, opt) => {
	return val.map(function (value, index, array) {
		for (var itm of opt) {
			if (itm.value == value) 
			{ opt = itm.children; return itm; }
		}
		return null;
	});
}

// 党内职务
export const changeZhiwu = (zhiwu) => {
	zhiwu =parseInt(zhiwu)
	if(zhiwu == 1){
		zhiwu = "书记"
	}else if(zhiwu == 2){
		zhiwu = "副书记"
	}else if(zhiwu == 3){
		zhiwu = "委员"
	}else if(zhiwu == 4){
		zhiwu = "党员"
	}else if(zhiwu == 5){
		zhiwu = "发展党员"
	}else if(zhiwu == 6){
		zhiwu = "列席党员"
	}else{
		zhiwu = "待填写"
	}
	return zhiwu;
}

// 发展阶段
export const developer = () => {
	var stepList = [
		{value:1,label:"申请入党"},
		{value:2,label:"积极分子"},
		{value:3,label:"发展对象"},
		{value:4,label:"预备党员"},
		{value:5,label:"转正考察"},
		{value:6,label:"已转正"}
	]
	return stepList
}

// 发展党员发展阶段转化
export const changeDev = (status) => {
	status = parseInt(status)
	if(status >= 1 && status<3){
		status = 1
	}else if(status >= 3 && status<7){
		status = 2
	}else if(status >= 7 && status<12){
		status = 3
	}else if(status >= 12 && status<19){
		status = 4
	}else if(status >= 19 && status < 24){
		status = 5						
	}else if(status >= 24){
		status = 6		
	}else{
		status = 0
	}
	return status;
}
