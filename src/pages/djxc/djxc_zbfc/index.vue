<template>
	<div class="wrap">
		<DelData ref="delData"></DelData>
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>党建宣传</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<tree @treeSelect="treeSelect"></tree>
			<div class="datatable">
				<div class="datas">
					<div class="selectbar">
						<el-input
							placeholder="请输入内容"
							prefix-icon="el-icon-search"
							v-model="getdata.title"
							style="width: 220px;"
							@input="getdata.page = 1;totalPage = 0;dataList();">
						</el-input>
						<el-button type="primary" @click="addZbfc">新增</el-button>
					</div>
					<div class="selectdata">
						<template>
							<el-table
								:data="tableData"
								:header-cell-style="{background:'#f5f7fa',color:'#000'}"
								stripe
								border
								style="width: 100%">
								<el-table-column label="封面" width="135">
									<template slot-scope="scope">
										<img class="fengmian" v-if="scope.row.img.search('http') == -1" :src="'http://'+scope.row.ym+'./'+scope.row.img" >
										<img class="fengmian" v-else :src="scope.row.img" >
									</template>
								</el-table-column>
								<el-table-column
									prop="title"
									label="标题">
								</el-table-column>
								<el-table-column
									prop="u_name"
									label="所属党支部">
								</el-table-column>
								<el-table-column
									label="操作"
									width="130">
									<template slot-scope="scope">
										<el-button @click="showDetail(scope.row)" type="text" size="small">详情</el-button>
										<el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
										<el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
						</template>
						<Page :totalPage="totalPage" :pageSize="6" @changedata="changedata"></Page>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import tree from '@/components/tree.vue'
	import { djxc } from '@/axios'
	import Page from '@/components/page.vue'
	import { Message } from 'element-ui'
	import DelData from '@/components/delToast.vue'
	export default{
		data(){
			return{
				getdata:{
					id:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					page:1,
					title:""
				},
				tableData:[],
				totalPage:0
			}
		},
		components:{tree,Page,DelData},
		methods:{
			// 数据
			dataList(){
				var that = this;
				djxc.zbfc(that.getdata).then(res => {
					that.tableData = res.data.pagedata;
					that.totalPage = res.data.count;
				})
			},
			// 树形结构筛选
			treeSelect(data){
				var that = this;
				that.getdata.id = data.id;
				that.getdata.flag = data.flag;
				that.getdata.page = 1;
				that.dataList();
			},
			// 新增
			addZbfc(){
				var that = this;
				that.$router.push({
					path:'/zbfc_add',
					query:{
						flag:that.getdata.flag,
						id:that.getdata.id,
						type:'add'
					}
				})
			},
			// 编辑
			edit(data){
				var that = this;
				that.$router.push({
					path:"/zbfc_add",
					query:{
						id:data.id,
						flag:data.flag,
						type:'edit'
					}
				})
			},
			// 详情
			showDetail(data){
				var that = this;
				that.$router.push({
					path:"/zbfc_detail",
					query:{
						flag:data.flag,
						id:data.id
					}
				})
			},
			// 分页筛选
			changedata(current){
				var that = this;
				that.getdata.page = current;
				that.dataList();
			},
			// 删除
			del(data){
				var that = this;
				that.$refs.delData.showToast(res => {
					if(res){
						djxc.zbfcDel({
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
					}else{
						
					}
				})
			}
		},
		mounted() {
			var that = this;
			that.dataList();
		},
		created() {
			var that = this;
			that.$emit('selectTop',2)
		}
	}
</script>

<style lang="scss">
	.wrap{
		position: relative;
		height: 100%;
		width: 100%;
		.fengmian {
		    height: 60px;
		    width: 110px;
			object-fit: cover;
		}
	}
</style>

