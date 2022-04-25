<template>
	<view class="wrapper">
		<u-toast ref="uToast"></u-toast>
		<view class="login_box">
			<view class="logo">
				<image :src="logos" mode="widthFix"></image>
			</view>
			<view class="form_box">
				<view class="form_top">
					<image :src="myicon" mode=""></image>
					<view>登录</view>
				</view>
				<view class="form_item">
					<view class="form_label">手机号</view>
					<view class="form_input"><input v-model="phone" class="phones" type="number" value="" placeholder="请输入手机号"/></view>
				</view>
				<view class="form_item">
					<view class="form_label">验证码</view>
					<view class="form_input">
						<input type="number" v-model="code" class="codes" value="" placeholder="请输入验证码"/>
						<view class="getcode" @click="getcode">{{codetext}}</view>
					</view>
				</view>
				<view class="getin" @click="gologin">立即登录</view>
				<view class="yinsi">
					<view class="boxss" :class="{ischecked:ischecked}" @click="selectYinsi">
						<u-icon name="checkmark" size="14" color="#fff"></u-icon>
					</view>
					<view class="link" @click="goyinsi">《人民视讯新时代党建服务协议》</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { shouquan } from '@/request/api.js'
	import config_url from '@/request/config.js'
	export default {
		data() {
			return {
				logos:config_url+"statics/xcx_new/logos.png",
				myicon:config_url+"statics/xcx_new/myicon.png",
				codetext:"获取验证码",
				second:180,
				phone:"",
				nulldata:"",
				code:"",
				interval:null,
				ischecked:false
			};
		},
		methods:{
			getcode(){
				var that = this;
				// 获取验证码
				if(that.$checkPhone(that.phone)){
					if(that.second < 180){
						that.$refs.uToast.show({
							title:"验证码还在有效期"
						})
					}else{
						shouquan.getcode({
							phone:that.phone
						}).then(res => {
							if(res.data.code == 200){
								that.$refs.uToast.show({
									title:res.data.msg,
								})
								that.interval = setInterval(() => {
									if(that.second>1){
										that.codetext = (that.second--)+'s'
									}else{
										that.interval = null;
										that.codetext = "重新获取",
										that.second = 180;
									}
								},1000)
							}else{
								that.$refs.uToast.show({
									title:res.data.msg,
								})
							}
						})
					}
				}else{
					
				}
			},
			gologin(){
				// 立即登录
				var that = this;
				if(that.$checkPhone(that.phone)){
					if(that.code == ""){
						that.$refs.uToast.show({
							title:"请输入验证码",
						})
					}else if(!this.ischecked){
						that.$refs.uToast.show({
							title:"请阅读并勾选用户隐私协议",
						})
					}else{
						shouquan.sendCode({
							phone:that.phone,
							code:that.code,
						}).then(res => {
							if(res.data.code == 200){
								uni.navigateBack()
								that.$commit('changeUserInfo',res.data.data.info);
							}else{
								that.$refs.uToast.show({
									title:res.data.msg,
								})
							}
						})
					}
				}
			},
			goyinsi(){
				uni.navigateTo({
					url:"../yinsi/yinsi"
				})
			},
			selectYinsi(){
				this.ischecked = !this.ischecked;
			}
		}
	}
</script>

<style lang="scss">
	.login_box{
		width: 100%;
		height: 100%;
		.logo{
			margin: 84rpx auto;
			width: 360rpx;
			image{
				width: 100%;
			}
		}
		.form_box{
			margin: 94rpx 94rpx;
			.form_top{
				display: flex;
				align-items: center;
				color: #333333;
				font-size: 42rpx;
				font-weight: bold;
				image{
					margin-right: 16rpx;
					width: 48rpx;
					height: 52rpx;
				}
			}
			.form_item{
				margin-top: 40rpx;
				width: 100%;
				.form_label{
					font-size: 28rpx;
					color: #CE2741;
					font-weight: bold;
				}
				.form_input{
					border-bottom:2rpx solid #e9e9e9;
					line-height: 100rpx;
					height: 100rpx;
					font-size: 28rpx;
					display: flex;
					align-items: center;
					input{
						box-sizing: border-box;
						font-size: 28rpx;
						color: #999999;
					}
					.phones{
						width: 100%;
						height: 100%;
					}
					.codes{
						flex: 1;
						height: 100%;
					}
					.getcode{
						margin-left: 20rpx;
						width: 200rpx;
						height: 64rpx;
						text-align: center;
						line-height: 64rpx;
						background: #CE2741;
						border-radius: 40rpx;
						color: #fff;
						font-size: 26rpx;
					}
				}
			}
			.getin{
				margin-top: 200rpx;
				width: 100%;
				height: 80rpx;
				background: #CE2741;
				border-radius: 40rpx;
				color: #fff;
				font-size: 28rpx;
				line-height: 80rpx;
				text-align: center;
			}
			.yinsi{
				margin-top: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.boxss{
					height: 24rpx;
					width: 24rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #EDEDED;
				}
				.link{
					color: #CE2741;
					font-size: 24rpx;
				}
			}
		}
	}
	.nulldata{
		border-bottom:2rpx solid #CE2741 !important;
	}
	.ischecked{
		background:#CE2741 !important;
	}
</style>
