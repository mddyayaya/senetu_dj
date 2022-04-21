import { getSchoolList } from '@/setting/request/api' 
import base_url from '@/setting/request/config.js'
let that,app = getApp();

export default {
	data(){
		return{
			schoolList:[],
			schoolCount:0,
			mstCount:0,
			totalPage:0,
			keys:"",
			page:1,
			datas:base_url+"zyfxminiicon/datas.png",
			schoolIcon:base_url+"zyfxminiicon/school_icon.png",
			loadingStatus:'loading'
		}
	},
	onLoad: function (options) {
		that = this;
		
	},
	onShow: function () {
		that.getSchool();
	},
	onReachBottom: function () {
		that.page = that.page+1
		that.loadingStatus = 'loading'
		if(that.page>that.totalPage){
			that.page = that.totalPage
			that.loadingStatus = 'finish'
		}else{
			that.getSchool();
		}
	},
	methods:{
		// 学校详情
		goSchool(item){
			app.signed('/pages/admin/school/school?schoolid='+item.school_id+'&schoolname='+item.name+'&sid='+item.id)
		},
		// 学校列表
		getSchool(){
			getSchoolList({
				keys:that.keys,
				page:that.page
			}).then(res => {
				if(that.page == 1){
					if(res.data.pagedata.length > 0){
						that.schoolList = res.data.pagedata
						that.loadingStatus = "finish"
					}else{
						that.schoolList = []
						that.loadingStatus = "null"
					}
				}else{
					if(res.data.pagedata.length > 0){
						that.schoolList = that.schoolList.concat(res.data.pagedata)
						that.loadingStatus = "finish"
					}else{
						that.schoolList = that.schoolList
						that.loadingStatus = "finish"
					}
				}
				that.totalPage = res.data.total
				that.schoolCount = res.data.count
				that.mstCount = res.hall;
			})
		},
		// 搜索
		goSearch(){
		  getApp().signed('/pages/admin/search/search?type=search')
		},
	}
}