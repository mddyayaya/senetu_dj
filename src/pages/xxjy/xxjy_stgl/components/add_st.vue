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
					<el-form-item class="form_item" label="分类名称" prop="">
						<el-input
							style="width: 240px;"
							placeholder="请输入分类名称"
							v-model="zhuanlan">
						</el-input>
						<el-button @click="goappend" type="primary" style="margin-left: 10px;">{{formData.name.length==0?'添加':'继续添加'}}</el-button>
					</el-form-item>
					<div class="lists" v-if="formData.name.length>0">
						<div class="lists_item" v-for="(item,index) in formData.name">
							<span>{{item}}</span>
							<span @click="delzhuanlan(index)">删除</span>
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
				title:"新建试题分类",
				formData:{
					dwid:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					name:[]
				},
				zhuanlan:"",
				rules:{
					name:[{ required: true, message: '', trigger: 'blur' }],
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
			// 新建专题分类
			goappend(){
				if(this.zhuanlan == ""){
					Message({
						message:"请输入后添加",
						type:"warning"
					})
				}else{
					this.formData.name.push(this.zhuanlan);
				}
			},
			// 删除专栏
			delzhuanlan(index){
				this.formData.name.splice(index,1)
			},
			closeEdit(){
				var that = this;
				that.formData = {
					dwid:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					name:[]
				}
				that.$emit("closeLocal");
			},
			submit(){
				var that = this;
				that.$refs.formData.validate(valid => {
					if(valid){
						xxjy.addQuestionClass(that.formData).then(res => {
							if(res.code == 200){
								that.closeEdit();
							}
						})
					}
				})
			},
		},
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
