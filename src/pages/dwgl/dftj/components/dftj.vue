<template>
	<div class="zzgk_dialog">
		<el-dialog 
			class="zzgk"
			:modal-append-to-body='true'
			width="400px"
			center
			:append-to-body='true'
			@close="closeWin"
			:visible.sync="dialogVisible">
			<div slot="title" class="addtitle">
				<div>
					<i class="icon adddzz"></i>
					{{title}}
					<div class="addline"></div>
				</div>
			</div>
			<el-form ref="formData" :model="formData" class="formWrap" :rules="rules">
				<el-form-item label="选择人员" prop="u_id" v-if="type=='add'">
					<el-cascader
						@change="szzlist"
					   :options="zzlist"
					   :props="props"
					   collapse-tags
						placeholder="请选择缴费人员"
					   clearable></el-cascader>
				</el-form-item>
				<el-form-item label="缴费金额" prop="edu">
					<el-input-number v-model.number="formData.edu" :min="1" label="请输入缴费金额"></el-input-number>
				</el-form-item>
				<el-form-item class="form_item" label="缴费时间" prop="jtime">
					<el-date-picker
						value-format="yyyy/M"
						format="yyyy/M"
						v-model="formData.jtime"
						type="date"
						placeholder="选择缴费时间">
					</el-date-picker>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submit()">保 存</el-button>
				<el-button @click="closeWin">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { Message } from 'element-ui'
	import { djxc,dwgl } from '@/axios'
	export default{
		data(){
			return{
				formData:{
					u_id:[],
					edu: "",
					jtime: "",
					id: "",
					flag: this.$store.state.userinfo.flag,
					dwid: this.$store.state.userinfo.id,
				},
				edit:false,
				rules:{
					// 检测缴费人员
					u_id: [{ required: true, message: '请选择党组织', trigger: 'blur' }],
					// 检测人员是否为空
					edu: [{ required: true, message: '请输入缴费金额', trigger: 'blur' }],
					// 检测缴费时间是否为空
					jtime: [{ required: true, message: '请选择缴费时间', trigger: 'blur' }],
				},
				zzlist:[],
				props: { multiple: true },
				title:"新增缴费"
			}
		},
		props:{
			type:{
				type:String,
				default:'add'
			},
			name:{
				type:String,
				default:'single'
			},
			dialogVisible:{
				type:Boolean,
				default:false
			},
			flag:{
				type:String,
				default:""
			},
			id:{
				type:String,
				default:""
			}
		},
		methods:{
			// 关闭弹窗
			closeWin(){
				var that = this;
				that.formData = {
					u_id:[],
					edu: "",
					jtime: "",
					id: "",
					flag: this.$store.state.userinfo.flag,
					dwid: this.$store.state.userinfo.id,
				};
				that.$refs.formData.resetFields();
				that.$emit("closeWin")
			},
			// 成员列表
			organMember(){
				var that = this;
				dwgl.organMember({
					flag:this.$store.state.userinfo.flag,
					user_id:this.$store.state.userinfo.id,
				}).then(res => {
					that.zzlist = res.data;
				})
			},
			// 组织选择
			szzlist(value){
				var that = this;
				that.formData.u_id = value
			},
			submit(){
				var that = this;
				that.$refs.formData.validate((valid) => {
					if (valid) {
						if(that.type == 'add'){
							dwgl.addParties(that.formData).then(res => {
								if(res.code == 200){
									that.closeWin();
								}else{
									Message({
										type:"error",
										message:res.msg
									})
								}
							})
						}else{
							dwgl.updateParties(that.formData).then(res => {
								if(res.code == 200){
									that.closeWin();
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
			bindData(data){
				var that = this;
				that.formData.edu = data.edu;
				that.formData.jtime = data.jtime;
				that.formData.id = data.id;
			}
		},
		mounted() {
			this.organMember();
		}
	}
</script>

<style lang="scss">
	.zzgk_dialog{
		.el-dialog{
			z-index: 1000;
			width: 500px;
		}
	}
</style>
