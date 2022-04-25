module.exports = {
	// 支持webPack-dev-server的所有选项
	devServer: {
		host: "localhost",
		port: 8080, // 端口号
		https: false, // https:{type:Boolean}
		open: true, //配置自动启动浏览器
		// proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
	
		// 配置多个代理
		proxy: {
			"/api": {
				target: "http://qj.gxsentu.net",
				changeOrigin: true,
				// 重写路径
				pathRewrite: {
					'^/api': './'
				}
			},
		}
	},
	publicPath: './',
	transpileDependencies: process.env.NODE_ENV === "development" ? ["*"] : [],
	css: {
		loaderOptions: {
			sass: {
				//依次导入的公用的scss变量，公用的scss混入，共用的默认样式
				additionalData: `
				  @import "~@/common/css/index.scss";
				`
			}
		}
	}
}