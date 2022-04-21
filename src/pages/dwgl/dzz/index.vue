<template>
	<div class="wrap">
		<DelData ref="delDatas"></DelData>
		<Add ref="FormData" @closeEdit="closeEdit" :dialogVisible="dialogVisible" :type="type"></Add>
		<AddPro ref="Addlocal" :showlocal="showlocal" @closeLocal="closeLocal"></AddPro>
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>党务管理</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<div class="selectbar">
						<div class="leftBar">
							<el-input
								placeholder="请输入组织名称"
								prefix-icon="el-icon-search"
								style="width: 220px;"
								v-model="getdata.dw_name"
								@input="getdata.page = 1;totalPage = 0;dataList();">
							</el-input>
							<el-select 
								style="margin-left: 20px;" 
								v-model="getdata.organ_class" 
								placeholder="请选择"
								clearable
								@change="getdata.page = 1;totalPage = 0;dataList();">
								<el-option
									v-for="item in selectClass"
									:key="item.value"
									:label="item.option"
									:value="item.value">
								</el-option>
							</el-select>
						</div>
						<div class="rightBar">
							<el-button type="primary" 
							v-if="$store.state.userinfo.id==332||$store.state.userinfo.p_id==332" 
							@click="showlocal = true;$refs.Addlocal.bindata();$refs.Addlocal.provinceList()">新增所在地</el-button>
							<el-button type="primary" @click="dialogVisible = true;type = 'add';$refs.FormData.pOran()">新增</el-button>
							<el-button type="primary" @click="daochu">导出通讯录</el-button>
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
									prop="dw"
									label="组织名称">
								</el-table-column>
								<el-table-column
									prop="organ_class_name"
									label="组织类型">
									<template slot-scope="scope">
										<span v-if="scope.row.organ_class_name">{{scope.row.organ_class_name}}</span>
										<el-button disabled type="primary" plain size="small" v-else>未选择组织类型</el-button>
									</template>
								</el-table-column>
								<el-table-column
									prop="p_name"
									label="上级党组织">
								</el-table-column>
								<el-table-column
									prop="head_name"
									label="负责人"
									width="80">
								</el-table-column>
								<el-table-column
									prop="head_phone"
									label="联系电话"
									width="130">
								</el-table-column>
								<el-table-column
									label="操作"
									fixed="right"
									width="120">
									<template slot-scope="scope">
										<el-button @click="$router.push({path:'/dzz_detail',
										query:{id:scope.row.id,flag:scope.row.flag,pid:scope.row.p_id}})" type="text" size="small">详情</el-button>
										<el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
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
	import { djxc,dwgl } from '@/axios'
	import Page from '@/components/page.vue'
	import DelData from '@/components/delToast.vue'
	import { Message } from 'element-ui'
	import Add from './components/add_zz.vue'
	import AddPro from './components/add_local.vue'
	export default{
		data(){
			return{
				getdata:{
					user_id:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					dw_name:"",
					organ_class:"",
					sign:1,
					page:1
				},
				tableData:[],
				totalPage:0,
				selectClass:[],
				dialogVisible:false,//新增/编辑弹窗
				showlocal:false,
				type:'add'//编辑/新增
			}
		},
		components:{Page,DelData,Add,AddPro},
		methods:{
			// 支部列表
			dataList(){
				var that = this;
				dwgl.partyOrgan(that.getdata).then(res => {
					if(res.data.pagedata!=null){
						that.tableData = res.data.pagedata;
						that.totalPage = res.data.count;
					}else{
						that.tableData = [];
					}
				})
			},
			// 关闭所在地新增窗口
			closeLocal(){
				var that = this;
				that.showlocal = false;
				that.dataList();
			},
			// 编辑
			edit(data){
				var that = this;
				that.dialogVisible = true;
				that.type = 'edit';
				that.$refs.FormData.bindData(data)
				that.$refs.FormData.pOran();
				that.$refs.Addlocal.provinceList()
			},
			// 关闭弹窗
			closeEdit(){
				var that = this;
				that.dialogVisible = false;
				that.dataList();
			},
			// 删除
			del(data){
				var that = this;
				that.$refs.delDatas.showToast(res => {
					if(res){
						dwgl.delOrgan({
							id:data.id,
							flag:data.flag,
							p_id: data.p_id,
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
			// 树形结构筛选
			treeSelect(data){
				var that = this;
				that.getdata.id = data.id;
				that.getdata.flag = data.flag;
				that.getdata.page = 1;
				that.dataList();
			},
			// 分页筛选
			changedata(val) {
				var that = this;
				that.getdata.page = val;
				that.dataList();
			},
			// 导出
			daochu(){
				var that = this;
				dwgl.exportPartyOrgan({
					user_id: that.getdata.user_id,
					flag: that.getdata.flag,
					organ_class:  that.getdata.organ_class,
					sign: 1
				})
			}
		},
		mounted() {
			var that = this;
			that.dataList();
			dwgl.organClass().then(res => {
				that.selectClass = res
			});
		},
		created() {
			var that = this;
			that.$emit('selectTop',3)
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

