<template>
	<div class="wrap">
		<DelData ref="delDatas"></DelData>
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>学习教育</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<div class="selectbar">
						<div>
							<el-input 
								style="width: 220px;"
								v-model="getdata.title" 
								placeholder="输入名称查询"
								@input="getdata.page = 1;totalPage = 0;dataList();"></el-input>
						</div>
						<div>
							<el-button type="primary" @click="$router.push({path:'/add_sjzj',query:{type:'add'}})">随机组卷</el-button>
							<el-button type="primary" @click="$router.push({path:'/add_sj',query:{type:'add'}})">新建试卷</el-button>
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
									label="序号"
									width="50" >
									<template slot-scope="scope">
										{{scope.$index+1}}
									</template>
								</el-table-column>
								<el-table-column
									prop="title"
									label="试卷名称">
								</el-table-column>
								<el-table-column
									prop="count"
									label="题目数"
									width="80">
								</el-table-column>
								<el-table-column
									prop="total"
									label="总分"
									width="80">
								</el-table-column>
								<el-table-column
									prop="pass"
									label="及格分"
									width="80">
								</el-table-column>
								<el-table-column
									prop="duration"
									label="考试时长"
									width="100">
									<template slot-scope="scope">
										{{scope.row.duration}}分钟
									</template>
								</el-table-column>
								<el-table-column
									prop="addtime"
									label="创建时间"
									width="180">
									<template slot-scope="scope">
										{{$changeTime(scope.row.addtime)}}
									</template>
								</el-table-column>
								<el-table-column
									label="操作"
									width="120">
								<template slot-scope="scope">
										<el-button @click="$router.push({path:'/add_sj',query:{id:scope.row.id,type:'edit'}})" type="text" size="small">编辑</el-button>
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
	import { xxjy,dwgl } from '@/axios'
	import Page from '@/components/page.vue'
	import { Message } from 'element-ui'
	import DelData from '@/components/delToast.vue'
	export default{
		data(){
			return{
				getdata:{
					dwid: this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					title: "",
					difficulty: "",
					status: "",
					page: 1
				},
				showlocal:false,
				tableData:[],
				totalPage:0,
				studyNum:0,
				studyTime:0
			}
		},
		components:{Page,DelData},
		methods:{
			// 数据
			dataList(){
				var that = this;
				xxjy.testList(that.getdata).then(res => {
					if(res.data.pagedata.length>0){
						that.tableData = res.data.pagedata;
						that.totalPage = res.data.count;
					}else{
						that.tableData = [];
						that.totalPage = 0;
					}
				})
			},
			// 关闭新建弹窗
			closeLocal(){
				var that = this;
				that.showlocal = false;
				that.dataList();
			},
			// 分页查询
			changedata(current){
				var that = this;
				that.getdata.page = current;
				that.dataList();
			},
			// 删除
			del(data){
				var that = this;
				that.$refs.delDatas.showToast(res => {
					if(res){
						xxjy.delTest({
							id:data.id,
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
			// 编辑
			edit(data){
				this.$router.push({
					path:'/add_zt',
					query:{
						id:data.id,
						type:'edit',
						dwid:data.dwid,
						flag:data.flag,
					},
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
		.fengmian{
			width: 100px;
			height: 60px;
			object-fit: cover;
		}
		.zttit{
			font-size: 16px;
			font-weight: bold;
		}
		.textCount{
			font-size: 14px;
		}
		.intro{
			font-size: 14px;
		}
	}
</style>

