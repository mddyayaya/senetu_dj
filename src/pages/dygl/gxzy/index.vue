<template>
	<div class="wrap">
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>党员管理</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<div class="switchBar">
						<span :class="{selectSwitch:transferType == 1}" @click="transferType=1;dataList()">党员转出</span>
						<span :class="{selectSwitch:transferType == 2}" @click="transferType=2;dataList()">党员接收</span>
					</div>
					<div class="selectbar">
						<div>
							<el-select
							 	style="margin-right: 10px;width: 120px !important;" 
								v-model="getdata.transfer" :placeholder="transferType==1?'转出状态':'转入状态'"
								clearable
								@change="dataList();">
								<el-option
									label="待接收"
									value="1">
								</el-option>
								<el-option
									v-if="transferType==2"
									label="已转入"
									value="2">
								</el-option>
								<el-option
									v-if="transferType==1"
									label="已转出"
									value="2">
								</el-option>
								<el-option
									label="未通过"
									value="3">
								</el-option>
							</el-select>
						</div>
						<div>
							<el-button type="primary" @click="$router.push('/gxzy_add')" v-if="$store.state.userinfo.flag!=2">党员转出</el-button>
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
									width="170"
									label="姓名" >
								</el-table-column>
								<el-table-column 
									prop="out_name"
									label="转出组织" >
								</el-table-column>
								<el-table-column 
									prop="into_name"
									label="转入组织" >
								</el-table-column>
								<el-table-column 
									prop=""
									label="申请时间" >
									<template slot-scope="scope">
										<span>{{$changeTime(scope.row.addtime)}}</span>
									</template>
								</el-table-column>
								<el-table-column 
									prop=""
									label="转出状态">
									<template slot-scope="scope">
										<span style="color:#FFD700" v-if="scope.row.transfer == 1">待接收</span>
										<span style="color:#1266E3" v-if="scope.row.transfer == 2 && transferType == 1">已转出</span>
										<span style="color:#1266E3" v-if="scope.row.transfer == 2 && transferType == 2">已转入</span>
										<span style="color:#E40000" v-if="scope.row.transfer == 3">未通过审批</span>
									</template>
								</el-table-column>
								<el-table-column
									label="操作"
									width="114">
									<template slot-scope="scope">
										<el-button @click="detail(scope.row)" type="text" size="small">详情</el-button>
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
	export default{
		data(){
			return{
				transferType:1,
				getdata:{
					zbid: this.$store.state.userinfo.id,
					flag: this.$store.state.userinfo.flag,
					transfer: "",
					page: 1
				},
				type:1,//1：新增 2：批量新增
				tableData:[],
				totalPage:0,
				zhiwulist:dygl.dyclass()//身份筛选列表
			}
		},
		components:{Page},
		methods:{
			// 关闭新增或编辑弹窗
			closeWin(){
				this.dialogVisible = false;
			},
			// 数据转出
			dataList(){
				var that = this;
				that.tableData = [];
				that.totalPage = 0;
				that.getdata.page = 1;
				if(that.transferType==1){
					// 转出
					dygl.transferOutList(that.getdata).then(res => {
						if(res.data.pagedata.length>0){
							that.tableData = res.data.pagedata;
							that.totalPage = res.data.count;
						}else{
							that.tableData = [];
							that.totalPage = 0;
						}
					})
				}else{
					// 转入
					dygl.transferIntoList(that.getdata).then(res => {
						if(res.data.pagedata.length>0){
							that.tableData = res.data.pagedata;
							that.totalPage = res.data.count;
						}else{
							that.tableData = [];
							that.totalPage = 0;
						}
					})
				}
			},
			// 分页查询
			changedata(current){
				var that = this;
				that.getdata.page = current;
				that.dataList();
			},
			// 详情
			detail(data){
				var that = this;
				// if(data.transfer == 2){
					that.$router.push({
						path:'/gxzy_detail',
						query:{
							id:data.id
						}
					})
				// }
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
			that.$emit('selectTop',4)
		}
	}
</script>

<style lang="scss">
	.wrap{
		position: relative;
		height: 100%;
		width: 100%;
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

