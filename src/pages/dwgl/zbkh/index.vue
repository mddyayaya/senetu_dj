<template>
	<div class="wrap">
		<Df ref="rescore" :dialogVisible="dialogVisible" 
		@closeWin="closeWin" 
		:uid="uid" 
		:userId="user_id"
		:type="type"></Df>
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>党务管理</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<div class="selectbar">
						<div class="leftBar">
							<div>分数排名</div>
						</div>
						<div class="rightBar">
							<el-select
							 	style="margin-right: 10px;width: 120px !important;" 
								clearable
								size="small"
								v-model="getdata.year" placeholder="请选择年份"
								@change="getdata.page = 1;totalPage = 0;dataList();">
								<el-option
									:key="item"
									v-for="item in $yearList()"
									:label="item"
									:value="item">
								</el-option>
							</el-select>
							<el-select
								size="small"
								style="width: 120px !important;margin-right: 10px;" 
								v-model="getdata.quarter" placeholder="选择季度"
								clearable
								@change="getdata.page = 1;totalPage = 0;dataList();">
								<el-option
									label="第一季度"
									:value="1">
								</el-option>
								<el-option
									label="第二季度"
									:value="2">
								</el-option>
								<el-option
									label="第三季度"
									:value="3">
								</el-option>
								<el-option
									label="第四季度"
									:value="4">
								</el-option>
							</el-select>
							<el-button size="small" type="primary" @click="$router.push('/zbkh_gzsz')">评分标准</el-button>
						</div>
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
									width="50"
									type="index"
									label="排名">
								</el-table-column>
								<el-table-column
									prop="dw"
									label="支部名称">
								</el-table-column>
								<el-table-column
									prop="score[0].score"
									label="第一季度">
								</el-table-column>
								<el-table-column
									prop="score[1].score"
									label="第二季度">
								</el-table-column>
								<el-table-column
									prop="score[2].score"
									label="第三季度">
								</el-table-column>
								<el-table-column
									prop="score[3].score"
									label="第四季度">
								</el-table-column>
								<el-table-column
									prop="total"
									label="分数">
								</el-table-column>
								<el-table-column
									v-if="$store.state.userinfo.flag==1"
									label="操作"
									fixed="right"
									width="120">
									<template slot-scope="scope">
										<el-button v-if="scope.row.complete == 1" type="text" size="small" 
											@click="$router.push('/zbkh_set_score')">重新打分</el-button>
										<el-button v-else type="text" size="small"
											@click="$router.push({
												path:'/zbkh_set_score',
												query:{
													uid:scope.row.id,
													year:getdata.year,
													quarter:getdata.quarter
												}
											})">去打分</el-button>
									</template>
								</el-table-column>
							</el-table>
						</template>
						<Page :totalPage="totalPage" :pageSize="10" @changedata="changedata"></Page>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import tree from '@/components/tree.vue'
	import { dwgl } from '@/axios'
	import Page from '@/components/page.vue'
	import { Message } from 'element-ui'
	import Df from '../mbkh/components/jfzc.vue'
	export default{
		data(){
			let quarter = ""
			let today = new Date(); //获取当前时间
			let month = today.getMonth() + 1;//getMonth返回0-11
			//下面是几个if
			if(month >=1 && month <=3){
				quarter =  1;
			}else if(month >=4 && month <=6){
				quarter = 2;
			}else if(month >=7 && month <=9){
				quarter = 3;
			}else{
				quarter = 4;
			}  
			return{
				getdata:{
					dwid:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					year:new Date().getFullYear(),
					quarter:quarter,
					page:1,
				},
				selectSwitch:1,
				uid:"",
				user_id:"",
				year:"",
				month:"",
				type:'add',//打分/重新打分
				totalPage:0,
				tableData:[],
				dialogVisible:false,//新增/编辑弹窗
			}
		},
		components:{Page,Df,tree},
		methods:{
			// 打分列表
			dataList(){
				var that = this;
				dwgl.starApproval(that.getdata).then(res => {
					if(res.data.pagedata!=null){
						that.tableData = res.data.pagedata;
						that.totalPage = res.data.count;
					}else{
						that.tableData = [];
					}
				})
			},
			// 关闭弹窗
			closeWin(){
				var that = this;
				that.dialogVisible = false;
				that.dataList();
			},
			// 分页筛选
			changedata(val) {
				var that = this;
				that.getdata.page = val;
				that.dataList();
			},
			// 树形结构筛选
			treeSelect(data){
				var that = this;
				that.getdata.user_id = data.id;
				that.getdata.flag = data.flag;
				that.getdata.page = 1;
				that.dataList();
			}
		},
		mounted() {
			var that = this;
			that.dataList();
		},
		created() {
			var that = this;
			that.$emit('selectTop',3)
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.wrap{
		position: relative;
		height: 100%;
		width: 100%;
		.fengmian {
		    height: 86px;
		    width: 150px;
			object-fit: cover;
		}
	}
	
	.switchBar{
		width: 100%;
		height: 40px;
		line-height: 40px;
		margin-bottom: 20px;
		border-bottom: 1px solid #DDDDDD;
		span{
			cursor: pointer;
			display: inline-block;
			line-height: 40px;
			font-size: 16px;
			margin-right: 20px;
			padding: 0 20px;
			font-weight: bold;
		}
		span:hover{
			color: #BB0000;
			border-bottom: 2px solid #bb0000;
		}
		.selectSwitch{
			color: #BB0000;
			border-bottom: 2px solid #bb0000;
		}
	}
</style>

