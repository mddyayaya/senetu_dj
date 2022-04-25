export const checkVersion = function() {
	
	// uniCloud.callFunction({
	// 		name: 'business-api', //云函数名称
	// 		data: {
	// 			action: 'public/checkVersion',
	// 			data: {
	// 				device: uni.getSystemInfoSync().platform
	// 			}
	// 		},
	// 	})
	// 	.then(res => {
	// 		const data = res.result.data;
	// 		console.log(data)
	// 		if (data.version!==widgetInfo.version) {
	// 				console.log(1111111)
	// 			uni.navigateTo({
	// 				url:'/pages/public/checkVersion?data='+JSON.stringify(data)
	// 			})
	// 		}
	// 	}).catch(res => {
	// 	});
	plus.runtime.getProperty(plus.runtime.appid, (widgetInfo)=> {
		uniCloud.callFunction({
				name: 'business-api', //云函数名称
				data: {
					action: 'public/checkVersion',
					data: {
						device: uni.getSystemInfoSync().platform
					}
				},
			})
			.then(res => {
				console.log(res)
				const data = res.result.data;
				if (data.version!==widgetInfo.version) {
					uni.navigateTo({
						url:'/pages/public/checkVersion?data='+JSON.stringify(data)
					})
				}
			}).catch(res => {
				console.log(res)
			});
	}); 
}
