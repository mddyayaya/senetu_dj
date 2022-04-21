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
				<el-form ref="form" :model="form" label-width="100px" :rules="rules">
					<el-form-item class="form_item" label="资源标题" prop="title">
						<el-input style="width: 240px;" v-model="form.title" placeholder="请输入资源标题"></el-input>
					</el-form-item>
					<el-form-item class="form_item" label="资源封面:" prop="file_img">
						<el-upload
							name="file"
							:action="$uploadImg"
							:on-progress="uploadProcess"
							:show-file-list="false"
							:on-success="success"
							:before-upload="$limitImg">
							<img v-if="imageUrl" :src="imageUrl" class="fengmian1">
							<el-button  type="primary">{{imageUrl == null || imageUrl == ''?'上传封面':'重新上传'}}</el-button>
							<div class="tishi">支持格式：jpg、png，图片不得大于2M</div>
						</el-upload>
					</el-form-item>
					<el-form-item class="form_item" label="资源内容:"  prop="file_src">
						<el-upload
							name="file"
							:action="$uploadFile"
							:show-file-list="false"
							:on-success="success1"
							:on-progress="uploadProcess"
							:before-upload="$limitFile">
							<el-button  type="primary">上传内容</el-button>
							<div class="tishi">支持图片，pdf、mp4文件，大小不得超过200M</div>
						</el-upload>
					</el-form-item>
					<div class="fileList">
						<div class="fileItem" v-if="file_name!=''">
							<div class="fileIcon" v-if="form.bs_id == 8"><img src="../assets/images/pdfBg.png" ></div>
							<div class="fileIcon" v-if="form.bs_id == 3"><img src="../assets/images/videoBg.png" ></div>
							<div class="fileIcon" v-if="form.bs_id == 2"><img src="../assets/images/pdfBg.png" ></div>
							<div class="fileName">{{file_name}}</div>
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
	import { databank } from '@/axios'
	import {bsid} from '@/common/common.js'
	import { Message } from 'element-ui'
	export default{
		data() {
			return{
				title:"本地添加",
				form:{
					title:"",
					file_src:"",
					file_img:"",
					type:9,//本地上传类别
					bs_id:"",
				},
				file_name:"",
				imageUrl:"",
				rules:{
					title:[{ required: true, message: '请输入资源标题', trigger: 'blur' }],
					file_img:[{ required: true, message: '请上传资源封面', trigger: 'blur' }],
					file_src:[{ required: true, message: '请上传资源内容', trigger: 'blur' }],
				},
				showLoading:false,
				loadingWords:"正在上传请稍后",
				percentage:0,
				status:"primary",
			}
		},
		props:{
			showlocal:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			closeEdit(){
				var that = this;
				that.form = {
					title:"",
					file_src:"",
					sz_img:"",
					type:9,//本地上传类别
					bs_id:"",
				}
				that.file_name = "";
				that.imageUrl = "";
				that.$emit("closeLocal");
			},
			submit(){
				var that = this;
				that.$refs.form.validate(valid => {
					if(valid){
						that.$emit("pushData",that.form)
						that.closeEdit();
					}
				})
			},
			// 编辑绑定
			bindData(data){
				
			},
			// 上传封面图成功
			success(res, file) {
				var that = this;
				if(res.code == 200){
					that.imageUrl = URL.createObjectURL(file.raw);
					that.form.file_img = res.data.src;
				}else{
					Message({
						type:"error",
						message:"上传失败，请检查文件或网络连接"
					})
				}
			},
			// 上传文件成功
			success1(res, file) {
				var that = this;
				that.form.bs_id = "";
				that.file_name = "";
				that.form.file_src = "";
				if(res.code == 200){
					that.form.bs_id = bsid(res.data.src);
					that.file_name = res.data.title;
					that.form.file_src = res.data.src;
				}else{
					
				}
			},
			uploadProcess(event, file, fileList) {
				var that = this;
				const loading = this.$loading({
					lock: true,
					text: '上传中请稍后',
					spinner: 'el-icon-loading',
					background: 'rgba(255, 255, 255, 0.7)'
				});
				if(Math.floor(event.percent) == 100){
					loading.close();
				}
			},
		},
		mounted() {
			
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
		.el-upload{
			text-align: left !important;
		}
		.fengmian1{
			width: 120px;
			height: 80px;
			margin-right: 15px;
			vertical-align: text-bottom;
			margin-bottom: -10px;
		}
		.fileList{
			width: 78%;
			margin-left: 22%;
			height: 120px;
			margin-top: -10px;
			overflow-y: scroll;
			box-sizing: border-box;
			.fileItem{
				width: 100%;
				border: 1px solid #ddd;
				padding: 10px 10px;
				height: 80px;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				.fileIcon{
					width: 50px;
					img{
						width: 100%;
					}
				}
				.fileName{
					margin-left: 10px;
					margin-right: 10px;
					width: 250px;
					line-height: 30px;
					height: 30px;
					overflow: hidden;
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
