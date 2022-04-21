<template>
	<div class="wrap">
		<DelData ref="delDatas"></DelData>
		<Addzl :showlocal="showlocal" @closeLocal="closeLocal"></Addzl>
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
							<el-button type="primary" @click="$router.push({path:'/add_nr',query:{type:'add',zl_id:$route.query.id}})">新建内容</el-button>
							<!-- <el-button type="primary" @click="showlocal=true;">新建专栏</el-button> -->
							<el-button type="primary" @click="$router.go(-1)">返回</el-button>
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
									label="序号"
									width="50" >
									<template slot-scope="scope">
										{{scope.$index+1}}
									</template>
								</el-table-column>
								<el-table-column 
									prop="u_name"
									label="封面"
									width="130" >
									<template slot-scope="scope">
										<img :src="scope.row.sz_img" class="fengmian">
									</template>
								</el-table-column>
								<el-table-column
									prop=""
									label="标题和专栏">
									<template slot-scope="scope">
										<div class="zttit">{{scope.row.title}}</div>
										<div class="intro">{{scope.row.column_title}}</div>
									</template>
								</el-table-column>
								<el-table-column
									prop="cy_zz"
									label="创建时间"
									width="110">
									<template slot-scope="scope">
										{{$changeTime(scope.row.addtime)}}
									</template>
								</el-table-column>
								<el-table-column
									label="操作"
									width="114">
								<template slot-scope="scope">
										<el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
										<el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
								</template>
								</el-table-column>
							</el-table>
						</template>
						<Page :totalPage="totalPage" :pageSize="6" @changedata="changedata"></Page>
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
	import Addzl from './components/add_zl.vue'
	export default{
		data(){
			return{
				getdata:{
					id: this.$route.query.id,
					title: "",
					page: 1
				},
				showlocal:false,
				tableData:[],
				totalPage:0,
				studyNum:0,
				studyTime:0
			}
		},
		components:{Page,DelData,Addzl},
		methods:{
			// 数据
			dataList(){
				var that = this;
				xxjy.selectSpecialContent(that.getdata).then(res => {
					if(res.data.pagedata!=null){
						if(res.data.pagedata.length>0){
							that.tableData = res.data.pagedata;
							that.totalPage = res.data.count;
						}else{
							that.tableData = [];
							that.totalPage = 0;
						}
					}else{
						that.tableData = [];
						that.totalPage = 0;
					}
				})
			},
			// 关闭新建专栏弹窗
			closeLocal(){
				var that = this;
				this.showlocal = false;
				that.dataList();
			},
			// 分页查询
			changedata(current){
				var that = this;
				that.getdata.page = current;
				that.dataList();
			},
			// 详情
			showDetail(data){
				var that = this;
				that.$router.push({
					path:'/dyxx_detail',
					query:{
						flag:data.flag,
						uid:that.getdata.id,
						cy_zz:data.cy_zz,
						id:data.id
					},
				})
			},
			// 删除
			del(data){
				var that = this;
				that.$refs.delDatas.showToast(res => {
					if(res){
						xxjy.delContent({
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
					path:'/add_nr',
					query:{
						id:data.id,
						zl_id:data.sid,
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

