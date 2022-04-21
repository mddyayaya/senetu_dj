<template>
	<div class="wrap">
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>系统设置</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<tree @treeSelect="treeSelect"></tree>
			<div class="datatable">
				<div class="datas">
					<div class="selectbar">
						<el-input
							placeholder="输入组织名称搜索"
							prefix-icon="el-icon-search"
							style="width: 220px;"
							v-model="getdata.dw_name"
							@input="getdata.page = 1;totalPage = 0;dataList();">
						</el-input>
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
									prop="username"
									label="登陆账号">
								</el-table-column>
								<el-table-column
									prop="dw"
									label="党组织"
									width="160">
								</el-table-column>
								<el-table-column
									prop="head_name"
									label="负责人"
									width="160">
								</el-table-column>
								<el-table-column
									prop="uptime"
									label="登陆时间"
									width="150">
									<template slot-scope="scope">
										{{$changeTime(scope.row.uptime)}}
									</template>
								</el-table-column>
								<el-table-column
									prop="ip"
									label="登陆IP"
									width="150">
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
	import { xtsz } from '@/axios'
	import Page from '@/components/page.vue'
	import { Message } from 'element-ui'
	export default{
		data(){
			return{
				getdata:{
					user_id:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					status: "",
					dw_name: "",
					auth: "",
					page: 1,
				},
				tableData:[],
				totalPage:0
			}
		},
		components:{tree,Page},
		methods:{
			// 数据
			dataList(){
				var that = this;
				that.tableData = [];
				xtsz.loginLog(that.getdata).then(res => {
					that.tableData = res.data.pagedata;
					that.totalPage = res.data.count;
				})
			},
			// 树形结构筛选
			treeSelect(data){
				var that = this;
				that.getdata.user_id = data.id;
				that.getdata.flag = data.flag;
				that.getdata.page = 1;
				that.dataList();
			},
			// 分页筛选
			changedata(curret){
				var that = this;
				that.getdata.page = curret;
				that.dataList();
			},
		},
		mounted() {
			var that = this;
			that.dataList();
		},
		created() {
			var that = this;
			that.$emit('selectTop',7)
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
</style>

