<template>
	<div class="wrap">
		<Dfadd ref="addDf" 
			:type="type" 
			:flag="flag" 
			:id="user_id"
			@closeWin="closeWin" 
			:dialogVisible="dialogVisible"></Dfadd>
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
					<div class="selectbar">
						<div>
							<el-select
							 	style="margin-right: 10px;width: 120px !important;" 
								v-model="getdata.year" placeholder="请选择年份"
								clearable
								@change="getdata.page = 1;totalPage = 0;dataList();">
								<el-option
									v-for="item in $yearList()"
									:label="item"
									:value="item">
								</el-option>
							</el-select>
							<el-select
							 	style="width: 120px !important;" 
								clearable
								@change="getdata.page = 1;totalPage = 0;dataList();"
								v-model="getdata.month" placeholder="请选择月份">
								<el-option
									v-for="item in $monthList()"
									:label="item+'月'"
									:value="item">
								</el-option>
							</el-select>
						</div>
						<div>
							<el-button type="primary"@click="dialogVisible=true;type='add';user_id=getdata.user_id;flag=getdata.flag">新增</el-button>
							<!-- <el-button type="primary" v-if="getdata.flag != 3" @click="dialogVisible=true;type='add';$refs.addDf.organMember()">批量新增</el-button> -->
							<el-button type="primary" plain @click="daochu">导出表格</el-button>
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
									prop="u_name"
									label="组织名称" >
								</el-table-column>
								<el-table-column 
									prop="allocate_class"
									label="支出名称" >
								</el-table-column>
								<el-table-column
									prop="allocate_time"
									label="时间"
									width="150">
								</el-table-column>
								<el-table-column
									prop="agent"
									label="经办人"
									width="150">
								</el-table-column>
								<el-table-column
									prop=""
									label="金额"
									width="114">
									<template slot-scope="scope">
										<span>{{scope.row.allocate_money}}&nbsp;¥</span>
									</template>
								</el-table-column>
								<el-table-column
									label="操作"
									width="114">
								<template slot-scope="scope">
									<el-button @click="dialogVisible=true;type='edit';$refs.addDf.bindData();$refs.addDf.bindData(scope.row)" type="text" size="small">编辑</el-button>
									<el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
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
	import Dfadd from './components/jfzc.vue'
	export default{
		data(){
			return{
				getdata:{
					flag: this.$store.state.userinfo.flag,
					user_id: this.$store.state.userinfo.id,
					year: "",
					month:"", 
					page:1,
					sign: 8,
					funds_class: 2,//1 经费下拨 2 经费支出
				},
				user_id:"",
				flag:"",
				p_id:this.$store.state.userinfo.p_id,
				type:'add',
				dialogVisible:false,//新增弹窗
				tableData:[],
				totalPage:0
			}
		},
		components:{tree,Page,Dfadd},
		methods:{
			// 关闭新增或编辑弹窗
			closeWin(){
				this.dialogVisible = false;
				this.dataList();
			},
			// 数据
			dataList(){
				var that = this;
				that.tableData = [];
				dwgl.funds(that.getdata).then(res => {
					that.tableData = res.data.pagedata;
					that.totalPage = res.data.count;
				})
			},
			// 分页查询
			changedata(current){
				var that = this;
				that.getdata.page = current;
				that.dataList();
			},
			// 树形结构筛选
			treeSelect(data){
				var that = this;
				that.getdata.user_id = data.id;
				that.getdata.flag = data.flag;
				that.getdata.page = 1;
				that.p_id = data.p_id;
				that.dataList();
			},
			// 删除
			del(data){
				var that = this;
				that.$confirm('确定删除该条数据吗?', '删除数据', {
					cancelButtonText: '取消',
					confirmButtonText: '确定',
				}).then(() => {
					dwgl.delFunds({
						id:data.id,
					}).then(res => {
						if(res.code == 200){
							Message({
								type: 'success',
								message: '删除成功!'
							})
						}else{
							Message({
								type: 'error',
								message: res.msg
							})
						}
						that.getdata.page = 1;
						that.dataList();
					})
				}).catch(() => {
				
				});
			},
			// 导出表格
			daochu(){
				var that = this;
				if(that.tableData.length != 0){
					dwgl.exportPartyOrgan(that.getdata);
				}else{
					Message({
						type:"warning",
						message:"暂无可导出的数据"
					})
				}
			}
		},
		mounted() {
			var that = this;
			that.$emit('selectTop',3)
			that.dataList();
		},
		created() {
			var that = this;
			that.$emit('selectTop',3)
		}
	}
</script>

<style lang="scss">
	.wrap{
		position: relative;
		height: 100%;
		width: 100%;
		.fengmian {
		    height: 86px;
		    width: 138px;
		    margin: 10px 16px 10px 14px;
		}
	}
</style>

