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
						<div>
							<el-input
								placeholder="输入党员姓名搜索"
								prefix-icon="el-icon-search"
								style="width: 220px;margin-right: 20px;"
								v-model="getdata.name"
								@input="getdata.page = 1;totalPage = 0;dataList();">
							</el-input>
							<el-select v-model="getdata.u_zhiwu" clearable filterable placeholder="请选择职务"
							@change="getdata.page = 1;totalPage = 0;dataList();">
								<el-option
									label="书记"
									value="1">
								</el-option>
								<el-option
									label="副书记"
									value="2">
								</el-option>
								<el-option
									label="委员"
									value="3">
								</el-option>
								<el-option
									label="党员"
									value="4">
								</el-option>
								<el-option
									label="发展党员"
									value="5">
								</el-option>
							</el-select>
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
									prop="u_phone"
									label="登陆账号">
								</el-table-column>
								<el-table-column
									prop="u_name"
									label="姓名"
									width="90">
								</el-table-column>
								<el-table-column
									prop="cy_zz"
									label="所属组织">
								</el-table-column>
								<el-table-column
									prop="u_zhiwu"
									label="职务"
									width="100">
									<template slot-scope="scope">
										<span>{{$changeZhiwu(scope.row.u_zhiwu)}}</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="normal"
									label="状态"
									width="80">
									<template slot-scope="scope">
										<span v-if="scope.row.normal == 1">正常</span>
										<span v-if="scope.row.normal == 2">已禁用</span>
										<span v-if="scope.row.normal == null">非正常</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="uptime"
									label="操作"
									width="150">
									<template slot-scope="scope">
										<el-button type="text" @click="forbid(scope.row)">{{scope.row.normal==1?'禁用':'启用'}}</el-button>
										<el-button type="text" @click="reset(scope.row)">重置密码</el-button>
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
	import { dwgl,xtsz } from '@/axios'
	import Page from '@/components/page.vue'
	import { Message } from 'element-ui'
	export default{
		data(){
			return{
				getdata:{
					id:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					status: "",
					name: "",
					u_zhiwu:"",
					sex: "",
					page:1,
					sign:2
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
				dwgl.memberAdmin(that.getdata).then(res => {
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
			// 分页筛选
			changedata(curret){
				var that = this;
				that.getdata.page = curret;
				that.dataList();
			},
			// 禁止账号
			forbid(data){
				var that = this;
				xtsz.updateMemberStatu({
					normal: data.normal == 1?data.normal = 2:1,
					id:data.id
				}).then(res => {
					that.dataList();
				})
			},
			// 重置账号
			reset(data){
				var that = this;
				xtsz.resetUserPwd({
					id:data.id
				}).then(res => {
					if(res.code == 200){
						Message({
							type:"success",
							message:res.msg
						})
						that.dataList();
					}else{
						Message({
							type:"error",
							message:res.msg
						})
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

