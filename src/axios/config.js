let url_config = {
	baseUrl:process.env.NODE_ENV === 'development'?'http://qj.gxsentu.net/people/':'http://qj.gxsentu.net/people/',
	uploadFile:process.env.NODE_ENV === 'development'?'http://qj.gxsentu.net/people/?c=d_two_api&m=uploadFile':'http://qj.gxsentu.net/people/?c=d_two_api&m=uploadFile',
	uploadImg:process.env.NODE_ENV === 'development'?'http://qj.gxsentu.net/people/?c=d_two_api&m=uploadImg':'http://qj.gxsentu.net/people/?c=d_two_api&m=uploadImg',
}

export default url_config

