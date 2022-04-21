<template>
	<div class="wrap">
		<Testlist :dialogVisible="dialogVisible" @closeEdit="closeEdit" @pushData="pushData"></Testlist>
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>学习教育</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.query.type == 'add'?'新建试卷':'编辑试卷'}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="contrl_bar">
					<el-button type="primary"
					@click="$router.go(-1)">返回</el-button>
				</div>
				<div class="addTitle">{{$route.query.type == 'add'?'新建试卷':'编辑试卷'}}</div>
				<div class="addWrap" v-show="!showlocal">
					<el-form 
						ref="formData"
						label-width="80px"
						label-position="center"  
						:model="formData"
						:rules="rules">
						<el-form-item class="form_item" label="试卷名称" prop="title">
							<el-input
								placeholder="请输入试卷名称"
								v-model="formData.title">
							</el-input>
						</el-form-item>
						<el-form-item class="form_item" label="卷面总分" prop="total">
							<el-input
								placeholder="请输入卷面总分"
								v-model.number="formData.total">
							</el-input>
						</el-form-item>
						<el-form-item class="form_item" label="及格分数" prop="pass">
							<el-input
								placeholder="请输入及格分数"
								v-model.number="formData.pass">
							</el-input>
						</el-form-item>
						<el-form-item class="form_item" label="考试时长" prop="duration">
							<el-input
								placeholder="请输入考试时长"
								v-model.number="formData.duration">
							</el-input>
						</el-form-item>
						<el-form-item class="form_item submit">
							<el-button type="primary" @click="next()">下一步</el-button>
							<el-button @click="$router.go(-1)">取消</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="addzz11" v-show="showlocal">
					<div class="addzz111">
						<div slot="title" class="addtitle">
							<div class="test_title">
								{{formData.title}}
							</div>
							<div class="test_time">
								<span>考试时间：{{formData.duration}}分钟</span>
								<span>总分：{{formData.total}}分</span>
							</div>
						</div>
						<div class="databank1">
							<el-collapse v-model="activename" accordion>
								<el-collapse-item title="1.单选" name="1">
									<div class="testWrap">
										<div class="test_item" v-for="(item,index) in formData.question" v-if="item.type==1">
											<div class="test_titles">
												<span class="">{{item.title}}</span>
												<span @click="delItem(index)">删除</span>
											</div>
											<div class="answerlist">
												<div class="anwser_item" v-for="items in item.options">{{items.title}}：{{items.content}}</div>
											</div>
											<div class="trueAnwser">正确答案：<span>{{item.answer}}</span></div>
											<div class="anlyise">答案解析：<span>{{item.analysis}}</span></div>
										</div>
										<div v-if="formData.question.length == 0" style="text-align: center;padding: 10px 0;">暂无试题，左下角添加试题按钮添加试题</div>
									</div>
								</el-collapse-item>
								<el-collapse-item title="2.多选" name="2">
									<div class="testWrap">
										<div class="test_item" v-for="(item,index) in formData.question" v-if="item.type==2">
											<div class="test_titles">
												<span class="">{{item.title}}</span>
												<span @click="delItem(index)">删除</span>
											</div>
											<div class="answerlist">
												<div class="anwser_item" v-for="items in item.options">{{items.title}}：{{items.content}}</div>
											</div>
											<div class="trueAnwser">正确答案：<span>{{item.answer}}</span></div>
											<div class="anlyise">答案解析：<span>{{item.analysis}}</span></div>
										</div>
										<div v-if="formData.question.length == 0" style="text-align: center;padding: 10px 0;">暂无试题，左下角添加试题按钮添加试题</div>
									</div>
								</el-collapse-item>
							</el-collapse>
						</div>
						<div slot="footer" class="dialog-footer">
							<el-button type="primary" @click="dialogVisible = true">添加试题</el-button>
						</div>
					</div>
					<div class="addzz112">
						<div class="title_wrap">
							<div class="title_wrap_item">题型统计</div>
							<div class="title_wrap_item">共（{{formData.question.length}}）道题</div>
						</div>
						<div class="content">
							<div class="title_wrap_item">
								<span>1.单选题</span>
								<!-- <span>{{singleList.length}}道</span> -->
							</div>
							<div class="title_wrap_item">
								<span>2.多选题</span>
								<!-- <span>{{moreList.length}}道</span> -->
							</div>
						</div>
						<div class="save_test">
							<el-button type="primary" size="small" @click="submit()">保存试卷</el-button>
							<el-button type="primary" size="small" @click="clearTest()">清空试题</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Message } from 'element-ui'
	import { xxjy } from '@/axios'
	import Testlist from './testlist.vue'
	export default{
		data() {
			return{
				title:"新建题干",
				showlocal:false,
				formData:{
					dwid:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					title:"",
					status:1,
					total:100,
					pass:60,
					duration:60,
					qid:[],
					id:"",
					question:[]
				},
				dialogVisible:false,
				activename:"1",
				getdata:{
					id:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					title: "",
					status:""
				},
				rules:{
					title:[{ required: true, message: '请输入试卷名称', trigger: 'blur' }],
					total:[{ required: true, message: '请输入卷面总分', trigger: 'blur' }],
					pass:[{ required: true, message: '请输入及格分数', trigger: 'blur' }],
					duration:[{ required: true, message: '请输入考试时长', trigger: 'blur' }]
				},
			}
		},
		components:{Testlist},
		methods:{
			// 试题分类列表
			classList(){
				var that = this;
				xxjy.questionClassList(that.getdata).then(res => {
					that.stlist = res.data;
				})
			},
			// 删除试题
			delItem(index){
				this.formData.question.splice(index,1);
			},
			pushData(value){
				if(this.formData.question.length==0){
					this.formData.question = value
				}else{
					this.formData.question = [...new Set(this.formData.question.concat(value))];
				}
			},
			// 添加qid
			appendQid(arr){
				var that = this;
				arr.forEach(item => {
					that.formData.qid.push(item.id)
				})
			},
			// 关闭弹窗
			closeEdit(){
				var that = this;
				that.dialogVisible = false;
			},
			// 清空试题
			clearTest(){
				this.$confirm('确定清空已选试题吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.formData.qid = [];
					this.formData.question = [];
				}).catch(() => {
					
				});
			},
			// 下一步
			next(){
				var that = this;
				that.$refs.formData.validate(valid => {
					if(valid){
						that.showlocal = true;
					}
				})
			},
			// 提交数据
			submit(){
				var that = this;
				that.formData.question.forEach(item => {
					that.formData.qid.push(item.id)
				})
				if(that.formData.qid.length == []){
					Message({
						type:'warning',
						message:"请选择试题"
					})
				}else{
					if(that.$route.query.type == 'add'){
						xxjy.addTest(that.formData).then(res => {
							if(res.code == 200){
								that.$router.go(-1)
							}else{
								Message({
									type:'error',
									message:res.msg
								})
							}
						})
					}else{
						xxjy.updateTest1(that.formData).then(res => {
							if(res.code == 200){
								that.$router.go(-1)
							}else{
								Message({
									type:'error',
									message:res.msg
								})
							}
						})
					}
				}
			},
			// 编辑绑定
			bindData(){
				var that = this;
				xxjy.updateTest({
					id:that.$route.query.id
				}).then(res => {
					for(var key in res.data){
						for(var index in that.formData){
							if(key == index){
								that.formData[index] = res.data[key]
							}
						}
					}
				})
			}
		},
		mounted() {
			var that = this;
			that.$emit('selectTop',5)
			if(that.$route.query.type == 'edit'){
				that.bindData();
			}
		},
		created() {
			var that = this;
			that.$emit('selectTop',5)
		}
	}
</script>

<style lang="scss">
	.wrap{
		width: 100%;
		position: relative;
		color: $index_color;
		font-size: index_size1;
		.addTitle{
			width: 100%;
			border-bottom: 1px solid #DDE2EE;
			padding-bottom: 15px;
			margin: -40px 0 20px 0;
			font-size: 18px;
			color: #333333;
			font-weight: bold;
			width: 80%;
		}
		.el-input{
			width: 220px !important;
		}
		textarea{
			resize: none;
			width: 400px;
			height: 200px;
		}
		.addWrap{
			.form_item{
				width: 100%;
				margin-bottom: 15px;
				display: flex !important;
				align-items: flex-start !important;
				font-size: 14px;
				.fengmian{
					display: inline-block;
					vertical-align: bottom;
					height: 150px;
					margin-right: 10px;
					margin-left: 0;
					width: 223px;
				}
				.tishi{
					font-size: 12px;
					color: rgb(131, 138, 157);
					margin-top: 10px;
				}
				.el-upload{
					text-align: left !important;
				}
			}
			.el-form-item__content{
				margin-left: 0 !important;
			}
			.fuwenben{
				padding-bottom: 110px;
			}
			.submit{
				padding-left: 100px;
			}
			.el-form-item__error{
				position: relative !important;
				margin-left: 20px;
				line-height: 30px;
			}
			.pic{
				width: 110px;
				height: 150px;
				vertical-align: bottom;
				margin-right: 15px;
			}
			.lists{
				width: 300px;
				margin-left: 66px;
				max-height: 300px;
				overflow-y: scroll;
				margin-bottom: 20px;
				&_item{
					box-sizing: border-box;
					width: 100%;
					font-size: 16px;
					display: flex;
					align-items: center;
					margin-bottom: 20px;
					>span:nth-child(1){
						width: 200px;
						height: 40px;
						padding: 0 10px;
						overflow: hidden;
						line-height: 40px;
						border-radius: 4px;
						border: 1px solid #DDDDDD;
						margin-right: 10px;
					}
					>span:nth-child(2){
						cursor: pointer;
						color: #BB0000;
					}
				}
			}
			.options{
				padding: 20px 20px;
				box-sizing: border-box;
				width: 400px;
				border: 1px solid #E5E9EF;
				background: #FAFBFC;
				max-height: 300px;
				overflow-y: scroll;
				&_title{
					font-size: 16px;
					font-weight: bold;
				}
			}
		}
		.addzz11{
			width: 80%;
			display: flex;
			align-items: top;
			justify-content: space-between;
			.addzz111{
				width: 75%;
				.addtitle{
					display: block;
					.test_time{
						margin-top: 10px;
						margin-bottom: 10px;
						span{
							color: #000;
							font-weight: 400;
							font-size: 12px;
						}
					}
				}
				.el-collapse{
					width: 100%;
				}
			}
			.addzz112{
				width: 22%;
				height: 210px;
				padding: 10px 10px;
				box-sizing: border-box;
				border: 1px solid #DDDDDD;
				.title_wrap{
					width: 100%;
					font-size: 14px !important;
					font-weight: bold;
					margin-bottom: 10px;
					padding-bottom: 10px;
					border-bottom: 1px solid #DDDDDD;
					text-align: center;
				}
				.content{
					>div{
						line-height: 25px;
						font-size: 14px;
						display: flex;
						justify-content: space-between;
					}
				}
				.save_test{
					display: flex;
					width: 100%;
					margin-top: 40px;
				}
			}
			.databank1{
				width: 100%;
				height: 400px;
				overflow-y: scroll;
				margin-bottom: 10px;
				display: flex;
				box-sizing: border-box;
				justify-content: center;
				.testWrap{
					width: 100%;
					max-height: 350px;
					overflow-y: scroll;
					.test_item{
						margin-bottom: 10px;
						padding: 10px;
						box-sizing: border-box;
						background: rgba($color: #000000, $alpha: 0.03);
						border: 1px solid rgba($color: #000000, $alpha: 0.05);
						.test_titles{
							display: flex;
							justify-content: space-between;
							align-items: center;
							line-height: 35px;
							>span:nth-child(1){
								font-weight: bold;
								font-size: 16px;
							}
							>span:nth-child(2){
								cursor: pointer;
								font-size: 14px;
								color: #b00;
								min-width: 31px;
								margin-left: 10px;
							}
						}
						.anwser_item{
							line-height: 25px;
							font-size: 14px;
						}
						.trueAnwser{
							font-size: 14px;
							margin-top: 20px;
							font-weight: bold;
							span{
								color: #BB0000;
							}
						}
						.anlyise{
							font-size: 14px;
							font-weight: bold;
							span{
								font-weight: 400;
								font-size: 12px;
								line-height: 20px;
							}
						}
					}
				}
			}
		}
		.el-dialog--center .el-dialog__body{
			padding-top: 0 !important;
			padding-bottom: 0 !important;
		}
	}
</style>
