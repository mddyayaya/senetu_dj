<template>
	<view class="wrapper" style="position: relative;">
		<view class="main_body mine_main">
			<view class=" box_index">
				<view class="info_list">
					<uni-forms 
						label-position="top"
						:modelValue="formData"
						label-width="auto"
						label-align="left">
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
						<uni-forms-item required class="form_item" label="手机号码:" name="u_phone">
							<uni-easyinput 
							:clearable="false"
							:inputBorder="false"
							type="text" v-model="formData.u_phone" placeholder="请输入手机号码" />
						</uni-forms-item>
						<uni-forms-item class="form_item"  label="申请入党时间:" name="applytime">
							<view class="zhanwei" @click="openApply = true">{{pickApply}}</view>
						</uni-forms-item>
						<u-picker v-model="openApply" mode="time" @confirm="changeApply"></u-picker>
						
						<uni-forms-item class="form_item"  label="正式入党时间:" name="attendtime">
							<view class="zhanwei" @click="openAttend = true">{{pickAttend}}</view>
						</uni-forms-item>
						<u-picker v-model="openAttend" mode="time" @confirm="changeAttend"></u-picker>
						<uni-forms-item class="form_item"  label="党内职务:" name="u_zuzhi">
							<uni-easyinput 
							:clearable="false"
							:inputBorder="false"
							type="text" v-model="formData.u_zuzhi" placeholder="请输入党内职务" />
						</uni-forms-item>
					</uni-forms>
				</view>
			</view>
			<view class="saveItem"><view class="edit" @click="update">保存</view></view>
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
					u_phone:"",
					attendtime:"",
					applytime:"",
					cy_zz:"",
					u_zuzhi:""
				}
			}
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
	.wrapper{
		margin-bottom: 166rpx;
	}
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
		// height: 96rpx;
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
	.saveItem{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10;
		height: 100rpx;
		background: #fff;
		width: 100%;
	}
</style>
