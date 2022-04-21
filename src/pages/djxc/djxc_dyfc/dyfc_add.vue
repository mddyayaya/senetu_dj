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
						<el-button type="primary" plain
						@click="$router.go(-1)">返回上级</el-button>
					</div>
					<div class="addTitle">支部风采</div>
					<div class="addWrap">
						<el-form 
							label-position="left"
							ref="dyfc" 
							:model="dyfc" 
							:rules="rules">
							<el-form-item class="form_item" label="输入标题" prop="title">
								<el-input
									placeholder="请输入标题"
									v-model="dyfc.title">
								</el-input>
							</el-form-item>
							<el-form-item class="form_item" label="党员姓名" prop="name">
								<el-input
									placeholder="请输入党员姓名"
									v-model="dyfc.name">
								</el-input>
							</el-form-item>
							<el-form-item class="form_item" label="个人照片" prop="img">
								<el-upload
									style="text-align: left !important;"
									name="file"
									:action="$uploadImg"
									:show-file-list="false"
									:on-success="success"
									:before-upload="$limitImg">
									<img v-if="imageUrl" :src="imageUrl" class="picture">
									<el-button  type="primary">{{imageUrl == null || imageUrl == ''?'上传封面':'重新上传'}}</el-button>
									<div class="tishi">支持格式：jpg、png，图片不得大于2M&nbsp;&nbsp;&nbsp;版本更新如图片丢失请重新上传提交</div>
								</el-upload>
							</el-form-item>
							<el-form-item class="form_item fuwenben" label="风采事迹"  prop="content">
								<quill-editor :options="$VueQuillEditor" ref="myTextEditor" v-model="dyfc.content" style="height:327px !important;width: 800px;"></quill-editor>
							</el-form-item>
							<el-form-item class="form_item submit">
								<el-button type="primary" @click="submit('dyfc')">发布</el-button>
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
				dyfc:{
					zbid:this.$route.query.id,
					flag:this.$route.query.flag,
					name:"",
					id:"",
					title:"",
					content:"",
					img:"",
				},
				rules:{
					// 检测标题是否为空
					title: [
						{ required: true, message: '请输入标题', trigger: 'blur' }
					],
					// 检测是否填写党员姓名是否为空
					name: [
						{ required: true, message: '请输入党员姓名', trigger: 'blur' }
					],
					// 检测封面图是否为空
					img: [
						{ required: true, message: '请上传党员照片', trigger: 'blur' }
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
				djxc.dyfcDetail(that.$route.query.id).then(res => {
					if(res.code == 200){
						that.dyfc = {
							zbid:res.data.zbid,
							flag:res.data.flag,
							id:res.data.id,
							title:res.data.title,
							content:res.data.content,
							img:res.data.img,
							status:res.data.status,
							name:res.data.name,
						}
						that.imageUrl = res.data.img
					}
				})
			},
			// 编辑
			goedit(){
				var that = this;
				that.$router.push({
					path:"/dyfc_add/2",
					query:{
						id:that.$route.query.id,
						flag:that.$route.query.flag,
						type:'edit'
					}
				})
			},
			//提交
			submit(formData){
				var that = this;
				that.$refs[formData].validate((valid) => {
					if (valid) {
						if(that.$route.query.type == 'edit'){
							djxc.dyfcUpdate(that.dyfc).then(res => {
								if(res.code == 200){
									Message({
										type:"success",
										message:"成功"
									})
									that.$router.push('/djxc_dyfc')
								}else{
									Message({
										type:"success",
										message:"成功"
									})
								}
							})
						}else{
							djxc.dyfcAdd(that.dyfc).then(res => {
								if(res.code == 200){
									Message({
										type:"success",
										message:"成功"
									})
									that.$router.push('/djxc_dyfc')
								}else{
									Message({
										type:"success",
										message:"成功"
									})
								}
							})
						}
					} else {
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
					that.dyfc.img = res.data.src
				}else{
					Message({
						type:"error",
						message:"上传失败，请检查文件或网络连接"
					})
				}
			},
			// 党组织列表
			organSelect(){
				var that = this;
				djxc.partyOrgan({
					user_id:that.$store.state.userinfo.id,
					flag:that.$store.state.userinfo.flag,
				}).then(res => {
					if(res.code == 200){
						that.organData = res.data;
					}
				})
			}
		},
		mounted() {
			var that = this;
			that.organSelect();
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
			.el-upload{
				text-align: left !important;
			}
			.form_item{
				width: 100%;
				margin-bottom: 15px;
				display: flex !important;
				align-items: flex-start !important;
				font-size: 14px;
				.el-input{
					width: 220px !important;
				}
				.fengmian{
					display: inline-block;
					vertical-align: bottom;
					height: 150px;
					margin-right: 10px;
					margin-left: 0;
					width: 223px;
				}
				.picture{
					display: inline-block;
					vertical-align: bottom;
					margin-right: 10px;
					margin-left: 0;
					width: 110px;
					height: 150px;
				}
				.tishi{
					font-size: 12px;
					color: rgb(131, 138, 157);
					margin-top: 10px;
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
