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
								style="width: 220px;margin-right: 10px;"
								v-model="getdata.title" 
								placeholder="输入名称查询"
								@input="getdata.page = 1;totalPage = 0;dataList();">
							</el-input>
							<el-select v-model="getdata.difficulty" 
								style="width: 100px !important;margin-right: 10px;" 
								clearable placeholder="试题难度"
								@change="getdata.page = 1;totalPage = 0;dataList();">
								<el-option
									label="简单"
									value="1">
								</el-option>
								<el-option
									label="适中"
									value="2">
								</el-option>
								<el-option
									label="困难"
									value="3">
								</el-option>
							</el-select>
							<el-select v-model="getdata.type" 
								style="width: 100px !important;" 
								clearable placeholder="试题类型"
								@change="getdata.page = 1;totalPage = 0;dataList();">
								<el-option
									label="单选"
									value="1">
								</el-option>
								<el-option
									label="多选"
									value="2">
								</el-option>
							</el-select>
						</div>
						<div>
							<el-button type="primary" @click="$router.push({path:'/add_tg',query:{id:$route.query.id,type:'add',class_id:$route.query.id}})">新建题干</el-button>
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
									prop="dw"
									label="序号"
									width="80">
									<template slot-scope="scope">
										{{scope.$index + 1}}
									</template>
								</el-table-column>
								<el-table-column
									prop="title"
									label="试题题干">
								</el-table-column>
								<el-table-column
									prop=""
									label="试题类型"
									width="150">
									<template slot-scope="scope">
										<div v-if="scope.row.type == 1">单选</div>
										<div v-if="scope.row.type == 2">多选</div>
									</template>
								</el-table-column>
								<el-table-column
									prop=""
									label="难度"
									width="150">
									<template slot-scope="scope">
										<div v-if="scope.row.difficulty == 1">简单</div>
										<div v-if="scope.row.difficulty == 2">适中</div>
										<div v-if="scope.row.difficulty == 3">困难</div>
									</template>
								</el-table-column>
								<el-table-column
									prop="establish"
									label="创建人"
									width="150">
								</el-table-column>
								<el-table-column
									prop=""
									label="创建时间"
									width="250">
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
	export default{
		data(){
			return{
				getdata:{
					id: this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					title: "",
					class_id:this.$route.query.id,
					difficulty: "",
					type:"",
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
				xxjy.questionList(that.getdata).then(res => {
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
						xxjy.delQuestion({
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
					path:'/add_tg',
					query:{
						id:data.id,
						class_id:this.$route.query.id,
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

