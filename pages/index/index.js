import {mstList} from '@/setting/request/api.js'
import {login} from '@/setting/request/toyarequest.js'
		
let that;
let app = getApp();
export default {
	data(){
		return{
			loadingStatus:'null',
			page:1,
			total:0,
			lists:[],
			has:{},
			showBtn:false
		}
	},
	onLoad() {
		that = this;
	},
	onShow(){
		that = this;
		app.getUserinfo().then(res => {
			if(res){
				that.schoolHallList();
			}else{
				that.showBtn = true
			}
		})
	},
	methods:{
		// 学校面试厅列表
		schoolHallList(){
			mstList({
			  sid:app.globalData.userinfo.sid
			}).then(res => {
				that.showBtn = false
			  if(res.data.length>0){
					that.lists = res.data
					that.loadingStatus = 'finish'
			  }else{
				that.lists = []
				that.loadingStatus = 'null'
			  }
			})
		},
		// 立即预约
		jumpSet(item){
			let hid = item.id,
			mstaddress = item.hall_address,
			mstname = item.hall_name,
			type1 = item.type1,
			type2 = item.type2;
			login(item.home_id);
			app.signed('/pages/user/appoint/appoint?hid='+hid+'&mstaddress='+mstaddress+'&mstname='+mstname+'&type1='+type1+'&type2='+type2)
		},
		getusers(){
			uni.navigateTo({
				url:"/pages/getPermission/getPermission"
			})
		}
	}
}