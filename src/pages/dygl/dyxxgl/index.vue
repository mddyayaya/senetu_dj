<template>
	<div class="wrap">
		<DelData ref="delDatas"></DelData>
		<codeAdd ref="codeadddy" :dialogVisible="dialogVisible" @datalist="closeWin" :uid="getdata.id" :flag="getdata.flag" :zzName="cy_zz"></codeAdd>
		<Addmore
			:moreAddwin="moreAddwin" 
			downloadName="党员信息表" 
			title="批量新增党费" 
			@downExcel="downExcel" 
			@closeMorewin="closeMorewin"
			@pushData="pushData"></Addmore>
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>党员管理</el-breadcrumb-item>
				<el-breadcrumb-item>党员信息管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<tree @treeSelect="treeSelect"></tree>
			<div class="datatable">
				<div class="datas">
					<div class="selectbar">
						<div>
							<el-input
								v-model="getdata.name" @input="getdata.page = 1;totalPage = 0;dataList();" 
								style="margin-right: 10px;width: 220px !important;"  
								placeholder="输入党员姓名搜索">
							</el-input>
							<el-select
							 	style="margin-right: 10px;width: 100px !important;" 
								v-model="getdata.sex" placeholder="性别"
								clearable
								@change="getdata.page = 1;totalPage = 0;dataList();">
								<el-option
									label="男"
									value="男">
								</el-option>
								<el-option
									label="女"
									value="女">
								</el-option>
							</el-select>
						</div>
						<div>
							<el-button type="primary" v-if="getdata.flag == 3" @click="dialogVisible = true;$refs.codeadddy.getcode()">批量扫码添加</el-button>
							<el-button type="primary" v-if="getdata.flag == 3" @click="$router.push({path:'/dyxx_add',query:{type:'add',flag:getdata.flag,uid:getdata.id,cy_zz:cy_zz}})">新增党员</el-button>
							<el-button type="primary" v-if="getdata.flag == 3" @click="moreAddwin = true">批量新增</el-button>
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
									width="100"
									label="姓名" >
								</el-table-column>
								<el-table-column
									prop="sex"
									label="性别"
									width="80">
								</el-table-column>
								<el-table-column
									prop="u_zhiwu_name"
									label="分类"
									width="80">
								</el-table-column>
								<el-table-column
									prop="cy_zz"
									label="所属组织">
								</el-table-column>
								<el-table-column
									prop="condition"
									label="状态"
									width="100">
									<template slot-scope="scope">
										<el-button  type="success" size="small" v-if="scope.row.condition == 1">正常</el-button>
										<el-button  type="error" size="small" v-else>已转出</el-button>
									</template>
								</el-table-column>
								<el-table-column
									prop="u_phone"
									label="联系电话"
									width="180">
								</el-table-column>
								<el-table-column
									label="操作"
									width="114">
								<template slot-scope="scope">
									<el-button @click="detail(scope.row)" type="text" size="small">详情</el-button>
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
	import tree from '@/components/tree.vue'
	import { dwgl,dygl } from '@/axios'
	import Page from '@/components/page.vue'
	import { Message } from 'element-ui'
	import codeAdd from './components/code.vue'
	import DelData from '@/components/delToast.vue'
	import Addmore from '@/components/moreadd.vue'
	export default{
		data(){
			return{
				dialogVisible:false,
				getdata:{
					id: this.$store.state.userinfo.id,
					flag: this.$store.state.userinfo.flag,
					name:"",
					sex: "",
					sign: 1,
					page: 1
				},
				cy_zz:this.$store.state.userinfo.dw,
				type:1,//1：新增 2：批量新增
				tableData:[],
				totalPage:0,
				moreAddwin:false//批量新增窗口
			}
		},
		components:{tree,Page,codeAdd,Addmore,DelData},
		methods:{
			// 关闭新增或编辑弹窗
			closeWin(){
				this.dialogVisible = false;
				this.dataList();
			},
			// 关闭批量新增弹窗
			closeMorewin(){
				this.moreAddwin = false;
				this.dataList();
			},
			// 下载批量表格
			downExcel(){
				var that = this;
				window.open('http://10.164.143.28/uploads/dj2_file/dy.xls') 
			},
			// 批量上传数据提交
			pushData(value){
				var that = this;
				dygl.excelPutData({
					uid: that.getdata.id,
					url: value.src,
					sign: that.getdata.sign
				}).then(res => {
					if(res.code == 200){
						that.closeMorewin();
					}else{
						Message({
							type:"error",
							message:res.msg
						})
					}
				})
			},
			// 数据
			dataList(){
				var that = this;
				dwgl.memberAdmin(that.getdata).then(res => {
					if(res.data.pagedata){
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
			// 树形结构筛选
			treeSelect(data){
				var that = this;
				that.getdata.id = data.id;
				that.getdata.flag = data.flag;
				that.cy_zz = data.dw;
				that.getdata.page = 1;
				that.dataList();
			},
			// 删除
			del(data){
				var that = this;
				that.$refs.delDatas.showToast(res => {
					if(res){
						dygl.delMember({
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
			detail(data){
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
			that.$emit('selectTop',4);
		}
	}
</script>

<style lang="scss">
	.wrap{
		position: relative;
		height: 100%;
		width: 100%;
		.fengmian {
		    height: 86px;
		    width: 138px;
		    margin: 10px 16px 10px 14px;
		}
	}
</style>

