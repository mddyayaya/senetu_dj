// //开启推送
// #ifdef APP-PLUS
uni.subscribePush({
	provider: "unipush",
	success: function(res) {
	}
});
let osname = plus.os.name
uni.onPush({
	provider: "unipush",
	success: function() {
	},
	callback: function(data) {
		console.log("接收到透传数据：" + JSON.stringify(data));
		plus.push.createMessage(data.data, {});
	}
});
plus.push.addEventListener(
	"click",
  //这里写业务逻辑
	function(message) {
		uni.navigateTo({
			url: message.payload.pagePath  
		});
	},
	false
);
plus.push.addEventListener('receive',function(res){
	let options = {cover:false};
	console.log(res)
	console.log(res.content)
	plus.push.createMessage(res.content,res.payload,options);
},false)

// #endif

