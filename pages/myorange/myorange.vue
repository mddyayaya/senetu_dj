<template>
	<view class="wrapper">
		<u-toast ref="uToast"></u-toast>
		<view class="">
			<view class="oragen_wrapper">
				<view class="oragen_pic">
					<!-- <view class="edit"><u-icon name="edit-pen-fill" color="#fff"></u-icon></view> -->
					<image class="" :src="morenzb" mode=""></image>
				</view>
				<view class="oragen_name ">{{cy_zz}}</view>
				<view class="oragen_info">
					<view class="oragen_info_item">
						<view>正式党员</view>
						<view class="">{{zsdy}}人</view>
					</view>
					<view class="oragen_info_item">
						<view>预备党员</view>
						<view class="">{{ybdy}}人</view>
					</view>
					<view class="oragen_info_item">
						<view>领导班子</view>
						<view class="">{{ldbz}}人</view>
					</view>
				</view>
			</view>
			<view class="organ_box shadow_box">
				<view class="shadow_title">
					<view class="left">
						<view class="line"></view>
						<view class="left_title">领导班子</view>
					</view>
				</view>
				<view class="organ_swipers ">
					<swiper 
						:circular="true"
						class="organ_swiper"
						:indicator-dots="false" 
						:autoplay="true"
						:interval="3000" 
						next-margin="80rpx"
						:display-multiple-items="3"
						:duration="1000">
						<swiper-item v-for="item in leaderlist" @click="showOrganMember(item)">
							<view class="swiper-item">
								<view class="leader_pic">
									<u-lazy-load
										border-radius="68"
										class="lazyimg"
										height="136"
										threshold="50"
										v-if="item.u_picture!=''&&item.u_picture!=null"
										:error-img="errorImg"
										img-mode="widthFill"
										:image="item.u_picture">
									</u-lazy-load>
									<u-lazy-load
										border-radius="68"
										class="lazyimg"
										height="136"
										threshold="50"
										v-else
										img-mode="widthFill"
										:image="errorImg" >
									</u-lazy-load>
								</view>
								<view class="leader_zhiwu ">{{item.u_zhiwu_name}}</view>
								<view class="leader_name ">{{item.u_name}}</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="organ_box_top shadow_box">
				<view class="shadow_title">
					<view class="left">
						<view class="line"></view>
						<view class="left_title">支部党员</view>
					</view>
				</view>
				<view class="organ_swipers">
					<view class="member_item " v-if="members.length > 0" 
					v-for="item in members" 
					@click="showOrganMember(item)">
						<view class="member_pic">
							<image v-if="item.u_picture!=''&&item.u_picture!=null&&memberTotal==1"
								:src="item.u_picture" mode=""></image>
							<u-lazy-load
								border-radius="68"
								class="lazyimg "
								height="136"
								threshold="50"
								v-if="item.u_picture!=''&&item.u_picture!=null&&memberTotal>1"
								:error-img="errorImg"
								img-mode="widthFill"
								:image="item.u_picture">
							</u-lazy-load>
						</view>
						<view class="member_info">
							<view class="member_name">姓名：{{item.u_name}}</view>
							<view class="member_type">
								<view class="member_type1">
									<view>类型：{{item.u_zhiwu_name}}</view>
									<view>入党时间：{{item.k_time}}</view>
								</view>
								<view class="member_type1">
									<view>出生日期：{{$changeTime(item.age)}}</view>
									<view>电话：{{item.u_phone}}</view>
								</view>
							</view>
						</view>
					</view>
					<my-nodata v-if="members.length == 0"></my-nodata>
					<u-loadmore :load-text="loadText" margin-top="40" :status="status" />
				</view>
			</view>	
		</view>		
		<my-modal-organ ref="showMember" 
		@closeBox="closeBox"
		:showMemberBox="showMemberBox"></my-modal-organ>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import { userinfo } from '@/request/api.js'
	import config_url from '@/request/config.js'
	export default {
		data() {
			return {
				morenzb:config_url+'statics/xcx_new/morenzb.png',
				showMemberBox:false,
				leaderlist:[],
				members:[],
				cy_zz:"",//组织名称
				zsdy:"--",//正式党员
				ybdy:"--",//预备党员
				ldbz:"--",//领导班子
				errorImg:getApp().globalData.errorImge,
				memberPage:1,
				memberTotal:0,
				loadText: {
					loadmore: '没有更多了',
					loading: '努力加载中',
					nomore: '上拉加载'
				},
				status: 'loadmore',
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
		onShow() {
			var that = this;
			this.$store.dispatch("checkXw");
			this.$store.dispatch("appLogin");
			that.datalist();
			that.memberlists()
		},
		onReachBottom(){
			var that = this;
			that.status = 'loading'
			that.memberPage++;
			if(that.memberPage <= that.memberTotal){
				that.memberlists();
			}else{
				that.status = 'loadmore'
				that.memberPage = that.memberTotal
			}
		},
		methods: {
			// 我的组织列表
			datalist(){
				var that = this;
				userinfo.organ({
					uid:that.$store.state.uid
				}).then(res => {
					if(res.data.data.leader.length > 0){
						that.leaderlist = res.data.data.leader
					}
					that.cy_zz = res.data.data.cy_zz;
					that.zsdy = res.data.data.formal_count;
					that.ybdy = res.data.data.prepare_count;
					that.ldbz = res.data.data.leader_count;
				})
			},
			// 党员列表
			memberlists(){
				var that = this;
				userinfo.memberList({
					page:that.memberPage,
					zbid:that.$store.state.zbid,
					flag:2//1所有党员  2：支部党员
				}).then(res => {
					that.memberTotal = res.data.data.total;
					if(res.data.data.pagedata!=null){
						if(res.data.data.pagedata.length > 0){
							that.members = that.members.concat(res.data.data.pagedata)
						}
					}
				})
			},
			showOrganMember(item){
				var that = this;
				that.showMemberBox = true;
				if(item.u_picture == '' || item.u_picture==null){
					item.u_picture = that.errorImg
				}else{
					if(item.u_picture.search("http") == -1){
						item.u_picture = that.errorImg
					}
				}
				this.$refs.showMember.bindata({
					pic:item.u_picture,
					name:item.u_name,
					zhiwu:item.u_zhiwu_name,
					age:"8",
					phone:item.u_phone
				})
			},
			closeBox(){
				this.showMemberBox = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.oragen_wrapper{
		width: 100%;
		height: 464rpx;
		color: #F1F9FF;
		background: url(~@/static/home_top.png) no-repeat;
		background-size: 100% 100%;
		padding: 26rpx 26rpx;
		box-sizing: border-box;
		text-align: center;
		.oragen_pic{
			background: #fff;
			position: relative;
			width: 136rpx;
			height: 136rpx;
			border-radius: 50%;
			margin: 0 auto 20rpx auto;
			image{
				left: 0;
				top: 0;
				position: absolute;
				width: 100%;
				height: 100%;
				border-radius: inherit;
				background: $loadingBg;
			}
			.edit{
				z-index: 10;
				position: absolute;
				right: 0;
				top: 0;
			}
		}
		.oragen_name{
			font-size: 36rpx;
			color: #F1F9FF;
			font-weight: bold;
			margin-bottom: 20rpx;
		}
		.oragen_info{
			font-size: 26rpx;
			width: 90%;
			margin: auto;
			display: flex;
			justify-content: space-between;
		}
	}
	.organ_box{
		width: auto;
		margin: -130rpx 26rpx 0 26rpx;
	}
	.organ_box_top{
		width: auto;
		margin: 26rpx 26rpx;
	}
	.organ_swipers{
		width: 100%;
		height: auto;
		.organ_swiper{
			width: 100%;
			text-align: center;
			height: 260rpx;
			margin-top: 32rpx;
			color: #444;
			font-size: 26rpx;
			.leader_pic{
				margin:0 auto 32rpx auto;
				width: 136rpx;
				height: 136rpx;
				border-radius: 50%;
				image{
					width: 100%;
					height: 100%;
					border-radius: inherit;
				}
				.lazyimg{
					width: 100%;
					height: 100%;
					border-radius: inherit;
				}
			}
		}
		.member_item{
			width: 100%;
			padding: 48rpx 0;
			border-bottom: 2rpx solid #EDEDED;
			display: flex;
			justify-content: space-between;
			.member_pic{
				width: 136rpx;
				height: 136rpx;
				border-radius:50%;
				margin-right: 22rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: inherit;
					background: $loadingBg;
				}
				.lazyimg{
					width: 100%;
					height: 100%;
					border-radius: inherit;
				}
			}
			.member_info{
				flex: 1;
				color: #444;
				.member_name{
					font-size: 26rpx;
					font-weight: bold;
					margin-bottom: 28rpx;
				}
				.member_type{
					font-size: 24rpx;
					.member_type1{
						display: flex;
						align-items: center;
						justify-content: space-between;
					}
					.member_type1:nth-child(2){
						margin-top: 15rpx;
					}
				}
			}
		}
		.member_item:last-child{
			border: none;
		}
	}
</style>
