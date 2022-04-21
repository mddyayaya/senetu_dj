<template>
	<div class="wrap">
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>党员信息管理</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.query.type == 'add'?'新增党员':'编辑党员'}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<div class="contrl_bar">
						<el-button type="primary"
						@click="$router.go(-1)">返回</el-button>
					</div>
					<div class="addTitle">{{$route.query.type == 'add'?'新增党员':'编辑党员'}}</div>
					<div class="addWrap">
						<el-form 
							label-position="center"
							label-width="80px"
							ref="formData" 
							:model="formData" 
							:rules="rules">
							<el-form-item class="form_item" label="党员姓名" prop="u_name">
								<el-input
									placeholder="请输入党员姓名"
									v-model="formData.u_name">
								</el-input>
							</el-form-item>
							<el-form-item class="form_item" label="联系方式" prop="u_phone">
								<el-input
									placeholder="请输入党员联系方式"
									v-model="formData.u_phone">
								</el-input>
							</el-form-item>
							<el-form-item class="form_item" label="人员身份" prop="u_zhiwu">
								<el-select
									v-model="formData.u_zhiwu" placeholder="请选择人员身份">
									<el-option label="书记" value="1"></el-option>
									<el-option label="副书记" value="2"></el-option>
									<el-option label="委员" value="3"></el-option>
									<el-option label="普通党员" value="4"></el-option>
									<el-option label="发展党员" value="5"></el-option>
									<el-option label="列席党员" value="6"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item class="form_item" label="申请入党"  v-if="formData.u_zhiwu == 5">
								<el-date-picker
									v-model="formData.applytime"
									type="date"
									placeholder="请选择申请入党时间"
									value-format="timestamp">
								</el-date-picker>
							</el-form-item>
							<el-form-item class="form_item" label="入党时间" prop="" v-if="formData.u_zhiwu != 5">
								<el-date-picker
									v-model="formData.attendtime"
									type="date"
									placeholder="请选择入党时间"
									value-format="timestamp">
								</el-date-picker>
							</el-form-item>
							<el-form-item class="form_item" label="党员性别" prop="">
								<el-select
									v-model="formData.sex" placeholder="请选择党员性别">
									<el-option label="男" value="男"></el-option>
									<el-option label="女" value="女"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item class="form_item" label="党员学历" prop="education">
								<el-select
									v-model="formData.education" placeholder="请选择党员学历">
									<el-option label="高中以下" value="5"></el-option>
									<el-option label="高中" value="1"></el-option>
									<el-option label="大专" value="2"></el-option>
									<el-option label="本科" value="3"></el-option>
									<el-option label="硕士及以上" value="4"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item class="form_item" label="出生年月" prop="">
								<el-date-picker
									v-model="formData.age"
									type="date"
									placeholder="请选择出生日期"
									value-format="timestamp">
								</el-date-picker>
							</el-form-item>
							<el-form-item class="form_item" label="党员民族" prop="">
								<el-select
									v-model="formData.nation" placeholder="请选择党员民族">
									<el-option 
										v-for="item in nation"
										:label="item.option" 
										:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item class="form_item" label="身份证号" >
								<el-input
									placeholder="请输入身份账号"
									v-model="formData.card">
								</el-input>
							</el-form-item>
							<el-form-item class="form_item" label="所属单位" prop="">
								<el-input
									placeholder="请输入所属单位"
									v-model="formData.company">
								</el-input>
							</el-form-item>
							<el-form-item class="form_item" label="通讯地址" prop="">
								<el-input
									placeholder="请输入通讯地址"
									v-model="formData.postal_address">
								</el-input>
							</el-form-item>
							<el-form-item class="form_item" label="个人照片" prop="img">
								<el-upload
									name="file"
									:action="$uploadImg"
									:show-file-list="false"
									:on-success="success"
									:before-upload="$limitImg">
									<img v-if="imageUrl" :src="imageUrl" class="pic">
									<el-button  type="primary">{{imageUrl == null || imageUrl == ''?'上传封面':'重新上传'}}</el-button>
									<div class="tishi">支持格式：jpg、png，图片不得大于2M</div>
								</el-upload>
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
	import { dygl } from '@/axios'
	import { Message } from 'element-ui'
	export default{
		data(){
			return{
				imageUrl:"",
				isUploaded:"上传封面图",
				nation:[],
				formData:{
					id:"",
					cy_zz: this.$route.query.cy_zz,
					uid:this.$route.query.uid,
					flag:this.$route.query.flag,
					u_name:'',
					card:"",
					sex:"",
					education:"",
					age:"",
					nation:"",
					attendtime:"",
					company:"",
					postal_address:"",
					u_zhiwu:"",
					partypos:"",
					a_stime:"",
					u_zuzhi:"",
					applytime:"",
					u_phone:"",
					u_zhiwu_status: 1,
					u_picture:"",
				},
				zzlist:[],
				props: { multiple: true },
				rules:{
					// 检测标题是否为空
					u_name: [{ required: true, message: '请输入党员姓名', trigger: 'blur' }],
					// 检测联系方式是否为空
					u_phone: [{ required: true, trigger: 'blur', validator: this.$checkPhone }],
					// 检测活动类型是否为空
					u_zhiwu: [{ required: true, message: '请选择党员职务', trigger: 'blur' }],
				}
			}
		},
		methods:{
			// 编辑绑定数据
			bindData(){
				var that = this;
				dygl.updateMemberBind({
					id:that.$route.query.id,
				}).then(res => {
					if(res.data.u_picture!=''&&res.data.u_picture!=null){
						that.imageUrl = res.data.u_picture;
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
						that.formData.u_zhiwu == 5?that.formData.u_zhiwu_status=1:that.formData.u_zhiwu_status=0;
						if(that.$route.query.type == 'edit'){
							// 编辑
							dygl.updateMember(that.formData).then(res => {
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
							dygl.addMember(that.formData).then(res => {
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
					that.formData.u_picture = res.data.src
				}else{
					Message({
						type:"error",
						message:"上传失败，请检查文件或网络连接"
					})
				}
			},
			// 参与组织列表
			nationList(){
				var that = this;
				dygl.nation().then(res => {
					that.nation = res.data;
				})
			}
		},
		mounted() {
			var that = this;
			that.nationList();
			if(that.$route.query.type == 'edit'){
				that.bindData();
			}
			that.$emit('selectTop',4)
		},
		created() {
			var that = this;
			that.$emit('selectTop',4)
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
			.pic{
				width: 110px;
				height: 150px;
				vertical-align: bottom;
				margin-right: 15px;
			}
		}
	}
</style>
