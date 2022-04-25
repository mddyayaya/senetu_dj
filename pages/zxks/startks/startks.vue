<template>
	<view class="wrapper">
		<u-toast ref="uToast" />
		<my-modal :show="showToast1" 
			:hasBtn="true"
			:btn1="btn1"
			:closeable="false"
			:btn2="btn2"
			title="提示" 
			@btn1Evevt="btn1Evevt"
			@btn2Evevt="btn2Evevt"
			:content="toastcontent"></my-modal>
		<view class="kstitle">{{testtitle}}</view>
		<view class="shadow_box ks_box">
			<view class="ks_times">答题进度</view>
			<view class="ks_timess">{{playNow}}/{{qustionlist.length}}</view>
			<view class="ks_progress">
				<view class="progress_bar" :style="{width: ((playNow/qustionlist.length)*100)+'%'}"></view>
			</view>
		</view>
		<view class="shadow_box ks_box qustions_box">
			<view class="shadow_title">
				<view class="left">
					<view class="line"></view>
					<view class="left_title">题目</view>
				</view>
			</view>
			<view class="qustions" v-if="qustionlist.length > 0" v-for="(item,index) in qustionlist" v-show="playNow-1 == index">
				<view class="qustion_title">{{playNow}}.{{item.title}}({{item.type==1?'单选':'多选'}})</view>
				<view class="qustion_options">
					<u-radio-group
						v-if="item.type == 1"
						v-model="item.value"
						@change="changeAnswer">
						<u-radio 
							style="width: 100%;"
							class="qustion_option" 
							v-for="(items,optionskey) in item.option" 
							:key="optionskey" 
							:name="items.title.split('选项')[1]">
							{{items.title}}:{{items.content}}
						</u-radio>
					</u-radio-group>
					<u-checkbox-group
						v-if="item.type == 2"
						@change="changeAnswer">
						<u-checkbox
							shape="circle"
							style="width: 100%;"
							class="qustion_option" 
							v-model="items.checked"
							:value="items.checked"
							v-for="(items,optionskey) in item.option" 
							:name="items.title">
							{{items.title}}:{{items.content}}</u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
			<view class="ks_btnlist">
				<view class="prev_test" @click="prevObj" :class="{play_qustion:playNow>1}">上一题</view>
				<view class="next_test" @click="nextObj" :class="{play_qustion:playNow<qustionlist.length}">下一题</view>
			</view>
		</view>
		<view class="nosubmit" 
		:class="{'submit':issubmit}" 
		@click="jiaoju">交卷</view>
		<u-no-network @retry="$noNetReload()"></u-no-network>
	</view>
</template>

<script>
	import { zxks } from '@/request/api.js'
	export default {
		data() {
			return {
				testtitle:"",
				issub:true,
				showToast1:false,
				toastcontent:"交卷后不可重复答题以及更改答案是否确认交卷？",
				btn1:"取消",
				btn2:"交卷",
				playNow:0,
				khid:"",
				issubmit:false,
				awsnerlength:0,
				qustionlist:[],
				single:[],
				list: [
					{
						name: 'apple',
						checked: false,
					},
					{
						name: 'banner',
						checked: false,
					},
					{
						name: 'orange',
						checked: false,
					}
				],
				subData:{
					uid:getApp().globalData.uid,
					aid:"",
					tid:"",
					qid:[],
					answer:[]
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
					that.$refs.uToast.show({title:"分享失败"})
				}
			}
		},
		mounted() {
			this.$store.dispatch("checkXw")
			this.$store.dispatch("appLogin");
			this.ksDetail()
		},
		onLoad(options) {
			this.khid = options.id;
			this.subData.aid = options.id;
		},
		onBackPress(options) {
			if (options.from === 'navigateBack') {
				return false;  
			}
			this.showToast1 = true;
			this.issub = false;
			this.btn1 = "离开";
			this.btn2 = "返回";
			this.toastcontent ="离开当前页面考试不会保存是否确认离开？";
			return true;
		},
		methods: {
			// 试题
			ksDetail(){
				var that = this;
				that.subData.answer = [];
				zxks.examineDetail({
					uid:that.$store.state.uid,
					id:that.khid
				}).then(res => {
					that.testtitle = res.data.data.title;
					that.single = res.data.data.single;
					that.subData.tid = res.data.data.tid;
					that.qustionlist = res.data.data.more.concat(res.data.data.single);
					that.qustionlist.forEach(item => {
						item.value = ""
					})
					that.playNow = 1
				})
			},
			// 选中当前试题
			changeAnswer(value){
				var that = this;
				that.subData.answer = [];
				if(typeof(value) == "string"){
					that.qustionlist[that.playNow - 1].value  = value;
				}else{
					that.qustionlist[that.playNow - 1].value  = value.toString();
				}
				for(var key in that.qustionlist){
					if(that.qustionlist[key].value != ''){
						that.subData.answer.push(that.qustionlist[key].value)
					}
				}
				if(that.subData.answer.length == that.qustionlist.length&&that.subData.answer.length>0){
					that.issubmit = true;
				}else{
					that.issubmit = false;
				}
			},
			// 上一题
			prevObj(){
				if(this.playNow > 1){
					this.playNow -= 1 
				}
				this.width = (this.playNow/this.qustionlist.length)*100
			},
			// 下一题
			nextObj(){
				var that = this;
				if(that.qustionlist[that.playNow-1].type == 2){
					if(that.qustionlist[that.playNow-1].value.length == 1){
						that.$refs.uToast.show({
							title: '至少选择两个选项',
							type: 'default',
						})
						return false
					}
				}
				if(this.playNow < this.qustionlist.length){
					this.playNow += 1 
				}
				this.width = (this.playNow/this.qustionlist.length)*100
			},
			// 交卷
			jiaoju(){
				this.issub = true;
				this.btn1 = "取消";
				this.btn2 = "交卷";
				this.toastcontent ="交卷后不可重复答题以及更改答案是否确认交卷？";
				this.showToast1 = true;
			},
			btn1Evevt(){
				if(this.issub){
					this.showToast1 = false
				}else{
					this.showToast1 = false
					uni.navigateBack(-1)
				}
			},
			// 交卷
			btn2Evevt(){
				var that = this;
				if(that.issub == true){
					that.qustionlist.forEach(item => {
						that.subData.qid.push(item.qid)
					})
					
					that.subData.uid = that.$store.state.uid;
					zxks.makeTest(that.subData).then(res => {
						// console.log(res)
						uni.showToast({
							title:"交卷成功"
						})
						setTimeout(() => {
							this.$u.route({
								type:'navigateBack',
								delta:2
							})
						},800)
					})
				}else{
					
				}
				that.showToast1 = false
			}
		}
	}
</script>

<style lang="scss">
	.kstitle{
		text-align: center;
		padding:0 26rpx;
		margin: 52rpx auto;
		font-size: 36rpx;
		color: #CE2741;
		font-weight: bold;
	}
	.ks_box{
		margin: 26rpx;
		font-size: 28rpx;
		box-sizing: border-box;
		padding-top: 40rpx;
		width: auto;
		color: #333333;
		.ks_times{
			font-weight: bold;
			text-align: center;
		}
		.ks_timess{
			margin-top: 32rpx;
			padding-bottom: 12rpx;
			text-align: center;
		}
		.ks_progress{
			position: relative;
			width: 100%;
			height: 8rpx;
			background: #EDEDED;
			border-radius: 60rpx;
			margin-top: 32rpx;
			.progress_bar{
				left: 0;
				top: 0;
				transition: all 0.2s;
				position: absolute;
				height: 100%;
				border-radius: inherit;
				background:linear-gradient(180deg, #B4091C 0%, #DB153C 100%);;
			}
		}
	}
	.qustions_box{
		padding-top: 0;
		.qustions{
			width: 100%;
			color: #333333;
			.qustion_title{
				margin: 24rpx 0;
				font-size: 28rpx;
				font-weight: bold;
			}
			.qustion_option{
				display: flex;
				align-items: center;
				height: 72rpx;
				width: 100% !important;
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
			.qustion_option_selet{
				background: #EDEDED !important;
				.pointer{
					background: #CE2741 !important;
				}
			}
		}
		.ks_btnlist{
			width: 80%;
			margin:100rpx auto ;
			display: flex;
			justify-content: space-between;
			>view{
				width: 200rpx;
				text-align: center;
				height: 72rpx;
				line-height: 72rpx;
				background: #D3D3D3;
				color: #fff;
				font-size: 28rpx;
				border-radius: 60rpx;
			}
		}
		.play_qustion{
			background: linear-gradient(180deg, #B4091C 0%, #DB153C 100%) !important;
		}
	}
	.nosubmit{
		position: fixed;
		bottom: 74rpx;
		width: 94%;
		box-sizing: border-box;
		height: 84rpx;
		left: 26rpx;
		background: #D3D3D3;
		border-radius: 60rpx;
		color: #fff;
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
		line-height: 84rpx;
		opacity: 0.9;
		pointer-events: none;
	}
	.submit{
		pointer-events: auto !important;
		background: linear-gradient(180deg, #B4091C 0%, #DB153C 100%) !important;
	}
</style>
