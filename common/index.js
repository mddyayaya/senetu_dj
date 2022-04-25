import { zhaunti } from "@/request/api.js"
// 时间戳转化
export const changeTime = time => {
	if(parseInt(time) > 0 && time != null && time != ''){
		if(time.length <= 7){
			time = parseInt(time) * 1000000
		}else if(time.length >= 12){
			time = parseInt(time)
		}else{
			time = parseInt(time)*1000
		}
	}
	if(time != 0 && time != null && time != ''){
		var date = new Date(time),
		year = date.getFullYear(),
		month = (date.getMonth() + 1) < 10 ? '0'+(date.getMonth() + 1):(date.getMonth() + 1),
		day = date.getDate() < 10 ? '0'+date.getDate():date.getDate();
		return time = year + '-' +month + '-' + day;
	}else{
		return time = "暂无数据"
	}
	return time;
}
// 正常时间戳转化
export const changeTime1 = time => {
	if(time != 0 && time != null && time != ''){
		var date = new Date(time),
		year = date.getFullYear(),
		month = (date.getMonth() + 1) < 10 ? '0'+(date.getMonth() + 1):(date.getMonth() + 1),
		day = date.getDate() < 10 ? '0'+date.getDate():date.getDate();
		return time = year + '-' +month + '-' + day;
	}else{
		return time = "暂无数据"
	}
	return time;
}

// 无网络重载
export const noNetReload = () => {
	console.log(123)
	uni.reLaunch()
}

// 详情页面跳转
export const goDetail = (bsid,id,url) => {
	if(bsid == 1){
		// ppt
	}else if(bsid == 3){
		// 视频
		uni.navigateTo({
			url:"/pages/videoDetail/videoDetail.vue?id="+id
		})
	}else if(bsid == 8){
		// pdf
		uni.downloadFile({
			url: url,
			success: function (res) {
				var filePath = res.tempFilePath;
				uni.openDocument({
					filePath: filePath,
					success: function (res) {
						console.log('打开文档成功');
					}
				});
			}
		});
	}else if(bsid == 2){
		// 图文
	}
}

// 近五年年份列表
export const yearList = () => {
	var arr = [];
	var year = new Date().getFullYear();
	for(var i=0;i<5;i++){
		arr.push(year--);
	}
	return arr
}

// 图片预览
export const previewImg = (index,arr) => {
	let imgsArray = [];
	for(let i=0;i<arr.length;i++){
		imgsArray.push(arr[i].sz_img);
	}
	uni.previewImage({
		current:index,
		urls:arr,
		// #ifdef APP-PLUS
		indicator:'number',
		loop:false
		// #endif
	})
}


// 资源类型转化
export const changeBsid = (bsid) => {
	if(bsid == 1){
		bsid="PPT"
	}else if(bsid == 2){
		bsid = "图文"
	}else if(bsid == 3){
		bsid="视频"
	}else if(bsid == 4){
		bsid = "音频"
	}else if(bsid == 8){
		bsid="PDF"
	}else{
		bsid="全景"
	}
	return bsid
}

// 分享
 export const shareResouce = (shareUrl) => {
	// 分享
	var that = this;
	//#ifdef APP-PLUS
		uni.shareWithSystem({
			summary: '',
			href: shareUrl,
			success(){
			// 分享完成，请注意此时不一定是成功分享
			},
			fail(){
			// 分享失败
			}
		})
	//#endif
 }
 
 
 // 检测手机号
 export const checkPhone = (value) =>{
 	if (!value){
		uni.showToast({
			title:"请输入手机号",
			icon:"none",
			position:"bottom"
		})
		return false
 	}else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))){
		uni.showToast({
			title:"请输入正确的手机号",
			icon:"none",
			position:"bottom"
		})
		return false
 	}else{
		return true
	}
 }