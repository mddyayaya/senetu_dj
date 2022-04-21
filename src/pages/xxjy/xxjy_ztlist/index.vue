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
							<el-button type="primary" @click="$router.push({path:'/add_zt',query:{type:'add',dwid:getdata.dwid,flag:getdata.flag}})">新建专题</el-button>
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
									label="封面"
									width="130" >
									<template slot-scope="scope">
										<img class="fengmian" :src="scope.row.sz_img" >
									</template>
								</el-table-column>
								<el-table-column
									prop=""
									label="主题和简介">
										<template slot-scope="scope">
											<div class="zttit">{{scope.row.title}}</div>
											<div class="textCount">共{{scope.row.count.count}}篇内容</div>
											<div class="intro">{{scope.row.introduct}}</div>
										</template>
								</el-table-column>
								<el-table-column
									prop="cy_zz"
									label="创建时间"
									width="110">
									<template v-slot="scope">
										{{$changeTime(scope.row.addtime)}}
									</template>
								</el-table-column>
								<el-table-column
									label="操作"
									width="120">
								<template slot-scope="scope">
										<el-button @click="$router.push({path:'/ztlist',query:{id:scope.row.id,dwid:getdata.dwid}})" type="text" size="small">详情</el-button>
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
	export default{
		data(){
			return{
				getdata:{
					dwid: this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					title:"",
					status:"",
					page: 1,
				},
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
				xxjy.special(that.getdata).then(res => {
					if(res.data.pagedata.length>0){
						that.tableData = res.data.pagedata;
						that.totalPage = res.data.count;
					}else{
						that.tableData = [];
						that.totalPage = 0;
					}
				})
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
						xxjy.delSpecial({
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

