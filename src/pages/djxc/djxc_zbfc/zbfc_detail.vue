<template>
	<div class="wrap1">
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>党建宣传</el-breadcrumb-item>
				<el-breadcrumb-item>支部宣传</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<div class="zbfcDetail">
						<div class="left_img">
							<img :src="img" >
						</div>
						<div class="right_words">
							<div class="detail_title">{{title}}</div>
							<div class="pub_time">所属党支部：{{u_name}}</div>
						</div>
						<div class="contrl_bar1">
							<el-button type="" @click="goedit">编辑</el-button>
							<el-button type="primary"
							@click="$router.go(-1)">返回</el-button>
						</div>
					</div>
					<div class="content">
						<div>风采详情：</div>
						<div class="content_item" v-html="content"></div>
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
				title:"",
				content:"",
				img:"",
				u_name:""
			}
		},
		methods:{
			// 获取数据
			getdata(){
				var that = this;
				djxc.zbfcDetail(that.$route.query.id).then(res => {
					that.title = res.data.title!=""?res.data.title:'暂无标题'
					that.content = res.data.content!=""?res.data.content:'暂无数据'
					that.u_name = res.data.u_name!=""?res.data.u_name:'暂无数据'
					that.img = res.data.img!=""?res.data.img.search("http")!=-1?res.data.img:'http://'+res.data.ym+'/'+res.data.img:'暂无数据'
				})
			},
			// 编辑
			goedit(){
				var that = this;
				that.$router.push({
					path:"/zbfc_add",
					query:{
						id:that.$route.query.id,
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
	.wrap1{
		width: 100%;
		height: 100%;
		position: relative;
		color: $index_color;
		font-size: index_size1;
		.detail_title{
			font-size: 18px;
			margin-bottom: 10px;
			font-weight: bold;
		}
		.pub_time{
			font-size: 14px;
		}
		.content{
			margin-top: 20px;
			.content_item{
				width: 70%;
				line-height: 40px;
				padding: 50px 50px;
				box-sizing: border-box;
				background: #FAFBFC;
				margin-top: 20px;
				border: 1px solid #DDE2EE;
				img{
					width: 100%;
					margin: 10px auto;
				}
			}
		}
		.zbfcDetail{
			display: flex;
			height: 180px;
			width: 100%;
			.left_img{
				width: 280px;
				height: 100%;
				background: #DDDDDD;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.right_words{
				margin:0 20px;
				flex: 1;
			}
		}
	}
</style>
