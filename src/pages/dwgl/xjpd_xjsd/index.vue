<template>
	<div class="wrap">
		<Df ref="rescore" :dialogVisible="dialogVisible" @closeWin="closeWin" :uid="uid" :year="getdata.year" :flag="flag" :type="type"></Df>
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
							<el-select
							 	style="margin-right: 10px;width: 120px !important;" 
								clearable
								v-model="getdata.year" placeholder="选择年份"
								@change="getdata.page = 1;totalPage = 0;dataList();">
								<el-option
									:key="index"
									v-for="(item,index) in $yearList()"
									:label="item"
									:value="item">
								</el-option>
							</el-select>
							<el-select
							 	style="margin-right: 10px;width: 120px !important;" 
								clearable
								v-model="getdata.quarter" placeholder="选择季度"
								@change="getdata.page = 1;totalPage = 0;dataList();">
								<el-option label="第一季度" :value="1"></el-option>
								<el-option label="第二季度" :value="2"></el-option>
								<el-option label="第三季度" :value="3"></el-option>
								<el-option label="第四季度" :value="4"></el-option>
							</el-select>
						</div>
						<div class="rightBar">
							<el-button type="primary" @click="$router.push('/xjpd_gzsz')" v-show="$store.state.userinfo.flag==1">规则设置</el-button>
							<el-button type="primary" @click="daochu">导出表格</el-button>
						</div>
					</div>
					<div class="switchBar">
						<span :class="{selectSwitch:select == 1}" 
						@click="select = 1;getdata.quarter=nowSeason ;dataList();page=1">季度</span>
						<span :class="{selectSwitch:select == 2}" 
						@click="select = 2;getdata.year=nowYear; dataList();page=1">年度</span>
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
									prop="dw"
									label="党组织名称">
								</el-table-column>
								<el-table-column
									prop="score[0]"
									label="支部组织建设">
								</el-table-column>
								<el-table-column
									prop="score[1]"
									label="党员管理教育">
								</el-table-column>
								<el-table-column
									prop="score[2]"
									label="支部组织生活">
								</el-table-column>
								<el-table-column
									prop="score[3]"
									label="融合业务工作">
								</el-table-column>
								<el-table-column
									prop="score[4]"
									label="党建资料管理">
								</el-table-column>
								<el-table-column
									prop="total"
									label="总分">
								</el-table-column>
								<el-table-column
									prop="star"
									label="评级"
									width="120">
								</el-table-column>
								<el-table-column
									v-if="$store.state.userinfo.flag==1"
									label="操作"
									fixed="right"
									width="120">
									<template slot-scope="scope">
										<el-button v-if="scope.row.complete == 1" type="text" size="small" 
											@click="dialogVisible = true;
											uid=scope.row.id;flag=scope.row.flag;type='edit'
											$refs.rescore.bindData(scope.row)">重新打分</el-button>
										<el-button v-else type="text" size="small" @click="dialogVisible = true;uid=scope.row.id;flag=scope.row.flag;type='add'">打分</el-button>
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
	import { dwgl } from '@/axios'
	import Page from '@/components/page.vue'
	import { Message } from 'element-ui'
	import Df from './components/jfzc.vue'
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
				getdata:{
					dwid:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					uid: "",
					class_id:"",
					total:"",
					star: "",
					rescore: 2,
					year: new Date().getFullYear(),
					page:1,
					quarter:season
				},
				nowSeason:season,
				nowYear: new Date().getFullYear(),
				select:1,
				uid:"",
				flag:"",
				type:'add',//打分/重新打分
				totalPage:0,
				tableData:[],
				dialogVisible:false,//新增/编辑弹窗
			}
		},
		components:{Page,Df},
		methods:{
			// 支部列表
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
			// 导出表格
			daochu(){
				dwgl.exportPartyOrgan({
					user_id: this.getdata.dwid,
					flag: this.getdata.flag,
					year: this.getdata.year,
					sign: 9
				})
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

