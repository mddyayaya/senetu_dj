<template>
	<div class="addzz">
		<el-dialog 
			class="zzgk"
			:modal-append-to-body='true'
			width="500px"
			center
			:append-to-body='true'
			@close="closeKh"
			:visible.sync="showkh">
			<div slot="title" class="addtitle">
				<div>
					<i class="icon adddzz"></i>
					{{title}}
					<div class="addline"></div>
				</div>
			</div>
			<div class="databank1">
				<el-radio-group v-model="assess_id" >
					<el-radio style="display: block;margin-bottom: 20px;" v-for="(item,index) in khlists" :label="item" >{{item.title}}</el-radio>
				</el-radio-group>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submit()">保 存</el-button>
				<el-button @click="closeKh()">取 消</el-button>
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
				title:"选择考核",
				getdata:{
					dwid:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					title: "",
					difficulty: "",
					status: ""
				},
				assess_id:"",
				khlists:[],
				rules:{
					name:[{ required: true, message: '', trigger: 'blur' }],
				},
			}
		},
		props:{
			showkh:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			// 考核列表
			khlist(){
				var that = this;
				xxjy.testList(that.getdata).then(res => {
					if(res.data!=null){
						if(res.data.length >0){
							that.khlists = res.data;
						}else{
							that.khlists = [];
						}
					}else{
						that.khlists = [];
					}
				})
			},
			closeKh(){
				var that = this;
				that.assess_id = "";
				that.$emit("closeKh");
			},
			submit(){
				var that = this;
				if(that.khlists.length == 0){
					Message({
						type:"warning",
						message:"请先添加考核"
					})
				}else{
					if(that.assess_id == ""){
						Message({
							type:"warning",
							message:"请选择要添加的考核"
						})
					}else{
						that.$emit('bindKhid',that.assess_id);
						that.$emit("closeKh");
					}
				}
			},
		},
		mounted() {
			this.khlist();
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
