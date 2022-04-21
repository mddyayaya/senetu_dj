<template>
	<div class="step">
		<div class="stepList" v-for="(item,index) in stepList">
			<div class="step_title">{{index+1}}.{{item.title}}</div>
			<div class="step_lists">
				<el-card shadow="hover" v-for="(items,keys) in item.list" :class="{progress:items.step == status}">
					<div class="box_title">{{keys+1}}.{{items.name}}</div>
					<div class="control">
						<el-button type="success" size="mini" v-if="step > items.step">已完成</el-button>
						<el-button type="text" size="mini" v-if="items.step == step">进行中</el-button>
						<el-button type="primary" size="mini" plain v-if="items.step == step && pass.file.length == 0" @click="upload(item.title,items.name)">上传</el-button>
						<el-button type="text" size="mini" v-if="items.step > step" style="color: #A6AAB8;">未进行</el-button>
						<el-button type="text" size="mini" v-if="(pass.file.length > 0&&step==items.step) || (step>items.step&&pass.file.length==0)" @click="previewFile(items.step)">预览</el-button>
						<el-button type="primary" size="mini" v-if="items.step == step" @click="passStep(items.step,'pass')">审核通过</el-button>
					</div>
				</el-card>
			</div>
		</div>
		<el-button class="backoff" type="primary" @click="passStep(step,'back')">退回上一步</el-button>
		<!-- 上传文件 -->
		<el-dialog 
			class="zzgk"
			:modal-append-to-body='true'
			width="500px"
			center
			:append-to-body='true'
			:visible.sync="uploadWin">
			<div slot="title" class="addtitle">
				<div>
					<i class="icon adddzz"></i>
					上传文件
					<div class="addline"></div>
				</div>
			</div>
			<div class="formData1">
				<div>
					<div class="form_item">发展阶段：{{developStep}}</div>
					<div class="form_item">阶段：{{developSteps}}</div>
					<div class="form_item">
						<el-upload
							name="file"
							:action="$uploadFile"
							:show-file-list="false"
							:on-success="success"
							:before-upload="limitFile">
							<el-button  type="text"><i class="el-icon-upload"></i>上传文件</el-button>
							<div class="tishi">支持jpeg、jpg、png、pdf且不得大于20M</div>
						</el-upload>
					</div>
				</div>
			</div>
		</el-dialog>
		<div class="showfile" v-if="showPreview" @click.self="showPreview = false">
			<div class="showData">
				<div v-if="showFile.length>0">
					<div v-for="item in showFile">
						<img :src="item.src" v-if="item.src.search('pdf') == -1">
						<iframe :src="item.src+'#toolbar=0'" v-else></iframe>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { dygl } from '@/axios'
	import { Message } from 'element-ui'
	export default{
		props:{
			step:{
				type:String,
				default:"1"
			},
			file:{
				type:Object,
				default:{}
			}
		},
		data() {
			return{
				uploadWin:false,
				developStep:"加载中",//发展阶段
				developSteps:"加载中",
				preview:"",
				filelist:[],
				showPreview:false,
				pass:{
					uid:this.$route.query.id,
					u_zhiwu_status:"",
					file:[]
				},
				showFile:[],
				stepList:[
					{	
						step:1,
						title:"入党申请",
						list:[
							{name:"递交申请书",step:1,file:""},
							{name:"党组织派人谈话",step:2,file:""},
						],
					},
					{	
						step:2,
						title:"入党积极分子的确定和培养教育",
						list:[
							{name:"入党积极分子登记",step:3,file:""},
							{name:"指定培养联系人",step:4,file:""},
							{name:"定期考察培养教育",step:5,file:""},
							{name:"上级党委备案",step:6,file:""},
						],
					},
					{	
						step:3,
						title:"发展对象的确定和考察",
						list:[
							{name:"确定发展对象",step:7,file:""},
							{name:"上级党委备案",step:8,file:""},
							{name:"确定入党介绍人",step:9,file:""},
							{name:"进行政治审查",step:10,file:""},
							{name:"开展集中培训",step:11,file:""},
						],
					},
					{	
						step:4,
						title:"预备党员的接收",
						list:[
							{name:"支部党委审查",step:12,file:""},
							{name:"上级党委预审",step:13,file:""},
							{name:"填写入党志愿书",step:14,file:""},
							{name:"支部讨论大会",step:15,file:""},
							{name:"上级党委派人谈话",step:16,file:""},
							{name:"上级党委审批",step:17,file:""},
							{name:"再向上级党委备案",step:18,file:""},
						],
					},
					{	
						step:5,
						title:"预备党员的教育考察",
						list:[
							{name:"编入党小组",step:19,file:""},
							{name:"入党宣誓",step:20,file:""},
							{name:"继续教育考察",step:21,file:""},
							{name:"提出转正申请",step:22,file:""},
							{name:"支部大会讨论",step:23,file:""},
						],
					},
					{	
						step:6,
						title:"预备党员的转正",
						list:[
							{name:"上级党委审批",step:24,file:""},
						],
					},
				],
				status:"",
			}
		},
		methods:{
			// 通过
			passStep(step,type){
				var that = this;
				var text = "确定通过审核？",password = "通过审核";
				that.pass.u_zhiwu_status = parseInt(step)+1;
				if(type != 'pass'){
					that.pass.u_zhiwu_status -= 2
					text = "确定退回上一步？";password="退回"
				}
				that.$confirm(text, password, {
					cancelButtonText: '取消',
					confirmButtonText: '确定',
					type: 'warning'
				}).then(() => {
					// 确定
					dygl.userHave(that.pass).then(res => {
						if(res.code == 200){
							that.$emit("dataList");
							that.closeEdit();
						}
					})
				}).catch(() => {
					// 取消
					
				});
			},
			// 预览
			previewFile(step){
				var that = this;
				if(step < that.step){
					that.showFile = [];
					if(that.filelist){
						for(var key in that.filelist){
							if(step == parseInt(key)){
								that.showPreview = true;
								for(var i in that.filelist[key]){
									that.showFile.push({
										src:that.filelist[key][i].src
									})
								}
							}
						}
					}else{
						Message({
							type:"warning",
							message:"请先上传文件"
						})
					}
				}else{
					that.showFile = that.pass.file;
					that.showPreview = true;
				}
			},
			// 上传文件
			upload(name1,name2){
				var that = this;
				that.uploadWin = true;
				that.developStep = name1;//发展阶段
				that.developSteps = name2;//发展阶段
			},
			submit(){
				var that = this;
				if(this.pass.file.length == 0){
					Message({
						type:"warning",
						message:"请上传文件"
					})
				}else{
					that.uploadWin = false;
				}
			},
			// 取消
			closeEdit(){
				var that = this;
				that.pass = {
					uid:this.$route.query.id,
					u_zhiwu_status:"",
					file:[]
				};
				that.filelist = [];
				that.developStep = "加载中";//发展阶段
				that.developSteps = "加载中";
			},
			// 上传成功
			success(res, file) {
				var that = this;
				if(res.code == 200){
					that.pass.file = [];
					that.pass.file.push({
						src:res.data.src
					});
					that.uploadWin = false;
				}else{
					Message({
						type:"error",
						message:"上传失败，请检查文件或网络连接"
					})
				}
			},
			// 图片上传限制
			limitFile(file){
				var isJPG = file.type === 'image/jpeg' 
						 || file.type === 'image/png' 
						 || file.type === 'image/jpg' 
						 || file.type === 'application/pdf'
				var isLt2M = file.size / 1024 / 1024 < 200;
				if (!isJPG) {
					Message.error('请上传体统支持的文件格式');
					return false;
				}
				if (!isLt2M) {
					Message.error('上传文件大小不能超过 200MB!');
					return false;
				}
			}
		},
		watch:{
			step(val){
				this.status = parseInt(val);
			},
			file(value){
				this.filelist = value;
			}
		}
	}
</script>

<style lang="scss">
	.step{
		position: relative;
		width: 100%;
		.backoff{
			top: 0;
			position: absolute;
			right: 0;
		}
		.stepList{
			width: 100%;
			color: #1E2129;
			.step_title{
				margin: 20px 0;
				font-size: 16px;
				font-weight: bold;
			}
			.step_lists{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				.el-card{
					margin-right: 20px;
					margin-bottom: 20px;
					cursor: not-allowed;
					border: 1px solid #DDE2EE;
					background: rgb(250,251,252);
					width: 220px;
					height: 130px;
					.box_title{
						font-size: 14px;
						font-weight: bold;
						color: #A6AAB8;
					}
					.control{
						display: flex;
						width: 100%;
						margin-top: 50px;
						justify-content: space-between;
					}
				}
			}
		}
	}
	.progress{
		border: 1px solid #BB0000 !important;
		color: #BB0000 !important;
		cursor: pointer;
		.box_title{
			color: #BB0000 !important;
		}
	}
	.disabled{
		cursor: not-allowed;
		border: 1px solid #DDE2EE;
		background: rgb(250,251,252);
		color: #A6AAB8 !important;
	}
	.formData1{
		display: flex;
		align-items: center;
		justify-content: center;
		.form_item{
			line-height: 40px;
			display: flex;
			align-items: center;
		}
		.tishi{
			font-size: 12px;
			color: #333;
		}
	}
	.el-dialog--center .el-dialog__body{
		padding-top: 0 !important;
	}
	.el-upload{
		text-align: left !important;
	}
	.showfile{
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba($color: #000000, $alpha: 0.8);
		top: 0;
		left: 0;
		z-index: 10;
		.showData{
			width: 70%;
			height: 80%;
			overflow-y: scroll;
			padding: 50px 50px;
			box-sizing: border-box;
			background: #fff;
			>div{
				width: 100%;
				height: 100%;
				>div{
					width: 100%;
					height: 100%;
					overflow-y: scroll;
					img{
						width: 100%;
					}
					iframe{
						width: 100%;
						border: none;
						height: 100%;
						background: none;
					}
				}
			}
		}
	}
</style>
