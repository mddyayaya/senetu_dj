<template>
	<div class="addzz">
		<el-dialog 
			class="zzgk"
			:modal-append-to-body='true'
			width="520px"
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
				label-width="180px" :rules="rules">
					<el-form-item label="单位：" prop="company">
						<el-input v-model="formData.company"  placeholder="输入单位" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="党委数量：" prop="dw_count">
						<el-input v-model="formData.dw_count" type="number"  placeholder="输入党委数量" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="党委委员数量：" prop="dwwy_count">
						<el-input v-model="formData.dwwy_count" type="number"  placeholder="输入党委委员数量" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="支部数量：" prop="zb_count">
						<el-input type="number" v-model="formData.zb_count"  placeholder="输入支部数量" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="支部委员数量：" prop="zbwy_count">
						<el-input type="number" v-model="formData.zbwy_count"  placeholder="输入支部委员数量" autocomplete="off"></el-input>
					</el-form-item>
					
					<el-form-item label="党小组数量：" prop="dxz_count">
						<el-input type="number" v-model="formData.dxz_count"  placeholder="输入党小组数量" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="正式党员数量：" prop="zsdy_count">
						<el-input type="number" v-model="formData.zsdy_count"  placeholder="输入正式党员数量" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="预备党员数量：" prop="ybdy_count">
						<el-input type="number" v-model="formData.ybdy_count"  placeholder="输入预备党员数量" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="发展对象数量：" prop="fzdx_count">
						<el-input type="number" v-model="formData.fzdx_count"  placeholder="输入发展对象数量" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="积极分子数量：" prop="jjfz_count">
						<el-input type="number" v-model="formData.jjfz_count"  placeholder="输入积极分子数量" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="提出入党申请数量：" prop="rdsq_count">
						<el-input type="number" v-model="formData.rdsq_count"  placeholder="输入提出入党申请数量" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="累计发展党员数量：" prop="ljfz_count">
						<el-input type="number" v-model="formData.ljfz_count"  placeholder="输入累计发展党员数量" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="当年发展党员数量：" prop="jnfz_count">
						<el-input type="number" v-model="formData.jnfz_count"  placeholder="输入当年发展党员数量" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="时间：" prop="pub_time">
					  <el-date-picker format="yyyy-MM" value-format="yyyy-MM" type="date" placeholder="选择日期" v-model="formData.pub_time" 
					  @change="changetime"></el-date-picker>
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
					flag: this.$store.state.userinfo.flag,
					uid:this.$store.state.userinfo.id,
					sign: 3,
					year:"",
					month:"",
					company: "",
					dw_count: "",
					dwwy_count: "",
					zb_count: "",
					zbwy_count: "",
					dxz_count: "",
					zsdy_count: "",
					ybdy_count: "",
					fzdx_count: "",
					jjfz_count: "",
					rdsq_count: "",
					ljfz_count: "",
					jnfz_count: ""
				},
				edit:false,
				rules:{
					company: [{ required: true, message: '请输入单位名称', trigger: 'blur' }],
					dw_count: [{ required: true, message: '输入党委数量', trigger: 'blur' }],
					dwwy_count: [{ required: true, message: '输入党委委员数量', trigger: 'blur' }],
					zb_count: [{ required: true, message: '输入支部数量', trigger: 'blur' }],
					zbwy_count: [{ required: true, message: '输入支部委员数量', trigger: 'blur' }],
					dxz_count: [{ required: true, message: '输入党小组数量', trigger: 'blur' }],
					zsdy_count: [{ required: true, message: '请输入本年度累计收缴', trigger: 'blur' }],
					ybdy_count: [{ required: true, message: '输入正式党员数量', trigger: 'blur' }],
					fzdx_count: [{ required: true, message: '输入发展对象数量', trigger: 'blur' }],
					jjfz_count: [{ required: true, message: '输入发展对象数量', trigger: 'blur' }],
					rdsq_count: [{ required: true, message: '输入提出入党申请数量', trigger: 'blur' }],
					ljfz_count: [{ required: true, message: '输入累计发展党员数量', trigger: 'blur' }],
					jnfz_count: [{ required: true, message: '输入当年发展党员数量', trigger: 'blur' }],
				},
				zzlist:[],
				props: { multiple: true },
				title:"新增台账"
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
				return (parseInt(this.formData.last_balance)+parseInt(this.formData
	.collection)-parseInt(this.formData.pay)).toFixed(2)
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
					flag: this.$store.state.userinfo.flag,
					uid:this.$store.state.userinfo.id,
					sign: 3,
					company: "",
					year:"",
					month:"",
					dw_count: "",
					dwwy_count: "",
					zb_count: "",
					zbwy_count: "",
					dxz_count: "",
					zsdy_count: "",
					ybdy_count: "",
					fzdx_count: "",
					jjfz_count: "",
					rdsq_count: "",
					ljfz_count: "",
					jnfz_count: ""
				};
				that.$refs.formData.resetFields();
				that.$emit("closeWin")
			},
			submit(){
				var that = this;
				that.$refs.formData.validate((valid) => {
					if (valid) {
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