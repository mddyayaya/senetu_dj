<template>
	<div class="zzgk_dialog">
		<el-dialog 
			class="zzgk"
			:modal-append-to-body='true'
			width="500px"
			center
			:append-to-body='true'
			@close="closeMorewin"
			:visible.sync="moreAddwin">
			<div slot="title" class="addtitle">
				<div>
					<i class="icon adddzz"></i>
					{{title}}
					<div class="addline"></div>
				</div>
			</div>
			<div class="formData1">
				<el-form ref="formData" :model="formData" class="formWrap">
					<el-form-item class="form_item" label="下载表格:">
						<div @click="download" style="cursor: pointer;">
							<span>{{downloadName}} </span>
							<i class="el-icon-upload" style="transform: rotate(180deg);color: #BB0000;font-size: 20px;cursor: pointer;"></i>
						</div>
					</el-form-item>
					<el-form-item class="form_item" label="上传文件:">
						<el-upload
							name="file"
							:action="$uploadFile"
							:on-remove="removeFile"
							:on-success="success"
							:on-change="handleChange"
							:file-list="fileList"
							:before-upload="limitFile">
							<el-button type="primary">上传文件</el-button>
						</el-upload>
					</el-form-item>
					<div style="margin-left: 75px;margin-top: -10px;font-size: 12px;">注：请先下载{{downloadName}}并在填写完成后提交</div>
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="pushData()">保 存</el-button>
				<el-button @click="closeMorewin">取 消</el-button>
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
					file:""
				},
				fileList:[],
			}
		},
		props:{
			title:{
				type:String,
				default:'add'
			},
			downloadName:{
				type:String,
				default:'single'
			},
			moreAddwin:{
				type:Boolean,
				default:false
			},
		},
		methods:{
			// 关闭弹窗
			closeMorewin(){
				var that = this;
				that.formData = {
					file:""
				};
				that.fileList = [];
				that.$emit("closeMorewin")
			},
			// 图片上传限制
			limitFile(file){
				var isJPG = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel';
				var isLt2M = file.size / 1024 / 1024 < 20;
				if (!isJPG) {
					Message.error('上传文件只能是 xlsx 或者xls格式!');
					return false;
				}
				if (!isLt2M) {
					Message.error('上传文件大小不能超过 20MB!');
					return false;
				}
			},
			removeFile(){
				this.fileList = []
			},
			// 下载表格
			download(){
				this.$emit("downExcel")
			},
			// 上传文件控住
			handleChange(file, fileList) {
				this.fileList = fileList.slice(-1);
			},
			pushData(){
				var that = this;
				if(that.fileList.length == 0){
					Message({
						type:"warning",
						message:"请上传文件后提交"
					})
				}else{
					that.$emit("pushData",that.fileList[0].response.data)
					that.closeMorewin();
				}
			},
			// 上传成功
			success(res, file) {
				var that = this;
				if(res.code == 200){
					that.formData.file = [];
					that.formData.file = res.data.src
				}else{
					Message({
						type:"error",
						message:"上传失败，请检查文件或网络连接"
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.formData1{
		width: 100%;
		display: flex;
		justify-content: center;
		.form_item{
			display: flex;
			align-items: center;
		}
	}
</style>
