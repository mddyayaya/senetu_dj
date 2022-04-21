<template>
	<div class="wrap">
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>党员管理</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<div class="selectbar">
						<div></div>
						<div><el-button type="primary" plain @click="$router.go(-1)">返回上级</el-button></div>
					</div>
					<div class="selectdata">
						<div class="gxzy_top">
							<h4>党员组织关系转移流程</h4>
							<el-steps :active="steps" finish-status="success" simple style="margin-top: 20px">
								<el-step title="提交转接申请" ></el-step>
								<el-step title="转入组织审批" ></el-step>
								<el-step title="完成转接" ></el-step>
							</el-steps>
						</div>
						<div class="gxzy_top">
							<h4>转出党员</h4>
							<div class="zcdy">
								<div>转出党员：{{dyname}}</div>
								<div>转出组织：{{zz}}</div>
							</div>
						</div>
						<div class="gxzy_top">
							<h4>党员信息</h4>
							<div class="dydetail">
								<div class="dyimg">
									<img :src="u_pic" >
								</div>
								<el-descriptions class="margin-top" :title="u_name" :column="3" >
									<el-descriptions-item v-for="(item,index) in detailList">
										{{item.name}} : 
										{{item.value}}
									</el-descriptions-item>
								</el-descriptions>
							</div>
						</div>
						<div class="control" v-if="step==1&&$store.state.userinfo.flag==3">
							<el-button type="success" @click="pass(2)">审批通过</el-button>
							<el-button type="primary" @click="pass(3)">拒绝通过</el-button>
						</div>
						<div class="passimg">
							<img src="@/assets/images/passIcon.png" v-if="step==3">
							<img src="@/assets/images/nopass.png"  v-if="step==2">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { dygl } from '@/axios'
	import { Message } from 'element-ui'
	export default{
		data(){
			return{
				steps:1,
				step:1,
				u_name:"",
				u_pic:'',
				dyname:"",
				zz:"",
				detailList:[
					{name:"性别",value:"数据加载中",icon:"el-icon-user-solid"},
					{name:"党内职务",value:"数据加载中",icon:"el-icon-s-custom"},
					{name:"民族",value:"数据加载中",icon:"el-icon-s-check"},
					{name:"入党时间",value:"数据加载中",icon:"el-icon-phone"},
					{name:"学历",value:"数据加载中",icon:"el-icon-s-cooperation"},
					{name:"出生日期",value:"数据加载中",icon:"el-icon-suitcase"},
					{name:"联系电话",value:"数据加载中",icon:"el-icon-user-solid"},
					{name:"身份证号",value:"数据加载中",icon:"el-icon-user-solid"},
					{name:"通讯地址",value:"数据加载中",icon:"el-icon-user-solid"},
					{name:"所属单位",value:"数据加载中",icon:"el-icon-s-data"}
				],
			}
		},
		methods:{
			// 数据
			dataList(){
				var that = this;
				dygl.transferDetail({
					id:that.$route.query.id
				}).then(res => {
					that.zz = res.data.into_name;
					that.steps = parseInt(res.data.transfer)+1;
					that.step = res.data.transfer;
					that.dyname = res.data.u_name;
					that.u_pic = res.data.u_picture==""||res.data.u_picture==null?require('@/assets/images/adminMan.png'):res.data.u_picture;
					that.detailList[0].value = res.data.sex==''?'待填写':res.data.sex;
					that.detailList[1].value = that.$changeZhiwu(res.data.u_zhiwu);
					that.detailList[2].value = res.data.nation_name;
					that.detailList[3].value = res.data.attendtime==''?'待填写':that.$changeTime(res.data.attendtime);
					that.detailList[4].value = res.data.education_name==null?'待填写':res.data.education_name;
					that.detailList[5].value = res.data.age==''?'待填写':that.$changeTime(res.data.age);
					that.detailList[6].value = res.data.u_phone;
					that.detailList[7].value = res.data.card==''?'待填写':res.data.card;
					that.detailList[8].value = res.data.postal_address==''?'待填写':res.data.postal_address;
					that.detailList[9].value = res.data.company==''?'待填写':res.data.company;
				})
			},
			// 通过
			pass(transfer){
				var that = this;
				var text = transfer==2?"确定通过":'确定拒绝'
				that.$confirm(text, '提示', {
					cancelButtonText: '取消',
					confirmButtonText: '确定',
					type: 'warning'
				}).then(() => {
					dygl.transferExamine({
						transfer:transfer,
						id:that.$route.query.id
					}).then(res => {
						if(res.code == 200){
							that.$router.go(-1)
						}
					})
				}).catch(() => {
					
				});
			}
		},
		mounted() {
			var that = this;
			that.$emit('selectTop',4)
			that.dataList();
		},
		created() {
			var that = this;
			that.$emit('selectTop',4)
		}
	}
</script>

<style lang="scss">
	.wrap{
		position: relative;
		height: 100%;
		width: 100%;
		.gxzy_top{
			width: 100%;
			margin-bottom: 20px;
			.dydetail{
				margin-top: 20px;
				display: flex;
				align-items: center;
				padding-bottom: 20px;
				border-bottom: 1px solid #DDDDDD;
				.dyimg{
					margin-right: 20px;
					width: 150px;
					img{
						width: 150px;
					}
				}
			}
		}
		.zcdy{
			width: 100%;
			margin-top: 20px;
			div{
				line-height: 30px;
				font-size: 16px;
			}
		}
		.el-descriptions-item__label.has-colon::after{
			content: '' !important;
		}
		.control{
			margin-top: 50px;
			text-align: center;
		}
		.passimg{
			margin-top: 80px;
			width: 100%;
			text-align: center;
			img{
				width: 200px;
			}
		}
	}
</style>

