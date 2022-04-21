import {appointList} from '@/setting/request/api'
let app = getApp();
let that;

export default {
	data(){
		return{
			loadingStatus:'loading',
			lists:[],
			page:1,
			totalPage:0
		}
	},
	onLoad: function (options) {
		that = this;
	},
	onShow(){that.appointList()},
	methods:{
		// 预约列表
		appointList(){
			appointList({
				uid:app.globalData.userinfo.uid
			}).then(res => {
				if(that.page == 1){
					if(res.data.pagedata.length>0){
						that.lists = res.data.pagedata
						that.loadingStatus = 'finish'
					} else{
						that.lists = []
						that.loadingStatus = 'null'
					}
				}else{
					if(res.pagedata.length>0){
						that.lists = that.lists.concat(res.data.pagedata)
					} else{
						that.lists = that.data.lists
					}
					that.loadingStatus = 'finish'
				}
				that.totalPage = res.data.total
			})
		},
	},
	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		that.page = that.page+1
		if(that.page>that.totalPage){
			that.page = that.totalPage
			that.loadingStatus = 'finish'
		}else{
			that.appointList();
		}
	},
}
