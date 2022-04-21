<template>
	<div class="wrap">
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>学习教育</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.query.type == 'add'?'新增考试':'编辑考试'}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<div class="contrl_bar">
						<el-button type="primary"
						@click="$router.go(-1)">返回</el-button>
					</div>
					<div class="addTitle">{{$route.query.type == 'add'?'新增考试':'编辑考试'}}</div>
					<div class="addWrap">
						<el-form 
							label-position="center"
							label-width="80px"
							ref="formData" 
							:model="formData" 
							:rules="rules">
							<el-form-item class="form_item" label="考试名称" prop="title">
								<el-input
									placeholder="请输入考试名称"
									v-model="formData.title">
								</el-input>
							</el-form-item>
							<el-form-item class="form_item" label="选择试卷" prop="tid">
								<el-select v-model="formData.tid"  placeholder="请选择试卷" >
									<el-option
									  style="margin-left: 0;"
									  v-for="item in testLists"
									  :label="item.title"
									  :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item class="form_item" label="参与组织" prop="u_id">
								 <el-cascader
									v-model="formData.u_id"
									ref="cascaderAddr"
									@change="szzlist"
								    :options="zzlist"
								    :props="props"
								    collapse-tags
									placeholder="请选择参与组织"
								    clearable></el-cascader>
							</el-form-item>
							<el-form-item class="form_item" label="考试时间" prop="time">
								<el-date-picker
									v-model="formData.time"
									type="daterange"
									value-format="timestamp"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期">
								</el-date-picker>
							</el-form-item>
							<el-form-item class="form_item submit">
								<el-button type="primary" @click="submit('formData')">保存</el-button>
								<el-button @click="$router.go(-1)">取消</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { xxjy,dwgl } from '@/axios'
	import { Message } from 'element-ui'
	export default{
		data(){
			return{
				zhuanlan:"",
				zzlist:[],
				testLists:[],
				formData:{
					id:"",
					dwid:this.$store.state.userinfo.id,
					p_flag:this.$store.state.userinfo.flag,
					status:1,
					title:"",
					tid:"",
					u_id:[],
					time:"",
				},
				props: { multiple: true },
				rules:{
					title: [{ required: true, message: '请输入专题名称', trigger: 'blur' }],
					tid: [{ required: true,message: '请选择试卷',  trigger: 'change', }],
					u_id: [{ required: true, message: '请选择参与人员', trigger: 'blur' }],
					time: [{ required: true, message: '请选择考试时间', trigger: 'blur' }],
				}
			}
		},
		methods:{
			// 组织选择
			szzlist(value){
				var that = this;
				that.formData.u_id = value
			},
			// 参与组织列表
			organMember(){
				var that = this;
				dwgl.organMember({
					flag:this.$store.state.userinfo.flag,
					user_id:this.$store.state.userinfo.id,
				}).then(res => {
					that.zzlist = res.data;
				})
			},
			// 试卷列表
			testList(){
				var that = this;
				xxjy.testList({
					flag:this.$store.state.userinfo.flag,
					dwid:this.$store.state.userinfo.id,
				}).then(res => {
					that.testLists = res.data;
				})
			},
			// 编辑绑定数据
			bindData(){
				var that = this;
				xxjy.updateAssessment1({
					id:that.$route.query.id,
				}).then(res => {
					for(var key in res.data){
						for(var i in that.formData){
							if(key == i){
								that.formData[i] = res.data[key]
							}
						}
					}
				})
			},
			//提交
			submit(formData){
				var that = this;
				that.$refs[formData].validate((valid) => {
					if (valid) {
						if(that.$route.query.type == 'edit'){
							// 编辑
							xxjy.updateAssessment(that.formData).then(res => {
								if(res.code == 200){
									that.$router.go(-1);
								}else{
									Message({
										type:"error",
										message:res.msg
									})
								}
							})
						}else{
							// 新增
							xxjy.addAssessment(that.formData).then(res => {
								if(res.code == 200){
									that.$router.go(-1);
								}else{
									Message({
										type:"error",
										message:res.msg
									})
								}
							})
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		},
		mounted() {
			var that = this;
			if(that.$route.query.type == 'edit'){
				that.bindData();
			}
			that.$emit('selectTop',5)
			that.organMember();
			that.testList();
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
			width: 100%;
			height: 100%;
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
				padding-left: 85px;
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
			.fileList{
				width: 400px;
				margin-left: 65px;
				max-height: 400px;
				overflow-y: scroll;
				overflow-x: hidden;
				margin-bottom: 22px;
				overflow-y: scroll;
				box-sizing: border-box;
				.fileItem{
					width: 100%;
					border: 1px solid #ddd;
					padding: 10px 10px;
					height: 80px;
					margin-bottom: 15px;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					.fileIcon{
						width: 50px;
						img{
							width: 100%;
						}
					}
					.fileName{
						margin-left: 10px;
						margin-right: 10px;
						width: 280px;
						line-height: 30px;
						height: 30px;
						overflow: hidden;
					}
					i{
						cursor: pointer;
					}
					i:hover{
						color: #BB0000;
					}
				}
			}
		}
	}
</style>
