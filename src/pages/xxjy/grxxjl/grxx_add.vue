<template>
	<div class="wrap">
		<dataBank :dialogVisible="dialogVisible" @closeEdit="closeEdit" @pushData="pushData1"></dataBank>
		<localBank :showlocal="showlocal" @closeLocal="closeLocal" @pushData="pushData"></localBank>
		<Khname :showkh="showkh" @closeKh="closeKh" @bindKhid="bindKhid"></Khname>
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>学习教育</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.query.type == 'add'?'新增个人学习':'编辑个人学习'}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<div class="contrl_bar">
						<el-button type="primary"
						@click="$router.go(-1)">返回</el-button>
					</div>
					<div class="addTitle">{{$route.query.type == 'add'?'新增个人学习':'编辑个人学习'}}</div>
					<div class="addWrap">
						<el-form 
							label-position="center"
							label-width="80px"
							ref="formData" 
							:model="formData" 
							:rules="rules">
							<el-form-item class="form_item" label="学习主题" prop="title">
								<el-input
									placeholder="请输入学习主题"
									v-model="formData.title">
								</el-input>
							</el-form-item>
							<el-form-item class="form_item" label="学习时间" prop="h_stime">
								<el-date-picker
									v-model="formData.h_stime"
									type="datetime"
									placeholder="请选择学习时间"
									value-format="timestamp"
									default-time="09:00:00">
								</el-date-picker>
							</el-form-item>
							<el-form-item class="form_item" label="参与人员" prop="u_id">
								 <el-cascader
									v-model="formData.u_id"
									ref="cascaderAddr"
									@change="szzlist"
								    :options="zzlist"
								    :props="props"
								    collapse-tags
									placeholder="请选择参与人员"
								    clearable></el-cascader>
							</el-form-item>
							<el-form-item  class="form_item" label="学习课时" prop="hour">
								<el-input-number v-model="formData.hour"  :min="1"  label="学习课时"></el-input-number>
							</el-form-item>
							<el-form-item class="form_item" label="是否考核" prop="">
								<el-switch
									style="margin-top: 12px;"
									:inactive-value="2"
									:active-value="1"
									v-model="formData.assessment">
								</el-switch>
							</el-form-item>
							<el-form-item class="form_item" label="考核名称" prop="assess_title" v-if="formData.assessment == 1">
								<el-input
									disabled
									v-model="formData.assess_title">
								</el-input>
								<el-button style="margin-left: 10px;" size="small" type="primary" @click='showkh = true'>添加考核</el-button>
							</el-form-item>
							<el-form-item class="form_item" label="学习资料"  prop="content">
								<el-button type="info" plain @click="showlocal = true">本地添加</el-button>
								<el-button type="primary" plain @click="dialogVisible = true">资料库添加</el-button>
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
	import { dwgl } from '@/axios'
	import { Message } from 'element-ui'
	import dataBank from '@/components/databank.vue'
	import localBank from '@/components/localAdd.vue'
	import Khname from './components/kh_name.vue'
	export default{
		data(){
			return{
				imageUrl:"",
				isUploaded:"上传封面图",
				typeList:[],
				dialogVisible:false,//资料库弹窗
				showlocal:false,
				formData:{
					dw:this.$route.query.dw,
					flag:this.$route.query.flag,
					user_id:this.$route.query.uid,
					title:"",
					u_id:[],
					tid:"",
					h_stime:"",
					h_address:"",
					sz_img:"",
					hour:0,
					file:[],
					focus:2,
					hyid:"",
					status:2,
					assess_title:"",//考核名称
					branch :"2",// branch  1：支部会议，2：个人会议
					assessment: 2, //assessment 否开启是考核，1：开启，2：不开启
					assess_id:""// 考核id
				},
				showkh:false,
				zzlist:[],
				props: { multiple: true },
				rules:{
					// 检测标题是否为空
					title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
					// 检测学习时间是否为空
					h_stime: [{ required: true, message: '请选择学习时间', trigger: 'blur' }],
					// 检测活动组织是否为空
					u_id:[{ required: true, trigger: 'blur',  message: '请选择参与组织' }],
					// 请选择考核
					assess_title:[{ required: true, trigger: 'blur',  message: '请选择考核' }],
				}
			}
		},
		components:{dataBank,localBank,Khname},
		methods:{
			// 获取数据
			getdata(){
				var that = this;
				
			},
			// 选择考核id
			bindKhid(value){
				console.log(value);
				this.formData.assess_id = value.id;
				this.formData.assess_title = value.title;
			},
			// 组织选择
			szzlist(value){
				var that = this;
				that.formData.u_id = value
			},
			// 关闭资料库弹窗
			closeEdit(){
				var that = this;
				that.dialogVisible = false;
			},
			// 关闭考核选择弹窗
			closeKh(){
				var that = this;
				that.showkh = false;
			},
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
			// 编辑绑定数据
			bindData(){
				var that = this;
				console.log(that.$route.query.pub_flag)
				dwgl.updateActivity({
					hyid:that.$route.query.hyid,
					flag:that.$route.query.hy_flag,
					pub_flag: that.$route.query.pub_flag
				}).then(res => {
					for(var key in res.data){
						for(var index in that.formData){
							if(key == index){
								that.formData[index] = res.data[index]
							}
						}
					}
					// that.formData = res.data;
					that.formData.dw = this.$route.query.dw;
					that.formData.flag = this.$route.query.flag;
					that.formData.user_id = this.$route.query.uid;
				})
			},
			// 资源库文件数组
			pushData1(fileList){
				this.formData.file = this.formData.file.concat(fileList)
			},
			//提交
			submit(formData){
				var that = this;
				that.$refs[formData].validate((valid) => {
					if (valid) {
						if(that.formData.assessment == 1){
							if(that.formData.assess_id == ''){
								Message({
									type:"warning",
									message:"请选择考核"
								})
								return false;
							}
						}
						if(that.$route.query.type == 'edit'){
							// 编辑
							dwgl.updateActivity1(that.formData).then(res => {
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
							dwgl.addActivity(that.formData).then(res => {
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
			// 参与组织列表
			organMember(){
				var that = this;
				dwgl.organMember({
					flag:this.$route.query.type=='edit'?this.$route.query.pub_flag:this.$route.query.flag,
					user_id:this.$route.query.type=='edit'?this.$route.query.pub_id:this.$route.query.uid,
				}).then(res => {
					that.zzlist = res.data;
				})
			}
		},
		mounted() {
			var that = this;
			if(that.$route.query.type == 'edit'){
				that.getdata();
			}
			// 活动类型分类筛选列表
			dwgl.hyClass().then(res => {
				that.typeList = res;
			});
			that.organMember();
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
