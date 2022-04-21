<template>
	<div class="wrap">
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
					<div class="switchBar">
						<span :class="{selectSwitch:getdata.status == 1}" @click="getdata.status = 1;dataList();page=1">未开始</span>
						<span :class="{selectSwitch:getdata.status == 2}" @click="getdata.status = 2;dataList();page=1">已完成</span>
					</div>
					<div class="selectbar">
						<div class="bar_name">
							<span>{{selectName}}</span>
							<img src="../../../assets/images/danghui.png" >
						</div>
						<div class="bar_words">
							<span>学习次数：<span>{{all_times}}次</span></span>
							<span>学习时长：<span>{{all_hour}}课时</span></span>
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
									label="会议标题" >
								</el-table-column>
								<el-table-column 
									prop="address"
									label="学习地点" >
								</el-table-column>
								<el-table-column 
									prop="k_time"
									label="时间"
									width="170" >
								</el-table-column>
								<el-table-column 
									prop="hour"
									label="学时" 
									width="80" >
									<template slot-scope="scope">
										<span>{{scope.row.hour+'课时'}}</span>
									</template>
								</el-table-column>
								<el-table-column
									label="操作"
									width="80">
									<template slot-scope="scope">
										<el-button @click="showDetail(scope.row)" type="text" size="small">详情</el-button>
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
	export default{
		data(){
			return{
				getdata:{
					id: this.$store.state.userinfo.id,
					status:1,//1未开始   2：已完成
					flag: this.$store.state.userinfo.flag,
					page: 1
				},
				selectName:this.$store.state.userinfo.dw,
				all_hour:0,
				all_times:0,
				tableData:[],
				totalPage:0,
			}
		},
		components:{tree,Page},
		methods:{
			// 关闭新增或编辑弹窗
			closeWin(){
				this.dialogVisible = false;
			},
			// 数据
			dataList(){
				var that = this;
				that.tableData = [];
				xxjy.branchStudyDetail(that.getdata).then(res => {
					if(res.data.pagedata!=null){
						if(res.data.pagedata.length>0){
							that.tableData = res.data.pagedata;
							that.totalPage = res.data.count;
							that.all_hour = res.all_hour;
							that.all_times = res.data.count;
						}else{
							that.tableData = [];
							that.totalPage = 0;
							that.all_hour = 0;
							that.all_times = 0;
						}
					}else{
						that.tableData = [];
						that.totalPage = 0;
						that.all_hour = 0;
						that.all_times = 0;
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
				that.selectName = data.dw;
				that.getdata.page = 1;
				that.dataList();
			},
			// 详情
			showDetail(data){
				var that = this;
				that.$router.push({
					path:"/zzhd_detaill",
					query:{
						hy_flag:data.hy_flag,
						hyid:data.hyid,
						dw:that.selectName,
						uid:that.getdata.id,
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
		.bar_name{
			font-size: 16px;
			font-weight: bold;
			margin-bottom: 10px;
			display: flex;
			align-items: center;
			img{
				width: 20px;
				height: 20px;
				margin-left: 10px;
			}
		}
		.bar_words{
			font-size: 16px;
			>span{
				margin-left: 20px;
				span{
					color: #BB0000;
				}
			}
		}
	}
</style>

