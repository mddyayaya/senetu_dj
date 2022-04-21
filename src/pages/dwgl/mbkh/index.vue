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
			<tree @treeSelect="treeSelect"></tree>
			<div class="datatable">
				<div class="datas">
					<div class="switchBar">
						<span :class="{selectSwitch:selectSwitch == 1}" 
						@click="selectSwitch=1;
						getdata.month = (new Date().getMonth()+1).toString();
						getdata.page=1;
						dataList()">月度排名</span>
						<span :class="{selectSwitch:selectSwitch == 2}" @click="selectSwitch=2;getdata.year = new Date().getFullYear();getdata.month='';getdata.page=1;dataList();">年度排名</span>
					</div>
					<div class="selectbar">
						<div class="leftBar">
							<el-select
							 	style="margin-right: 10px;width: 120px !important;" 
								clearable
								v-model="getdata.year" placeholder="请选择年份"
								@change="getdata.page = 1;totalPage = 0;dataList();"
								clearable>
								<el-option
									v-for="item in $yearList()"
									:label="item"
									:value="item">
								</el-option>
							</el-select>
							<el-select
							v-if="selectSwitch==1"
								style="width: 120px !important;" 
								v-model="getdata.month" placeholder="请选择月份"
								@change="getdata.page = 1;totalPage = 0;dataList();"
								clearable>
								<el-option
									v-for="item in $monthList()"
									:label="item"
									:value="item">
								</el-option>
							</el-select>
						</div>
						<div class="rightBar">
							<el-button type="primary" @click="$router.push('/mbkh_gzsz')">评分标准</el-button>
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
									prop="u_name"
									label="党员">
								</el-table-column>
								<el-table-column
									prop="score.study_score"
									label="党员学习">
								</el-table-column>
								<el-table-column
									prop="score.position_score"
									label="岗位履职">
								</el-table-column>
								<el-table-column
									prop="score.sign_score"
									label="支部活动">
								</el-table-column>
								<el-table-column
									prop="score.pay_score"
									label="党费缴纳">
								</el-table-column>
								<el-table-column
									prop="score.role_score"
									label="作用发挥">
								</el-table-column>
								<el-table-column
									prop="score.advanced_score"
									label="先进典型">
								</el-table-column>
								<el-table-column
									prop="total_score"
									label="总积分">
								</el-table-column>
								<el-table-column
									v-if="$store.state.userinfo.flag==3"
									label="操作"
									fixed="right"
									width="120">
									<template slot-scope="scope">
										<el-button v-if="scope.row.complete == 1" type="text" size="small" 
											@click="dialogVisible = true;
											uid=scope.row.id;
											user_id=scope.row.uid;
											type='edit'
											$refs.rescore.bindData(scope.row.score)">重新打分</el-button>
										<el-button v-else type="text" size="small"
											@click="dialogVisible = true;
											uid=scope.row.id;
											user_id=scope.row.uid;
											type='add'
											$refs.rescore.bindData(scope.row.score)">打分</el-button>
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
	import Df from './components/jfzc.vue'
	export default{
		data(){
			return{
				getdata:{
					user_id:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					year:"",
					month:(new Date().getMonth()+1),
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
				dwgl.scoreCheckList(that.getdata).then(res => {
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

