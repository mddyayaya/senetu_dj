import { appointCancel,endAppoint } from '@/setting/request/api'
import { oneKey } from '@/setting/common/controls.js' 
import { stamps } from '@/setting/common/index.js' 
let app = getApp();
let that;
export default {
	data(){
		return{
			show:false,
			order_id:"",
			nowTime:stamps()
		}
	},
	props:{
		lists:{
		  type:Array,
		  value:[],
		}
	},
	created(){that = this;},
	methods: {
		// 取消预约
		sureCancel(){
			appointCancel({
				uid:app.globalData.userinfo.uid,
				order_id:that.order_id
			}).then(res => {
				if(res.data.info){
					that.$emit('appointList');
					that.show = false;
				}else{
					uni.showToast({
						title: res.message,
						icon:"none"
					})
				}
			})
		},
		// 修改时间
		edittime(item){
			app.signed("/pages/user/appoint/appoint?order_id="+item.order_id+'&hid='+item.hid);
		},
		cancels(data){
			uni.showModal({
				content:"确定取消该条预约嘛？",
				title:"取消预约",
				showCancel:true,
				success(res) {
					if(res.confirm){
						appointCancel({
							uid:app.globalData.userinfo.uid,
							order_id:data.order_id
						}).then(res => {
							if(res.data.info){
								that.$emit('appointList');
								that.show = false;
							}else{
								uni.showToast({
									title: res.message,
									icon:"none"
								})
							}
						})
					}
				}
			})
		},
		godetail(item){
			if(item.type != 3&&item.type != 4){
				app.signed("/pages/user/uselogdetail/uselogdetail?item="+JSON.stringify(item));
			}
		},
		// 关闭设备
		closeDev(hid,order_id){
			oneKey(hid,'close')
			endAppoint({
				order_id:order_id,
				ending:1
			}).then(res => {
				if(res.data.info){
					that.$emit('appointList');
				}else{
					uni.showToast({
						title:res.messae,
						icon:"none"
					})
				}
			})
		},
		// 结束使用
		endUse(item){
			let endTime = new Date(item.day+' '+item.end_time).getTime();
			if(that.nowTime<endTime){
				uni.showModal({
					content:"未到结束时间，确定结束使用吗？",
					title:"结束使用",
					showCancel:true,
					success(res) {
						if(res.confirm){
							that.closeDev(item.home_id,item.order_id)
						}
					}
				})
			}else{
				that.closeDev(item.home_id,item.order_id)
			}
		}
	}
}
