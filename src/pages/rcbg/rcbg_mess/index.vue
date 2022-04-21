<template>
	<div class="wrap">
		<DelData ref="delDatas"></DelData>
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>日常工作</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<div class="selectbar">
						<div>
							<el-input
								placeholder="搜索消息"
								prefix-icon="el-icon-search"
								style="width: 220px;margin-right: 10px;"
								v-model="getdata.title"
								@input="getdata.page = 1;totalPage = 0;dataList();">
							</el-input>
							<el-select
								clearable
								v-model="getdata.status" 
								filterable 
								placeholder="请选择状态"
								@change="getdata.page = 1;totalPage = 0;dataList();">
								<el-option
									label="已读"
									value="1">
								</el-option>
								<el-option
									label="未读"
									value="2">
								</el-option>
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
									prop="username"
									label="序号"
									width="60">
									<template slot-scope="scope">
										{{scope.$index+1}}
									</template>
								</el-table-column>
								<el-table-column
									prop="title"
									label="标题">
								</el-table-column>
								<el-table-column
									prop="classs"
									label="分类"
									width="160">
									<template slot-scope="scope">
										<span v-if="scope.row.classs == 1">通知公告</span>
										<span v-else-if="scope.row.classs == 2">工作汇报</span>
										<span v-else>活动通知</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="dw"
									label="党组织"
									width="160">
								</el-table-column>
								<el-table-column
									prop="addtime"
									label="时间"
									width="150">
									<template slot-scope="scope">
										{{$changeTime(scope.row.addtime)}}
									</template>
								</el-table-column>
								<el-table-column
									prop="iscat"
									label="状态"
									width="100">
									<template slot-scope="scope">
										<el-button size="mini" type="success" v-if="scope.row.iscat == 2">已读</el-button>
										<el-button size="mini" type="warning" v-else>未读</el-button>
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
				getdata:{
					user_id:this.$store.state.userinfo.id,
					flag:this.$store.state.userinfo.flag,
					title: "",
					page: 1,
					status: ""
				},
				tableData:[],
				totalPage:0
			}
		},
		components:{Page,DelData},
		methods:{
			// 数据
			dataList(){
				var that = this;
				that.tableData = [];
				rcbg.information(that.getdata).then(res => {
					that.tableData = res.data.pagedata;
					that.totalPage = res.data.count;
				})
			},
			// 分页筛选
			changedata(curret){
				var that = this;
				that.getdata.page = curret;
				that.dataList();
			},
			// 详情
			godetail(data){
				var that = this;
				if(data.classes==1){
					// 通知公告
					that.$router.push({
						path:'/fbtz_detail',
						query:{
							id:data.tid
						}
					})
				}else if(data.classes==2){
					// 工作汇报
					that.$router.push({
						path:'/gzhb_detail',
						query:{
							id:data.tid,
							zbid:data.zbid,
							flag:data.flag,
						}
					})
				}else{
					// 活动
					that.$router.push({
						path:"/zzhd_detaill",
						query:{
							hy_flag:data.hyflag,
							hyid:data.hyid,
							dw:data.dw,
							uid:data.zbid,
						}
					})
				}
			},
			// 删除
			del(data){
				var that = this;
				that.$refs.delDatas.showToast(res => {
					if(res){
						rcbg.delInformation({
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
							that.getdata.page = 1;
							that.dataList();
						})
					}
				})
			},
		},
		mounted() {
			var that = this;
			that.dataList();
		},
		created() {
			var that = this;
			that.$emit('selectTop',6)
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

