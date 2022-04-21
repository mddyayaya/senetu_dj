<template>
	<div class="wrap">
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>系统设置</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable" style="display: flex;align-items: center;justify-content: center;">
				<div class="datas">
					<div class="selectdata">
						<el-form style="width: 350px" ref="formData" :model="formData" label-width="100px" :rules="rules">
							<el-form-item class="form_item" label="原密码" prop="oldpword">
								<el-input placeholder="请输入原密码" v-model="formData.oldpword"></el-input>
							</el-form-item>
							<el-form-item class="form_item" label="新密码" prop="password">
								<el-input placeholder="请输入新密码" v-model="formData.password"></el-input>
							</el-form-item>
							<el-form-item class="form_item" label="确认新密码"  prop="newPwd">
								<el-input placeholder="请再次输入新密码" v-model="formData.newPwd"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="onSubmit">立即修改</el-button>
								<el-button @click="resetForm">取消</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Message } from 'element-ui'
	import { xtsz } from '@/axios'
	export default{
		data(){
			var checkPwd = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.formData.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return{
				formData:{
					oldpword: '',
					password: '',
					flag:this.$store.state.userinfo.flag,
					user_id:this.$store.state.userinfo.id,
					newPwd:""
				},
				rules:{
					oldpword:[{ required: true, message: '请输入原密码', trigger: 'blur' }],
					password:[{ required: true, message: '请输入新密码', trigger: 'blur' }],
					newPwd:[{ required: true, validator: checkPwd, trigger: 'blur' }],
				},
			}
		},
		methods:{
			onSubmit(){
				var that = this;
				that.$refs.formData.validate(valid => {
					if(valid){
						xtsz.updatePwd(that.formData).then(res => {
							if(res.code == 200){
								Message({
									type:'success',
									message:res.msg
								})
								that.formData = {
									oldpword: '',
									password: '',
									flag:this.$store.state.userinfo.flag,
									user_id:this.$store.state.userinfo.user_id,
									newPwd:""
								};
								that.resetForm();
							}
						})
					}else{
						
					}
				})
			},
			// 清除表单
			resetForm(){
				var that = this;
				that.formData = {
					oldpword: '',
					password: '',
					flag:this.$store.state.userinfo.flag,
					user_id:this.$store.state.userinfo.user_id,
					newPwd:""
				};
				that.$refs.formData.resetFields();
			},
		},
		mounted() {
			var that = this;
		},
		created() {
			var that = this;
			that.$emit('selectTop',7)
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.wrap{
		position: relative;
		height: 100%;
		width: 100%;
		.fengmian {
		    height: 86px;
		    width: 150px;
			object-fit: cover;
		}
	}
</style>

