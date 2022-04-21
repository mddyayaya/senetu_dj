<template>
	<div class="wrap">
		<DelData ref="delDatas"></DelData>
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>党员管理</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<tree @treeSelect="treeSelect"></tree>
			<div class="datatable">
				<div class="datas">
					<div class="selectbar">
						<div>
							<el-input v-model="getdata.name" @input="getdata.page = 1;totalPage = 0;dataList();" style="margin-right: 10px;width: 220px !important;"  placeholder="输入搜索"></el-input>
							<el-select
							 	style="margin-right: 10px;width: 120px !important;" 
								v-model="getdata.status" placeholder="发展阶段"
								clearable
								@change="getdata.page = 1;totalPage = 0;dataList();">
								<el-option
									v-for="item in $developer()"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
							<el-select
							 	style="margin-right: 10px;width: 120px !important;" 
								v-model="getdata.sex" placeholder="性别"
								clearable
								@change="getdata.page = 1;totalPage = 0;dataList();">
								<el-option
									label="男"
									value="男">
								</el-option>
								<el-option
									label="女"
									value="女">
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
									width="100"
									label="姓名" >
								</el-table-column>
								<el-table-column
									prop="sex"
									label="性别"
									width="80">
								</el-table-column>
								<el-table-column
									prop="cy_zz"
									label="所属组织">
								</el-table-column>
								<el-table-column
									prop=""
									label="申请入党时间">
									<template slot-scope="scope">
										{{$changeTime(scope.row.applytime)}}
									</template>
								</el-table-column>
								<el-table-column
									prop="zhiwu_name"
									label="发展阶段">
								</el-table-column>
								<el-table-column
									prop="u_phone"
									label="联系电话">
								</el-table-column>
								<el-table-column
									label="操作"
									width="114">
								<template slot-scope="scope">
									<el-button @click="detail(scope.row)" type="text" size="small">详情</el-button>
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
	import { dygl,dwgl } from '@/axios'
	import Page from '@/components/page.vue'
	import { Message } from 'element-ui'
	import DelData from '@/components/delToast.vue'
	export default{
		data(){
			return{
				getdata:{
					id: this.$store.state.userinfo.id,
					flag: this.$store.state.userinfo.flag,
					zhiwu:"",
					name: "",
					status:"",
					sign: 5,
					sex: "",
					page: 1,
				},
				type:1,//1：新增 2：批量新增
				tableData:[],
				totalPage:0,
				zhiwulist:dygl.dyclass()//身份筛选列表
			}
		},
		components:{tree,Page,DelData},
		methods:{
			// 关闭新增或编辑弹窗
			closeWin(){
				this.dialogVisible = false;
			},
			// 数据
			dataList(){
				var that = this;
				dygl.userDevelop(that.getdata).then(res => {
					if(res.data.pagedata){
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
					path:'/fzdy_detail',
					query:{
						uid:data.id,
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
						dygl.delMember({
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
			that.$emit('selectTop',4);
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

