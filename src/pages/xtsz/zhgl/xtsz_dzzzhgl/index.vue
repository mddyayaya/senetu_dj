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
								placeholder="输入负责人名称搜索"
								prefix-icon="el-icon-search"
								style="width: 220px;"
								v-model="getdata.head_name"
								@input="getdata.page = 1;totalPage = 0;dataList();">
							</el-input>
							<el-select
								style="width: 150px;margin-left: 20px;"
								v-model="getdata.auth"
								clearable
								placeholder="请选择权限"
								@change="getdata.page = 1;totalPage = 0;dataList();">
								<el-option
									value="2"
									label="总支">
								</el-option>
								<el-option
									value="3"
									label="支部">
								</el-option>
							</el-select>
						</div>
						<div>
							<div class="add" v-if="$store.state.userinfo.flag==1">
								<el-button type="primary" @click="tongbu">同步过期时间</el-button>
							</div>
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
									prop="username"
									label="登陆账号">
								</el-table-column>
								<el-table-column
									prop="dw"
									label="党组织">
								</el-table-column>
								<el-table-column
									prop="head_name"
									label="负责人"
									width="100">
								</el-table-column>
								<el-table-column
									prop="flag"
									label="权限"
									width="80">
									<template slot-scope="scope">
										<span v-if="scope.row.flag == 2">党总支</span>
										<span v-if="scope.row.flag == 3">党支部</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="status"
									label="状态"
									width="80">
									<template slot-scope="scope">
										<span v-if="scope.row.status == 1">正常</span>
										<span v-if="scope.row.status == 2">已禁用</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="uptime"
									label="操作"
									width="150">
									<template slot-scope="scope">
										<el-button type="text" v-show="scope.row.id!=$store.state.userinfo.id" @click="forbid(scope.row)">{{scope.row.status==1?'禁用':'启用'}}</el-button>
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
					user_id:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					status: "",
					dw_name: "",
					auth:"",
					head_name: "",
					page:1
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
				dwgl.partyOrgan(that.getdata).then(res => {
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
			// 禁止账号
			forbid(data){
				var that = this;
				xtsz.startDisable({
					status: data.status == 1?data.status = 2:1,
					flag: data.flag,
					id:data.id
				}).then(res => {
					that.dataList();
				})
			},
			// 重置账号
			reset(data){
				var that = this;
				xtsz.rePwd({
					flag: data.flag,
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
			},
			// 同步过期时间
			tongbu(){
				var that = this;
				xtsz.synchroTime({
					user_id:that.getdata.user_id
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

