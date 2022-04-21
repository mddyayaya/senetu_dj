<template>
	<div class="addzz">
		<el-dialog 
			class="zzgk"
			:modal-append-to-body='true'
			width="500px"
			center
			:append-to-body='true'
			@close="closeEdit"
			:visible.sync="dialogVisible">
			<div slot="title" class="addtitle">
				<div>
					<i class="icon adddzz"></i>
					{{title}}
					<div class="addline"></div>
				</div>
			</div>
			<div class="formData1">
				<el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm">
					<el-form-item label="组织名称" prop="dw">
						<el-input v-model="formData.dw" placeholder="请输入党组织名称"></el-input>
					</el-form-item>
					<el-form-item label="登录账号" prop="u_number">
						<el-input v-model="formData.u_number" placeholder="请输入登录账号"></el-input>
					</el-form-item>
					<el-form-item label="选择角色" prop="flag">
						<el-select :disabled="type=='edit'?true:false" v-model="formData.flag" placeholder="请选择选择组织角色">
							<el-option label="总支/党支部" value="2" v-if="$store.state.userinfo.flag == 1"></el-option>
							<el-option label="党支部/党小组" value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="上级组织" prop="pid">
						<el-select 
							v-model="formData.pid" 
							placeholder="请选择上级组织">
							<el-option v-for="item in others.plist" :label="item.dw" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="负责人" prop="head_name">
						<el-input v-model="formData.head_name" placeholder="请输入负责人姓名"></el-input>
					</el-form-item>
					<el-form-item label="联系方式" prop="head_phone">
						<el-input v-model="formData.head_phone" placeholder="请输入负责人联系方式"></el-input>
					</el-form-item>
					<el-form-item label="所在省份" v-if="$store.state.userinfo.id==332||$store.state.userinfo.p_id==332">
						<el-select 
							v-model="formData.province_id" 
							placeholder="请选择组织所在地">
							<el-option v-for="item in province" :label="item.province" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="组织类型" ref="noRequired0">
						<el-select 
							v-model="formData.organ_class" 
							placeholder="请选择组织类型">
							<el-option v-for="item in others.organClass" :label="item.option" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="组织书记" ref="noRequired1">
						<el-input v-model="formData.organ_secretary" placeholder="请输入组织书记"></el-input>
					</el-form-item>
					<el-form-item label="通讯地址" ref="noRequired2">
						<el-input v-model="formData.address" placeholder="请输入通讯地址"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submit()">保 存</el-button>
				<el-button @click="closeEdit()">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { dwgl } from '@/axios'
	export default{
		data() {
			return{
				title:"新增党组织",
				formData:{
					dw: '',
					flag: '',
					organ_class: '',
					u_number:"",
					head_name: '',
					head_phone: '',
					organ_secretary: '',
					pid:"",
					address: '',
					province_id:""
				},
				province:[],
				rules:{
					dw:[{ required: true, message: '请输入党组织名称', trigger: 'blur' }],
					u_number:[{ required: true, message: '请输入登录账号', trigger: 'blur' }],
					flag:[{ required: true, message: '请选择选择组织角色', trigger: 'blur' }],
					pid:[{ required: true, message: '请选择上级组织', trigger: 'blur' }],
					head_name:[{ required: true, message: '请输入负责人姓名', trigger: 'blur' }],
					head_phone:[{ required: true, trigger: 'blur', validator: this.$checkPhone }],
				},
				others:{}
			}
		},
		props:{
			dialogVisible:{
				type:Boolean,
				default:false
			},
			type:{
				type:String,
				default:'add'
			}
		},
		components:{FormData},
		methods:{
			closeEdit(){
				var that = this;
				that.$emit("closeEdit");
				that.resetForm();
			},
			// 上级组织
			pOran(){
				var that = this;
				dwgl.pOrgan({
					user_id:that.$store.state.userinfo.id,
					flag:that.$store.state.userinfo.flag,
				}).then(res => {
					that.$set(that.others,"plist",res.data)
				})
				dwgl.organClass().then(res => {
					that.$set(that.others,"organClass",res)
				})
			},
			// 提交表单
			submit(){
				var that = this;
				that.$refs.formData.validate(valid => {
					if(valid){
						if(that.type == 'add'){
							dwgl.addOrgan(that.formData).then(res => {
								that.dialogVisible = false;
								that.closeEdit();
							})
						}else{
							dwgl.updateOrgan1(that.formData).then(res => {
								that.dialogVisible = false;
								that.closeEdit();
							})
						}
					}else{
						
					}
				})
			},
			// 省份列表
			provinceList(){
				var that = this;
				dwgl.provinceList({
					user_id:that.$store.state.userinfo.id
				}).then(res => {
					that.province = res.data;
				})
			},
			// 清除表单
			resetForm(){
				var that = this;
				that.$refs.formData.resetFields();
				that.formData = {
					dw: '',
					flag: '',
					organ_class: '',
					u_number:"",
					head_name: '',
					head_phone: '',
					organ_secretary: '',
					pid:"",
					address: '',
					province_id:""
				};
			},
			// 编辑绑定
			bindData(data){
				var that = this;
				that.title = "编辑党组织"
				dwgl.updateOrgan(data).then(res => {
					res.data.organ_class = parseInt(res.data.organ_class)
					that.formData = res.data;
				})
			}
		}
	}
</script>

<style lang="scss">
	.formData1{
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.el-dialog__body{
		max-height: 400px !important;
		overflow-y: scroll;
		padding-top: 0px !important;
		margin-top: 0 !important;
	}
</style>
