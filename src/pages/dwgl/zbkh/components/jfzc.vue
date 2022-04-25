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
				<el-form ref="form" 
					:model="formData" class="formWrap" :rules="rules">
					<el-form-item label="选择年份"
						class="form_item" prop="year">
						<el-select
							clearable
							v-model="formData.year" placeholder="选择年份">
							<el-option
								v-for="item in $yearList()"
								:label="item"
								:value="item">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="选择月份"
						class="form_item" prop="month">
						<el-select
							v-model="formData.month" placeholder="请选择月份"
							clearable>
							<el-option
								v-for="item in $monthList()"
								:label="item+'月'"
								:value="item">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="岗位履职"
					 class="form_item" prop="allocate_class">
						<el-select
							clearable
							v-model="formData.position" placeholder="请选择">
							<el-option
								label="优秀"
								value="1">
							</el-option>
							<el-option
								label="良好"
								value="2">
							</el-option>
							<el-option
								label="合格"
								value="3">
							</el-option>
							<el-option
								label="较差"
								value="4">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="党费缴纳"
					 class="form_item" prop="allocate_class">
						<el-select
							clearable
							v-model="formData.pay" placeholder="请选择">
							<el-option
								label="按时缴纳"
								value="1">
							</el-option>
							<el-option
								label="逾期补缴"
								value="2">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="作用发挥-志愿服务"
					 class="form_item" prop="allocate_class">
						<el-input-number v-model="formData.role_volunteer"></el-input-number>
					</el-form-item>
					<el-form-item label="作用发挥-技术攻关"
					 class="form_item" prop="allocate_class">
						<el-input-number v-model="formData.role_technology"></el-input-number>
					</el-form-item>
					<el-form-item label="作用发挥-创新创效"
					 class="form_item" prop="allocate_class">
						<el-input-number v-model="formData.role_innovation"></el-input-number>
					</el-form-item>
					<el-form-item label="作用发挥-帮扶济贫"
					 class="form_item" prop="allocate_class">
						<el-input-number v-model="formData.role_help"></el-input-number>
					</el-form-item>
					<el-form-item label="先进电影-荣誉表彰"
					 class="form_item" prop="allocate_class">
						<el-input-number v-model="formData.advanced_honor"></el-input-number>
					</el-form-item>
					<el-form-item label="作用发挥-示范岗位"
					 class="form_item" prop="allocate_class">
						<el-input-number v-model="formData.advanced_jobs"></el-input-number>
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
	import { biaozhun } from '../datas.js'
	import { Message } from 'element-ui'
	import { dwgl,djxc } from '@/axios'
	export default{
		data(){
			return{
				formData:{
					id:"",
					user_id:"",
					uid:"",
					year:"",
					month:"",
					position:"",// 岗位履职等级
					pay:"",// 党费缴纳分类
					role_volunteer:"",// 作用发挥-志愿服务
					role_technology:"",// 作用发挥-技术攻关
					role_innovation:"",// 作用发挥-创新创效
					role_help:"",// 作用发挥-帮扶济贫
					advanced_honor:"",// 先进典型-荣誉表彰
					advanced_jobs:"",// 先进典型-示范岗位
				},
				title:"党员打分",
				rules:{
					// 检测标题是否为空
					year: [{ required: true, message: '请选择年份', trigger: 'blur' }],
					// 检测月份是否为空
					month: [{ required: true, message: '请选择月份', trigger: 'blur' }],
				}
			}
		},
		props:{
			type:{
				type:String,
				default:"add"
			},
			dialogVisible:{
				type:Boolean,
				default:false
			},
			uid:{
				type:String,
				default:""
			},
			userId:{
				type:String,
				default:""
			}
		},
		watch:{
			year(val){
				this.formData.year = val;
			},
			month(val){
				this.formData.month = val;
			},
		},
		methods:{
			// 关闭弹窗
			closeWin(){
				var that = this;
				that.$emit("closeWin")
				for(var key in that.formData){
					that.formData[key] = ""
				}
			},
			// 打分
			submit(){
				var that = this;
				that.formData.uid = that.uid;
				that.formData.user_id = that.userId;
				if(that.type == 'add'){
					dwgl.addMemberScore(that.formData).then(res => {
						if(res.code == 200){
							that.closeWin();
						}
					})
				}else{	
					dwgl.updateMemberScore(that.formData).then(res => {
						if(res.code == 200){
							that.closeWin();
						}
					})
				}
			},
			// 编辑绑定数据
			bindData(data){
				var that = this;
				for(var key in data){
					for(var item in that.formData){
						if(key == item){
							that.formData[key] = data[key]
						}
					}
				}
				console.log(that.formData);
			},
		},
		mounted() {
			var that = this;
			if(this.type == 'edit'){
				that.bindData()
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
