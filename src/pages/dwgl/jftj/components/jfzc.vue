<template>
	<div class="zzgk_dialog">
		<el-dialog 
			class="zzgk"
			:modal-append-to-body='true'
			width="500px"
			center
			:append-to-body='true'
			@close="closeWin1"
			:visible.sync="dialogVisible">
			<div slot="title" class="addtitle">
				<div>
					<i class="icon adddzz"></i>
					{{title}}
					<div class="addline"></div>
				</div>
			</div>
			<div class="formData2">
				<el-form ref="form" :model="formData" class="formWrap" :rules="rules">
					<el-form-item label="支出名称" class="form_item" prop="allocate_class">
						<el-input v-model="formData.allocate_class"  placeholder="请输入支出名称"></el-input>
					</el-form-item>
					<el-form-item class="form_item" label="支出时间" prop="allocate_time">
						<el-date-picker
							format="yyyy-M-d"
							value-format="yyyy-M-d"
							v-model="formData.allocate_time"
							type="date"
							placeholder="选择支出时间">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="支出金额" prop="allocate_money">
						<el-input-number v-model="formData.allocate_money" :min="1" label="请输入缴费金额"></el-input-number>
					</el-form-item>
					<el-form-item label="经  办  人" class="form_item" prop="agent">
						<el-input v-model="formData.agent"  placeholder="请输入经办人"></el-input>
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
	import { dwgl,djxc } from '@/axios'
	export default{
		data(){
			return{
				formData:{
					allocate_money: "",
					allocate_class: "",
					allocate_time: "",
					agent: "",
					funds_class: 2,//1下拨  2支出
					uid:[],
					flag:[],
				},
				arr:[],
				edit:false,
				rules:{
					// 支出名称检测
					allocate_class: [{ required: true, message: '请输入支出名称', trigger: 'blur' }],
					// 支出金额检测
					allocate_money: [{ required: true, message: '请输入支出金额', trigger: 'blur' }],
					// 支出经办人检测
					agent: [{ required: true, message: '请输入经办人姓名', trigger: 'blur' }],
					// 支出时间检测
					allocate_time: [{ required: true, message: '请选择支出时间', trigger: 'blur' }],
				},
				organList:[],
				props: { multiple: true },
				title:"新增下拨"
			}
		},
		props:{
			type:{
				type:String,
				default:'add'
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
				that.$emit("closeWin")
			},
			closeWin1(){
				var that = this;
				that.formData = {
					allocate_money: "",
					allocate_class: "",
					allocate_time: "",
					agent: "",
					funds_class: 2,//1下拨  2支出
					uid:[],
					flag:[],
				};
				that.arr = [];
				that.$refs.form.resetFields();
			},
			// 新增
			submit(){
				var that = this;
				that.$refs.form.validate(valid => {
					if(valid){
						if(that.type == 'add'){
							dwgl.addFunds(that.formData).then(res => {
								if(res.code == 200){
									that.closeWin();
								}
							})
						}else{
							dwgl.updateFunds(that.formData).then(res => {
								if(res.code == 200){
									that.closeWin();
								}
							})
						}
					}
				})
			},
			// 编辑绑定数据
			bindData(data){
				this.formData = data;
			},
		},
		watch:{
			id(value){
				this.formData.uid[0] = value
			},
			flag(value){
				this.formData.flag[0] = value
			},
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
	.formData2{
		display: flex;
		justify-content: center;
		width: 100%;
		max-height: 400px;
		overflow-y: scroll;
		.el-form-item{
			display: flex;
			align-items: center;
		}
	}
</style>
