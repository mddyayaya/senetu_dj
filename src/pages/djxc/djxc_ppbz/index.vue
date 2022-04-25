<template>
	<div class="wrap">
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>党建宣传</el-breadcrumb-item>
				<el-breadcrumb-item>品牌保障</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas" style="padding-bottom:70px">
					<div class="contrl_bar">
						<el-button type="primary" plain
						@click="$router.go(-1)">返回上级</el-button>
					</div>
					<div class="addTitle">品牌保障</div>
					<div class="addWrap">
						<el-form 
							label-position="left"
							ref="formData" 
							:model="datas" >
							<div :key="index" class="boxes" v-for="(item,index) in datas.formData">
								<div class="delBtn">
									<div></div>
									<el-button size="mini" v-if="index != 0" type="primary" @click="removeItem(index)">删除项目</el-button>
								</div>
								<el-form-item class="form_item" label="输入标题:" prop="title">
									<el-input
									style="width:500px !important"
										placeholder="请输入标题"
										v-model="item.title">
									</el-input>
								</el-form-item>
								<el-form-item class="form_item fuwenben" label="正文内容:"  prop="content">
									<el-input 
										style="height:150px !important"
										type="textarea"
										v-model="item.content"
										class="fuwenbens" placeholder="请输入正文" name="" id="" cols="30" rows="10"></el-input>
								</el-form-item>
							</div>
							<el-form-item class="form_item submit">
								<el-button type="primary" @click="addItem()">添加项目</el-button>
							</el-form-item>
							<el-form-item class="form_item">
								<div class="submits">
									<el-button type="primary" @click="submit('news')">发布</el-button>
									<el-button @click="$router.go(-1)">取消</el-button>
								</div>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { djxc } from '@/axios'
	import { Message } from 'element-ui'
	let that;
	export default{
		data(){
			return{
				datas:{
					formData:[
						{
							title:"",
							content:""
						}
					],
				},
				rules:{
					// 检测标题是否为空
					title: [
						{ required: true, message: '请输入标题', trigger: 'blur' }
					],
					// 检测文本是否为空
					content: [
						{ required: true, message: '请输入正文内容', trigger: 'blur' }
					]
				}
			}
		},
		methods:{
			// 添加项目
			addItem(){
				that.datas.formData.push({
					title:"",
					content:""
				})
			},
			// removeItem删除项目
			removeItem(index){
				that.datas.formData.splice(index,1)
			},
			// 编辑时获取数据
			getdata(){
				djxc.updateBrand({
					id:that.$store.state.userinfo.id
				}).then(res => {
					if(res.code == 200){
						if(res.data.length > 0){
							that.datas.formData = res.data;
						}
					}else{
						Message.error(res.msg)
					}
				})
			},
			//提交
			submit(formData){
				that.datas.formData.forEach(item => {
					if(item.title=="" || item.content == ""){
						Message.warning("请输入必填项");
						return false;
					}
				})
				djxc.updateBrands({
					zbid:that.$store.state.userinfo.id,
					datas:that.datas.formData
				}).then(res => {
					if(res.code == 200){
						Message.success("添加成功");
						that.getdata();
					}else{
						Message.error(res.msg)
					}
				})
			}
		},
		mounted() {
			that.getdata();
		},
		created() {
			that = this;
			that.$emit('selectTop',2)
		}
	}
</script>

<style lang="scss">
	.wrap{
		width: 100%;
		position: relative;
		color: $index_color;
		font-size: index_size1;
		.addTitle{
			width: 100%;
			border-bottom: 1px solid #DDE2EE;
			padding-bottom: 15px;
			margin: -40px 0 20px 0;
			font-size: 18px;
			color: #333333;
			font-weight: bold;
			width: 80%;
		}
		.addWrap{
			.delBtn{
				width: 580px;
				display: flex;
				justify-content: space-between;
				align-content: center;
				margin-bottom: 10px;
				div:nth-child(1){
					flex: 1;
				}
			}
			.boxes{
				width: 690px;
				padding: 10px;
				margin-bottom: 20px;
				border: 1px solid #ededee;
			}
			.form_item{
				margin-bottom: 15px;
				display: flex !important;
				align-items: flex-start !important;
				font-size: 14px;
				.fengmian{
					display: inline-block;
					vertical-align: bottom;
					height: 150px;
					margin-right: 10px;
					margin-left: 0;
					width: 223px;
				}
				.tishi{
					font-size: 12px;
					color: rgb(131, 138, 157);
					margin-top: 10px;
				}
				.el-upload{
					text-align: left !important;
				}
				.fuwenbens{
					height: 150px !important;
					width: 500px;
				}
			}
			.el-form-item__content{
				margin-left: 0 !important;
			}
			.fuwenben{
				padding-bottom: 110px;
			}
			.submit{
				padding-left: 85px;
			}
			.el-form-item__error{
				position: relative !important;
				margin-left: 20px;
				line-height: 30px;
			}
		}
	}
	.submits{
		width: 100%;
		height: 60px;
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		bottom: 15px;
		background: #fff;
		border-top: 1px solid #ededed;
	}
</style>
