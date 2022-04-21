<template>
	<div class="addzz">
		<el-dialog 
			class="zzgk"
			:modal-append-to-body='true'
			width="600px"
			center
			:append-to-body='true'
			@close="closeWin"
			:visible.sync="addTzshow">
			<div slot="title" class="addtitle">
				<div>
					<i class="icon adddzz"></i>
					{{title}}
					<div class="addline"></div>
				</div>
			</div>
			<div class="formData1">
				<el-form ref="formData" :model="formData" class="formWrap" 
				label-width="210px" :rules="rules">
					<el-form-item label="单位" prop="company" >
						<el-input v-model="formData.company"  placeholder="输入单位" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item  label="上年度结余和年底提取合计：" prop="total" >
						<el-input type="number" v-model="formData.total"  placeholder="上年度结余和年底提取合计" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item  label="本年度累计支出：" prop="pay" >
						<el-input type="number" v-model="formData.pay"  placeholder="输入本年度累计支出" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="时间：" prop="pub_time" >
					  <el-date-picker format="yyyy-MM" value-format="yyyy-MM" style="width: 203px !important;" type="date" placeholder="选择日期" 
					  v-model="formData.pub_time" @change="changetime">
					  </el-date-picker>
					</el-form-item>
					<el-form-item label="结余：" prop="" >
						<el-input type="number" 
							disabled="disabled" 
							v-model="jieyu"
							placeholder="结余" 
							autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
			</div>
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
					id:"",
					company: "",
					pay: "",
					balance: "",
					total:"",
					flag: this.$store.state.userinfo.flag,
					uid:this.$store.state.userinfo.id,
					sign: 2,
					year: "",
					month: "",
					pub_time:""
				},
				rules:{
					company: [{ required: true, message: '请输入单位名称', trigger: 'blur' }],
					total: [{ required: true, message: '输入上年度结余和年底提取合计', trigger: 'blur' }],
					pay: [{ required: true, message: '输入本年度累计支出', trigger: 'blur' }],
					pub_time: [{ required: true, message: '请选择时间', trigger: 'blur' }],
				},
				title:"新增党组织和党员台账"
			}
		},
		props:{
			tztype:{
				type:String,
				default:'add'
			},
			addTzshow:{
				type:Boolean,
				default:false
			},
		},
		computed:{
			jieyu(){
				return (parseInt(this.formData.total) - parseInt(this.formData.pay)).toFixed(2)
			}
		},
		methods:{
			// 选择时间
			changetime(value){
				this.formData.year = value.split('-')[0];
				this.formData.month = value.split('-')[1];
			},
			// 关闭弹窗
			closeWin(){
				var that = this;
				that.formData = {
					company: "",
					pay: "",
					balance: "",
					total:"",
					flag: this.$store.state.userinfo.flag,
					uid:this.$store.state.userinfo.id,
					sign: 2,
					year: "",
					month: "",
					pub_time:""
				};
				that.$refs.formData.resetFields();
				that.$emit("closeWin")
			},
			submit(){
				var that = this;
				that.$refs.formData.validate((valid) => {
					if (valid) {
						that.formData.balance = that.jieyu;
						if(that.tztype == 'add'){
							dwgl.addStandParties(that.formData).then(res => {
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
							dwgl.updateStandParties(that.formData).then(res => {
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
				for(var key in data){
					for(var index in that.formData){
						if(key == index){
							that.formData[index] = data[key]
						}
					}
				}
				that.formData.pub_time = data.year+'-'+data.month;
			}
		},
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