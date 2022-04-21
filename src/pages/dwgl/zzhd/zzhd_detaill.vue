<template>
	<div class="wrap">
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>党务管理</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<div class="dydetail1">
						<div class="dyimg">
							<img src="../../../assets/images/moren.png" v-if="u_pic==''||u_pic==null||u_pic.search('http')==-1">
							<img :src="u_pic" v-else>
						</div>
						<el-descriptions class="margin-top" :title="hy_title" :column="3" >
							<template slot="">
								活动主题：{{u_name}}
							</template>
							<template slot="extra">
								<!-- <el-button type="primary" plain @click="edit()">编辑</el-button> -->
								<el-button type="primary" plain @click="$router.go(-1)">返回上级</el-button>
							</template>
							<el-descriptions-item v-for="(item,index) in detailList">
								{{item.name}} : 
								{{item.value}}
							</el-descriptions-item>
						</el-descriptions>
					</div>
					<div class="step_box">
						<!-- 参与党组织 -->
						<div class="cyzz">
							<div class="zztitle">参与组织：</div>
							<div class="zzlist">{{dyzz}}</div>
						</div>
						<div class="cyzz">
							<div class="zztitle">参与人员：</div>
							<div class="zzlist">{{dyname}}</div>
						</div>
						<div class="cyzz" v-if="hyStatus==2">
							<div class="zztitle">活动记录：</div>
							<div class="zzlist">
								<quill-editor :options="$VueQuillEditor" ref="myTextEditor" v-model="hyjl.record" style="height:327px !important;width: 800px;"></quill-editor>
								<div style="margin-top: 80px;"><el-button type="primary" @click="submitHyjl">保存</el-button></div>
							</div>
						</div>
						<div class="cyzz" v-if="fileList.length > 0">
							<div class="zztitle">活动附件：</div>
							<div class="zzlist">
								<div class="flieItem" v-for="item in fileList">
									<img src="../../../assets/images/show_f.png">
									<span class="fileTitle">{{item.title}}</span>
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
	import { dwgl } from '@/axios'
	import { Message } from 'element-ui'
	export default{
		data(){
			return{
				getdata:{
					hyid: this.$route.query.hyid,
					flag: this.$route.query.hy_flag
				},
				hyjl:{
					hyid: this.$route.query.hyid,
					record:"",
					status:2,
					flag: this.$route.query.hy_flag
				},
				u_name:"数据加载中",
				u_pic:'',
				dyname:"数据加载中",
				dyzz:"数据加载中",
				hy_title:"数据加载中",
				hyStatus:"",
				detailList:[
					{name:"发布组织",value:"数据加载中",icon:"el-icon-user-solid"},
					{name:"活动类型",value:"数据加载中",icon:"el-icon-s-custom"},
					{name:"活动时间",value:"数据加载中",icon:"el-icon-s-check"},
					{name:"活动地点",value:"数据加载中",icon:"el-icon-phone"}
				],
				fileList:[]
			}
		},
		methods:{
			// 编辑
			edit(){
				var that = this;
				
			},
			// 获取数据
			dataList(){
				var that = this;
				dwgl.updateActivity(that.getdata).then(res => {
					if(res.code == 200){
						that.hyjl.record = res.data.record;
						that.hy_title = res.data.title;
						that.u_name = res.data.title;
						that.u_pic = res.data.sz_img;
						that.dyname = res.data.dy_name;
						that.dyzz = res.data.u_name;
						that.fileList = res.data.file;
						that.hyStatus = res.data.status;
						that.detailList[0].value = res.data.dw;
						that.detailList[1].value = res.data.t_name;
						that.detailList[2].value = that.$changeTime(res.data.h_stime);
						that.detailList[3].value = res.data.h_address;
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
						uid:this.$route.query.uid,
					}
				})
			},
			// 提交会议记录
			submitHyjl(){
				var that = this;
				if(that.hyjl.record == ""){
					Message({
						type:'warning',
						message:"请输入会议记录后提交"
					})
				}else{
					dwgl.addHyLog(that.hyjl).then(res => {
						if(res.code == 200){
							that.$router.go(-1)
						}
					})
				}
			},
			// 下载
			download(url){
				window.open(url)
			}
		},
		mounted() {
			var that = this;
			that.dataList();
			that.$emit('selectTop',3);
		},
		created() {
			var that = this;
			that.$emit('selectTop',3)
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
	.dydetail1{
		width: 100%;
		display: flex;
		.dyimg{
			width: 250px !important;
			height: 160px;
			background: #DDDDDD;
			margin-right: 20px;
			border-radius: 10px;
			img{
				border-radius: 10px;
				width: 100%;
				height: 100%;
			}
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
	.step_box{
		width: 100%;
	}
	.el-step__title.is-process{
		color: #1266E3 !important;
	}
	.el-step__head.is-process{
		color: #1266E3 !important;
		border-color: #1266E3 !important;
	}
	.el-step__title.is-process{
		color: #1266E3 !important;
	}
	.cyzz{
		margin: 15px 0;
		width: 100%;
		font-size: 16px;
		.zztitle{
			font-weight: bold;
			padding-right: 10px;
		}
		.zzlist{
			margin: 5px 0;
			max-height: 600px;
			font-weight: 400;
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
		.zzlist1{
			margin-top: 20px;
			width: 80%;
			padding: 30px 30px;
			background: #FAFBFC;
			line-height: 30px;
			font-size: 14px;
			border: 1px solid #DDE2EE;
			img{
				width: 80%;
				margin: 10px 0;
			}
		}
	}
</style>

