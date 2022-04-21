<template>
	<div class="wrap">
		<Add ref="FormData" @closeEdit="closeEdit" :dialogVisible="dialogVisible" :type="type"></Add>
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>党务管理</el-breadcrumb-item>
				<el-breadcrumb-item>党组织详情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<el-descriptions class="margin-top" title="" :column="3" border>
						<template slot="title">
							{{zzname}}
							<i class="icon adddzz"></i>
						</template>
						<template slot="extra">
							<el-button type="primary" plain @click="daochu">导出表格</el-button>
							<el-button type="primary" plain @click="edit()">编辑</el-button>
							<el-button type="primary" plain @click="$router.go(-1)">返回上级</el-button>
						</template>
						<el-descriptions-item v-for="(item,index) in detailList">
							<template slot="label">
								<i :class="item.icon"></i>
								{{item.name}}
							</template>
							{{item.value}}
						</el-descriptions-item>
					</el-descriptions>
					<div class="subtitle">
						<span :class="{selectBar:selectId == 1}" @click="changeData(1)">党组织成员</span>
						<span :class="{selectBar:selectId == 2}" @click="changeData(2)">活动记录</span>
						<span :class="{selectBar:selectId == 3}" @click="changeData(3)">集中学习</span>
					</div>
					<div class="selectdata">
						<template>
							<el-table
								:header-cell-style="{background:'#f5f7fa',color:'#000'}"
								:data="tableData"
								stripe
								border
								style="width: 100%">
								<el-table-column
									v-for="item in tableHeader"
									:prop="item.prop"
									:label="item.label">
								</el-table-column>
							</el-table>
						</template>
						<Page :totalPage="totalPage" :pageSize="10" @changedata="changePage"></Page>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { dwgl } from '@/axios'
	import { Message } from 'element-ui'
	import Add from './components/add_zz.vue'
	import Page from '@/components/page.vue'
	export default{
		data(){
			return{
				getdata:{
					user_id:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					dw_name:this.$store.state.userinfo.dw_name,
					organ_class:"",
					sign:1
				},
				detailList:[
					{name:"登录账号",value:"数据加载中",icon:"el-icon-user-solid"},
					{name:"党组织书记",value:"数据加载中",icon:"el-icon-s-custom"},
					{name:"负责人",value:"数据加载中",icon:"el-icon-s-check"},
					{name:"联系电话",value:"数据加载中",icon:"el-icon-phone"},
					{name:"党组织类型",value:"数据加载中",icon:"el-icon-s-cooperation"},
					{name:"上级党组织",value:"数据加载中",icon:"el-icon-suitcase"},
					{name:"通讯地址",value:"数据加载中",icon:"el-icon-location"},
					{name:"组织成员",value:"数据加载中",icon:"el-icon-user-solid"},
					{name:"正式党员",value:"数据加载中",icon:"el-icon-user-solid"},
					{name:"累计党内活动",value:"数据加载中",icon:"el-icon-s-data"}
				],
				zzname:"数据加载中",
				selectId:1,
				totalPage:0,
				tableData:[],
				pageSize:10,
				currentPage: 1,
				type:"edit",
				dialogVisible:false,
				tableHeader:[],
				organ_class:0,
				daoData:{}
			}
		},
		components:{Add,Page},
		methods:{
			// 关闭弹窗
			closeEdit(){
				var that = this;
				that.dialogVisible = false;
				that.dataList();
			},
			// 编辑
			edit(){
				var that = this;
				that.dialogVisible = true;
				var data = {
					id:that.$route.query.id,
					flag:that.$route.query.flag,
					p_id:that.$route.query.pid,
				}
				that.$refs.FormData.bindData(data);
				that.$refs.FormData.pOran();
			},
			// 获取数据
			dataList(){
				var that = this,
				data = {
					id:that.$route.query.id,
					flag:that.$route.query.flag,
					p_id:that.$route.query.pid,
				}
				dwgl.updateOrgan(data).then(res => {
					that.changeData(that.selectId)
					if(res.code == 200){
						res.data = that.$nodata(res.data);
						that.zzname = res.data.dw;
						that.detailList[0].value = res.data.u_number;
						that.detailList[1].value = res.data.organ_secretary;
						that.detailList[2].value = res.data.head_name;
						that.detailList[3].value = res.data.head_phone;
						that.organ_class = res.data.organ_class;
						that.detailList[5].value = res.data.p_name;
						that.detailList[6].value = res.data.address;
						that.detailList[7].value = res.data.all_count;
						that.detailList[8].value = res.data.party_count;
						that.detailList[9].value = res.data.hy_count;
					}
				})
			},
			// 切换数据
			changeData(selectId){
				var that = this;
				that.tableData = [];
				that.tableHeader = [];
				that.totalPage = 0;
				that.currentPage = 1;
				that.selectId = selectId;
				if(selectId == 1){
					that.tableHeader = [
						{prop:"u_name",width:"200",label:"姓名"},
						{prop:"sex",width:"",label:"性别"},
						{prop:"u_zhiwu_name",width:"200",label:"党员身份"},
						{prop:"u_phone",width:"",label:"联系方式"},
						{prop:"cy_zz",width:"",label:"所属支部"}
					];
					that.getMembers(1);
				}else if(selectId == 2){
					that.daoData = {
						id:that.$route.query.id,
						flag:that.$route.query.flag,
						focus:2,
						sign:3
					}
					that.tableHeader = [
						{prop:"hy_title",width:"300",label:"活动主题"},
						{prop:"type",width:"",label:"活动类型"},
						{prop:"h_stime",width:"200",label:"时间"},
						{prop:"address",width:"300",label:"活动地点"},
					];
					that.activity(1,2);
				}else{
					that.daoData = {
						id:that.$route.query.id,
						flag:that.$route.query.flag,
						focus:1,
						sign:4
					}
					that.tableHeader = [
						{prop:"hy_title",width:"",label:"学习会议标题"},
						{prop:"k_time",width:"300",label:"时间"},
						{prop:"address",width:"400",label:"学习地点"},
						{prop:"hour",width:"80",label:"学时"},
					];
					that.activity(1,1);
				}
			},
			// 获取组织成员数据
			getMembers(page){
				var that = this;
				that.daoData = {
					id:that.$route.query.id,
					flag:that.$route.query.flag,
					organ_class:that.organ_class,
					sign:2
				}
				dwgl.memberAdmin({
					id:that.$route.query.id,
					flag:that.$route.query.flag,
					organ_class:that.organ_class,
					sign: 2,
					page:page,
					name: "",
					sex: "",
				}).then(res => {
					if(res.code == 200){
						that.tableData = res.data.pagedata;
						that.totalPage = res.data.count;
					}
				})
			},
			// 活动记录
			activity(page,focus){
				var that = this;
				dwgl.activity({
					id:that.$route.query.id,
					flag:that.$route.query.flag,
					focus: focus,
					sign: 3,
					page:page
				}).then(res => {
					if(res.code == 200){
						for(var i=0;i<res.data.pagedata.length;i++){
							res.data.pagedata[i].h_stime = that.$changeTime(res.data.pagedata[i].h_stime)
						}
						that.tableData = res.data.pagedata;
						that.totalPage = res.data.count;
					}
				})
			},
			// 导出数据
			daochu(){
				var that = this;
				dwgl.exportPartyOrgan(that.daoData)
			},
			changePage(val){
				var that = this;
				that.currentPage = val;
				if(that.selectId == 1){
					that.getMembers(val);
				}else if(that.selectId == 2){
					that.activity(val,2);
				}else{
					that.activity(val,1);
				}
			}
		},
		mounted() {
			var that = this;
			that.dataList();
			that.$emit('selectTop',3);
			dwgl.organClass().then(res => {
				res.forEach(item => {
					if(that.organ_class == item.value){
						that.detailList[4].value = item.option
					}
				})
			});
		},
		created() {
			var that = this;
			that.$emit('selectTop',3)
		}
	}
</script>

<style lang="scss">
	.el-descriptions__title{
		display: flex;
		font-size: 20px;
		align-items: center;
	}
	.subtitle{
		width: 100%;
		height: 50px;
		border: 1px solid #DDDDDD;
		line-height: 50px;
		border-left: none;
		margin: 20px 0;
		color: #333;
		font-size: 14px;
		border-right: none;
		>span{
			display: inline-block;
			height: 100%;
			cursor: pointer;
			border-bottom: 2px solid rgba($color: #000000, $alpha: 0);
			padding: 0 20px;
		}
		>span:hover{
			color: #000000;
			border-bottom: 2px solid #bb0000;
		}
		.selectBar{
			color: #000000;
			border-bottom: 2px solid #bb0000;
		}
	}
</style>

