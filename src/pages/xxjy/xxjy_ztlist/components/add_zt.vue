<template>
	<div class="wrap">
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>学习教育</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.query.type == 'add'?'新增专题':'编辑专题'}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<div class="contrl_bar">
						<el-button type="primary"
						@click="$router.go(-1)">返回</el-button>
					</div>
					<div class="addTitle">{{$route.query.type == 'add'?'新增专题':'编辑专题'}}</div>
					<div class="addWrap">
						<el-form 
							label-position="center"
							label-width="80px"
							ref="formData" 
							:model="formData" 
							:rules="rules">
							<el-form-item class="form_item" label="专题标题" prop="title">
								<el-input
									placeholder="请输入专题标题"
									v-model="formData.title">
								</el-input>
							</el-form-item>
							<el-form-item class="form_item" label="专题简介" prop="introduct">
								<el-input
									placeholder="请输入专题简介"
									type="textarea"
									style="width: 400px;height: 200px;"
									v-model="formData.introduct">
								</el-input>
							</el-form-item>
							<el-form-item class="form_item" label="上传封面" prop="sz_img">
								<el-upload
									name="file"
									:action="$uploadImg"
									:show-file-list="false"
									:on-success="success"
									:before-upload="$limitImg">
									<img v-if="imageUrl" :src="imageUrl" class="fengmian">
									<el-button  type="primary">{{imageUrl == null || imageUrl == ''?'上传封面':'重新上传'}}</el-button>
									<div class="tishi">支持格式：jpg、png，图片不得大于2M</div>
								</el-upload>
							</el-form-item>
							<!-- <el-form-item class="form_item" label="专题专栏" prop="">
								<el-input
									placeholder="请输入专栏"
									v-model="zhuanlan">
								</el-input>
								<el-button @click="goappend" type="primary" size="small" style="margin-left: 10px;">{{formData.column_title.length==0?'添加':'继续添加'}}</el-button>
							</el-form-item> -->
							<div class="lists" v-if="formData.column_title.length>0">
								<div class="lists_item" v-for="(item,index) in formData.column_title">
									<span>{{$route.query.type=='add'?item:item.column_title}}</span>
									<span @click="delzhuanlan(index)">删除</span>
								</div>
							</div>
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
	import { xxjy } from '@/axios'
	import { Message } from 'element-ui'
	export default{
		data(){
			return{
				imageUrl:"",
				isUploaded:"上传封面图",
				zhuanlan:"",
				formData:{
					id:"",
					dwid:this.$route.query.dwid,
					flag:this.$route.query.flag,
					status:1,
					title:"",
					introduct:"",
					sz_img:"",
					column_title:[]
				},
				rules:{
					title: [{ required: true, message: '请输入专题名称', trigger: 'blur' }],
					introduct: [{ required: true,message: '请输入专题简介',  trigger: 'blur', }],
					u_zhiwu: [{ required: true, message: '请选择活动类型', trigger: 'blur' }],
				}
			}
		},
		methods:{
			// 添加专栏
			goappend(){
				if(this.zhuanlan==""){
					Message({
						message:"请输入后添加",
						type:"warning"
					})
				}else{
					this.formData.column_title.push(this.zhuanlan);
				}
			},
			// 删除专栏
			delzhuanlan(index){
				this.formData.column_title.splice(index,1)
			},
			// 编辑绑定数据
			bindData(){
				var that = this;
				xxjy.updateSpecial({
					id:that.$route.query.id,
				}).then(res => {
					if(res.data.sz_img!=''&&res.data.sz_img!=null){
						that.imageUrl = res.data.sz_img;
						that.isUploaded = "重新上传"
					}else{
						
					}
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
							xxjy.updateSpecial1(that.formData).then(res => {
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
							xxjy.addSpecial(that.formData).then(res => {
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
			// 上传封面图成功
			success(res, file) {
				var that = this;
				if(res.code == 200){
					that.imageUrl = URL.createObjectURL(file.raw);
					that.isUploaded = "重新上传"
					that.formData.sz_img = res.data.src
				}else{
					Message({
						type:"error",
						message:"上传失败，请检查文件或网络连接"
					})
				}
			},
		},
		mounted() {
			var that = this;
			if(that.$route.query.type == 'edit'){
				that.bindData();
			}
			that.$emit('selectTop',5)
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
				margin-left: 80px;
				max-height: 300px;
				overflow-y: scroll;
				margin-bottom: 20px;
				&_item{
					box-sizing: border-box;
					width: 100%;
					font-size: 14px;
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
		}
	}
</style>
