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
				<el-form ref="formData" :model="formData" label-width="100px" >
					<el-form-item class="form_item" label="组织所在地" prop="title">
						<el-input
							style="width: 220px;margin-right: 10px;"
							placeholder="请输入组织所在地"
							v-model="zhuanlan">
						</el-input>
						<el-button type="primary" @click="goappend">{{formData.province.length == 0?'添加':'继续添加'}}</el-button>
					</el-form-item>
					<div class="lists" v-if="formData.province.length > 0">
						<div class="lists_item" v-for="(item,index) in formData.province">
							<span>{{item.province}}</span>
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
	import { dwgl } from '@/axios'
	export default{
		data() {
			return{
				title:"新增组织所在地",
				formData:{
					dwid:this.$store.state.userinfo.id,
					province:[]
				},
				zhuanlan:"",
				stlist:[],
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
					this.formData.province.unshift({
						province:this.zhuanlan
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
				this.formData.province.splice(index,1);
			},
			closeEdit(){
				var that = this;
				that.formData = {
					dwid:this.$store.state.userinfo.id,
					province:[]
				}
				that.$emit("closeLocal");
			},
			// 编辑专栏数据
			bindata(){
				var that = this;
				dwgl.provinceList({
					user_id:that.$store.state.userinfo.id
				}).then(res => {
					that.formData.province = res.data;
				})
			},
			submit(){
				var that = this;
				that.$refs.formData.validate(valid => {
					if(valid){
						dwgl.addProvince(that.formData).then(res => {
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
