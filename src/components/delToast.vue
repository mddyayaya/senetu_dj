<template>
	<div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:{
			
		},
		methods:{
			// 显示弹窗
			showToast(callback){
				var that = this;
				that.$confirm('确定删除当前数据？', '删除数据', {
					cancelButtonText: '取消',
					confirmButtonText: '确定',
					type: 'warning'
				}).then(() => {
					// 确定
					callback(true)
				}).catch(() => {
					// 取消
					callback(false)
				});
			}
		},
		mounted(){
			
		},
		created() {
			
		}
	}
</script>

<style>
</style>
