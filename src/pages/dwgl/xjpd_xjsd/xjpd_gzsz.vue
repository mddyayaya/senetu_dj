<template>
	<div class="wrap">
		<Edit :dialogVisible="dialogVisible" @closeWin="closeWin" :title="title" :describe="describe" :class_id="class_id"></Edit>
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
						<div class="leftBar"></div>
						<div class="rightBar">
							<el-button type="primary" @click="$router.go(-1)">返回上级</el-button>
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
									prop="name"
									label="类别"
									width="110">
								</el-table-column>
								<el-table-column
									prop="score"
									label="分值"
									width="100">
								</el-table-column>
								<el-table-column
									prop="describe"
									label="评分标准(仅供参考)">
								</el-table-column>
								<el-table-column
									label="操作"
									align="center"
									fixed="right"
									width="70">
									<template slot-scope="scope">
										<el-button type='text' @click="title=scope.row.name;dialogVisible=true;describe=scope.row.describe;class_id=scope.row.class_id">编辑</el-button>
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
	import { dwgl } from '@/axios'
	import Page from '@/components/page.vue'
	import { Message } from 'element-ui'
	import Edit from './components/guize.vue'
	export default{
		data(){
			return{
				getdata:{
					user_id:this.$store.state.userinfo.id,
				},
				tableData:[],
				totalPage:0,
				dialogVisible:false,//新增/编辑弹窗
				title:"",
				describe:"",
				class_id:""
			}
		},
		components:{Page,Edit},
		methods:{
			// 数据列表
			dataList(){
				var that = this;
				dwgl.starDefault(that.getdata).then(res => {
					if(res.data!=null){
						that.tableData = res.data;
					}else{
						that.tableData = [];
					}
				})
			},
			// 编辑
			edit(data){
				var that = this;
				that.dialogVisible = true;
			},
			// 关闭弹窗
			closeWin(){
				var that = this;
				that.dialogVisible = false;
				that.dataList();
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
			that.dataList();
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
	}
</style>

