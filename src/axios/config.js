let url_config = {
	baseUrl:process.env.NODE_ENV === 'development'?'http://10.164.143.28/people/':'http://10.164.143.28/people/',
	uploadFile:process.env.NODE_ENV === 'development'?'http://10.164.143.28/people/?c=d_two_api&m=uploadFile':'http://10.164.143.28/people/?c=d_two_api&m=uploadFile',
	uploadImg:process.env.NODE_ENV === 'development'?'http://10.164.143.28/people/?c=d_two_api&m=uploadImg':'http://10.164.143.28/people/?c=d_two_api&m=uploadImg',
}

export default url_config

