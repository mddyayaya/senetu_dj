<template>
	<div class="page">
		<el-pagination
			style="text-align: right;margin-top: 20px;"
			background
			:pager-count="7"
			@current-change="changedata"
			:hide-on-single-page="true"
			:page-size="pageSize"
			layout="prev, pager, next"
			:total="totalPage">
		</el-pagination>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:{
			totalPage:{
				type:Number,
				default:0
			},
			pageSize:{
				type:Number,
				default:10
			}
		},
		methods:{
			changedata(current){
				var that = this;
				that.$emit('changedata',current);
			}
		}
	}
</script>

<style>
	.page{
		width: 100%;
		margin-top: 20px;
		text-align: right;
	}
</style>
