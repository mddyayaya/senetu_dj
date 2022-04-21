<template>
	<div class="wrap">
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>党建宣传</el-breadcrumb-item>
				<el-breadcrumb-item>支部风采</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<div class="contrl_bar">
						<el-button type="primary"
						@click="$router.go(-1)">返回</el-button>
					</div>
					<div class="addTitle">支部风采</div>
					<div class="addWrap">
						<el-form 
							label-position="left"
							ref="zbfc" 
							:model="zbfc" 
							:rules="rules">
							<el-form-item class="form_item" label="输入标题" prop="title">
								<el-input
									placeholder="请输入标题"
									v-model="zbfc.title">
								</el-input>
							</el-form-item>
							<el-form-item class="form_item" label="风采封面" prop="img">
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
							<el-form-item class="form_item fuwenben" label="风采事迹"  prop="content">
								<quill-editor :options="$VueQuillEditor" ref="myTextEditor" v-model="zbfc.content" style="height:327px !important;width: 800px;"></quill-editor>
							</el-form-item>
							<el-form-item class="form_item submit">
								<el-button type="primary" @click="submit('zbfc')">发布</el-button>
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
	import { djxc } from '@/axios'
	import { Message } from 'element-ui'
	export default{
		data(){
			return{
				pub_time:"",
				title:"",
				content:"",
				imageUrl:"",
				organData:[],
				isUploaded:"上传封面图",
				zbfc:{
					id:"",
					zbid:this.$route.query.id,
					flag:this.$route.query.flag,
					title:"",
					content:"",
					img:"",
				},
				rules:{
					// 检测标题是否为空
					title: [
						{ required: true, message: '请输入标题', trigger: 'blur' }
					],
					// 检测封面图是否为空
					img: [
						{ required: true, message: '请上传封面图', trigger: 'blur' }
					],
					// 检测文本是否为空
					content: [
						{ required: true, message: '请输入风采事迹', trigger: 'blur' }
					],
				}
			}
		},
		methods:{
			// 获取数据
			getdata(){
				var that = this;
				djxc.zbfcDetail(that.$route.query.id).then(res => {
					if(res.code == 200){
						that.zbfc = res.data;
						that.imageUrl = res.data.img
					}
				})
			},
			//提交
			submit(formData){
				var that = this;
				that.$refs[formData].validate((valid) => {
					if (valid) {
						if(that.$route.query.type == 'edit'){
							djxc.zbfcUpdate(that.zbfc).then(res => {
								if(res.code == 200){
									Message({
										type:"success",
										message:"成功"
									})
									that.$router.push('/djxc_zbfc')
								}else{
									Message({
										type:"success",
										message:"成功"
									})
								}
							})
						}else{
							djxc.zbfcAdd(that.zbfc).then(res => {
								if(res.code == 200){
									Message({
										type:"success",
										message:"成功"
									})
									that.$router.push('/djxc_zbfc')
								}else{
									Message({
										type:"success",
										message:"成功"
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
					that.zbfc.img = res.data.src
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
				that.getdata();
			}
		},
		created() {
			var that = this;
			that.$emit('selectTop',2)
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
		}
	}
</style>
