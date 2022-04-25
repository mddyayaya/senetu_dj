<template>
	<view class="wrapper" style="position: relative;">
		<u-toast ref="uToast"></u-toast>
		<my-myinfo 
			type="info" 
			:u_name="u_name"
			:hasAoth="hasAoth"
			:hasPhone="hasPhone"
			:cy_zz="cy_zz"
			:integral="integral"
			:uid="uid"></my-myinfo>
		<view class="main_body mine_main">
			<view class="shadow_box box_all">
				<view class="shadow_title all_title">
					<view class="left">
						<view class="left_title">基本信息</view>
					</view>
				</view>
				<view class="all_modules" style="margin-top: 40rpx;">
					<view class="modules" 
						v-for="(item,index) in infoList">
						<view class="modules_image"><image :lazy-load="true" :src="item.icon" mode=""></image></view>
						<view class="modules_text"><text>{{item.name}}</text></view>
						<view class="modules_data"><text>{{item.data}}</text>{{item.danwei}}</view>
					</view>
				</view>
			</view>
			<view class="shadow_box box_all">
				<view class="shadow_title all_title">
					<view class="left">
						<view class="left_title">实用工具</view>
					</view>
				</view>
				<view class="all_modules" style="margin-top: 40rpx;">
					<view class="modules" 
						@click="godetail(item.url)"
						hover-class="hoverClass" 
						v-for="(item,index) in mineList">
						<view class="modules_image"><image :lazy-load="true" :src="item.icon" mode=""></image></view>
						<view class="modules_text"><text>{{item.name}}</text></view>
					</view>
				</view>
			</view>
		</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import { userinfo,shouquan,zhaunti } from '@/request/api.js'
	import config_url from '@/request/config.js'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				// 模块列表type 1：组织生活 2：学习教育
				mineList:[
					{icon:config_url+"statics/xcx_new/dyhx.png",name:"党员画像",url:""},
					// {icon:config_url+"statics/xcx_new/bjzl.png",name:"添加成员",url:"../addmembers/addmembers"},
					{icon:config_url+"statics/xcx_new/wdzz.png",name:"我的组织",url:"../myorange/myorange"},
					{icon:config_url+"statics/xcx_new/xwjl.png",name:"行为记录",url:"../xwjl/xwjl"},
					{icon:config_url+"statics/xcx_new/smdz.png",name:"扫一扫",url:"saoma"},
					{icon:config_url+"statics/xcx_new/wdsc.png",name:"我的收藏",url:"../mysave/mysave"},
					{icon:config_url+"statics/xcx_new/hyzl.png",name:"基本资料",url:"../myinfo/myinfo"},
					// {icon:config_url+"statics/xcx_new/jqqd.png",name:"消息中心",url:"../message/message"},
				],
				infoList:[
					{icon:config_url+"statics/xcx_new/dyhx.png",name:"参与活动",url:"",data:"--",danwei:"次"},
					{icon:config_url+"statics/xcx_new/bjzl.png",name:"集中学习",url:"",data:"--",danwei:"课时"},
					{icon:config_url+"statics/xcx_new/wdzz.png",name:"个人学习",url:"",data:"--",danwei:"课时"},
					{icon:config_url+"statics/xcx_new/xwjl.png",name:"在线考试",url:"",data:"--",danwei:"次"},
				],
				bindphoneIcon:config_url+"statics/xcx_new/bindphone.png",
			}
		},
		computed:{
			...mapState({
				u_name:state => state.u_name,
				u_picture:state => state.u_picture,
				hasAoth:state => state.hasAoth,
				uid:state => state.uid,
				zbid:state => state.zbid,
				hasPhone:state => state.hasPhone,
				cy_zz:state => state.cy_zz,
				integral:state => state.integral,
			})
		},
		mounted() {
			this.info();
			console.log(this.$store.state)
		},
		//分享配置
		onShareAppMessage(res) {
			var that = this;
			return{
				title: "新时代党建",
				path: "pages/index/index",
				imageUrl: getApp().globalData.shareImg,
				success(res){
					uni.showToast({
						title:'分享成功'
					})
				},
				fail(res){
					that.$refs.uToast.show({
						title:"分享失败"
					})
				}
			}
		},
		methods: {
			// 个人信息
			info(){
				var that = this;
				userinfo.info({
					uid:that.uid
				}).then(res => {
					that.infoList[0].data = res.data.data.activity_count
					that.infoList[1].data = res.data.data.focus_hour
					that.infoList[2].data = res.data.data.person_hour
					that.infoList[3].data = res.data.data.test_count
				})
			},
			// 用户授权
			goshouquan(){
			// #ifdef MP-WEIXIN
				uni.navigateTo({
					url:"../shouquan/shouquan"
				})
			// #endif
			},
			// 截取数据
			getUrlParam(name,link) {
			 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
				var r = link.substr(1).match(reg);
				if (r!=null){
					return decodeURI(r[2]);
				} else{
					return null;
				}    
			},
			godetail(url){
				var that = this;
				// if(this.uid != ""){
					if(url != ""){
						if(url == "saoma"){
							// 扫一扫
							uni.scanCode({
								success: function (res) {
									console.log(res)
									// var sid="" ,bsid="";
									// if(res.path == ""){
									// 	that.$refs.uToast.show({
									// 		title:"请扫描正确的二维码"
									// 	})
									// }else{
									// 	var sid = res.path.split("&sid=")[1];
									// 	var bsid = res.path.split("bsid=")[1].split("&sid")[0];
									// }
									// zhaunti.collection({
									// 	uid:that.uid,
									// 	rid:sid,
									// 	bsid:bsid
									// }).then(res => {
									// 	uni.showToast({
									// 		title:"收藏成功"
									// 	})
									// 	uni.navigateTo({
									// 		url:"../mysave/mysave"
									// 	})
									// })
									
									// 扫码签到
									let type,
									startTime = that.getUrlParam("startTime",res.result),
									endTime = new Date().getTime();
									startTime = new Date(startTime).getTime();
									if(endTime-startTime>=1800){
										type = 2 // 迟到签到
									}else{
										type = 1 //正常签到
									}
									let data = {
										uid:that.uid,
										user_id:that.zbid,
										flag :3,
										hyid :that.getUrlParam("hyid",res.result),
										hyflag :that.getUrlParam("hyflag",res.result),
										rid:'',
										bsid:'',
										status :4,//2:个人 3:在线学习 4:签到
										type: type,//1:签到正常 2:签到迟到
										time:'',
									}
									userinfo.sigin(data).then(res => {
										if(res.data.code == 200){
											uni.showToast({
												title:type == 1?"签到成功":"签到迟到"
											})
										}else{
											uni.showToast({
												title:res.data.msg,
												icon:"none"
											})
										}
									})
								}
							});
						}else{
							uni.navigateTo({
								url:url
							})
						}
					}else{
						uni.showToast({
							title:"暂无模块数据",
							icon:"none",
							position:"bottom"
						})
					}
				// }else{
					// that.$checkUser("")
				// }
			},
			get_number(e){
				// 绑定手机
				// #ifdef MP-WEIXIN
					if(e.detail.errMsg == "getPhoneNumber:fail user deny"){
						that.$refs.uToast.show({
							title:"用户拒绝绑定手机号"
						})
					}else{
						this.$store.dispatch("getPhone",{
							iv:e.detail.iv,
							encryptedData:e.detail.encryptedData,
						})
					}
				// #endif
			}
		},
		onShow() {
			var that = this;
			that.$store.dispatch("checkXw")
		}
	}
</script>

<style lang="scss" scoped>
	.mine_main{
		z-index: 10;
		margin-top: -120rpx;
	}
	.box_all{
		margin-bottom: 24rpx;
	}
</style>
