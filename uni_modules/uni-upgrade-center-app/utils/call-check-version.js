export default function() {
	// #ifdef APP-PLUS
	return new Promise((resolve, reject) => {
		plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
			uniCloud.callFunction({
				name: 'check-version',
				data: {
					appid: plus.runtime.appid,
					appVersion: plus.runtime.version,
					wgtVersion: widgetInfo.version
				},
				success: (e) => {
					resolve(e)
				},
				fail: (err) => {
					reject(err)
				}
			})
		})
	})
	// #endif
	// #ifndef APP-PLUS
	return new Promise((resolve, reject) => {
		reject({
			message: '请在App中使用'
		})
	})
	// #endif
}
