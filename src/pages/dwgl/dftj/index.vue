<template>
	<div class="wrap">
		<Dfadd ref="addDf" :type="type" :name="name" :flag="getdata.flag" :id="getdata.id" @closeWin="closeWin" :dialogVisible="dialogVisible"></Dfadd>
		<Addmore 
			:moreAddwin="moreAddwin" 
			downloadName="党员信息表" 
			title="批量新增党费" 
			@downExcel="downExcel" 
			@closeMorewin="closeMorewin"
			@pushData="pushData"></Addmore>
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>党务管理</el-breadcrumb-item>
				<el-breadcrumb-item>党费统计</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<tree @treeSelect="treeSelect"></tree>
			<div class="datatable">
				<div class="datas">
					<div class="selectbar">
						<div>
							<el-input
							 	style="margin-right: 10px;width: 200px;"
								placeholder="请输入内容"
								prefix-icon="el-icon-search"
								v-model="getdata.name"
								@input="getdata.page = 1;totalPage = 0;dataList();">
							</el-input>
							<el-select
							 	style="margin-right: 10px;width: 120px !important;" 
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
							 	style="width: 120px !important;" 
								v-model="getdata.month" placeholder="请选择月份"
								clearable
								@change="getdata.page = 1;totalPage = 0;dataList();">
								<el-option
									v-for="item in $monthList()"
									:label="item+'月'"
									:value="item">
								</el-option>
							</el-select>
						</div>
						<div>
							<el-button type="primary" v-if='getdata.flag == 3' @click="dialogVisible=true;type='add';name='single'">新增</el-button>
							<el-button type="primary" v-if='getdata.flag == 3' @click="moreAddwin=true;">批量新增</el-button>
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
									prop="name"
									width="170"
									label="姓名" >
								</el-table-column>
								<el-table-column
									prop="dw"
									label="所属党组织">
								</el-table-column>
								<el-table-column
									prop="jtime"
									label="时间"
									width="150">
								</el-table-column>
								<el-table-column
									prop=""
									label="缴纳金额"
									width="114">
									<template slot-scope="scope">
										<span>{{scope.row.edu}}&nbsp;¥</span>
									</template>
								</el-table-column>
								<el-table-column
									label="操作"
									width="114">
								<template slot-scope="scope">
									<el-button @click="editData(scope.row)" type="text" size="small">编辑</el-button>
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
	import Dfadd from './components/dftj.vue'
	import Addmore from '@/components/moreadd.vue'
	export default{
		data(){
			return{
				getdata:{
					id: this.$store.state.userinfo.id,
					flag: this.$store.state.userinfo.flag,
					name: "",
					year: "",
					sign: 6,
					month: "",
					page: 1
				},
				moreAddwin:false,
				type:'add',
				name : 'single',
				dialogVisible:false,//新增弹窗
				tableData:[],
				totalPage:0
			}
		},
		components:{tree,Page,Dfadd,Addmore},
		methods:{
			// 关闭新增或编辑弹窗
			closeWin(){
				this.dialogVisible = false;
				this.dataList();
			},
			// 关闭批量新增弹窗
			closeMorewin(){
				this.moreAddwin = false;
				this.dataList();
			},
			// 下载批量表格
			downExcel(){
				var that = this;
				dwgl.exportPartyOrgan({
					user_id:that.getdata.id,
					flag:that.getdata.flag,
					sign:10
				})
			},
			// 批量上传数据提交
			pushData(value){
				var that = this;
				dwgl.excelPutData({
					uid:that.getdata.id,
					sign:2,
					url:value.src
				}).then(res => {
					if(res == 200){
						that.closeMorewin();
					}
				})
			},
			// 数据
			dataList(){
				var that = this;
				dwgl.dftj(that.getdata).then(res => {
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
				that.getdata.id = data.id;
				that.getdata.flag = data.flag;
				that.getdata.page = 1;
				that.dataList();
			},
			// 编辑
			editData(data){
				var that = this;
				that.type = 'edit';
				that.dialogVisible = true;
				that.name = 'single';
				that.$refs.addDf.bindData(data)
			},
			// 删除
			del(data){
				var that = this;
				that.$confirm('确定删除该条数据吗?', '删除数据', {
					cancelButtonText: '取消',
					confirmButtonText: '确定',
				}).then(() => {
					dwgl.dftjDel({
						id:data.id
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

