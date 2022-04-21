<template>
	<div class="wrap">
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>日常办公</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<div class="dydetail">
						<div>
							{{title}}
						</div>
						<div>
							<!-- <el-button type="primary" @click="$router.push('/gxzy_add')">编辑</el-button> -->
							<el-button type="primary" plain @click="$router.go(-1)">返回上级</el-button>
						</div>
					</div>
					<div class="step_box">
						<!-- 参与党组织 -->
						<div class="cyzz">发布人：{{pub_user}}</div>
						<div class="cyzz">发布时间：{{$changeTime(pubtime)}}</div>
						<div class="cyzz_content">
							<div>通知公告：</div>
							<div class="ggList" v-html="content"></div>
						</div>
						<div class="cyzz" v-if="fileList.length > 0">
							<div class="zztitle">附件</div>
							<div class="zzlist">
								<div class="flieItem" v-for="item in fileList">
									<img src="../../../assets/images/show_f.png">
									<span class="fileTitle">{{item.title||item.name}}</span>
									<span @click="download(item.src)"><i class="el-icon-download"></i></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { rcbg } from '@/axios'
	import { Message } from 'element-ui'
	export default{
		data(){
			return{
				pub_user:'数据加载中',
				fileList:[],
				content:"数据加载中",
				pubtime:'数据加载中',
				title:"数据加载中"
			}
		},
		methods:{
			// 获取数据
			dataList(){
				var that = this;
				rcbg.noticeDetail({
					id:that.$route.query.id
				}).then(res => {
					if(res.code == 200){
						that.title = res.data.title;
						that.pub_user = res.data.pub_user;
						that.pubtime = res.data.addtime;
						that.fileList = res.data.file;
						that.content = res.data.content;
					}
				})
			},
			// 编辑
			edit(data){
				var that = this;
				that.$router.push({
					path:"/zzhd_add",
					query:{
						hyid: this.$route.query.hyid,
						flag: this.$route.query.hy_flag,
						type:'edit',
						dw: this.$route.query.dw,
						uid:that.getdata.uid,
					}
				})
			},
			// 下载
			download(url){
				window.open(url)
			}
		},
		mounted() {
			var that = this;
			that.dataList();
			that.$emit('selectTop',6);
		},
		created() {
			var that = this;
			that.$emit('selectTop',6)
		}
	}
</script>

<style lang="scss">
	.el-descriptions__title{
		display: flex;
		font-size: 20px;
		align-items: center;
	}
	.el-descriptions-item__label.has-colon::after{
		content: "" !important;
	}
	.dydetail{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		>div:nth-child(1){
			width: 66.8%;
			color: #1E2129;
			font-size: 16px;
			font-weight: bold;
			margin-right: 20px;
		}
	}
	.el-descriptions{
		flex: 1;
	}
	.subtitle{
		width: 100%;
		height: 50px;
		border: 1px solid #DDDDDD;
		line-height: 50px;
		border-left: none;
		margin: 20px 0;
		color: #333;
		font-size: 14px;
		border-right: none;
		>span{
			display: inline-block;
			height: 100%;
			cursor: pointer;
			border-bottom: 2px solid rgba($color: #000000, $alpha: 0);
			padding: 0 20px;
		}
		>span:hover{
			color: #000000;
			border-bottom: 2px solid #bb0000;
		}
		.selectBar{
			color: #000000;
			border-bottom: 2px solid #bb0000;
		}
	}
	.cyzz{
		margin: 10px 0 5px 0;
		width: 100%;
		display: flex;
		align-items: center;
		font-size: 14px;
		font-weight: bold;
		.zztitle{
			font-weight: bold;
		}
		.zzlist{
			margin: 20px 15px;
			max-height: 600px;
			overflow-y: scroll;
			.flieItem{
				margin-bottom: 20px;
				width: 500px;
				border: 1px solid #DDDDDD;
				padding: 20px;
				box-sizing: border-box;
				align-items: center;
				img{
					width: 30px;
					height: 30px;
					margin-right: 20px;
				}
				.fileTitle{
					color: #bb0000;
					display: inline-block;
					width: 380px;
					font-size: 14px;
				}
			}
		}
	}
	.cyzz_content{
		font-size: 14px;
		font-weight: bold;
		margin: 10px 0;
		.ggList{
			font-weight: 400;
			width: 500px;
			margin-top: 10px;
			padding: 32px 46px;
			background: #FAFBFC;
			border: 1px solid #DDE2EE;
			color: #3C4353;
			font-size: 10px;
			line-height: 19px;
			img{
				width: 100%;
				margin: 20px 0;
			}
		}
	}
</style>

