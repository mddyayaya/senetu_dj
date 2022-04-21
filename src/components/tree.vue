<template>
	<div class="tree" v-if="$store.state.userinfo.flag != 3">
		<el-input
			placeholder="输入要搜索的组织名称"
			v-model="filterText">
		</el-input>
		<el-tree
			class="filter-tree"
			:data="data"
			:default-expand-all="true"
			:highlight-current="true"
			:props="defaultProps"
			default-expand-all
			:filter-node-method="filterNode"
			@node-click="treeSelect"
			:expand-on-click-node="false"
			ref="tree">
			<span class="custom-tree-node" slot-scope="{ node, data }">
				<span>
					<i :class="data.icon_class"></i>{{ data.dw }}
				</span>
			</span>
		</el-tree>
	</div>
</template>

<script>
	import { treeData } from "@/axios" 
export default {
	data(){
		return{
			filterText:""
		}
	},
	watch: {
		filterText(val) {
			this.$refs.tree.filter(val);
		}
	},
	methods: {
		filterNode(value, data) {
			if (!value) return true;
			return data.dw.indexOf(value) !== -1;
		},
		// 获取树形结构数据
		getData(){
			var that = this;
			treeData.treeData({
				flag:that.$store.state.userinfo.flag,
				user_id:that.$store.state.userinfo.id,
			}).then(res => {
				if(res.code == 200){
					that.data = res.data;
				}
			})
		},
		// 查询数据
		treeSelect(data){
			var that = this;
			that.$emit("treeSelect",data)
		}
	},
	mounted() {
		var that = this;
		that.getData();
	},
	data() {
		return {
			filterText: '',
			data: [],
			defaultProps: {
			  children: 'children',
			  label: 'dw'
			}
		}
	}
};
</script>

<style lang="scss">
	.tree{
		width: 260px;
		overflow-y: scroll;
		overflow-x: hidden;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		height: 100%;
		padding-top: 16px;
		background: #F6F7F9;
		.el-tree{
			background: none;
			margin-top: 10px;
			font-size: 14px;
		}
		.el-input{
			width: 90% !important;
			margin-left:5%;
		}
		.el-tree-node__content{
			height: 40px !important;
			line-height: 40px !important;
		}
		.el-tree-node__content:hover{
			background: rgb(254,237,235) !important;
		}
		.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
			background: rgb(254,237,235) !important;
			color: #BB0000 !important;
		}
		.dw_icon{
			width: 20px;
			height: 18px;
			display: inline-block;
			margin-right: 10px;
			background: url(../assets/images/dw_icon.png) no-repeat;
			background-size: 100% 100%;
		}
		.zb_icon{
			width: 20px;
			height: 18px;
			display: inline-block;
			margin-right: 10px;
			background: url(../assets/images/zb_icon.png) no-repeat;
			background-size: 100% 100%;
		}
		.zz_icon{
			width: 19px;
			height: 19px;
			display: inline-block;
			margin-right: 10px;
			background: url(../assets/images/zz_icon.png) no-repeat;
			background-size: 100% 100%;
		}
		.el-icon-caret-right:before {
			content: "" !important;
		}
	}
</style>
