<template>
	<div class="barWrap">
		<!-- 顶部 -->
		<div class="topbar">
			<div class="logo">
				<img src="../../assets/images/logo.png" alt="">
			</div>
			<div class="menu">
				<div class="menu_item" 
					v-for="(item,index) in top_bar"
					:class="{menu_item_select:topIndex==item.id}"
					@click="changeTop(item.id,item.path)">
					{{item.title}}
				</div>
			</div>
			<div class="userinfo">
				<div class="userinfo_pic"></div>
				<div class="userinfo_name">{{$store.state.userinfo.dw}}</div>
				<div class="userinfo_exit">
				  <el-button type="primary" @click="exitsys">退出</el-button>
				</div>
			</div>
		</div>
		<div class="bottom">
			<!-- 左侧 -->
			<div class="slidebar">
				<div class="unilogo">
					<img :src="selectIcon">
					<span>{{leftTitle}}</span>
				</div>
				<div class="leftbar">
					<el-menu
						:default-active="activeIndex"
						ref="leftbar"
						router
						@select="handle"
						class="el-menu-vertical-demo"
						active-text-color="#bb0000">
						<div v-for="(items,index) in slide_menu">
							<el-menu-item
								:index="items.path" 
								v-if="!items.child">
								<span slot="title">{{items.name}}</span>
							</el-menu-item>
							<el-submenu v-else :index="items.path">
								<template slot="title">
									<span>{{items.name}}</span>
								</template>
								<el-menu-item-group>
									<el-menu-item :index="itemss.path"  v-for="(itemss,index) in items.child">{{itemss.name}}</el-menu-item>
								</el-menu-item-group>
							</el-submenu>
						</div>
						<el-menu-item
							index="/mbkh" 
							v-if="topIndex == 3&&$store.state.userinfo.dwid==716">
							<span slot="title">党员考核</span>
						</el-menu-item>
					</el-menu>
				</div>
			</div>
			<!-- 右侧 -->
			<div class="rightcontent">
				<router-view @selectTop="selectTop"></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import { userControl } from '@/axios'
	export default{
		data(){
			return{
				selectIcon:require("@/assets/images/djxc_icon.png"),
				topIndex:'1',
				leftTitle:'组织概况',
				messNum:1,
				activeIndex:"",
				top_bar:[
					{
						id:1,
						path:'/zbgk',
						title:"组织概况",
						icon:""
					},
					{
						id:2,
						path:'/djxc_ywzx',
						title:"党建宣传",
						icon:require("@/assets/images/djxc_icon.png")
					},
					{
						id:3,
						path:this.$store.state.userinfo.flag!=3?'/dzz':'dftj',
						title:"党务管理",
						icon:require("@/assets/images/dwgl.png")
					},
					{
						id:4,
						path:'/ldbz',
						title:"党员管理",
						icon:require("@/assets/images/xxjy_icon.png")
					},
					{
						id:5,
						path:'/zbxxjl',
						title:"学习教育",
						icon:require("@/assets/images/xxjy_icon.png")
					},
					{
						id:6,
						path:'/rcbg_fbtz',
						title:"日常办公",
						icon:require("@/assets/images/rcbg_icon.png")
					},
					{
						id:7,
						path:'/xtsz_dlrz',
						title:"系统设置",
						icon:require("@/assets/images/xtsz_icon.png")
					},
				],
				slide_menu:[]
			}
		},
		methods:{
			// 退出系统
			exitsys(){
				var that = this;
				localStorage.clear();
				that.$router.go('/')
			},
			// 左侧导航
			slideBar(index){
				var that = this;
				userControl.slide_bar({
					flag:that.$store.state.userinfo.flag,
					user_id:that.$store.state.userinfo.id,
				}).then(res => {
					that.slide_menu = res.data[index-1].child;
				})
			},
			// 左侧导航方法
			handle(index){
				this.activeIndex = index;
			},
			// 点击顶部改变左侧导航
			changeTop(index,path){
				var that = this;
				if(index != 1){
					$('.slidebar').css({
						'margin-left':'0'
					})
					that.selectIcon = that.top_bar[index-1].icon;
					that.leftTitle = that.top_bar[index-1].title;
				}else{
					$('.slidebar').animate({
						'margin-left':'-200px'
					},300)
				}
				that.$router.push(path)
			},
			// 子页面顶部导航渲染
			selectTop(index){
				var that = this;
				that.topIndex = index;
				that.slideBar(index);
				setTimeout(() => {
					// that.handle(that.top_bar[index-1].path)
				},300)
				that.selectIcon = that.top_bar[index-1].icon;
				that.leftTitle = that.top_bar[index-1].title;
				if(index != 1){
					$('.slidebar').css({
						'margin-left':'0'
					})
				}else{
					$('.slidebar').css({
						'margin-left':'-200px'
					})
				}
			}
		},
		mounted() {
			var that = this;
			if(that.topIndex != 1){
				$('.slidebar').animate({
					'margin-left':'0'
				},300)
				that.slideBar(that.topIndex);
			}else{
				$('.slidebar').css({
					'margin-left':'-200px'
				})
			}
		}
	}
</script>

 <style lang="scss">
	.topbar{
		z-index: 10;
		position: fixed;
		top: 0;
		left: 0;
		color: #333333;
		display: flex;
		background: #fff;
		justify-content: space-between;
		padding: 0 20px;
		box-sizing: border-box;
		align-items: center;
		width: 100%;
		height: 60px;
		font-size: 1em;
		box-shadow: 0px 2px 5px 0px rgba(30, 33, 41, 0.1);
		.logo{
			width: 17%;
			height: 45px;
			img{
				height: 100%;
			}
		}
		.menu{
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			width: 56%;
			&_item{
				line-height: 60px;
				cursor: pointer;
				padding: 0 1%;
				margin: 0 0 0 3%;
				font-size: 16px;
				border-bottom:2px solid rgba($color: #000000, $alpha: 0);
			}
			&_item:hover{
				border-bottom: 3px solid #BB0000;
			}
			&_item_select{
				border-bottom: 3px solid #BB0000 !important;
			}
		}
		.userinfo{
			display: flex;
			flex: 1;
			align-items: center;
			justify-content: flex-end;
			&_pic{
				width: 40px;
				height: 40px;
				background: url(../../assets/images/morenimg.png) no-repeat;
				background-size: 100% 100%;
			}
			&_name{
				font-size: 16px;
				margin:0 5px;
			}
		}
		.el-menu-item{
			font-size: 16px !important;
			padding: 0 1% !important;
			margin: 0 2% !important;
		}
	}
	.bottom{
		width: 100%;
		height: 100%;
		position: fixed;
		display: flex;
		justify-content: space-between;
		left: 0;
		top: 0px;
		padding-top: 60px;
		box-sizing: border-box;
		.slidebar{
			width: 200px;
			height: 100%;
			overflow-y: scroll;
			overflow-x: hidden;
			background: #fff;
			box-shadow: 2px 0px 4px 0px rgba(0, 0, 0, 0.1);
			.el-menu{
				border-right: none !important;
			}
			.el-submenu{
				.el-submenu__title{
					padding-left: 35px !important;
				}
				.el-menu-item{
					padding-left: 55px !important;
				}
			}
			.el-submenu__title{
				font-size: 16px !important;
			}
			.el-submenu__title:hover{
				background-color: none !important;
			}
			.el-menu-item{
				min-width: 100px;
				padding-left: 30px !important;
				padding-right: 0px !important;
				font-size: 16px;
				border-left:#fff solid 5px;
			}
			.el-menu-item.is-active {
				border-left:#BB0000 solid 5px !important;
				background: none;
			}
			.el-menu-item:hover{
				border-left:#BB0000 solid 5px !important;
				background-color: rgba($color: #000000, $alpha: 0) !important;
				color: #BB0000 !important;
			}
			.unilogo{
				width: 80%;
				height: 45px;
				margin: 15px auto;
				display: flex;
				align-items: center;
				justify-content: center;
				img{
					height: 35px;
					width: 35px;
					margin-right: 10px;
				}
				span{
					
				}
			}
		}
		.rightcontent{
			height: 100%;
			overflow: hidden;
			flex: 1;
			.el-table td, .el-table th{
				padding: 5px 0 !important;
			}
		}
	}
 </style>