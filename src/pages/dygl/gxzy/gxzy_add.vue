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
							<el-steps :active="0" finish-status="success" simple style="margin-top: 20px">
								<el-step title="提交转接申请" ></el-step>
								<el-step title="转入组织审批" ></el-step>
								<el-step title="完成转接" ></el-step>
							</el-steps>
						</div>
						<div class="gxzy_top">
							<h4>转出党员</h4>
							<div class="zcdy">
								<div>转出党员： 
									<el-select 
										value-key="id" 
										v-model="selectinfo"
										filterable
										@change="changeUid"
										placeholder="请选择要转出的党员可搜索">
										<el-option
											v-for="item in memberList"
											:label="item.u_name"
											:value="item">
										</el-option>
									</el-select>
								</div>
								<div style="margin-top: 20px;">接收组织： 
									<el-select v-model="formData.transfer_zbid" filterable placeholder="请选择要转入的组织可搜索">
										<el-option
										v-for="item in orgenList"
										v-if="hideZbid!=item.id&&item.flag!=2"
										:label="item.dw"
										:value="item.id">
										</el-option>
									</el-select>
								</div>
							</div>
						</div>
						<div class="gxzy_top" v-if="formData.uid!=''">
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
						<div class="control">
							<el-button type="success" @click="pass(2)" v-if="$store.state.userinfo.flag==1">转出</el-button>
							<el-button type="success" @click="pass(1)" v-if="$store.state.userinfo.flag!=1">提交</el-button>
							<el-button type="primary" @click="$router.go(-1)">取消</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { dwgl,dygl,djxc } from '@/axios'
	import { Message } from 'element-ui'
	export default{
		data(){
			return{
				formData:{
					uid:"",//党员id
					zbid:"",//党员支部
					transfer_zbid:"",//接受组织
					transfer:"",//1提交  2：通过  3：拒绝
				},
				selectinfo:'',
				getdata:{
					id: this.$store.state.userinfo.id,
					flag: this.$store.state.userinfo.flag,
				},
				getdata1:{
					user_id: this.$store.state.userinfo.flag !=1?this.$store.state.userinfo.p_id:this.$store.state.userinfo.id,
					flag: 1,
				},
				value:"",
				memberList:[],
				orgenList:[],
				u_pic:"",
				u_name:"",
				hideZbid:"",//隐藏自己支部
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
				//党员列表
				dwgl.memberAdmin(that.getdata).then(res => {
					that.memberList = res.data;
				})
				//党组织列表
				djxc.partyOrgan(that.getdata1).then(res => {
					that.orgenList = res.data;
				})
			},
			// 党员筛选
			changeUid(value){
				var that = this;
				that.hideZbid = value.uid;
				that.u_name =value.u_name;
				that.formData.uid = value.id
				that.formData.zbid = value.uid;
				that.u_pic = value.u_picture==""||value.u_picture==null?require('@/assets/images/adminMan.png'):value.u_picture;
				that.detailList[6].value = value.u_phone;
				that.detailList[0].value = value.sex==''||value.sex==null?"待填写": value.sex;
				that.detailList[1].value = value.u_zhiwu==''||value.u_zhiwu==null?"待填写": that.$changeZhiwu(value.u_zhiwu);
				that.detailList[2].value = value.nation_name==''||value.nation_name==null?"待填写": value.nation_name;
				that.detailList[4].value = value.attendtime==''||value.attendtime==null?"待填写": that.$changeTime(value.attendtime);
				that.detailList[4].value = value.education==''||value.education==null?"待填写": value.education;
				that.detailList[5].value = value.age==''||value.age==null?"待填写": that.$changeTime(value.age);
				that.detailList[7].value = value.card==''||value.card==null?"待填写": value.card;
				that.detailList[8].value = value.postal_address==''?"待填写": value.postal_address;
				that.detailList[9].value = value.company==''?"待填写": value.company;
			},
			// 通过
			pass(transfer){
				var that = this;
				var text = transfer==1?"确定提交":transfer==2?"确定通过":'确定拒绝';
				that.formData.transfer = transfer;
				if(that.formData.uid == ""){
					Message({
						type:"warning",
						message:"请选择要转出的党员"
					})
				}else if(that.formData.transfer_zbid == ""){
					Message({
						type:"warning",
						message:"请选择要转入的支部"
					})
				}else{
					that.$confirm(text, '提示', {
						cancelButtonText: '取消',
						confirmButtonText: '确定',
						type: 'warning'
					}).then(() => {
						dygl.transferOut(that.formData).then(res => {
							if(res.code == 200){
								that.$router.go(-1)
							}
						})
					}).catch(() => {
						
					});
				}
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
	.el-step__title.is-process{
		color: #1266E3 !important;
	}
	.el-step__head.is-process{
		color: #1266E3 !important;
		border-color: #1266E3 !important;
	}
	.el-step__title.is-process{
		color: #1266E3 !important;
	}
</style>

