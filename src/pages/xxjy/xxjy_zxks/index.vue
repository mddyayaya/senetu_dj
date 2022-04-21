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
								placeholder="输入考试名称查询"
								@input="getdata.page = 1;totalPage = 0;dataList();">
							</el-input>
						</div>
						<div>
							<el-button type="primary"  @click="add">新建考试</el-button>
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
									label="考试名称" >
								</el-table-column>
								<el-table-column
									prop="dw"
									label="党组织"
									width="180">
								</el-table-column>
								<el-table-column
									prop="cy_zz"
									label="考试时间"
									width="200">
									<template slot-scope="scope">
										{{$changeTime(scope.row.s_time)+'至'+$changeTime(scope.row.e_time)}}
									</template>
								</el-table-column>
								<el-table-column
									label="操作"
									width="120">
									<template slot-scope="scope">
										<el-button @click="showDetail(scope.row)" type="text" size="small">详情</el-button>
										<el-button @click="$router.push({
																path:'/add_ks',
																query:{
																	type:'edit',
																	id:scope.row.id
																},
															})" type="text" size="small" v-if="scope.row.s_time>((new Date().getTime() / 1000) - 86400) && scope.row.s_time>(new Date().getTime() - 86400)">编辑</el-button>
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
				},
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
			//新增考试
			add(){
				var that = this;
				that.$router.push({
					path:'/add_ks',
					query:{
						type:'add'
					},
				})
			},
			// 数据
			dataList(){
				var that = this;
				xxjy.assessmentList(that.getdata).then(res => {
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
			// 详情
			showDetail(data){
				var that = this;
				that.$router.push({
					path:'/zxks_detail',
					query:{
						flag:data.flag,
						uid:that.getdata.id,
						cy_zz:data.cy_zz,
						id:data.id
					},
				})
			},
			// 删除
			del(data){
				var that = this;
				that.$refs.delDatas.showToast(res => {
					if(res){
						xxjy.delassessment({
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

