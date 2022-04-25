<template>
	<view v-show="showMemberBox">
		<u-popup v-model="show" 
			:mask-close-able="true"
			:closeable="false" 
			:duration="1"
			mode="center" 
			border-radius="14">
			<view class="modal_wrap">
				<view class="modal_content">
					<view class="member_pic">
						<image class="u-skeleton-circle" :src="member.pic" mode=""></image>
					</view>
					<view class="member_name u-skeleton-fillet">{{member.name}}</view>
					<view class="member_other u-skeleton-fillet">党内职务：{{member.zhiwu}}</view>
					<view class="member_other u-skeleton-fillet">党龄：{{member.age}}年</view>
					<view class="member_other u-skeleton-fillet">电话：{{member.phone}}</view>
				</view>
				<view class="btn" @click="btn1Evevt">关闭</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name:"modal",
		data() {
			return {
				show:false,
				member:{
					pic:"",
					name:"",
					zhiwu:"",
					age:"",
					phone:""
				},
				loading:true
			};
		},
		props:{
			showMemberBox:{
				type:Boolean,
				default:false
			}
		},
		mounted() {
			
		},
		methods:{
			bindata(obj){
				var that = this;
				this.show = true;
				this.member = obj;
				setTimeout(function(){
					that.loading = false;
				},500)
			},
			btn1Evevt(){
				this.show = false;
				this.$emit("closeBox")
				this.member = {
					pic:"",
					name:"",
					zhiwu:"",
					age:"",
					phone:""
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.modal_wrap{
		width: 700rpx;
		padding: 40rpx 60rpx 40rpx 60rpx;
		box-sizing: border-box;
		.modal_title{
			color: #333333;
			font-size: 36rpx;
			font-weight: bold;
			line-height: 132rpx;
			border-bottom: 4rpx solid #EDEDED;
			width: 100%;
			text-align:center;
		}
		.modal_content{
			color: #666666;
			font-size: 32rpx;
			text-align: center;
			line-height: 52rpx;
			width: 100%;
			.member_pic{
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				margin: auto;
				image{
					width: 100%;
					height: 100%;
					background: $loadingBg;
					border-radius: inherit;
				}
			}
			.member_name{
				font-size: 30rpx;
				font-weight: bold;
				margin-top: 36rpx;
				margin-bottom: 60rpx;
			}
			.member_other{
				font-size: 26rpx;
			}
		}
		.btn{
			padding: 24rpx 32rpx;
			width: 220rpx;
			border-radius: 60rpx;
			font-size: 28rpx;
			box-sizing: border-box;
			text-align: center;
			color: #fff;
			margin: 80rpx auto 0 auto;
			background: linear-gradient(180deg, #B4091C 0%, #DB153C 100%);
		}
	}
</style>
