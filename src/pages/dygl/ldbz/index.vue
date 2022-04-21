<template>
	<div class="wrap">
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>党员管理</el-breadcrumb-item>
				<el-breadcrumb-item>领导班子</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<tree @treeSelect="treeSelect"></tree>
			<div class="datatable">
				<div class="datas">
					<div class="selectbar">
						<div>
							<el-select
								clearable
							 	style="margin-right: 10px;width: 120px !important;" 
								v-model="getdata.zhiwu" placeholder="请选择身份"
								@change="getdata.page = 1;totalPage = 0;dataList();">
								<el-option
									v-for="item in zhiwulist"
									:label="item.level"
									:value="item.zhiwu">
								</el-option>
							</el-select>
						</div>
						<div>
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
									width="170"
									label="姓名" >
								</el-table-column>
								<el-table-column
									prop="zz"
									label="党内职务"
									width="100">
									<template slot-scope="scope">
										<span v-if="scope.row.u_zhiwu == 1">书记</span>
										<span v-if="scope.row.u_zhiwu == 2">副书记</span>
										<span v-if="scope.row.u_zhiwu == 3">委员</span>
										<span v-if="scope.row.u_zhiwu == null || scope.row.u_zhiwu == ''">暂无数据</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="cy_zz"
									label="所属组织">
								</el-table-column>
								<el-table-column
									prop="u_phone"
									label="联系方式"
									width="150">
								</el-table-column>
								<el-table-column
									label="操作"
									width="114">
								<template slot-scope="scope">
									<el-button @click="detail(scope.row)" type="text" size="small">详情</el-button>
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
	import { dygl,dwgl } from '@/axios'
	import Page from '@/components/page.vue'
	import { Message } from 'element-ui'
	export default{
		data(){
			return{
				getdata:{
					id: this.$store.state.userinfo.id,
					flag: this.$store.state.userinfo.flag,
					zhiwu:""
				},
				type:1,//1：新增 2：批量新增
				tableData:[],
				totalPage:0,
				zhiwulist:dygl.dyclass()//身份筛选列表
			}
		},
		components:{tree,Page},
		methods:{
			// 关闭新增或编辑弹窗
			closeWin(){
				this.dialogVisible = false;
			},
			// 数据
			dataList(){
				var that = this;
				dygl.leaderList(that.getdata).then(res => {
					if(res.data.pagedata.length>0){
						that.tableData = res.data.pagedata;
						that.totalPage = res.data.count;
					}else{
						that.tableData = [];
						that.totalPage = 0;
					}
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
			detail(data){
				var that = this;
				that.$router.push({
					path:'/dyxx_detail',
					query:{
						id:data.id
					}
				})
			},
			// 导出表格
			daochu(){
				var that = this;
				if(that.tableData.length == 0){
					Message({
						type:"warning",
						message:"暂无可导出的数据"
					})
				}else{
					dwgl.exportPartyOrgan(that.getdata);
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
		.fengmian {
		    height: 86px;
		    width: 138px;
		    margin: 10px 16px 10px 14px;
		}
	}
</style>

