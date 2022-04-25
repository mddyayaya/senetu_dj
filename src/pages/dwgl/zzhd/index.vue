<template>
	<div class="wrap">
		<DelData ref="delDatas"></DelData>
		<Qingjia ref="qingjia" @dataList="dataList"></Qingjia>
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>党务管理</el-breadcrumb-item>
				<el-breadcrumb-item>组织活动管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<tree @treeSelect="treeSelect"></tree>
			<div class="datatable">
				<div class="datas">
					<div class="switchBar">
						<span :class="{selectSwitch:getdata.status == 1}" @click="getdata.status = 1;dataList();page=1">未开始</span>
						<span :class="{selectSwitch:getdata.status == 2}" @click="getdata.status = 2;dataList();page=1">已完成</span>
					</div>
					<div class="selectbar">
						<div>
							<el-select
								style="margin-right: 10px;" 
								v-model="getdata.type" placeholder="活动类型"
								@change="getdata.page = 1;totalPage = 0;dataList();"
								clearable>
								<el-option
									v-for="item in typeList"
									:label="item.type"
									:value="item.id">
								</el-option>
							</el-select>
							<el-select
								style="margin-right: 10px;" 
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
								@change="getdata.page = 1;totalPage = 0;dataList();"
								clearable>
								<el-option
									v-for="item in $monthList()"
									:label="item+'月'"
									:value="item">
								</el-option>
							</el-select>
						</div>
						<div>
							<el-button type="primary" @click="goAdd">新增</el-button>
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
									prop=""
									label="活动主题">
									<template slot-scope="scope">
										<span style="display: inline-block;height: 25px;line-height: 35px;overflow: hidden;">{{scope.row.hy_title}}</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="type"
									label="活动类型"
									width="160">
								</el-table-column>
								<el-table-column
									prop="h_stime"
									label="时间"
									width="110">
									<template slot-scope="scope">
										{{$changeTime(scope.row.h_stime)}}
									</template>
								</el-table-column>
								<el-table-column
									prop="dw"
									label="党组织"
									width="160">
								</el-table-column>
								<el-table-column
									label="操作"
									fixed="right"
									width="160">
									<template slot-scope="scope">
										<el-button 
										v-if="$store.state.userinfo.flag==3"
										@click="levea(scope.row)" type="text" size="small">请假</el-button>
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
	import { dwgl } from '@/axios'
	import Page from '@/components/page.vue'
	import DelData from '@/components/delToast.vue'
	import { Message } from 'element-ui'
	import Qingjia from './ask_levea.vue'
	export default{
		data(){
			return{
				getdata:{
					id:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					year: "",
					month: "",
					type: "",
					page: 1,
					status:1,
					dw:this.$store.state.userinfo.dw,
				},
				tableData:[],
				// 活动类型列表
				typeList:[],
				totalPage:0
			}
		},
		components:{tree,Page,DelData,Qingjia},
		methods:{
			// 数据
			dataList(){
				var that = this;
				that.tableData = [];
				dwgl.activity(that.getdata).then(res => {
					if(res.data.pagedata.length > 0){
						that.tableData = res.data.pagedata;
					}
					that.totalPage = res.data.count;
				})
			},
			// 详情
			showDetail(data){
				var that = this;
				that.$router.push({
					path:"/zzhd_detaill",
					query:{
						hy_flag:data.hy_flag,
						hyid:data.hyid,
						flag:that.getdata.flag,
						dw:that.getdata.dw,
						uid:that.getdata.id,
					}
				})
			},
			// 编辑
			edit(data){
				var that = this;
				that.$router.push({
					path:"/zzhd_add",
					query:{
						hyid:data.hyid,
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
			levea(data){
				// 请假
				this.$refs.qingjia.open(data)
			},
			// 新增活动
			goAdd(){
				var that = this;
				that.$router.push({
					path:'/zzhd_add',
					query:{
						uid:that.getdata.id,
						type:'add',
						flag:that.getdata.flag,
						dw:that.getdata.dw,
					},
				})
			},
			// 删除
			del(data){
				var that = this;
				that.$refs.delDatas.showToast(res => {
					if(res){
						dwgl.delActivity({
							id:data.hyid,
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
			// 树形结构筛选
			treeSelect(data){
				var that = this;
				that.getdata.id = data.id;
				that.getdata.flag = data.flag;
				that.getdata.dw = data.dw;
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
			that.$emit('selectTop',3)
			// 活动类型分类筛选列表
			dwgl.hyClass().then(res => {
				that.typeList = res;
			})
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
		.switchBar{
			width: 100%;
			height: 40px;
			line-height: 40px;
			margin-bottom: 20px;
			border-bottom: 1px solid #DDDDDD;
			span{
				cursor: pointer;
				display: inline-block;
				line-height: 40px;
				font-size: 16px;
				margin-right: 20px;
				padding: 0 20px;
				font-weight: bold;
			}
			span:hover{
				color: #BB0000;
				border-bottom: 2px solid #bb0000;
			}
			.selectSwitch{
				color: #BB0000;
				border-bottom: 2px solid #bb0000;
			}
		}
	}
</style>

