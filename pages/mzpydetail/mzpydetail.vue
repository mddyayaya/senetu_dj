<template>
	<view class="wrapper">
		<view class="wrappers">
			<view class="mzpy">
				<view class="mzpytitle">2020年度党员互评</view>
				<view class="mzpysubtitle">2020年度党员互评的内容说明，这是用于凑字数用的文字内容。2020年度党员互评的。</view>
			</view>
			<view class="mzpylist">
				<view class="pyitems" v-for="(item,index) in datalist">
					<view class="pytitle">{{index+1}}.{{item.title}}</view>
					<u-radio-group v-model="item.value" @change="radioGroupChange">
						<u-radio 
							@change="radioChange" 
							v-for="(item, indexs) in list" 
							:key="indexs" 
							width="50%"
							class="qustion_option"
							:name="item.name">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</view>
			</view>
		</view>
		<view class="edit_wrap">
			<view class="edit edits" @click="save">
				<view>立即提交</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datalist:[
					{title:"张雪迎",value:""},
					{title:"张雪迎",value:""},
					{title:"张雪迎",value:""},
					{title:"张雪迎",value:""},
					{title:"张雪迎",value:""},
					{title:"张雪迎",value:""},
				],
				list: [
				{
				name: 'A:优秀',
				},
				{
				name: 'B:合格',
				},
				{
				name: 'C:基本合格',
				},
				{
				name: 'D:不合格',
				}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				value: 'orange',
			}
		},
		methods: {
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				// console.log(e);
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
			},
			save(){
				
			}
		}
	}
</script>

<style lang="scss">
	.wrappers{
		padding-bottom: 160rpx;
		.mzpy{
			margin: 56rpx 56rpx 0 56rpx;
			.mzpytitle{
				color: #CE2741;
				font-size: 36rpx;
				font-weight: bold;
				line-height: 54rpx;
			}
			.mzpysubtitle{
				color: #666;
				font-size: 26rpx;
				line-height: 40rpx;
				margin-top: 24rpx;
				padding-bottom: 32rpx;
				border-bottom: 2rpx solid #dedede;
			}
		}
		.mzpylist{
			margin: 0 56rpx;
			.pyitems{
				.pytitle{
					font-size: 28rpx;
					color: #333333;
					font-weight: bold;
					line-height: 72rpx;
				}
				.qustion_option{
					display: flex;
					align-items: center;
					margin-right: 2%;
					height: 72rpx;
					width: 48% !important;
					box-sizing: border-box;
					border-radius: 6rpx;
					margin-bottom: 16rpx;
					border: 2rpx solid rgba(237, 237, 237, 0.9);
					.pointer{
						width: 16rpx;
						height: 16rpx;
						border-radius: 50%;
						background: #D8D8D8;
						margin-right: 20rpx;
					}
				}
				.qustion_option:nth-child(2n){
					margin-right: 0 !important;
				}
				.qustion_option_selet{
					background: #EDEDED !important;
					.pointer{
						background: #CE2741 !important;
					}
				}
			}
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
