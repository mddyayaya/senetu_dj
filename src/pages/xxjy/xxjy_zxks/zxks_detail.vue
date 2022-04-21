<template>
	<div class="wrap">
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>学习教育</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<div class="dydetail">
						<el-descriptions class="margin-top" title="在线考试详情" :column="2" >
							<template slot="extra">
								<el-button type="primary" @click="$router.go(-1)">返回上级</el-button>
							</template>
							<el-descriptions-item v-for="(item,index) in detailList">
								{{item.name}} : 
								{{item.value}}
							</el-descriptions-item>
						</el-descriptions>
					</div>
					<div class="subtitle">
						<el-button type="primary" @click="daochu">导出表格</el-button>
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
									prop="title"
									label="序号"
									width="">
									<template slot-scope="scope">
										{{scope.$index + 1}}
									</template>
								</el-table-column>
								<el-table-column
									prop="u_name"
									label="姓名">
								</el-table-column>
								<el-table-column
									prop="cy_zz"
									label="党组织">
								</el-table-column>
								<el-table-column
									prop="numbers"
									label="成绩"
									width="250">
								</el-table-column>
								<el-table-column
									prop="organ_class"
									label="状态"
									width="100">
									<template slot-scope="scope">
										<span v-if="scope.row.status == 1">及格</span>
										<span style="color:#bb0000" v-if="scope.row.status == 2">不及格</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="addtime"
									label="提交时间">
									<template slot-scope="scope">
										{{$changeTime(scope.row.addtime)}}
									</template>
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
	import { xxjy,dwgl } from '@/axios'
	import { Message } from 'element-ui'
	import Page from '@/components/page.vue'
	export default{
		data(){
			return{
				getdata:{
					id: this.$route.query.id,
					page: 1
				},
				detailList:[
					{name:"考试名称",value:"数据加载中",icon:"el-icon-user-solid"},
					{name:"考试时间",value:"数据加载中",icon:"el-icon-s-custom"},
					{name:"试卷名称",value:"数据加载中",icon:"el-icon-s-check"},
					{name:"应考人数",value:"数据加载中",icon:"el-icon-phone"},
					{name:"试题数量",value:"数据加载中",icon:"el-icon-s-cooperation"},
					{name:"完成人数",value:"数据加载中",icon:"el-icon-suitcase"},
					{name:"卷面总分",value:"数据加载中",icon:"el-icon-location"},
					{name:"及格人数",value:"数据加载中",icon:"el-icon-user-solid"},
					{name:"及格分数",value:"数据加载中",icon:"el-icon-user-solid"},
					{name:"考试时段",value:"数据加载中",icon:"el-icon-s-custom"}
				],
				totalPage:0,
				tableData:[],
			}
		},
		components:{Page},
		methods:{
			// 获取数据
			dataList(){
				var that = this;
				xxjy.selectAssessment({
					id:that.$route.query.id
				}).then(res => {
					if(res.code == 200){
						that.detailList[0].value = res.data.title;
						that.detailList[1].value = res.data.duration;
						that.detailList[2].value = res.data.test_title;
						that.detailList[3].value = res.data.count;
						that.detailList[4].value = res.data.question_count;
						that.detailList[5].value = res.data.complete_count;
						that.detailList[6].value = res.data.total;
						that.detailList[7].value = res.data.pass_count;
						that.detailList[8].value = res.data.pass;
						that.detailList[9].value = that.$changeTime(res.data.s_time)+'至'+that.$changeTime(res.data.e_time);
						that.appendPeople();
					}
				})
			},
			// 参与人员
			appendPeople(){
				var that = this;
				xxjy.selectAssessmentUser(that.getdata).then(res => {
					if(res.data.pagedata.length>0){
						that.tableData = res.data.pagedata;
						that.totalPage = res.data.count;
					}else{
						that.tableData = [];
						that.totalPage = 0;
					}
				})
			},
			changePage(current){
				this.getdata.page = current;
				this.appendPeople();
			},
			// 导出表格
			daochu(){
				var that = this
				if(that.tableData.length == 0){
					Message({
						type:"warning",
						message:"暂无可导出的数据"
					})
				}else{
					dwgl.dftjDaochu({
						id:that.getdata.id,
						sign:11
					}).then(res => {
						console.log(res)
						if(res.code == 200){
							location.href = res.link;
						}else{
							Message.error("导出失败")
						}
					})
				}
			}
		},
		mounted() {
			var that = this;
			that.dataList();
			that.$emit('selectTop',5);
		},
		created() {
			var that = this;
			that.$emit('selectTop',5)
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

