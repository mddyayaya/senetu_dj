<template>
	<div class="zzgk_dialog">
		<el-dialog 
			class="zzgk"
			:modal-append-to-body='true'
			width="600px"
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
				<el-form ref="form" :model="formData" class="formWrap" >
					<el-form-item label="" class="form_item" prop="">
						<el-input  type="textarea" v-model="describe1"></el-input>
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
	import { dwgl } from '@/axios'
	export default{
		data(){
			return{
				formData:{
					uid:this.$store.state.userinfo.id,
					class_id:"",
					describe:""
				},
				describe1:""
			}
		},
		props:{
			dialogVisible:{
				type:Boolean,
				default:false
			},
			title:{
				type:String,
				default:"编辑规则"
			},
			describe:{
				type:String,
				default:"规则"
			},
			class_id:{
				type:String,
				default:""
			}
		},
		methods:{
			// 关闭弹窗
			closeWin(){
				var that = this;
				that.formData = {
					uid:this.$store.state.userinfo.id,
					describe:""
				};
				that.$emit("closeWin")
			},
			// 打分
			submit(){
				var that = this;
				that.formData.describe = that.describe1;
				that.formData.class_id = that.class_id;
				if(that.formData.describe!=''){
					dwgl.updateStarRole(that.formData).then(res => {
						if(res.code == 200){
							that.closeWin();
						}
					})
				}else{
					Message({
						type:'warning',
						message:"请输入规则"
					})
				}
			},
		},
		mounted() {
			var that = this;
			that.formData.describe = that.describe1;
		},
		watch:{
			describe(value){
				this.describe1 = value;
				this.formData.describe = value
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
			textarea{
				width: 450px;
				height: 300px;
				resize: none;
			}
		}
	}
</style>
