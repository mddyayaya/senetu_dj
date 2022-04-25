<template>
	<view>
		<u-popup v-model="show" 
			:mask-close-able="false"
			:closeable="closeable" 
			mode="center" 
			border-radius="14">
			<view class="modal_wrap">
				<view class="modal_title">{{title}}</view>
				<scroll-view class="modal_content" scroll-y="true" >
					<view>{{content}}</view>
				</scroll-view>
				<view class="btn_list" v-show="hasBtn">
					<view class="btn btn1" @click="btn1Evevt">{{btn1}}</view>
					<view class="btn btn2" @click="btn2Evevt">{{btn2}}</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name:"modal",
		data() {
			return {
				
			};
		},
		props:{
			show:{
				type:Boolean,
				default:false
			},
			title:{
				type:String,
				default:"提示"
			},
			content:{
				type:String,
				default:""
			},
			hasBtn:{
				type:Boolean,
				default:true
			},
			btn1:{
				type:String,
				default:"取消"
			},
			btn2:{
				type:String,
				default:"确定"
			},
			closeable:{
				type:Boolean,
				default:false
			}
		},
		mounted() {
			
		},
		methods:{
			btn1Evevt(){
				this.$emit("btn1Evevt")
			},
			btn2Evevt(){
				this.$emit("btn2Evevt")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.modal_wrap{
		width: 700rpx;
		padding: 0 60rpx 40rpx 60rpx;
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
			margin: 36rpx 0;
			color: #666666;
			font-size: 32rpx;
			line-height: 52rpx;
			max-height: 300rpx;
			width: 100%;
			overflow-y: scroll;
		}
		.btn_list{
			width: 100%;
			display: flex;
			justify-content: space-between;
			.btn{
				padding: 24rpx 32rpx;
				min-width: 200rpx;
				border-radius: 60rpx;
				font-size: 28rpx;
				box-sizing: border-box;
				text-align: center;
			}
			.btn2{
				color: #fff;
				background: linear-gradient(180deg, #B4091C 0%, #DB153C 100%);
			}
			.btn1{
				border: 1px solid #B4091C;
				color: #B4091C;
			}
		}
	}
</style>
