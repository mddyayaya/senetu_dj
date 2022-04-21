<template>
	<div class="wrap">
		<DelData ref="delDatas"></DelData>
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>日常办公</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<el-tabs v-model="activeName" @tab-click="handleClick">
					    <el-tab-pane label="上级通知" name="1" v-if="$store.state.userinfo.flag!=1">
							<div class="selectbar">
								<div>
									<el-input
									 	style="width: 200px !important;" 
										placeholder="搜索通知" v-model="getdata.title"
										@input="getdata.page = 1;totalPage = 0;dataList();">
									</el-input>
									<el-select
									 	style="margin-left: 10px;width: 120px !important;" 
										v-model="getdata.status" placeholder="请选择状态"
										clearable
										@change="getdata.page = 1;totalPage = 0;dataList();">
										<el-option
											label="已查看"
											value="1">
										</el-option>
										<el-option
											label="未查看"
											value="2">
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
											prop="u_name"
											width="80"
											label="序号" >
											<template slot-scope="scope">
												{{scope.$index+1}}
											</template>
										</el-table-column>
										<el-table-column 
											prop="title"
											label="标题" >
										</el-table-column>
										<el-table-column 
											prop="pub_user"
											label="发布人"  
											width="150">
										</el-table-column>
										<el-table-column 
											prop=""
											label="时间" 
											width="120">
											<template slot-scope="scope">
												<span>{{$changeTime(scope.row.addtime)}}</span>
											</template>
										</el-table-column>
										<el-table-column
											label="操作"
											width="114">
											<template slot-scope="scope">
												<el-button type="text" @click="godetail(scope.row)">详情</el-button>
												<el-button type="text" @click="del(scope.row)">删除</el-button>
											</template>
										</el-table-column>
									</el-table>
								</template>
								<Page :totalPage="totalPage" :pageSize="10" @changedata="changedata"></Page>
							</div>
						</el-tab-pane>
					    <el-tab-pane label="我发布的" name="2" v-if="$store.state.userinfo.flag!=3">
							<div class="selectbar">
								<div>
									<el-input
										style="width: 200px !important;" 
										placeholder="搜索通知" v-model="getdata1.title"
										@input="getdata1.page = 1;totalPage = 0;dataList();">
									</el-input>
									<el-select
										style="margin-left: 10px;width: 120px !important;" 
										v-model="getdata1.status" placeholder="请选择状态"
										clearable
										@change="getdata1.page = 1;totalPage1 = 0;dataList();">
										<el-option
											label="已查看"
											value="1">
										</el-option>
										<el-option
											label="未查看"
											value="2">
										</el-option>
									</el-select>
								</div>
								<div>
									<el-button type="primary" @click="$router.push('/add_tz')">发布通知</el-button>
								</div>
							</div>
							<div class="selectdata">
								<template>
									<el-table
										:header-cell-style="{background:'#f5f7fa',color:'#000'}"
										:data="tableData1"
										stripe
										border
										style="width: 100%">
										<el-table-column 
											prop="u_name"
											width="80"
											label="序号" >
											<template slot-scope="scope">
												{{scope.$index+1}}
											</template>
										</el-table-column>
										<el-table-column 
											prop="title"
											label="标题" >
										</el-table-column>
										<el-table-column 
											prop="status"
											label="状态" >
											<template slot-scope="scope">
												{{scope.row.status==2?'未查看':'已查看'}}
											</template>
										</el-table-column>
										<el-table-column 
											prop="pub_user"
											label="发布人"  
											width="150">
										</el-table-column>
										<el-table-column 
											prop=""
											label="时间" 
											width="120">
											<template slot-scope="scope">
												<span>{{$changeTime(scope.row.addtime)}}</span>
											</template>
										</el-table-column>
										<el-table-column
											label="操作"
											width="114">
											<template slot-scope="scope">
												<el-button type="text" @click="godetail(scope.row)">详情</el-button>
												<el-button type="text" @click="del(scope.row)">删除</el-button>
											</template>
										</el-table-column>
									</el-table>
								</template>
								<Page :totalPage="totalPage1" :pageSize="10" @changedata="changedata1"></Page>
							</div>
						</el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { rcbg } from '@/axios'
	import Page from '@/components/page.vue'
	import { Message } from 'element-ui'
	import DelData from '@/components/delToast.vue'
	export default{
		data(){
			return{
				activeName:"",
				getdata:{
					user_id: this.$store.state.userinfo.id,
					flag: this.$store.state.userinfo.flag,
					type: 1,//1通知  2汇报
					title: "",
					status: "", // 未查看 2  已查看 1
					page: 1,
				},
				getdata1:{
					user_id: this.$store.state.userinfo.id,
					type: 1,//1通知  2汇报
					title: "",
					status: "", // 未查看 2  已查看 1
					page: 1
				},
				tableData:[],
				totalPage:0,
				tableData1:[],
				totalPage1:0,
			}
		},
		components:{Page,DelData},
		methods:{
			// 关闭新增或编辑弹窗
			closeWin(){
				this.dialogVisible = false;
			},
			// 上级通知
			dataList(){
				var that = this;
				rcbg.notice(that.getdata).then(res => {
					if(res.data.pagedata.length>0){
						that.tableData = res.data.pagedata;
						that.totalPage = res.data.count;
					}else{
						that.tableData = [];
						that.totalPage = 0;
					}
				})
			},
			// 我的通知
			dataList1(){
				var that = this;
				rcbg.myNotice(that.getdata1).then(res => {
					if(res.data.pagedata.length>0){
						that.tableData1 = res.data.pagedata;
						that.totalPage1 = res.data.count;
					}else{
						that.tableData1 = [];
						that.totalPage1 = 0;
					}
				})
			},
			// 切换设置
			handleClick(tab, event) {
				var that = this;
				if(tab.index == 0){
					that.dataList();
				}else{
					that.dataList1();
				}
			},
			// 分页查询
			changedata(current){
				var that = this;
				that.getdata.page = current;
				that.dataList();
			},
			// 分页查询
			changedata1(current){
				var that = this;
				that.getdata1.page = current;
				that.dataList1();
			},
			// 详情
			godetail(data){
				var that = this;
				that.$router.push({
					path:'/fbtz_detail',
					query:{
						id:data.tid
					}
				})
			},
			// 删除
			del(data){
				var that = this;
				that.$refs.delDatas.showToast(res => {
					if(res){
						rcbg.delNotice({
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
							if(that.activeName == '1'){
								that.getdata.page = 1;
								that.dataList();
							}else{
								that.getdata1.page = 1;
								that.dataList1();
							}
						})
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
			that.$emit('selectTop',6);
			if(that.$store.state.userinfo.flag != 1){
				that.dataList();
				that.activeName = '1'
			}else{
				that.activeName = '2'
				that.dataList1();
			}
		},
		created() {
			var that = this;
			that.$emit('selectTop',6)
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

