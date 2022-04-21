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
							<img src="@/assets/images/adminMan.png" v-if="u_pic==null||u_pic==''||u_pic.search('http') == -1">
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
					<el-steps :active="zhiwu==6?zhiwu+1:zhiwu-1" :simple="true" finish-status="success"  style="margin-top: 20px">
						<el-step title="入党申请" ></el-step>
						<el-step title="积极分子" ></el-step>
						<el-step title="发展对象" ></el-step>
						<el-step title="预备党员" ></el-step>
						<el-step title="转正考察" ></el-step>
						<el-step title="已转正" ></el-step>
					</el-steps>
					<div class="step_box">
						<Steps :step="step" @dataList="dataList" :file="file"></Steps>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { dygl } from '@/axios'
	import { Message } from 'element-ui'
	import Steps from './components/stepList.vue'
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
				step:"",//发展阶段
				u_name:"",
				u_pic:'',
				detailList:[
					{name:"性别",value:"数据加载中",icon:"el-icon-user-solid"},
					{name:"党内职务",value:"数据加载中",icon:"el-icon-s-custom"},
					{name:"民族",value:"数据加载中",icon:"el-icon-s-check"},
					{name:"申请入党时间",value:"数据加载中",icon:"el-icon-phone"},
					{name:"学历",value:"数据加载中",icon:"el-icon-s-cooperation"},
					{name:"出生日期",value:"数据加载中",icon:"el-icon-suitcase"},
					{name:"累计党组织活动",value:"数据加载中",icon:"el-icon-location"},
					{name:"联系电话",value:"数据加载中",icon:"el-icon-user-solid"},
					{name:"身份证号",value:"数据加载中",icon:"el-icon-user-solid"},
					{name:"通讯地址",value:"数据加载中",icon:"el-icon-user-solid"},
					{name:"所属单位",value:"数据加载中",icon:"el-icon-s-data"}
				],
				zhiwu:1,
				file:{}
			}
		},
		components:{Steps},
		methods:{
			// 关闭弹窗
			closeEdit(){
				var that = this;
				that.dialogVisible = false;
				that.dataList();
			},
			// 编辑
			edit(data){
				var that = this;
				that.$router.push({
					path:'/dyxx_add',
					query:{
						type:'edit',
						uid:that.$route.query.uid,
						cy_zz:that.$route.query.cy_zz,
						id:that.$route.query.id,
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
						that.detailList[0].value = res.data.sex!=''?res.data.sex:"待填写";
						that.detailList[1].value = that.$changeZhiwu(res.data.zhiwu);
						that.detailList[2].value = res.data.nation_name;
						that.detailList[3].value = that.$changeTime(res.data.applytime);
						that.detailList[4].value = res.data.education_name==null?'待填写':res.data.education_name;
						that.detailList[5].value = that.$changeTime(res.data.age);
						that.detailList[6].value = res.data.activity_count+'次';
						that.detailList[7].value = res.data.u_phone;
						that.detailList[8].value = res.data.card==''?'待填写':res.data.card;
						that.detailList[9].value = res.data.postal_address==''?'待填写':res.data.postal_address;
						that.detailList[10].value =res.data.company==''?'待填写':res.data.company;
						that.step = res.data.u_zhiwu_status;
						that.zhiwu = that.$changeDev(that.step);
						console.log(that.zhiwu)
						if(res.data.file){
							that.file = res.data.file;
						}else{
							that.file = {}
						}
					}
				})
			},
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
	.step_box{
		width: 100%;
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

