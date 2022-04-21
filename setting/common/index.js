
// 明天
export const now = () => {
	let date = new Date(),
		year = date.getFullYear(),
		month = (date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1),
		days = date.getDate()<10?'0'+date.getDate():date.getDate(),
		day = year+'-'+month+'-'+days;
	return day
}
// 今天
export const tom = () => {
	let date = new Date(),
		year = date.getFullYear(),
		month = (date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1),
		toms = (date.getDate()+1)<10?'0'+(date.getDate()+1):(date.getDate()+1),
		tom = year+'-'+month+'-'+toms;
	return tom
}
// 时间转时间戳
export const stamps = () => {
	let date = new Date();
	let	year = date.getFullYear(),
		month = (date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1),
		day = date.getDate()<10?'0'+date.getDate():date.getDate(),
		hours = date.getHours()<10?'0'+date.getHours():date.getHours(),
		min = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
	let str = year+'-'+month+'-'+day+' '+hours+':'+min;
	let stamp = new Date(str).getTime();
	return stamp
}

// 时间转化
export const comput =  (start,end) => {
	let arr = [],value = 0;
	if(start.length >0){
		value = parseInt(start[0])-1
		for(let i=0;i<=end;i++){
			value+=1;
			arr.push(value)
		}
	}
	return arr.toString();
}


// 时间转化--最小时间限制
export const limitMin = (timeList) => {
	let hour = new Date().getHours();
	let minutes = new Date().getMinutes();
	let arr = []
	timeList.forEach(item => {
		let hours=0;
		hours = parseInt(item.time.split(":")[0])
		if(hours>=hour){
			arr.push(item)
		}
	})
	if(minutes>=0&&minutes<=30){
		arr = arr.splice(1,arr.length-1)
	}else{
		arr = arr.splice(2,arr.length-1)
	}
	return arr;
}
