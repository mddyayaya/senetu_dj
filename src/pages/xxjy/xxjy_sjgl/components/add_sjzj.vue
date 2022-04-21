<template>
	<div class="wrap">
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>学习教育</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.query.type == 'add'?'新建随机组卷':'编辑随机组卷'}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="contrl_bar">
					<el-button type="primary"
					@click="$router.go(-1)">返回</el-button>
				</div>
				<div class="addTitle">{{$route.query.type == 'add'?'新建随机组卷':'编辑随机组卷'}}</div>
				<div class="addWrap">
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
							<el-input-number
								placeholder="请输入卷面总分"
								:min="1"
								v-model="formData.total">
							</el-input-number>
						</el-form-item>
						<el-form-item class="form_item" label="及格分数" prop="pass">
							<el-input-number
								placeholder="请输入及格分数"
								:min="1"
								v-model="formData.pass">
							</el-input-number>
						</el-form-item>
						<el-form-item class="form_item" label="考试时长" prop="duration">
							<el-input-number
								placeholder="请输入考试时长(分钟)"
								:min="1"
								v-model="formData.duration">
							</el-input-number>
						</el-form-item>
						<el-form-item class="form_item" label="单选题" prop="single">
							<el-input-number
								placeholder="请输入单选题数目"
								:min="1"
								v-model="formData.single">
							</el-input-number>
						</el-form-item>
						<el-form-item class="form_item" label="多选题" prop="multiple">
							<el-input-number
								placeholder="请输入多选题数目"
								:min="1"
								v-model="formData.multiple">
							</el-input-number>
						</el-form-item>
						<el-form-item class="form_item submit">
							<el-button type="primary" @click="submit()">保存</el-button>
							<el-button @click="$router.go(-1)">取消</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Message } from 'element-ui'
	import { xxjy } from '@/axios'
	export default{
		data() {
			return{
				showlocal:false,
				formData:{
					dwid:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					title:"",
					total:100,
					pass:60,
					duration:60,
					class_id:"",
					single:0,
					multiple:0,
					id:"",
				},
				stlist:[],
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
					single:[{ required: true, message: '请输入单选题数量', trigger: 'blur' }],
					multiple:[{ required: true, message: '请输入多选题数量', trigger: 'blur' }],
					duration:[{ required: true, message: '请输入考试时长', trigger: 'blur' }]
				},
			}
		},
		methods:{
			// 试题分类列表
			classList(){
				var that = this;
				xxjy.questionClassList(that.getdata).then(res => {
					that.stlist = res.data;
				})
			},
			closeEdit(){
				var that = this;
				that.formData = {
					dwid:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					title:"",
					status:1,
					total:100,
					pass:60,
					duration:60,
					class_id:"",
					single:0,
					multiple:0,
					id:"",
				}
				that.$emit("closeLocal");
			},
			submit(){
				var that = this;
				that.$refs.formData.validate(valid => {
					if(valid){
						xxjy.randomTest(that.formData).then(res => {
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
				})
			},
		},
		mounted() {
			var that = this;
			that.$emit('selectTop',5)
			that.classList();
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
	}
</style>
