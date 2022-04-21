<template>
	<div class="zzgk_dialog">
		<el-dialog 
			class="zzgk"
			:modal-append-to-body='true'
			width="400px"
			center
			:append-to-body='true'
			@close="clearForm"
			:visible.sync="dialogFormVisible">
			<div slot="title" class="addtitle">
				<div>
					<i class="icon adddzz"></i>
					编辑信息
					<div class="addline"></div>
				</div>
			</div>
			<div class="formData1">
				<el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm">
					<el-form-item label="组织名称" prop="dw">
						<el-input v-model="formData.dw"  placeholder="输入组织全称" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="负责人" prop="head_name">
						<el-input v-model="formData.head_name"  placeholder="输入组织负责人姓名" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="负责人电话" prop="head_phone">
						<el-input v-model="formData.head_phone"  placeholder="输入组织负责人电话" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submit()">立即修改</el-button>
				<el-button @click="clearForm">取消</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import { Message } from 'element-ui'
	import { zzgk } from '@/axios'
	export default{
		data(){
			return{
				formData:{
					dw:this.$store.state.userinfo.dw,
					head_name:this.$store.state.userinfo.head_name,
					head_phone:this.$store.state.userinfo.head_phone,
					id:this.$store.state.userinfo.id,
				},
				rules:{
					dw:[{ required: true, message: '请输入党组织名称', trigger: 'blur' }],
					head_name:[{ required: true, message: '请输入负责人姓名', trigger: 'blur' }],
					head_phone:[{ required: true, trigger: 'blur', validator: this.$checkPhone }],
				},
			}
		},
		props:{
			dialogFormVisible:{
				type:Boolean,
				default:false
			}
		},
		mounted() {
			var that = this;
		},
		methods:{
			// 提交表单
			submit(){
				var that = this;
				that.$refs.formData.validate(valid => {
					if(valid){
						// 修改党委信息
						zzgk.editDw(that.formData).then(res => {
							if(res.code == 200){
								Message({
									type:"success",
									message:"修改成功"
								})
								that.$store.commit('setUserInfo',res.data);
								that.$emit('closeEdit');
							}else{
								Message({
									type:"error",
									message:res.msg
								})
							}
						})
					}else{
						return false;
					}
				})
			},
			// 清除表单
			clearForm(){
				var that = this;
				that.formData = {
					dw:this.$store.state.userinfo.dw,
					head_name:this.$store.state.userinfo.head_name,
					head_phone:this.$store.state.userinfo.head_phone,
					id:this.$store.state.userinfo.id,
				}
				that.$emit('closeEdit');
				that.$refs.formData.resetFields();
			}
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
