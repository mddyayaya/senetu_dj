<template>
	<div class="addzz">
		<el-dialog 
			class="zzgk"
			:modal-append-to-body='true'
			width="500px"
			center
			:append-to-body='true'
			@close="closeEdit"
			:visible.sync="showlocal">
			<div slot="title" class="addtitle">
				<div>
					<i class="icon adddzz"></i>
					{{title}}
					<div class="addline"></div>
				</div>
			</div>
			<div class="databank1">
				<el-form ref="formData" :model="formData" label-width="100px" :rules="rules">
					<el-form-item class="form_item" label="专题" prop="title">
						<el-input 
							style="width: 220px;"
							disabled
							v-model="formData.title">
						</el-input>
					</el-form-item>
					<el-form-item class="form_item" label="专栏" prop="title">
						<el-input
							style="width: 220px;margin-right: 10px;"
							placeholder="请输入专栏名称"
							v-model="zhuanlan">
						</el-input>
						<el-button type="primary" @click="goappend">{{formData.column_title.length == 0?'添加':'继续添加'}}</el-button>
					</el-form-item>
					<div class="lists" v-if="formData.column_title.length > 0">
						<div class="lists_item" v-for="(item,index) in formData.column_title">
							<span>{{item.column_title}}</span>
							<span @click="delList(index)">删除</span>
						</div>
					</div>
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
	import { Message } from 'element-ui'
	import { xxjy } from '@/axios'
	export default{
		data() {
			return{
				title:"新建专栏",
				formData:{
					dwid:this.$store.state.userinfo.id,
					title:"",
					id:"",
					column_title:[]
				},
				zhuanlan:"",
				stlist:[],
				rules:{
					type:[{ required: true, message: '请选择题干类型', trigger: 'blur' }],
				},
			}
		},
		props:{
			showlocal:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			// 试题分类列表
			goappend(){
				if(this.zhuanlan != ""){
					this.formData.column_title.push({
						column_title:this.zhuanlan
					})
				}else{
					Message({
						type:"warning",
						message:"不能添加空数据"
					})
				}
			},
			// 删除专栏列表数据
			delList(index){
				this.formData.column_title.splice(index,1);
			},
			closeEdit(){
				var that = this;
				that.formData = {
					dwid:this.$store.state.userinfo.id,
					title:"",
					id:"",
					column_title:[]
				}
				that.$emit("closeLocal");
			},
			// 编辑专栏数据
			bindata(){
				var that = this;
				xxjy.updateSpecial({
					id:that.$route.query.id
				}).then(res => {
					for(var key in res.data){
						for(var index in that.formData){
							if(key == index){
								that.formData[index] = res.data[key]
							}
						}
					}
				})
			},
			submit(){
				var that = this;
				that.$refs.formData.validate(valid => {
					if(valid){
						xxjy.addSpecialColumn(that.formData).then(res => {
							if(res.code == 200){
								that.closeEdit();
							}
						})
					}
				})
			},
		},
		watch:{
			showlocal(value){
				var that = this;
				if(value){
					that.bindata();
				}
			}
		}
	}
</script>

<style lang="scss">
	.databank1{
		width: 100%;
		height: 400px;
		display: flex;
		box-sizing: border-box;
		justify-content: center;
		.lists{
			width: 340px;
			margin-left: 100px;
			max-height: 260px;
			overflow-y: scroll;
			margin-bottom: 20px;
			&_item{
				box-sizing: border-box;
				width: 100%;
				font-size: 16px;
				display: flex;
				align-items: center;
				margin-bottom: 20px;
				>span:nth-child(1){
					width: 215px;
					height: 38px;
					padding: 0 10px;
					overflow: hidden;
					line-height: 38px;
					border-radius: 4px;
					border: 1px solid #DDDDDD;
					margin-right: 10px;
				}
				>span:nth-child(2){
					cursor: pointer;
					color: #BB0000;
				}
			}
		}
		.loading{
			position: fixed;
			z-index: 100;
			width: 100px;
			height: 100px;
			background: rgba($color: #000000, $alpha: 0.5);
			line-height: 100px;
			font-size: 14px;
			text-align: center;
			color: #fff;
		}
	}
	.el-dialog--center .el-dialog__body{
		padding-top: 0 !important;
		padding-bottom: 0 !important;
	}
</style>
