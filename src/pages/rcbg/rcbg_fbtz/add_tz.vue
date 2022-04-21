<template>
	<div class="wrap">
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>日常办公</el-breadcrumb-item>
				<el-breadcrumb-item>发布通知</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<div class="contrl_bar">
						<el-button type="primary"
						@click="$router.go(-1)">返回</el-button>
					</div>
					<div class="addTitle">发布通知</div>
					<div class="addWrap">
						<el-form 
							label-position="left"
							ref="formData" 
							:model="formData" 
							:rules="rules">
							<el-form-item class="form_item" label="通知标题" prop="title">
								<el-input
									placeholder="请输入通知标题"
									v-model="formData.title">
								</el-input>
							</el-form-item>
							<el-form-item class="form_item" label="接收组织" prop="zbid">
								 <el-select
									multiple
									value-key="id"
									collapse-tags
								 	v-model="zbList" 
								 	placeholder="请选择接收组织"
									@change="selectZb">
								 	<el-option v-for="item in zzlist" :label="item.dw" :value="item"></el-option>
								 </el-select>
							</el-form-item>
							<el-form-item class="form_item fuwenben" label="通知内容"  prop="content">
								<quill-editor :options="$VueQuillEditor" ref="myTextEditor" v-model="formData.content" style="height:327px !important;width: 800px;"></quill-editor>
							</el-form-item>
							<el-form-item class="form_item" label="添加附件"  prop="">
								<el-upload
									name="file"
									:action="$uploadFile"
									:on-success="success"
									:before-upload="$limitFile">
									<el-button  type="primary">本地添加</el-button>
									<div class="tishi">支持格式：jpg、png，pdf,文件不得大于20M</div>
								</el-upload>
							</el-form-item>
							<el-form-item class="form_item submit">
								<el-button type="primary" @click="submit('formData')">发布</el-button>
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
	import { djxc,rcbg } from '@/axios'
	import { Message } from 'element-ui'
	export default{
		data(){
			return{
				zbList:[],
				dialogVisible:false,//资料库弹窗
				showlocal:false,
				formData:{
					p_flag:this.$store.state.userinfo.flag,
					pub_user:this.$store.state.userinfo.dw,
					dwid:this.$store.state.userinfo.id,
					zbid:[],
					flag:[],
					id:"",
					title:"",
					content:"",
					img:"",
					type:1,
					ispub:2,
					file:[],
					pub_time:"",
				},
				zzlist:[],
				rules:{
					title: [{ required: true, message: '请输入通知标题', trigger: 'blur' }],
					zbid: [{ required: true, message: '请选择接收组织', trigger: 'blur' }],
					content: [{ required: true, message: '请输入通知内容', trigger: 'blur' }],
				}
			}
		},
		methods:{
			// 上传封面图成功
			success(res, file) {
				var that = this;
				if(res.code == 200){
					that.imageUrl = URL.createObjectURL(file.raw);
					that.isUploaded = "重新上传"
					that.formData.file.push(res.data)
				}else{
					Message({
						type:"error",
						message:"上传失败，请检查文件或网络连接"
					})
				}
			},
			selectZb(value){
				var that = this;
				that.formData.flag = [];
				that.formData.zbid = [];
				for(var i=0;i<value.length;i++){
					that.formData.flag.push(value[i].flag)
					that.formData.zbid.push(value[i].id)
				}
			},
			//提交
			submit(formData){
				var that = this;
				that.$refs[formData].validate((valid) => {
					if (valid) {
						rcbg.pubNotice(that.formData).then(res => {
							if(res.code == 200){
								that.$router.go(-1);
							}else{
								Message({
									type:"error",
									message:res.msg
								})
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			// 参与组织列表
			organMember(){
				var that = this;
				djxc.partyOrgan({
					user_id:that.$store.state.userinfo.id,
					flag:that.$store.state.userinfo.flag,
				}).then(res => {
					that.zzlist = res.data;
				})
			}
		},
		mounted() {
			var that = this;
			that.organMember();
		},
		created() {
			var that = this;
			that.$emit('selectTop',6)
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
