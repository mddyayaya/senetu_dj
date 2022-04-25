document.writeln("<meta HTTP-EQUIV=\'pragma\' CONTENT=\'no-cache\'> ");
document.writeln("<meta HTTP-EQUIV=\'Cache-Control\' CONTENT=\'no-store, must-revalidate\'> ");
document.writeln("<meta HTTP-EQUIV=\'expires\' CONTENT=\'Wed, 26 Feb 1997 08:21:57 GMT\'> ");
document.writeln("<meta HTTP-EQUIV=\'expires\' CONTENT=\'0\'>");

// 判断操作系统
var http,http1;
http = window.location.protocol+"//dj.gxsentu.net/?c=d_two_api&m=";
http1 = window.location.protocol+"//dj.gxsentu.net/?c=d_three_api&m=";

var user;

var time1 = new Date("2021-12-14").getTime();
var time = new Date().getTime();
if(time1 <= time){
	$('html').removeClass("zhe")
}else{
	$('html').addClass("zhe")
}

// 判断是否有cookie
if($.cookie('userInfo') != null){
	user = JSON.parse($.cookie('userInfo'));
}else{
	user = "";
}

// esc返回
$(document).keydown(function(event){
	if(event.keyCode == 27){
		window.history.back(-1);
	}
})
function postData(url, datas, callback) {
	$.ajax({
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		cache : false,
		dataType : "json",
		type : "POST",
		url : http+url,
		data : datas,
		async : true,
		beforeSend:function(request) {
			$('.loading').show()
		},
		contentType : "application/json",
		error : function(request) {
			if (callback)callback(request);
		},
		success : function(data) {
			$('.loading').hide()
			if (callback)callback(data);
		}
	});
}
function getData(url, callback) {
	$.ajax({
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		cache : false,
		dataType : "json",
		type : "GET",
		url : http+url,
		// dataType: "jsonp",
		// jsonp: "jsoncallback",
		async : true,
		beforeSend:function(request) {
			$('.loading').show()
		},
		contentType : "application/json",
		error : function(request) {
			$('.loading').hide()
			if (callback)callback(request);
		},
		success : function(data) {
			$('.loading').hide()
			if (callback)callback(data);
		}
	});
}
// 3.0
function postDataThree(url, datas, callback) {
	$.ajax({
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		cache : false,
		dataType : "json",
		type : "POST",
		url : http1+url,
		data : datas,
		async : true,
		beforeSend:function(request) {
			$('.loading').show()
		},
		contentType : "application/json",
		error : function(request) {
			if (callback)callback(request);
		},
		success : function(data) {
			$('.loading').hide()
			if (callback)callback(data);
		}
	});
}
function getDataThree(url, callback) {
	$.ajax({
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		cache : false,
		dataType : "json",
		type : "GET",
		url : http1+url,
		// dataType: "jsonp",
		// jsonp: "jsoncallback",
		async : true,
		beforeSend:function(request) {
			$('.loading').show()
		},
		contentType : "application/json",
		error : function(request) {
			$('.loading').hide()
			if (callback)callback(request);
		},
		success : function(data) {
			$('.loading').hide()
			if (callback)callback(data);
		}
	});
}
// 占位图
function setimg(img){
	for(var i=0;i<img.length;i++){
		if(img[i].img != null && img[i].img != ""){
			if(typeof(img[i].img) != "undefined" || img[i].img.search('png') != -1 || img[i].img.search('jpeg') != -1 || img[i].img.search('jpg') != -1){
				img[i].img = img[i].img
			}else{
				img[i].img = "img/loading.gif"
			}
		}else{
			img[i].img = "img/loading.gif"
		}
	}
	return img
}

 setting();
// 字体样式重写
function setting() {
	if(typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
		handleFontSize();
	} else {
	if(document.addEventListener) {
			document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
		} else if(document.attachEvent) {
			document.attachEvent("WeixinJSBridgeReady", handleFontSize);
			document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
		}
	}
	function handleFontSize() {
		// 设置网页字体为默认大小
		WeixinJSBridge.invoke('setFontSizeCallback', {
			'fontSize': 0
		});
		// 重写设置网页字体大小的事件
		WeixinJSBridge.on('menu:setfont', function() {
			WeixinJSBridge.invoke('setFontSizeCallback', {
			'fontSize': 0
			});
		});
	}
}
// 获取参数
function getUrlParam(name) {
 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null){
		return decodeURI(r[2]);
	} else{
		return null;
	}    
}
// 鼠标悬浮特效
function hoverClass(classname){
	$(classname).find('img').css({
		transform: "scale(1.1)",
		transition: "0.5s",
	})
}
function outClass(classname){
	$(classname).find('img').css({
		transform: "scale(1)",
		transition: "0.5s",
	})
}

// 关闭资源包
function closeBag(){
	$('.blackMark').hide();
	$('.resource-packages').hide();
}
// 打开资源包
function openBag(template,title,ft_id,rid){
	var html = '';
	$('.name1').text("");
	$('.select-content-item').html("");
	postData("speciaList",{template:template,ft_id:ft_id,rid:rid},function(res){
		if(res.code == 200){
			if(res.data != null){
				$('.name1').text(title);
				for(var i=0;i<res.data.length;i++){
					if(res.data[i].bs_id == 1){
						res.data[i].bsid1 = 'PPT'
					}else if(res.data[i].bs_id == 2){
						res.data[i].bsid1 = '图文'
					}else if(res.data[i].bs_id == 3){
						res.data[i].bsid1 = '视频'
					}else if(res.data[i].bs_id == 4){
						res.data[i].bsid1 = '音频'
					}else if(res.data[i].bs_id == 8){
						res.data[i].bsid1 = 'PDF'
					}
					html += '<div class="main-body-item body-item1" id='+res.data[i].id+' bsid='+res.data[i].bs_id+' id="PPT1"><a><img src="'+res.data[i].sz_img+'"/></a><i class="tips">'+res.data[i].bsid1+'</i><span>'+res.data[i].title+'</span></div>'
				}
				$('.select-content-item').html(html)
				$('.body-item1').click(function(){
					var id = $(this).attr("id");
					var bsid = $(this).attr("bsid");
					showDetail(bsid,id,3,1)
				})
			}
		}
	})
	$('.blackMark').show();
	$('.resource-packages').show();
}
// 详情页面
function showDetail(bsid,id,type,flag){
	// 1：个人学习 2：重点党课 3：浏览记录
	// flag 2:自建专题  1：党建专题
	if(bsid == 1){
		// ppt
		window.location.href = 'pptDetail.html?id='+id+'&type='+type+'&flag='+flag
	}else if(bsid == 2){
		// 图文
		window.location.href = 'pic.html?id='+id+'&type='+type+'&flag='+flag;
	}else if(bsid == 3){
		// 视频
		window.location.href = 'videoDetial.html?id='+id+'&type='+type+'&flag='+flag;
	}else if(bsid == 4){
		// 音频
		window.location.href = 'audioDetial.html?id='+id+'&type='+type+'&flag='+flag;
	}else if(bsid == 8){
		// pdf
		window.location.href = 'pdfDetial.html?id='+id+'&type='+type+'&flag='+flag;
	}
}
// 分页
function tabPage(tabPage) {
	layui.use('layer',function(){
		var layer = layui.layer;
	})
	// 类名
	var className = tabPage.className;
	/*获取内容列表*/
	var pageMain = $(tabPage.pageMain)
	/*获取分页*/;
	var pageNav = $(tabPage.pageNav);
	/*上一页*/
	var pagePrev = $(tabPage.pagePrev);
	/*下一页*/
	var pageNext = $(tabPage.pageNext);
	/*每页显示数*/
	var curNum = tabPage.curNum;
	// 总页数
	var total = tabPage.total;
	// 当前页码
	var page = 1;
	page = tabPage.page;
	var len = Math.ceil($('.'+className+'').length / curNum);
	$('.'+total+'').text(len);
	/*生成页码*/
	var iNum = 0;
	$('.'+className+'').hide();
	/************首页的显示*********/
	for (var i = 0; i < curNum; i++) {
		$('.'+className+'').eq(i).show();
	}
	/*下一页*/
	pageNext.click(function () {
	   $('.'+className+'').hide();
		if (iNum == len - 1) {
			for (var i = (len - 1) * curNum; i < len * curNum; i++) {
				$('.'+className+'').eq(i).show();
			}
			layer.msg("当前是最后一页",{anim:6,time:600})
		} else {
			iNum++;
			$('.'+page+'').text(iNum+1);
		}
		for (var i = iNum * curNum; i < (iNum + 1) * curNum; i++) {
			$('.'+className+'').eq(i).show();
		}
	});
	/*上一页*/
	pagePrev.click(function () {
		$('.'+className+'').hide();
		if (iNum == 0) {
			for (var i = 0; i < curNum; i++) {
				$('.'+className+'').eq(i).show()
			}
			layer.msg("当前是第一页",{anim:6,time:600})
			return false;
		} else {
			iNum--;
			$('.'+page+'').text(iNum+1);
		}
		for (var i = iNum * curNum; i < (iNum + 1) * curNum; i++) {
			$('.'+className+'').eq(i).show()
		}
	})
}

// 时间戳转化（数字到日期  年月日）
function toNumber(time){
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
// 时间戳转化（数字到日期  年月日时分秒）
function toNumber1(time){
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
		day = date.getDate() < 10 ? '0'+date.getDate():date.getDate(),
		hour = date.getHours() < 10 ? '0'+date.getHours():date.getHours(),
		minutes = date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes();
		return time = year + '-' +month + '-' + day+' ' + hour+':'+minutes;
	}else{
		time = "待填写"
	}
	return time;
}
// 不够10加0
function add0(n){
	if(n < 10){
		n = '0'+n
	}
	return n
}
// 资源类型转换
function changeSourceType(bsid){
	if(bsid == 1){
		bsid = "PPT"
	}else if(bsid == 2){
		bsid = "图文"
	}else if(bsid == 3){
		bsid = "视频"
	}else if(bsid == 4){
		bsid = "音频"
	}else if(bsid == 8){
		bsid = "PDF"
	}else if(bsid == 9){
		bsid = "WORD"
	}else if(bsid == 10){
		bsid = "EXCEL"
	}
	return bsid
}
// 资源浏览记录
function browHistory(hyid,hy_flag,type,rid,minute,total_minute,uid,flag){
	// type：1：个人会议学习记录，2：重点党课，3：浏览记录
	var data = {
		hyid:hyid,
		hy_flag:hy_flag,
		type:type,
		rid:rid,
		minute:minute,
		total_minute:total_minute,
		uid:uid,
		speed:2,
		flag:flag
	}
	if(total_minute - minute <=5){
		data.speed = 3
	}else{
		
	}
	postData("browseLog",data,function(res){
		
	})
}

// 资源签到
function resourceQd(hyid,hyflag,rid,bsid,status,time,type){
	if(user.dwid == 716 || user.flag == 4){
		if(time >= 180){
			var data = {
				uid:user.id,//个人id
				user_id:user.uid,//支部id
				flag :3,
				hyid :hyid,
				hyflag :hyflag,
				rid:rid,
				bsid:bsid,
				status :status,//2:个人 3:在线学习 4:签到
				type: type,//1:签到正常 2:签到迟到
				time:time,
			}
			postDataThree("addSign",data,function(res){
				if(status == 4){
					if(type == 1){
						$('#signed').html("签到成功");
					}else{
						$('#signed').html("签到迟到");
					}
				}
			})
		}
	}
}
// 滚动数字
function scrollNumber(id,num){
	$('#'+id+'').rollNum({
		deVal:num
	});
}
// 秒转课时
function changeClasstime(second){
	var second = (parseInt(second) / 60 / 45).toFixed(2);
	return second;
}
// 发展阶段转化
function changeDevelop(step){
	if(step == 1){
		step = "申请入党"
	}else if(step == 2){
		step = "积极分子"
	}else if(step == 3){
		step = "发展对象"
	}else if(step == 4){
		step = "预备党员"
	}else if(step == 5){
		step = "已转正"
	}
	return step;
}
function changeType(offer){
	if(offer != null){
		offer = parseInt(offer)
		if(offer == 1){
			offer = "国有企业党组织"
		}else if(offer == 2){
			offer = "集体企业党组织"
		}else if(offer == 3){
			offer = "非公有制经济党组织"
		}else if(offer == 4){
			offer = "事业单位党组织"
		}else if(offer == 5){
			offer = "各级党和国家机关党组织"
		}else if(offer == 6){
			offer = "村党组织"
		}else if(offer == 7){
			offer = "社区党组织"
		}else if(offer == 8){
			offer = "社会团体党组织"
		}else if(offer == 9){
			offer = "高校党组织"
		}else if(offer == 10){
			offer = "离退休干部职工党组织"
		}
		return offer;
	}else{
		return offer = "";
	}
}
// 学历转化
function changeEdu(offer){
	if(offer != null){
		offer = parseInt(offer)
		if(offer == 1){
			offer = "小学"
		}else if(offer == 2){
			offer = "初中"
		}else if(offer == 3){
			offer = "高中"
		}else if(offer == 4){
			offer = "专科"
		}else if(offer == 5){
			offer = "本科"
		}else if(offer == 6){
			offer = "硕士"
		}else if(offer == 7){
			offer = "博士"
		}
		return offer;
	}else{
		return offer = "";
	}
}
// 民族转化

const changeNation1 = async () => {
	let arr = (await $.ajax({
			type:'get',
			url:"http://dj.gxsentu.net/people/?c=d_two_api&m=nation",
		}))
	return JSON.parse(arr).data
}
const changeNation = async (nation) => {
	if(nation!=''&&nation!=null&&nation!='0'){
		const nationlist = await changeNation1();
		for(var i=0;i<nationlist.length;i++){
			if(nation == nationlist[i].value){
				nation = nationlist[i].option;
				return nation;
			}
		}
	}else{
		return '未填写'
	}
}

function resize(obj){ 
	var ifrm=obj.contentWindow.document.body; 
	ifrm.style.cssText="margin:0px;padding:0px;overflow:hidden;width: 100%;";
	var div = document.createElement("img");
	div.src = obj.src; 
	obj.height = div.height; 
	obj.width = ifrm.width;
}