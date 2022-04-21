<template>
	<div class="wrap">
		<localBank :showlocal="showlocal" @closeLocal="closeLocal" @pushData="pushData"></localBank>
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>学习教育</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.query.type == 'add'?'新增内容':'编辑内容'}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<div class="contrl_bar">
						<el-button type="primary"
						@click="$router.go(-1)">返回</el-button>
					</div>
					<div class="addTitle">{{$route.query.type == 'add'?'新增内容':'编辑内容'}}</div>
					<div class="addWrap">
						<el-form 
							label-position="center"
							label-width="80px"
							ref="formData" 
							:model="formData" 
							:rules="rules">
							<el-form-item class="form_item" label="内容标题" prop="title">
								<el-input
									placeholder="请输入内容标题"
									v-model="formData.title">
								</el-input>
							</el-form-item>
						<!-- 	<el-form-item class="form_item" label="所属专栏" prop="cid">
								<el-select
									value-key="id"
									v-model="formData.cid" placeholder="请选择所属专栏">
									<el-option
										v-for="item in zlLists"
										:label="item.column_title"
										:value="item.id">
									</el-option>
								</el-select>
							</el-form-item> -->
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
							<el-form-item class="form_item" label="上传内容"  prop="content">
								<el-button type="primary"  @click="showlocal = true">本地添加</el-button>
							</el-form-item>
							<div class="fileList" v-if="formData.file.length > 0">
								<div class="fileItem" v-for="(item,index) in formData.file">
									<div class="fileIcon" v-if="item.bs_id == 8"><img src="@/assets/images/pdfBg.png" ></div>
									<div class="fileIcon" v-if="item.bs_id == 3"><img src="@/assets/images/videoBg.png" ></div>
									<div class="fileIcon" v-if="item.bs_id == 1"><img src="@/assets/images/pptBg.png" ></div>
									<div class="fileIcon" v-if="item.bs_id == 2"><img src="@/assets/images/pdfBg.png" ></div>
									<div class="fileName">{{item.title}}</div>
									<div class="fileDel" title="删除" @click="delfile(index)"><i class="el-icon-delete"></i></div>
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
	import localBank from '@/components/localAdd.vue'
	export default{
		data(){
			return{
				imageUrl:"",
				isUploaded:"上传封面图",
				zhuanlan:"",
				showlocal:false,
				zlLists:[],
				formData:{
					id:"",
					dwid:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					status:1,
					title:"",
					sid:this.$route.query.zl_id,
					cid:"",
					id:"",
					sz_img:"",
					file:[]
				},
				rules:{
					title: [{ required: true, message: '请输入专题名称', trigger: 'blur' }],
					// cid: [{ required: true,message: '请选择所属专栏',  trigger: 'change', }],
					u_zhiwu: [{ required: true, message: '请选择活动类型', trigger: 'blur' }],
				}
			}
		},
		components:{localBank},
		methods:{
			// 关闭本地
			closeLocal(){
				var that = this;
				that.showlocal = false;
			},
			// 本地文件数组
			pushData(file){
				this.formData.file.push(file)
			},
			//删除文件
			delfile(index){
				this.formData.file.splice(index,1);
			},
			// 专栏列表
			zllist(){
				var that = this;
				xxjy.selectSpecialColumn({
					id:that.$route.query.zl_id
				}).then(res => {
					that.zlLists = res.data;
				})
			},
			// 编辑绑定数据
			bindData(){
				var that = this;
				xxjy.updateSpecialContent1({
					id:that.$route.query.id,
				}).then(res => {
					if(res.data.sz_img!='' && res.data.sz_img!=null){
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
							xxjy.updateSpecialContent(that.formData).then(res => {
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
							xxjy.addSpecialContent(that.formData).then(res => {
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
			that.zllist();
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
				padding-left: 80px;
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
