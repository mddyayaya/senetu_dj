<template>
	<view class="wrapper  main_body">
		<u-toast ref="uToast"></u-toast>
		<my-toast ref="mytoast"></my-toast>
		<view class="save_btn" v-if="isadd">
			<view class="cancel" @click="cancel">取消</view>
			<view class="save" @click="saveModules">保存</view>
		</view>
			<view class="shadow_box box_all">
				<view class="all_modules">
					<view class="modules" hover-class="hoverClass" 
						v-for="(item,index) in allBoxList" v-if="item.isindex==true" 
						@click="reduceIndex(index,item.url)">
						<view class="modules_image"><image :lazy-load="true" :src="item.img" mode=""></image></view>
						<view class="modules_text"><text>{{item.name}}</text></view>
						<view class="icon" v-if="isadd">
							<uni-icons type="minus-filled" size="20" color="#ddd"></uni-icons>
						</view>
					</view>
					<view class="modules" 
					v-if="!isadd"
					hover-class="hoverClass" 
					@click="addModulse">
						<view class="modules_image">
							<image :lazy-load="true" :src="more" mode=""></image></view>
						<view class="modules_text"><text>添加至首页</text></view>
					</view>
				</view>
			</view>
			<view class="shadow_box box_all">
				<view class="shadow_title all_title">
					<view class="left">
						<view class="line"></view>
						<view class="left_title">组织生活</view>
					</view>
				</view>
				<view class="all_modules">
					<view class="modules" 
						hover-class="hoverClass" 
						v-for="(item,index) in allBoxList" 
						v-if="item.class_id==1&&item.isindex==false" 
						@click="addIndex(index,item.url)">
						<view class="modules_image"><image :lazy-load="true" :src="item.img" mode=""></image></view>
						<view class="modules_text"><text>{{item.name}}</text></view>
						<view class="icon icons" v-if="isadd">
							<uni-icons type="plus-filled" size="20" color="#ddd"></uni-icons>
						</view>
					</view>
				</view>
			</view>
			<view class="shadow_box box_all">
				<view class="shadow_title all_title">
					<view class="left">
						<view class="line"></view>
						<view class="left_title">学习教育</view>
					</view>
				</view>
				<view class="all_modules">
					<view class="modules" 
						hover-class="hoverClass" 
						v-for="(item,index) in allBoxList" 
					@click="addIndex(index,item.url)" 
					v-if="item.class_id==2&&item.isindex==false">
					<view class="modules_image"><image :lazy-load="true" :src="item.img" mode=""></image></view>
					<view class="modules_text"><text>{{item.name}}</text></view>
					<view class="icon icons" v-if="isadd">
						<uni-icons type="plus-filled" size="20" color="#ddd"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import config_url from '@/request/config.js'
	import { indexs } from '@/request/api.js'
	export default {
		data() {
			return {
				more:config_url+'statics/xcx_new/more.png',
				// 模块列表type 1：组织生活 2：学习教育
				isadd:false,
				allBoxList:[],
			}
		},
		mounted() {
			var that = this;
			this.$store.dispatch("checkXw");
			this.$store.dispatch("appLogin");
			that.datalist();
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
			// 用户栏目列表
			datalist(){
				var that = this;
				indexs.column_user({
					uid:that.$store.state.uid
				}).then(res => {
					that.allBoxList = res.data.data.public;
				})
			},
			addModulse(){
				var that = this;
				if(this.indexBox){
					that.$checkUser("../addindex/addindex");
				}else{
					this.isadd = !this.isadd
				}
			},
			// 增加
			addIndex(index,url){
				if(this.isadd){
					let arrlist = [];
					this.allBoxList.forEach(item => {
						if(item.isindex){
							arrlist.push(item)
						}
					})
					if(arrlist.length < 7){
						this.allBoxList.forEach((item,keys) => {
							if(keys == index){
								item.isindex = true;
							}
						})
					}else{
						this.$refs.mytoast.showToast({
							title:"不得超过七个模块",
							type:"default",
							url:""
						})
					}
				}else{
					if(url!=""){
						this.$checkUser(url);
					}else{
						this.$refs.mytoast.showToast({
							title:"暂无模块数据",
							type:"default",
							ulr:""
						})
					}
				}
			},
			// 减少
			reduceIndex(index,url){
				if(this.isadd){
					let arrlist = [];
					this.allBoxList.forEach(item => {
						if(item.isindex){
							arrlist.push(item)
						}
					})
					if(arrlist.length > 2){
						this.allBoxList.forEach((item,keys) => {
							if(keys == index){
								item.isindex = false;
							}
						})
					}else{
						uni.showToast({
							title:"至少保留两个模块",
							icon:"none"
						})
					}
				}else{
					if(url!=""){
						this.$checkUser(url);
					}else{
						this.$refs.mytoast.showToast({
							title:"暂无模块数据",
							type:"default",
							url:""
						})
					}
				}
			},
			// 保存
			saveModules(){
				var that = this;
				this.isadd = false;
				var arr = []
				that.allBoxList.map(item => {
					if(item.isindex)
					arr.push(item.id)
				})
				indexs.column_sub({
					uid:that.$store.state.uid,
					cid:arr.toString()
				}).then(res => {
					if(res.data.code == 200){
						this.isadd = false;
						uni.navigateBack();
					}
				})
			},
			// 取消
			cancel(){
				var that = this;
				uni.navigateBack()
				this.isadd = false;
			}
		}
	}
</script>

<style lang="scss">
	.box_all{
		padding-top: 36rpx;
		margin-bottom: 24rpx;
		.all_title{
			margin-bottom: 40rpx;
		}
	}
	.modules{
		position: relative;
		.icon{
			position: absolute;
			right: -20rpx;
			top: -20rpx;
		}
		.icons{
			transform: rotate(90deg);
		}
	}
	.save_btn{
		width: 100%;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 30rpx;
		font-size: 24rpx;
		.cancel{
			color: #333;
			padding: 10rpx 30rpx;
			border: 1rpx solid #ddd;
		}
		.save{
			color: #fff;
			padding: 10rpx 30rpx;
			background: rgb(188,34,51);
		}
	}
</style>
