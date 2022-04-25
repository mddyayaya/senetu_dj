<template>
	<div class="addzz">
		<el-dialog 
			class="zzgk"
			:modal-append-to-body='true'
			width="500px"
			center
			:append-to-body='true'
			@close="closeEdit"
			:visible.sync="dialogVisible">
			<div slot="title" class="addtitle">
				<div>
					<i class="icon adddzz"></i>
					{{title}}
					<div class="addline"></div>
				</div>
			</div>
			<div class="formData1" style="padding-bottom: 40px;">
				<div class="codeWrap">
					<div id="qrcode"></div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { dygl } from '@/axios'
	import QRCode from 'qrcodejs2'
	export default{
		data() {
			return{
				title:"扫码添加党员",
				loading:true,
				qrcode:""
			}
		},
		props:{
			dialogVisible:{
				type:Boolean,
				default:false
			},
			uid:{
				type:String,
				default:""
			},
			flag:{
				type:String,
				default:""
			},
			zzName:{
				type:String,
				default:""
			},
		},
		methods:{
			closeEdit(){
				console.log(3)
				this.qrcode.clear();
				this.$emit("datalist");
			},
			// 获取二维码
			getcode(){
				var that = this;
				that.$nextTick(() =>{
					console.log(that.zzName)
					console.log(that.uid);
					document.getElementById('qrcode').innerHTML = '';
					that.qrcode = new QRCode('qrcode',{
						text:"http://qj.gxsentu.net/dj2.5admin/codeApply/#/pages/index/index?zzName="+that.zzName+'&uid='+that.uid,
						width:240,
						height:240
					})
				})
			}
		},
		mounted() {
			
		}
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
	#qrcode{
		background: rgba($color: #000000, $alpha: .3);
		width: 240px;
		height: 240px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 16px;
	}
</style>
