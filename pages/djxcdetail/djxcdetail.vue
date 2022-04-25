<template>
	<view class="wrapper">
		<u-toast ref="uToast"></u-toast>
		<view class="xcdetail">
			<view class="xctitle">
				习近平主持召开科学家座谈会并发表重要讲话
			</view>
			<view class="pub_user">
				<view class="pub_name">北京大学党支部</view>
				<view class="pub_tiem">2021-09-12</view>
			</view>
			<view class="xccontent">
				<image src="" mode=""></image>
				<view>
					人民网北京9月12日电 （万鹏、任一林）中共中央总书记、国家主席、中央军委主席习近平9月11日下午在京主持召开科学家座谈会并发表重要讲话，就“十四五”时期我国科技事业发展听取意见。
					
					怎样认识加快科技创新的重大战略意义？如何大力弘扬科学家精神？人民网·中国共产党新闻网采访了多位专家进行解读。
					创新这个第一动力为何重要——
					
					四个“面向”指明创新能力提升方向
					
					怎样认识加快科技创新的重大战略意义？如何大力弘扬科学家精神？人民网·中国共产党新闻网采访了多位专家进行解读。
					创新这个第一动力为何重要——
					
					四个“面向”指明创新能力提升方向
					
					怎样认识加快科技创新的重大战略意义？如何大力弘扬科学家精神？人民网·中国共产党新闻网采访了多位专家进行解读。
					创新这个第一动力为何重要——
					
					四个“面向”指明创新能力提升方向
					
					怎样认识加快科技创新的重大战略意义？如何大力弘扬科学家精神？人民网·中国共产党新闻网采访了多位专家进行解读。
					创新这个第一动力为何重要——
					
					四个“面向”指明创新能力提升方向
					
					怎样认识加快科技创新的重大战略意义？如何大力弘扬科学家精神？人民网·中国共产党新闻网采访了多位专家进行解读。
					创新这个第一动力为何重要——
					
					四个“面向”指明创新能力提升方向
					
				</view>
				
			</view>
		</view>
		<view class="pinglun">
			<view class="plinput">
				<input type="text" placeholder="评论功能敬请期待" value="" />
			</view>
			<view @click="dianzan">
				<u-icon :name="islike?'thumb-up-fill':'thumb-up'" size="50" 
				:color="islike?'#BC2233':'#666666'"></u-icon></view>
			<view @click="$shareResouce('http://www.baidu.com')"><u-icon name="share" size="50" color="#666"></u-icon></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				islike:false,
			}
		},
		methods: {
			// 点赞
			dianzan(){
				this.islike = !this.islike;
				if(this.islike){
					this.$refs.uToast.show({
						title:"点赞成功"
					})
				}else{
					this.$refs.uToast.show({
						title:"取消点赞"
					})
				}
			},
			share(){
				// 分享
				
			}
		}
	}
</script>

<style lang="scss">
	.pinglun{
		z-index: 10;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		padding: 0 32rpx 10rpx 32rpx;
		box-sizing: border-box;
		align-items: center;
		width: 100%;
		height: 140rpx;
		background: #FFFFFF;
		box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.05);
		.plinput{
			padding: 0 32rpx;
			box-sizing: border-box;
			width: 520rpx;
			height: 64rpx;
			background: #EDEDED;
			border-radius: 60rpx;
			font-size: 24rpx;
			color: #999;
			input{
				width: 100%;
				height: 100%;
				font-size: 24rpx;
				color: #999;
			}
		}
	}
	.xcdetail{
		width: 100%;
		padding: 32rpx 32rpx 145rpx 32rpx;
		box-sizing: border-box;
		.xctitle{
			color: #333333;
			font-size: 40rpx;
			font-weight: bold;
			line-height: 52rpx;
		}
		.pub_user{
			width: 100%;
			display: flex;
			justify-content: space-between;
			color: #999;
			font-size: 24rpx;
			margin: 40rpx 0;
		}
		.xccontent{
			font-size: 28rpx;
			color: #333333;
			line-height: 52rpx;
			image{
				width: 100%;
				height: 440rpx;
				margin: 20rpx 0;
				background: #EDEDED;
			}
		}
	}
</style>
