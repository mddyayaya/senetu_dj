<template>
	<div class="wrap">
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>党建宣传</el-breadcrumb-item>
				<el-breadcrumb-item>支部要闻</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<div class="contrl_bar">
						<el-button type="primary" plain
						@click="$router.go(-1)">返回上级</el-button>
					</div>
					<div class="addTitle">要闻资讯</div>
					<div class="addWrap">
						<el-form 
							label-position="left"
							ref="news" 
							:model="news" 
							:rules="rules">
							<el-form-item class="form_item" label="输入标题:" prop="title">
								<el-input
									placeholder="请输入标题"
									v-model="news.title">
								</el-input>
							</el-form-item>
							<el-form-item class="form_item" label="发布时间:" style="margin-left: 10px;">
								<el-date-picker
									v-model="news.pub_time"
									type="date"
									value-format="timestamp"
									placeholder="选择发布时间">
								</el-date-picker>
							</el-form-item>
							<el-form-item class="form_item" label="资讯封面:" prop="sz_img">
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
							<el-form-item class="form_item fuwenben" label="正文内容"  prop="content">
								<quill-editor :options="$VueQuillEditor" ref="myTextEditor" v-model="news.content" style="height:327px !important;width: 800px;"></quill-editor>
							</el-form-item>
							<el-form-item class="form_item submit">
								<el-button type="primary" @click="submit('news')">发布</el-button>
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
				isUploaded:"上传封面图",
				news:{
					title:"",
					pub_time:"",
					pub_user:this.$store.state.userinfo.dw,
					sz_img:"",
					content:"",
					uid:this.$route.query.uid,
					id:"",//编辑用到id
					flag:this.$route.query.flag
				},
				rules:{
					// 检测标题是否为空
					title: [
						{ required: true, message: '请输入标题', trigger: 'blur' }
					],
					// 检测封面图是否为空
					sz_img: [
						{ required: true, message: '请上传封面图', trigger: 'blur' }
					],
					// 检测文本是否为空
					content: [
						{ required: true, message: '请输入正文内容', trigger: 'blur' }
					],
				}
			}
		},
		methods:{
			// 编辑时获取数据
			getdata(){
				var that = this;
				djxc.zbNewsDetail(that.$route.query.id).then(res => {
					if(res.code == 200){
						if(res.data.pub_time.length <= 7){
							res.data.pub_time = parseInt(res.data.pub_time) * 1000000
						}else{
							res.data.pub_time = parseInt(res.data.pub_time)
						}
						that.news = {
							title:res.data.title,
							pub_time:res.data.pub_time,
							pub_user:res.data.pub_user,
							sz_img:res.data.sz_img,
							content:res.data.title,
							uid:res.data.uid,
							id:res.data.id,
							flag:res.data.flag
						}
						that.imageUrl = res.data.sz_img
						if(res.data.sz_img == ""){
							that.isUploaded = "上传封面图"
						}else{
							that.isUploaded = "重新上传"
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
							djxc.zbNewsUpdate(that.news).then(res => {
								if(res.code == 200){
									Message({
										type:"success",
										message:"成功"
									})
									that.$router.push('/djxc_ywzx')
								}else{
									Message({
										type:"success",
										message:"成功"
									})
								}
							})
						}else{
							djxc.zbNewsAdd(that.news).then(res => {
								if(res.code == 200){
									Message({
										type:"success",
										message:"成功"
									})
									that.$router.push('/djxc_ywzx')
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
					that.news.sz_img = res.data.src
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
