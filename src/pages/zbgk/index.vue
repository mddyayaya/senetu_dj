<template>
	<div class="zzgk">
		<div class="zzgk_left">
		<EditDw ref="dialogFormVisible" :dialogFormVisible="dialogFormVisible" @closeEdit="dialogFormVisible = false"></EditDw>
			<div class="schoolbanner">
				<div class="zbpic"></div>
				<div class="zb">
					<div class="zbname">{{$store.state.userinfo.dw}}
						<span @click="dialogFormVisible = true" v-if="$store.state.userinfo.flag == 1">编辑</span>
					</div>
					<div class="zb_control">
						<div class="zbphone">负责人：{{$store.state.userinfo.head_name}}</div>
						<div class="zbedit">联系电话：{{$store.state.userinfo.head_phone}}</div>
					</div>
				</div>
			</div>
			<div class="zzqk">
				<div class="title">组织情况</div>
				<div class="zzqk_box">
					<div>
						<p><span>{{oragen.organ_count}}</span><span>支</span></p>
						<p>组织数量</p>
					</div>
					<div>
						<p><span>{{oragen.all_count}}</span><span>人</span></p>
						<p>组织人数</p>
					</div>
					<div>
						<p><span>{{oragen.formal_count}}</span><span>人</span></p>
						<p>正式党员</p>
					</div>
					<div>
						<p><span>{{oragen.dev_count}}</span><span>人</span></p>
						<p>发展党员</p>
					</div>
					<div>
						<p><span>{{oragen.activity_count}}</span><span>次</span></p>
						<p>本月活动</p>
					</div>
					<div>
						<p><span>{{oragen.study_count}}</span><span>次</span></p>
						<p>集中学习</p>
					</div>
				</div>
			</div>
			<div class="zzqk">
				<div class="title">工作台</div>
				<div class="gzt">
					<div @click="$router.push({path:'/djxc_ywzx'})">
						<div class="icon">
							<img src="../../assets/images/djxc_icon.png" >
						</div>
						<div class="word">党建宣传</div>
					</div>
					<div @click="$router.push({path:$store.state.userinfo.flag==1?'/dzz':'dftj'})">
						<div class="icon">
							<img src="../../assets/images/dwgl.png" >
						</div>
						<div class="word">党务管理</div>
					</div>
					<div @click="$router.push({path:'/ldbz'})">
						<div class="icon">
							<img src="../../assets/images/dygl_icon.png" >
						</div>
						<div class="word">党员管理</div>
					</div>
					<div @click="$router.push({path:'/zbxxjl'})">
						<div class="icon">
							<img src="../../assets/images/xxjy.png" >
						</div>
						<div class="word">学习教育</div>
					</div>
					<div @click="$router.push({path:'/xtsz_dlrz'})">
						<div class="icon">
							<img src="../../assets/images/xtsz.png" >
						</div>
						<div class="word">系统设置</div>
					</div>
				</div>
			</div>
			<div class="zzqk">
				<div class="title">活动记录/集中学习</div>
				<div class="jzxx">
					<div class="jzxxselect">
						<template>
							<span class="input_label">年份</span>
							<el-select clearable v-model="seletYear" placeholder="请选择" @change="getdata()">
								<el-option
									v-for="item in $yearList()"
									:label="item"
									:value="item">
								</el-option>
							</el-select>
						</template>
					</div>
					<div class="jzxxbox">
						<LineChart 
							id="jzxx"
							height="100%"
							width="100%"
							:max ='20'
							:min ='0'
							:lingdata='lingdata'>
						</LineChart>
						<div class="year">
							<div>{{seletYear}}</div>
							<div class="lengend">
								<div><span></span><span>集中学习</span></div>
								<div><span></span><span>组织活动</span></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="zzgk_right">
			<div class="calandor">
				<el-calendar v-model="time"></el-calendar>
				<div class="today" @click="time = new Date()">今天</div>
			</div>
			<div class="messbox">
				<div class="messbox_title">
					<span>
						<span><img src="../../assets/images/mess.png" ></span>
						未读消息</span>
				</div>
				<div class="messbox_list">
					<div class="mess_item" v-if="messList.length > 0" v-for="item in messList" @click="godetail(item)">
						<span>{{item.title}}</span>
						<span>查看</span>
					</div>
					<div class="nomess" v-if="messList.length == 0">
						<img src="@/assets/images/nomess.png" >
					</div>
				</div>
			</div>
			<div class="messbox">
				<div class="messbox_title">
					<span>
						<span>
							<img src="../../assets/images/mess.png" >
						</span>
						待办活动
					</span>
				</div>
				<div class="messbox_list">
					<div class="mess_item1" v-if="infoActivity.length > 0" v-for="item in infoActivity" @click="godetail(item)">
						<p>{{item.title}}</p>
						<p>查看</p>
					</div>
					<div class="nomess" v-if="infoActivity.length == 0">
						<img src="@/assets/images/notodo.png" >
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import LineChart from '@/components/charts/lineChart.vue'
	import pieChart from '@/components/charts/lineChart.vue'
	import EditDw from './components/Edit.vue'
	import { zzgk } from '@/axios/index'
	export default{
		data(){
			return{
				seletYear:new Date().getFullYear(),
				lingdata:{},
				time:"",
				oragen:{},
				messList:[],
				infoActivity:[],
				dialogFormVisible:false
			}
		},
		components:{
			LineChart,
			pieChart,
			EditDw
		},
		methods:{
			// 请求数据
			getdata(){
				var that = this;
				zzgk.zzgkData({
					user_id:that.$store.state.userinfo.id,
					flag:that.$store.state.userinfo.flag,
					year:that.seletYear
				}).then(res => {
					// 统计图
					setTimeout(function(){
						that.lingdata = {
							studyData:res.data.hyLog,
							activData:res.data.focus
						}
					},300)
					// 消息
					if(res.data.message.length > 0 || res.data.message != null){
						that.messList = res.data.message
					}else{
						that.messList = []
					}
					// 待办
					if(res.data.infoActivity.length > 0 || res.data.infoActivity != null){
						that.infoActivity = res.data.infoActivity
					}else{
						that.infoActivity = []
					}
					// 组织数量及人数
					that.oragen = {
						organ_count:res.data.organ_count!=null||res.data.organ_count!=0?res.data.organ_count:0, //组织数量
						all_count:res.data.all_count!=null||res.data.all_count!=0?res.data.all_count:0, //组织人数
						formal_count:res.data.formal_count!=null||res.data.formal_count!=0?res.data.formal_count:0, //正式党员
						dev_count:res.data.dev_count!=null||res.data.dev_count!=0?res.data.dev_count:0, //发展党员
						activity_count:res.data.activity_count!=null||res.data.activity_count!=0?res.data.activity_count:0, //本月活动
						study_count: res.data.study_count!=null||res.data.study_count!=0?res.data.study_count:0// 集中学习
					}
				})
			},
			// 消息详情
			godetail(data){
				var that = this;
				if(data.classs == 2){
					that.$router.push({
						path:'/gzhb_detail',
						query:{
							id:data.tid,
							zbid:data.zbid,
							flag:data.flag,
						}
					})
				}else if(data.classs == 1){
					that.$router.push({
						path:'/fbtz_detail',
						query:{
							id:data.tid
						}
					})
				}else{
					that.$router.push({
						path:"/zzhd_detaill",
						query:{
							hy_flag:data.hy_flag,
							hyid:data.hyid,
							dw:that.getdata.pub_user,
							uid:that.getdata.zbid,
						}
					})
				}
			}
		},
		mounted() {
			var that = this;
			that.getdata()
		},
		created() {
			var that = this;
			that.$emit('selectTop',1)
		}
	}
</script>
<style lang="scss" scoped>
	.zzgk{
		background: #fff;
		width: 98%;
		height: 96%;
		margin: 1% 1%;
		box-shadow: 0px 5px 5px 0px rgba($color: #000000, $alpha: 0.1);
		padding: 15px 20px;
		overflow-y: scroll;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		&_left{
			width: 75%;
			.schoolbanner{
				padding: 0 20px;
				box-sizing: border-box;
				height: 130px;
				display: flex;
				align-items: center;
				width: 100%;
				background: url(~@/assets/images/part.png) no-repeat;
				background-size: 100% 100%;
				.zbpic{
					height: 80px;
					width: 80px;
					margin-right: 10px;
					border-radius: 50%;
					border: 2px solid #fff;
					background: url(../../assets/images/morenimg.png) no-repeat;
					background-size: 100% 100%;
				}
				.zb{
					height: 80px;
					color: #fff;
					&name{
						font-size: 20px;
						font-weight: bold;
						letter-spacing: 1px;
						vertical-align: top;
						margin-top: 5px;
						span{
							cursor: pointer;
							border-radius: 4px;
							margin-left: 10px;
							vertical-align: top;
							display: inline-block;
							padding: 5px 15px;
							font-size: 14px;
							font-weight: 100;
							background: rgba(255,255,255,.3);
						}
					}
					&_control{
						display: flex;
						margin-top: 15px;
						font-size: 14px;
						letter-spacing: 1px;
						div:nth-child(2){
							margin-left: 100px;
						}
					}
				}
			}
			// 组织情况
			.zzqk{
				width: 100%;
				margin-top: 28px;
				&_box{
					width: inherit;
					display: flex;
					justify-content: space-between;
					&>div{
						margin-top: $indexMarginTop;
						height: 100px;
						width: 10%;
						padding: 0 2%;
						box-sizing: border-box;
						text-align: center;
						&>p{
							width: 100%;
						}
						&>p:nth-child(1){
							display: flex;
							justify-content: space-between;
							align-items: center;
							span:nth-child(1){
								font-size: $big_size;
								font-weight: $weight;
								color: $zzColor;	
							}
						}
						&>p:nth-child(2){
							color: $index_color;
							font-size: $index_size;
							margin-top: 10px;
						}
					}
					&>div:nth-child(5),>div:nth-child(6){
						>p:nth-child(1){
							span:nth-child(1){
								color: $otherColor;	
							}
						}
					}
				}
				// 工作台
				.gzt{
					width: 100%;
					display: flex;
					justify-content: space-between;
					&>div{
						cursor: pointer;
						width: 14%;
						padding: 0 3%;
						margin-top: $indexMarginTop;
						box-sizing: border-box;
						height: 140px;
						box-shadow: 0px 5px 10px 0px rgba(30, 33, 41, 0.1);
						border-radius: 4px;
						&:hover{
							box-shadow: 0px 5px 10px 0px rgba(30, 33, 41, 0.3);
						}
						.word{
							width: 100%;
							font-size: $index_size1;
							font-weight: $weight;
							color: $index_color;
							text-align: center;
							margin-top: 20px;
						}
						.icon{
							height: 36px;
							width: 100%;
							padding-top: 30px;
							text-align: center;
							img{
								height: 100%;
							}
						}
					}
				}
				// 集中学习
				.jzxx{
					margin-top: $indexMarginTop;
					width: 100%;
					&select{
						width: 100%;
						height: 80px;
					}
					&box{
						width: 100%;
						height: 400px;
						box-shadow: 0px 5px 10px 0px rgba(30, 33, 41, 0.1);
						display: flex;
						.year{
							padding: 20px 20px;
							font-size: 20px;
							color: $index-color;
						}
						.lengend{
							font-size: 16px;
							margin-top: 180px;
							width: 100px;
							div{
								margin-top: 15px;
								span:nth-child(1){
									height: 5px;
									width: 5px;
									border-radius: 50%;
									display: inline-block;
									background-color:#1266E3;
									vertical-align: middle;
									margin-right: 10px;
								}
							}
							div:nth-child(2){
								span:nth-child(1){
									background-color:#00BB67;
								}
							}
						}
					}
				}
			}
		}
		&_right{
			border-left: 1px solid #DDE2EE;
			padding-left: 1%;
			box-sizing: border-box;
			width: 24%;
			.calandor{
				width: 100%;
				.today{
					cursor: pointer;
					width: 100%;
					height: 40px;
					margin-top: 10px;
					border-top: 1px solid #eeeeee;
					border-bottom: 1px solid #eeeeee;
					text-align: center;
					line-height: 40px;
					color: #BB0000;
					font-size: $index_size1;
					font-weight: $weight;
				}
			}
			// 消息
			.messbox{
				width: 100%;
				&_title{
					height: 42px;
					padding: 0 10px;
					display: flex;
					box-sizing: border-box;
					justify-content: space-between;
					align-items: center;
					background: #F6F7F9;
					border-bottom: 1px solid #E5E9EF;
					span:nth-child(1){
						font-size: $index-size1;
						color: $index-color1;
						font-weight: $weight;
						display: flex;
						align-items: center;
						letter-spacing: $letterSpace;
						img{
							height: 25px;
							width: 25px;
							margin-right: 5px;
						}
					}
					span:nth-child(2){
						font-size: $index-size;
						color: $zzColor;
						letter-spacing: $letterSpace;
					}
				}
				&_list{
					min-height: 258px;
					max-height: 370px;
					overflow-y: scroll;
					.mess_item{
						cursor: pointer;
						font-size: 14px;
						display: flex;
						justify-content: space-between;
						height: 100%;
						line-height: 50px;
						padding: 0 10px;
						box-sizing: border-box;
						border-top: 1px solid #E5E9EF;
						color: #1266E3;
						span:nth-child(1){
							width: 85%;
							color: #333;
							height: 100%;
							letter-spacing: 2px;
							overflow: hidden;
							display: -webkit-box;
							word-break: break-all;
							text-overflow: ellipsis;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
						}
					}
					.mess_item:nth-child(1){
						border-top: none;
					}
					.mess_item1{
						display: flex;
						justify-content: space-between;
						align-items: center;
						cursor: pointer;
						border-top: 1px solid #E5E9EF;
						padding: 0 10px 10px 10px;
						box-sizing: border-box;
						:hover{
							opacity: 0.8;
						}
						p:nth-child(1){
							flex: 1;
							line-height: 30px;
							color: #3C4353;
							font-size: 14px;
							letter-spacing: 2px;
							overflow: hidden;
							display: -webkit-box;
							word-break: break-all;
							text-overflow: ellipsis;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
						}
						p:nth-child(2){
							width: 30px;
							font-size: 12px;
							color: #838A9D;
							margin-top: 5px;
						}
					}
					.mess_item1:nth-child(1){
						border-top: none;
					}
					.nomess{
						width: 200px;
						margin: auto;
						margin-top: 20px;
						img{
							width: 100%;
						}
					}
				}
			}
		}
	}
</style>