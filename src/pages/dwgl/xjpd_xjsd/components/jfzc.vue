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
					<el-form-item label="支部组织建设(20)" class="form_item" prop="allocate_class">
						<el-input-number v-model="formData.num1" :min="0" :max="20"></el-input-number>
					</el-form-item>
					<el-form-item label="党员管理教育(20)" class="form_item" prop="allocate_class">
						<el-input-number v-model="formData.num2" :min="0" :max="20"></el-input-number>
					</el-form-item>
					<el-form-item label="支部组织生活(30)" class="form_item" prop="allocate_class">
						<el-input-number v-model="formData.num3" :min="0" :max="30"></el-input-number>
					</el-form-item>
					<el-form-item label="融合业务工作(10)" class="form_item" prop="allocate_class">
						<el-input-number v-model="formData.num4" :min="0" :max="20"></el-input-number>
					</el-form-item>
					<el-form-item label="党建资料管理(10)" class="form_item" prop="allocate_class">
						<el-input-number v-model="formData.num5" :min="0" :max="10"></el-input-number>
					</el-form-item>
					<el-form-item label="党委评语" class="form_item" prop="allocate_class">
						<el-input placeholder="请输入评语" style="margin-left:50px;" type="textarea" v-model="formData.content"></el-input>
					</el-form-item>
					<div class="form_item">
						总分：<input disabled style="border: none;background: none;" type="" name="" id="" :value="total" />
					</div>
					<div class="form_item">
						评级：{{star}}
					</div>
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
			let season;
			let month = (new Date().getMonth()+1);
			switch(month){
				case 1: season = 1;break;
				case 2: season = 1;break;
				case 3: season = 1;break;
				case 4: season = 2;break;
				case 5: season = 2;break;
				case 6: season = 2;break;
				case 7: season = 3;break;
				case 8: season = 3;break;
				case 9: season = 3;break;
				case 10: season = 4;break;
				case 11: season = 4;break;
				case 12: season = 4;break;
			}
			return{
				formData:{
					num1:20,
					num2:20,
					num3:30,
					num4:20,
					num5:10,
					content:"",
					quarter:season
				},
				title:"星级评定",
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
			flag:{
				type:String,
				default:""
			},
			year:{
				type:Number,
				default:new Date().getFullYear()
			}
		},
		computed:{
			total(){
				return (this.formData.num1+this.formData.num2+this.formData.num3+this.formData.num4+this.formData.num5)>=100?100:(this.formData.num1+this.formData.num2+this.formData.num3+this.formData.num4+this.formData.num5)
			},
			star(){
				if(this.total>90){					
					return "五星级"
				}else if(this.total<=90 && this.total > 80){
					return "四星级"
				}else if(this.total<=80 && this.total > 70){
					return "三星级"
				}else if(this.total<=70 && this.total > 60){
					return "二星级"
				}else if(this.total < 60){
					return "一星级"
				}
			},
			star_num(){
				if(this.star == "五星级"){					
					return 5
				}else if(this.star == '四星级'){
					return 4
				}else if(this.star == '三星级'){
					return 3
				}else if(this.star == '二星级'){
					return 2
				}else{
					return 1
				}
			},
		},
		methods:{
			// 关闭弹窗
			closeWin(){
				var that = this;
				that.formData = {
					num1:20,
					num2:20,
					num3:30,
					num4:20,
					num5:10,
				};
				that.$emit("closeWin")
			},
			// 打分
			submit(){
				var that = this;
				that.pushdata = {
					dwid: that.$store.state.userinfo.id,
					uid: that.uid,
					flag: that.flag,
					class_id: "1,2,3,5,6",
					score: that.formData.num1+','+that.formData.num2+','+this.formData.num3+','+this.formData.num4+','+this.formData.num5,
					total: that.total,
					star: that.star,
					star_num: that.star_num,
					rescore: that.type=='add'?2:1, // 1打分   2：重新打分
					year: that.year,
					content:that.formData.content,
					quarter:that.formData.quarter
				};
				dwgl.starDoApproval(that.pushdata).then(res => {
					if(res.code == 200){
						that.closeWin();
					}
				})
			},
			// 编辑绑定数据
			bindData(data){
				var that = this;
				that.formData.num1 = data.score[0];
				that.formData.num2 = data.score[1];
				that.formData.num3 = data.score[2];
				that.formData.num4 = data.score[3];
				that.formData.quarter = data.quarter;
				that.formData.content = data.content;
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
	.form_item{
		textarea{
			width: 230px !important;
			vertical-align: text-top;
			height: 100px;
		}
	}
</style>
