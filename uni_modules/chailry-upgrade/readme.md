## 使用说明
### 使用云端一体（无需额外开发服务端代码）
* 1.将此项目导入自己的项目工程
* 2.导入 [app版本升级管理的uni-admin插件](https://ext.dcloud.net.cn/plugin?id=4250) （跳过步骤3）
* 3.如果你的项目没有用到uni-admin你可以忽略步骤2只上传此项目中的database目录下的client-version.schema.json后直接通过uniCloud web控制台操作版本管理数据（
* 4.将版本检测函数导入需要使用的页面（一般在app.vue中的onLaunch导入或者首页导入)
```vue
	import {checkVersion} from '@/uni_modules/chailry-upgrade/static/js_sdk/check-version.js'
	//调用版本检测函数
	onLoad() {
		checkVersion();
	},
```

