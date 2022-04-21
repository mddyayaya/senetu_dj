<template>
	<div class="wrap">
		<DelData ref="delDatas"></DelData>
		<AddTg ref="FormData" :addTzshow="addTzshow" :tztype="tztype" @closeWin="closeWin"></AddTg>
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
							<el-select
								style="margin-right: 10px;width: 120px !important;" 
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
								style="width: 120px !important;margin-right: 10px;" 
								v-model="getdata.time" placeholder="请选择月份"
								clearable
								@change="getdata.page = 1;totalPage = 0;dataList();">
								<el-option
									v-for="item in $monthList()"
									:label="item+'月'"
									:value="item">
								</el-option>
							</el-select>
							<el-select
								v-model="getdata.company" placeholder="请选择单位"
								clearable
								@change="getdata.page = 1;totalPage = 0;dataList();">
								<el-option
									v-for="item in companyList"
									:label="item.company"
									:value="item.company">
								</el-option>
							</el-select>
						</div>
						<div class="rightBar">
							<el-button v-if="$store.state.userinfo.flag == 3" @click="addTzshow=true;tztype='add'" type="primary">新增台账</el-button>
							<el-button type="primary" @click="daochu" v-else>导出台账</el-button>
						</div>
					</div>
					<div class="selectdata">
						<template>
							<el-table
								:header-cell-style="{background:'#f5f7fa',color:'#000'}"
								:data="tableData"
								border
								ref="refs"
								show-summary 
								:row-class-name="tableRowClassName"
								:summary-method="getSummaries">
								
								<el-table-column
									prop="company"
									label="单位">
								</el-table-column>
								<el-table-column
									prop="dw_count"
									label="党委">
								</el-table-column>
								<el-table-column
									prop="dwwy_count"
									label="党委委员">
								</el-table-column>
								<el-table-column
									prop="zb_count"
									label="支部">
								</el-table-column>
								<el-table-column
									prop="zbwy_count"
									label="支部委员">
								</el-table-column>
								<el-table-column
									prop="dxz_count"
									label="党小组">
								</el-table-column>
								<el-table-column
									prop="zsdy_count"
									label="正式党员">
								</el-table-column>
								<el-table-column
									prop="ybdy_count"
									label="预备党员">
								</el-table-column>
								<el-table-column
									prop="fzdx_count"
									label="发展对象">
								</el-table-column>
								<el-table-column
									prop="jjfz_count"
									label="积极分子">
								</el-table-column>
								<el-table-column
									prop="rdsq_count"
									label="提出入党申请">
								</el-table-column>
								<el-table-column
									prop="ljfz_count"
									label="累计发展党员">
								</el-table-column>
								<el-table-column
									prop="jnfz_count"
									label="当年发展党员">
								</el-table-column>
								<el-table-column
									label="年份"
									width="100">
									<template slot-scope="scope">
										<span>{{scope.row.year}}年</span>
									</template>
								</el-table-column>
								<el-table-column
									label="月份"
									width="100">
									<template slot-scope="scope">
										<span>{{scope.row.month}}月</span>
									</template>
								</el-table-column>
								<el-table-column
									label="操作"
									width="100"
									v-if="getdata.flag == 3"
									fixed="right">
									<template slot-scope="scope">
										<el-button @click="editData(scope.row)" type="text" size="small">编辑</el-button>
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
	import AddTg from './components/add_tgjf.vue'
	export default{
		data(){
			return{
				getdata:{
					user_id:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					year: "",
					time:"",
					sign:3,
					page: 1,
					company:"",
				},
				tztype:"add",
				addTzshow:false,
				sum:[],
				companyList:[],
				tableData:[],
				totalPage:0,
				selectClass:[],
				dialogVisible:false,//新增/编辑弹窗
				showlocal:false,
				type:'add'//编辑/新增
			}
		},
		components:{Page,DelData,AddTg},
		methods:{
			// 台账经费列表
			dataList(){
				var that = this;
				dwgl.standPartiesList(that.getdata).then(res => {
					if(res.data.pagedata!=null){
						that.tableData = res.data.pagedata;
						that.sum = res.sum[0];
						that.totalPage = res.data.count;
					}else{
						that.tableData = [];
					}
				})
			},
			// 渲染不可修改的表格样式
			tableRowClassName({row, rowIndex}) {
				var that = this;
				if(row.is_up!=0){
					return 'danger-row';
				}else{
					return ""
				}
			},
			// 关闭修改或新增
			closeWin(){
				var that = this;
				that.addTzshow = false;
				that.dataList();
			},
			// 单位列表
			standCompany(){
				var that = this;
				dwgl.standCompany({
					sign:that.getdata.sign
				}).then(res => {
					that.companyList = res.data
				})
			},
			getSummaries(param) {
				var that = this;
				const { columns, data } = param;
				const sums = [];
				columns.forEach((column, index) => {
					 switch(column.property) {
						case "company":
							sums[index] = '总计'
							break;
						case "dw_count":
							sums[index] = that.sum.dw_count
							break;
						case "dwwy_count":
							sums[index] = that.sum.dwwy_count
							break;
						case "zb_count":
							sums[index] = that.sum.zb_count
							break;
						case "zbwy_count":
							sums[index] = that.sum.zbwy_count
							break;
						case "dxz_count":
							sums[index] = that.sum.dxz_count
							break;
						case "zsdy_count":
							sums[index] = that.sum.zsdy_count
							break;
						case "ybdy_count":
							sums[index] = that.sum.ybdy_count
							break;
						case "fzdx_count":
							sums[index] = that.sum.fzdx_count
							break;
						case "jjfz_count":
							sums[index] = that.sum.jjfz_count
							break;
						case "rdsq_count":
							sums[index] = that.sum.rdsq_count
							break;
						case "ljfz_count":
							sums[index] = that.sum.ljfz_count
							break;
						case "jnfz_count":
							sums[index] = that.sum.jnfz_count
							break;
						default:
							break;
					  }
				});
				return sums;
			},
			// 编辑
			editData(data){
				var that = this;
				if(data.is_up == 0){
					// 可修改
					that.addTzshow = true;
					that.tztype = 'edit';
					that.$refs.FormData.bindData(data)
				}else{
					Message({
						message:"您已修改过一次，不能再做修改",
						type:'warning'
					})
				}
			},
			// 删除
			del(data){
				var that = this;
				that.$refs.delDatas.showToast(res => {
					if(res){
						dwgl.delStandParties({
							id:data.id,
							sign:that.getdata.sign
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
			// 导出台账
			daochu(){
				if(this.tableData.length == 0){
					Message({
						type: 'warning',
						message: '暂无可导出的数据!'
					})
				}else{
					dwgl.exportStandParites(this.getdata);
				}
			},
			// 分页筛选
			changedata(val) {
				var that = this;
				that.getdata.page = val;
				that.dataList();
			},
		},
		mounted() {
			var that = this;
			that.standCompany();
			// 修改合计行样式
			that.dataList();
		},
		created() {
			var that = this;
			that.$emit('selectTop',3)
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
		    width: 150px;
			object-fit: cover;
		}
	}
	.el-table .danger-row {
		background: #BB0000;
		color: #FFFFFF;
	}
</style>

