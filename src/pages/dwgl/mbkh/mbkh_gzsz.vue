<template>
	<div class="wrap">
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
									prop="title"
									label="类别"
									width="100">
								</el-table-column>
								<el-table-column
									prop="content"
									label="评分标准(仅供参考)">
									<template slot-scope="scope">
										<div v-html="scope.row.content"></div>
									</template>
								</el-table-column>
							</el-table>
						</template>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { biaozhun } from './datas.js'
	export default{
		data(){
			return{
				tableData:biaozhun
			}
		},
		methods:{
			
		},
		mounted() {
			var that = this;
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

