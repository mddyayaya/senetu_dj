<template>
	<div class="wrap">
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>党建宣传</el-breadcrumb-item>
				<el-breadcrumb-item>支部要闻</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<div class="contrl_bar">
						<el-button type="primary" @click="goedit">编辑</el-button>
						<el-button type="primary" plain
						@click="$router.go(-1)">返回上级</el-button>
					</div>
					<div class="detail_title">{{title}}</div>
					<div class="pub_time">发布时间：{{pub_time!=''?pub_time:'暂无发布时间'}}</div>
					<div class="content">
						<div>内容：</div>
						<div class="content_item" v-if="content!=null && content!=''" v-html="content"></div>
						<div class="nodata" v-else>
							<img src="../../../assets/images/nodata.jpg" >
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { djxc } from '@/axios'
	export default{
		data(){
			return{
				pub_time:"数据加载中",
				title:"数据加载中",
				content:"数据加载中"
			}
		},
		methods:{
			// 获取数据
			getdata(){
				var that = this;
				djxc.zbNewsDetail(that.$route.query.id).then(res => {
					that.pub_time = res.data.pub_time!=""?that.$changeTime(res.data.pub_time):'暂无数据'
					that.title = res.data.title!=""?res.data.title:'暂无标题'
					that.content = res.data.content!=""?res.data.content:'暂无数据'
				})
			},
			// 编辑
			goedit(){
				var that = this;
				that.$router.push({
					path:"/ywzx_add",
					query:{
						id:that.$route.query.id,
						flag:that.$route.query.flag,
						type:'edit'
					}
				})
			}
		},
		mounted() {
			var that = this;
			that.getdata();
		},
		created() {
			var that = this;
			that.$emit('selectTop',2)
		}
	}
</script>

<style lang="scss">
	.wrap{
		width: 100%;
		position: relative;
		color: $index_color;
		font-size: index_size1;
		.detail_title{
			font-size: 18px;
			font-weight: bold;
			margin-bottom: $indexMarginTop;
		}
		.pub_time{
			margin-bottom: 10px;
		}
		.content_item{
			width: 70%;
			line-height: 40px;
			padding: 50px 50px;
			box-sizing: border-box;
			background: #FAFBFC;
			margin-top: 10px;
			border: 1px solid #DDE2EE;
			img{
				width: 100%;
				margin: 10px auto;
			}
		}
	}
</style>
