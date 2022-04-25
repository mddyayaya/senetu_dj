<template>
	<view class="wrapper">
		<u-toast ref="uToast"></u-toast>
		<view class="main_body mine_main">
			<view class="shadow_box box_index">
				<view class="mypic">
					<view class="left">
						<view class="line"></view>
						<view class="left_title">头像</view>
					</view>
					<view class="right">
						<!-- #ifdef MP-WEIXIN -->
						<open-data type="userAvatarUrl"></open-data>
						<!-- #endif -->
						
						<!-- #ifdef APP-PLUS -->
						<image :src="formData.u_picture" mode=""></image>
						<!-- #endif -->
					</view>
				</view>
			</view>
			<view class="shadow_box box_index">
				<view class="shadow_title">
					<view class="left">
						<view class="line"></view>
						<view class="left_title">基本信息</view>
					</view>
				</view>
				<view class="info_list">
					<uni-forms 
						:modelValue="formData"
						label-width="auto"
						label-align="right">
						<uni-forms-item required class="form_item" label="姓名:" name="u_name">
							<uni-easyinput 
							:clearable="false"
							:inputBorder="false"
							type="text" v-model="formData.u_name" placeholder="请输入姓名" />
						</uni-forms-item>
						<uni-forms-item class="form_item" label="性别:" name="sex">
							<view class="zhanwei" @click="openSex = true">{{formData.sex}}</view>
						</uni-forms-item>
						<u-picker v-model="openSex" 
						:range="sexList"
						mode="selector" @confirm="changeSex"></u-picker>
						<uni-forms-item class="form_item"  label="出生日期:" name="age">
							<view class="zhanwei" @click="openAge = true">{{pickAge}}</view>
						</uni-forms-item>
						<u-picker v-model="openAge" mode="time" @confirm="changeAge"></u-picker>
						<uni-forms-item class="form_item"  label="手机号码:" name="u_phone">
							<view class="zhanwei">{{formData.u_phone}}</view>
						</uni-forms-item>
						<uni-forms-item class="form_item"  label="申请入党时间:" name="applytime">
							<view class="zhanwei" @click="openApply = true">{{pickApply}}</view>
						</uni-forms-item>
						<u-picker v-model="openApply" mode="time" @confirm="changeApply"></u-picker>
						
						<uni-forms-item class="form_item"  label="正式入党时间:" name="attendtime">
							<view class="zhanwei" @click="openAttend = true">{{pickAttend}}</view>
						</uni-forms-item>
						<u-picker v-model="openAttend" mode="time" @confirm="changeAttend"></u-picker>
						<uni-forms-item class="form_item"  label="所属党支部:" name="cy_zz">
							<view class="zhanwei">{{formData.cy_zz}}</view>
						</uni-forms-item>
						<uni-forms-item class="form_item"  label="党内职务:" name="u_zuzhi">
							<uni-easyinput 
							:clearable="false"
							:inputBorder="false"
							type="text" v-model="formData.u_zuzhi" placeholder="请输入党内职务" />
						</uni-forms-item>
					</uni-forms>
				</view>
			</view>
		</view>
		<view class="edit_wrap">
			<view class="edit edits" @click="update">
				<view>保存</view>
			</view>
		</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import { userinfo } from '@/request/api.js'
	export default {
		data() {
			return {
				uploadUrl:"",
				fileList:[],
				sexList:["男","女"],
				openAge:false,
				openSex:false,
				openAttend:false,
				openApply:false,
				
				pickApply:"请选择申请入党时间",
				pickAge:"请选择出生日期",
				pickAttend:"请选择入党时间",
				formData:{
					id:this.$store.state.uid,
					u_picture:"",
					u_name:"",
					sex:"请选择性别",
					age:"",
					u_phone:"18295218311",
					attendtime:"",
					applytime:"",
					cy_zz:"",
					u_zuzhi:""
				}
			}
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
		mounted() {
			this.$store.dispatch("checkXw");
			this.$store.dispatch("appLogin");
			this.getuserinfo()
		},
		methods: {
			// 选择出生日期
			changeAge(value){
				this.formData.age = new Date(value.year+'-'+value.month+'-'+value.day).getTime();
				this.pickAge = value.year+'-'+value.month+'-'+value.day
			},
			// 选择性别
			changeSex(value){
				this.formData.sex = this.sexList[value]
			},
			// 选择入党时间
			changeAttend(value){
				this.formData.attendtime = new Date(value.year+'-'+value.month+'-'+value.day).getTime();
				this.pickAttend = value.year+'-'+value.month+'-'+value.day
			},
			// 选择申请入党时间
			changeApply(value){
				this.formData.applytime = new Date(value.year+'-'+value.month+'-'+value.day).getTime();
				this.pickApply = value.year+'-'+value.month+'-'+value.day
			},
			// 获取用户信息
			getuserinfo(){
				var that = this;
				userinfo.updateInfo({
					id:that.$store.state.uid
				}).then(res => {
					for(var key in res.data.data){
						for(var index in that.formData){
							if(key == index && res.data.data[key] != '' && res.data.data[key] != null){
								that.formData[index] = res.data.data[key]
							}
						}
					}
					// 转换申请入党时间
					if(res.data.data.applytime!=''&&res.data.data.applytime!=null){
						that.pickApply = that.$changeTime(res.data.data.applytime)
					}else{that.pickApply = "请选择申请入党时间"}
					// 转换出生时间
					if(res.data.data.age!=''&&res.data.data.age!=null){
						that.pickAge = that.$changeTime(res.data.data.age)
					}else{that.pickAge = "请选择出生日期"}
					// 转换入党时间
					if(res.data.data.attendtime!=''&&res.data.data.attendtime!=null){
						that.pickAttend = that.$changeTime(res.data.data.attendtime)
					}else{that.pickAttend = "请选择入党时间"}
				})
				// console.log(that.formData)
			},
			// 保存用户信息
			update(){
				var that = this;
				if(that.formData.u_name == ""){
					that.$refs.uToast.show({
						title:"请输入姓名"
					})
				}else{
					userinfo.saveInfo(that.formData).then(res => {
						if(getApp().globalData.u_name != that.formData.u_name){
							this.$store.state.u_name = that.formData.u_name
						}
						uni.navigateBack()
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mypic{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24rpx 0 0 0;
		.right{
			position: relative;
			width: 136rpx;
			height: 136rpx;
			display: flex;
			overflow: hidden;
			border-radius: 50%;
			align-items: center;
			.lazyimg{
				width: 100%;
				height: 100%;
			}
			image{
				width: 100%;
				height: 100%;
				border-radius: inherit;
				background: $loadingBg;
			}
			.uploads{
				border-radius:100%;
				width: 136rpx;
				height: 136rpx;
			}
		}
		.left{
			display: flex;
			align-items: center;
			.line{
				background-color: #CE2741;
				height: 32rpx;
				border-radius: 4rpx;
				width: 8rpx;
			}
			.left_title{
				font-size: 36rpx;
				font-weight: bold;
				color: #333333;
				margin-left: 12rpx;
			}
		}
	}
	.form_item{
		height: 96rpx;
		display: flex;
		align-items: center;
		line-height: 96rpx;
		border-bottom: 2rpx solid #EDEDED;
		font-size: 28rpx;
		color: #333333;
		.zhanwei{
			color:#333333;
			font-size: 28rpx;
		}
	}
	
	.edit_wrap{
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		padding: 80rpx 0;
		background: #fff;
		.edits{
			position: absolute;
			bottom: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			view{
				margin-left: 10rpx;
			}
		}
	}
</style>
