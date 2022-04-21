<template>
	<div class="wrap">
		<DelData ref="delDatas"></DelData>
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>学习教育</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<tree @treeSelect="treeSelect"></tree>
			<div class="datatable">
				<div class="datas">
					<div class="selectbar">
						<div>
							<el-input 
								style="width: 220px;"
								v-model="getdata.title" 
								placeholder="输入标题查询"
								@input="getdata.page = 1;totalPage = 0;dataList();"></el-input>
							<el-select
								style="margin-left: 10px;" 
								v-model="getdata.year" placeholder="请选择年份"
								@change="getdata.page = 1;totalPage = 0;dataList();"
								clearable>
								<el-option
									v-for="item in $yearList()"
									:label="item"
									:value="item">
								</el-option>
							</el-select>
						</div>
						<div>
							<el-button type="primary" @click="goadd">新建任务</el-button>
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
									prop="title"
									label="主题" >
								</el-table-column>
								<el-table-column
									prop="dw"
									label="所属组织">
								</el-table-column>
								<el-table-column
									prop="k_time"
									label="时间"
									width="180">
								</el-table-column>
								<el-table-column
									label="操作"
									width="120">
								<template slot-scope="scope">
										<el-button @click="showDetail(scope.row)" type="text" size="small">详情</el-button>
										<el-button @click="edit(scope.row)"
										 v-if="$store.state.userinfo.id==scope.row.pub_id||$store.state.userinfo.flag==1"
										 type="text" size="small">编辑</el-button>
										<el-button @click="del(scope.row)"
										v-if="$store.state.userinfo.id==scope.row.pub_id||$store.state.userinfo.flag==1"
										type="text" size="small">删除</el-button>
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
	import { xxjy,dwgl } from '@/axios'
	import Page from '@/components/page.vue'
	import { Message } from 'element-ui'
	import DelData from '@/components/delToast.vue'
	export default{
		data(){
			return{
				getdata:{
					id: this.$store.state.userinfo.id,
					year: "",
					flag:this.$store.state.userinfo.flag,
					title:"",
					page: 1,
				},
				dw:this.$store.state.userinfo.dw,
				tableData:[],
				totalPage:0,
				studyNum:0,
				studyTime:0
			}
		},
		components:{tree,Page,DelData},
		methods:{
			// 关闭新增或编辑弹窗
			closeWin(){
				this.dialogVisible = false;
			},
			// 新增
			goadd(){
				var that = this;
				that.$router.push({
					path:'/grxx_add',
					query:{
						uid:that.getdata.id,
						type:'add',
						flag:that.getdata.flag,
						dw:that.dw,
					},
				})
			},
			// 数据
			dataList(){
				var that = this;
				xxjy.taskPersonStudy(that.getdata).then(res => {
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
				that.dw = data.dw;
				that.getdata.page = 1;
				that.dataList();
			},
			// 详情
			showDetail(data){
				var that = this;
				that.$router.push({
					path:"/grxx_detaill",
					query:{
						hy_flag:data.hy_flag,
						hyid:data.id,
						dw:that.dw,
						uid:that.getdata.id,
					}
				})
			},
			
			// 编辑
			edit(data){
				var that = this;
				that.$router.push({
					path:"/grxx_add",
					query:{
						hyid:data.id,
						hy_flag:data.hy_flag,
						flag:that.getdata.flag,
						type:'edit',
						dw:data.dw,
						uid:that.getdata.id,
						pub_id:data.pub_id,
						pub_flag:data.pub_flag
					}
				})
			},
			// 删除
			del(data){
				var that = this;
				that.$refs.delDatas.showToast(res => {
					if(res){
						dwgl.delActivity({
							id:data.id,
							flag:data.hy_flag
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
					}
				})
			},
			// 导出表格
			daochu(){
				var that = this;
				dwgl.exportPartyOrgan(that.getdata);
			}
		},
		mounted() {
			var that = this;
			that.$emit('selectTop',5)
			that.dataList();
		},
		created() {
			var that = this;
			that.$emit('selectTop',5)
		}
	}
</script>

<style lang="scss">
	.wrap{
		position: relative;
		height: 100%;
		width: 100%;
		.xxjl{
			margin-bottom: 15px;
			display: flex;
			font-size: 16px;
			justify-content: space-between;
			div:nth-child(1){
				display: flex;
				align-items: center;
				font-weight: bold;
				img{
					width: 20px;
					margin-left: 10px;
				}
			}
			div:nth-child(2){
				>span{
					margin-left: 30px;
				}
			}
		}
	}
</style>

