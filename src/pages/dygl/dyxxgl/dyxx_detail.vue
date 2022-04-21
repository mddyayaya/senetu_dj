<template>
	<div class="wrap">
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>党员管理</el-breadcrumb-item>
				<el-breadcrumb-item>党员信息详情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<div class="dydetail">
						<div class="dyimg">
							<img src="@/assets/images/adminMan.png" v-if="u_pic==''||u_pic==null||u_pic.search('http')==-1">
							<img :src="u_pic" v-else>
						</div>
						<el-descriptions class="margin-top" :title="u_name" :column="3" >
							<template slot="extra">
								<el-button type="primary" plain @click="edit()">编辑</el-button>
								<el-button type="primary" plain @click="$router.go(-1)">返回上级</el-button>
							</template>
							<el-descriptions-item v-for="(item,index) in detailList">
								{{item.name}} : 
								{{item.value}}
							</el-descriptions-item>
						</el-descriptions>
					</div>
					<div class="subtitle">
						<span :class="{selectBar:selectId == 4}" @click="changeData(4)">活动记录</span>
						<span :class="{selectBar:selectId == 1}" @click="changeData(1)">集中学习</span>
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
	import { dygl } from '@/axios'
	import { Message } from 'element-ui'
	import Page from '@/components/page.vue'
	export default{
		data(){
			return{
				getdata:{
					user_id:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					dw_name:this.$store.state.userinfo.dw_name,
					organ_class:"",
					sign:2
				},
				u_name:"",
				u_pic:'',
				detailList:[
					{name:"性别",value:"数据加载中",icon:"el-icon-user-solid"},
					{name:"党内职务",value:"数据加载中",icon:"el-icon-s-custom"},
					{name:"民族",value:"数据加载中",icon:"el-icon-s-check"},
					{name:"入党时间",value:"数据加载中",icon:"el-icon-phone"},
					{name:"学历",value:"数据加载中",icon:"el-icon-s-cooperation"},
					{name:"出生日期",value:"数据加载中",icon:"el-icon-suitcase"},
					{name:"累计党组织活动",value:"数据加载中",icon:"el-icon-location"},
					{name:"联系电话",value:"数据加载中",icon:"el-icon-user-solid"},
					{name:"身份证号",value:"数据加载中",icon:"el-icon-user-solid"},
					{name:"通讯地址",value:"数据加载中",icon:"el-icon-user-solid"},
					{name:"所属单位",value:"数据加载中",icon:"el-icon-s-data"}
				],
				zzname:"数据加载中",
				selectId:4, //1 集中学习    4 组织活动
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
		components:{Page},
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
				that.$router.push({
					path:'/dyxx_add',
					query:{
						id:that.$route.query.id,
						type:'edit',
						flag:that.$route.query.flag,
						uid:that.$route.query.uid,
						cy_zz:that.$route.query.cy_zz,
					},
				})
			},
			// 获取数据
			dataList(){
				var that = this;
				dygl.updateMemberBind({
					id:that.$route.query.id
				}).then(res => {
					if(res.code == 200){
						that.u_name = res.data.u_name;
						that.u_pic = res.data.u_picture;
						that.detailList[0].value = res.data.sex!=''?res.data.sex:'待填写';
						that.detailList[1].value = res.data.u_zhiwu==""?'待填写':that.$changeZhiwu(res.data.u_zhiwu);
						that.detailList[2].value = res.data.nation_name!=null?res.data.nation_name:'待填写';
						that.detailList[3].value = res.data.attendtime==""?'待填写':that.$changeTime(res.data.attendtime);
						that.detailList[4].value = res.data.education_name!=null?res.data.education_name:'待填写';
						that.detailList[5].value = res.data.age==""?'待填写':that.$changeTime(res.data.age);
						
						console.log(that.detailList[3].value)
						that.detailList[6].value = res.data.activity_count;
						that.detailList[7].value = res.data.u_phone;
						that.detailList[8].value = res.data.card!=''?res.data.card:'待填写';
						that.detailList[9].value = res.data.postal_address!=''?res.data.postal_address:'待填写';
						that.detailList[10].value = res.data.company!=''?res.data.company:'待填写';
						that.changeData(that.selectId);
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
						{prop:"title",width:"300",label:"学习会议标题"},
						{prop:"k_time",width:"200",label:"时间"},
						{prop:"address",width:"300",label:"学习地点"},
					];
					that.activity(selectId,1);
				}else{
					that.tableHeader = [
						{prop:"title",width:"",label:"活动主题"},
						{prop:"type",width:"100",label:"活动类型"},
						{prop:"k_time",width:"400",label:"时间"},
						{prop:"address",width:"",label:"活动地点"},
					];
					that.activity(selectId,1);
				}
			},
			// 活动记录
			activity(type,page){
				var that = this;
				dygl.leaderHyLog({
					type:type,
					id:that.$route.query.id,
					page:page
				}).then(res => {
					that.tableData = res.data.pagedata;
					that.totalPage = res.data.count;
				})
			},
			changePage(val){
				var that = this;
				that.activity(that.selectId,val);
			}
		},
		mounted() {
			var that = this;
			that.dataList();
			that.$emit('selectTop',4);
		},
		created() {
			var that = this;
			that.$emit('selectTop',4)
		}
	}
</script>

<style lang="scss">
	.el-descriptions__title{
		display: flex;
		font-size: 20px;
		align-items: center;
	}
	.el-descriptions-item__label.has-colon::after{
		content: "" !important;
	}
	.dydetail{
		width: 100%;
		display: flex;
		.dyimg{
			width: 160px;
			height: 200px;
			background: #DDDDDD;
			margin-right: 20px;
			border-radius: 10px;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
	.el-descriptions{
		flex: 1;
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

