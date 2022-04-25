'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const res = await uniCloud.getPhoneNumber({
		appid: '__UNI__14BD300',
		provider: 'univerify',
		apiKey: '0c8f4490c28bce9a907cadcb88b0098c', // 在开发者中心开通服务并获取apiKey
		apiSecret: '2786c605a6661de8f0f53cd364f22621', // 在开发者中心开通服务并获取apiSecret
		access_token: event.access_token,
		openid: event.openid
	})
	//返回数据给客户端
	return res
};
