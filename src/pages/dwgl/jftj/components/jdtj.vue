<template>
	<div class="zzgk_dialog">
		<el-dialog 
			class="zzgk"
			:modal-append-to-body='true'
			width="500px"
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
			<div class="formData2">
				<el-form ref="form" :model="formData" class="formWrap" :rules="rules">
					<el-form-item label="下拨名称" class="form_item" prop="allocate_class">
						<el-input v-model="formData.allocate_class"  placeholder="请输入下拨名称"></el-input>
					</el-form-item>
					<el-form-item label="下拨组织" class="form_item" prop="uid" v-if="type == 'add'">
						<el-select
							value-key="id"
							@change="changeDw"
							v-model="arr"
							multiple
							collapse-tags
							placeholder="选择下拨组织">
							<el-option
								v-for="item in organList"
								:label="item.dw"
								:value="item">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="form_item" label="下拨时间" prop="allocate_time">
						<el-date-picker
							format="yyyy-M-d"
							value-format="yyyy-M-d"
							v-model="formData.allocate_time"
							type="date"
							placeholder="选择下拨时间">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="下拨金额" prop="allocate_money">
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
					pid: this.id,
					allocate_money: "",
					allocate_class: "",
					allocate_time: "",
					agent: "",
					funds_class: 1,//1下拨  2支出
					uid :[],
					flag:[]
				},
				arr:[],
				edit:false,
				rules:{
					// 检测缴费人员
					uid: [{ required: true, message: '请选择党组织', trigger: 'blur' }],
					// 下拨名称检测
					allocate_class: [{ required: true, message: '请输入下拨名称', trigger: 'blur' }],
					// 下拨金额检测
					allocate_money: [{ required: true, message: '请输入下拨金额', trigger: 'blur' }],
					// 下拨经办人检测
					agent: [{ required: true, message: '请输入经办人姓名', trigger: 'blur' }],
					// 下拨时间检测
					allocate_time: [{ required: true, message: '请选择下拨时间', trigger: 'blur' }],
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
				that.formData = {
					pid: this.id,
					allocate_money: "",
					allocate_class: "",
					allocate_time: "",
					agent: "",
					funds_class: 1,//1下拨  2支出
					uid :[],
					flag:[]
				};
				that.arr = [];
				that.$refs.form.resetFields();
				that.$emit("closeWin")
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
			// 组织列表
			organMember(){
				var that = this;
				djxc.partyOrgan({
					user_id:that.id,
					flag:that.flag
				}).then(res => {
					that.organList = res.data;
				})
			},
			//选择组织
			changeDw(value){
				var that = this;that.formData.uid = [];that.formData.flag = [];
				for(var key=0;key<value.length; key++){
					that.formData.uid.push(value[key].id)
					that.formData.flag.push(value[key].flag)
				}
			},
			// 编辑绑定数据
			bindData(data){
				this.formData = data;
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
