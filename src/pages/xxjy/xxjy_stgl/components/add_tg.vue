<template>
	<div class="wrap">
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>学习教育</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.query.type == 'add'?'新建题干':'编辑题干'}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<div class="contrl_bar">
						<el-button type="primary"
						@click="$router.go(-1)">返回</el-button>
					</div>
					<div class="addTitle">{{$route.query.type == 'add'?'新建题干':'编辑题干'}}</div>
					<div class="addWrap">
						<el-form 
							ref="formData" 
							:model="formData" 
							label-width="80px"
							label-position="center" 
							:rules="rules">
							<el-form-item class="form_item" label="试题题干" prop="title">
								<el-input
									placeholder="请输入试题题干"
									v-model="formData.title">
								</el-input>
							</el-form-item>
							<el-form-item class="form_item" label="难易程度" prop="difficulty">
								<el-select  v-model="formData.difficulty" placeholder="请选择难易程度">
									<el-option label="简单" value="1"></el-option>
									<el-option label="适中" value="2"></el-option>
									<el-option label="简单" value="3"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item class="form_item" label="题干类型" prop="type">
								<el-select  v-model="formData.type" placeholder="请选择题干类型" @change="resetOptions">
									<el-option label="单选" value="1"></el-option>
									<el-option label="多选" value="2"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item class="form_item" label="试题选项" prop="answer" v-if="formData.type != ''">
								<div class="options">
									<div class="options_title">勾选答案为正确答案</div>
									<div class="options_list">
										<el-radio-group v-model="formData.answer" v-if="formData.type == 1">
											<el-radio :label="item.option" style="margin-top: 10px;" v-for="(item,index) in formData.options">
												{{item.title}}
												<el-input v-model="item.content" size="small" placeholder="请输入选项标题" style="margin-left: 10px;"></el-input>
												<span @click="delOptons(item.option)" style="color: #BB0000;margin-left: 10px;font-size: 14px;cursor: pointer;">删除</span>
											</el-radio>
										</el-radio-group>
										<el-checkbox-group v-model="answer" v-else @change="moreSelect">
											<el-checkbox :label="item.option" :key="item.option" style="margin-top: 10px;" v-for="(item,index) in formData.options">
												{{item.title}}
												<el-input  v-model="item.content" size="small" placeholder="请输入选项标题" style="margin-left: 10px;"></el-input>
												<span @click="delOptons(item.option)" style="color: #BB0000;margin-left: 10px;font-size: 14px;cursor: pointer;">删除</span>
											</el-checkbox>
										</el-checkbox-group>
									</div>
									<div style="text-align: center;width: 100%;margin-top: 10px;">
										<el-button type="primary" size="small" @click="addOptons">添加</el-button>
									</div>
								</div>
							</el-form-item>
							<el-form-item class="form_item" label="试题解析" prop="analysis">
								<el-input type="textarea" v-model="formData.analysis" placeholder="请输入试题解析"></el-input>
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
	</div>
</template>

<script>
	import { Message } from 'element-ui'
	import { xxjy } from '@/axios'
	export default{
		data() {
			return{
				title:"新建题干",
				answer:[],
				formData:{
					id:"",
					dwid:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					title:"",
					type:"",
					difficulty:"",
					class_id:this.$route.query.class_id,
					analysis:"",
					answer:"A",
					status:1,
					establish:this.$store.state.userinfo.dw,
					options:[
						{
							label:"1",
							title:"选项A",
							content:"",
							option:"A"
						},
						{
							label:"2",
							title:"选项B",
							content:"",
							option:"B"
						},
					],
				},
				getdata:{
					id:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					title: "",
					status:""
				},
				rules:{
					title:[{ required: true, message: '请输入题干', trigger: 'blur' }],
					type:[{ required: true, message: '请选择题干类型', trigger: 'blur' }],
					difficulty:[{ required: true, message: '请选择难易程度', trigger: 'blur' }],
					analysis:[{ required: true, message: '请输入试题解析', trigger: 'blur' }],
					answer:[{ required: true, message: '请选择正确答案', trigger: 'blur' }],
				},
			}
		},
		props:{
			showlocal:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			// 新增选项
			addOptons(){
				var that = this;
				if(that.formData.options.length == 6){
					Message({
						type:'warning',
						message:"最多可设置六个选项"
					})
				}else{
					that.formData.options.push({
						label:that.formData.options.length+1,
						title:"选项"+that.charChange(that.formData.options.length+1),
						content:"",
						option:that.charChange(that.formData.options.length+1)
					})
				}
			},
			// 删除选项
			delOptons(optionId){
				var that = this;
				if(that.formData.options.length == 2){
					that.$message({
						type:"warning",
						message:"至少保留两个选项"
					})
				}else{
					that.formData.options.splice(that.formData.options.indexOf(optionId-1),1);
				}
			},
			// 初始化选项
			resetOptions(){
				this.formData.options = [
					{
						label:"1",
						title:"选项A",
						content:"",
						option:"A"
					},
					{
						label:"2",
						title:"选项B",
						content:"",
						option:"B"
					}
				];
			},
			// 多选数据
			moreSelect(value){
				var that = this;
				that.formData.answer = value.toString()
			},
			// 选项数字转字母
			charChange(number){
				number = parseInt(number)
				if(number == 1){
					number = "A"
				}else if(number == 2){
					number = "B"
				}else if(number == 3){
					number = "C"
				}else if(number == 4){
					number = "D"
				}else if(number == 5){
					number = "E"
				}else if(number == 6){
					number = "F"
				}
				return number;
			},
			closeEdit(){
				var that = this;
				that.formData = {
					dwid:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					name:[]
				}
				that.$emit("closeLocal");
			},
			// 提交
			submit(){
				var that = this;
				that.$refs.formData.validate(valid => {
					if(valid){
						// 选项标题不能为空
						for(var key in that.formData.options){
							if(that.formData.options[key].content == ""){
								Message({
									type:"warning",
									message:"请输入选项标题"
								})
								return false
							}
						}
						// 多选正确答案为两个及以上
						if(that.formData.type == 2){
							if(that.formData.answer.length == 1){
								Message({
									type:"warning",
									message:"请至少选择两个正确答案"
								})
								return false;
							}
						}
						if(that.$route.query.type == 'add'){
							xxjy.addQuestion(that.formData).then(res => {
								if(res.code == 200){
									if(res.code == 200){
										that.$router.go(-1);
										that.closeEdit();
									}else{
										Message({
											type:"error",
											message:res.msg
										})
									}
								}
							})
						}else{
							xxjy.updateQuestion1(that.formData).then(res => {
								if(res.code == 200){
									if(res.code == 200){
										that.$router.go(-1);
										that.closeEdit();
									}else{
										Message({
											type:"error",
											message:res.msg
										})
									}
								}
							})
						}
					}
				})
			},
			// 编辑绑定
			bindData(){
				var that = this;
				xxjy.updateQuestion({
					id:that.$route.query.id
				}).then(res => {
					if(res.data.type == 2){
						that.answer = res.data.answer.split(",");
					}
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
			if(that.$route.query.type == "edit"){
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
	}
</style>
