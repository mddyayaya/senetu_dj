<template>
	<div class="addzz">
		<el-dialog 
			class="zzgk"
			:modal-append-to-body='true'
			width="900px"
			center
			:append-to-body='true'
			@close="closeEdit"
			:visible.sync="dialogVisible">
			<div slot="title" class="addtitle">
				<div>
					<i class="icon adddzz"></i>
					{{title}}
					<div class="addline"></div>
				</div>
			</div>
			<div class="databank">
				<div class="type">
					<div class="type_class">试题分类</div>
					<div class="type_list">
						<div class="list_item" 
							:class="{select_item:class_id == item.id}"
							@click="class_id = item.id" 
							v-for="item in leftlist">{{item.name}}</div>
					</div>
				</div>
				<div class="list">
					<div class="list_class">
						<div>
							<el-input style="width: 200px;" 
								@input="getdata1.page=1;datalist();"
								placeholder="搜索试题" v-model="getdata1.title"></el-input>
						</div>
					</div>
					<div class="list_lists">
						<el-checkbox-group v-model="checkList">
							<li v-for="item in rightlist" v-show="class_id == item.class_id">
								<el-checkbox :label="item" :value="item">{{item.title}}</el-checkbox>
							</li>
						</el-checkbox-group>
					</div>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submit()">保 存</el-button>
				<el-button @click="closeEdit()">取 消</el-button>
			</div>
		</el-dialog>
		<div class="loading">
			
		</div>
	</div>
</template>

<script>
	import { xxjy } from '@/axios'
	export default{
		data() {
			return{
				title:"试题库",
				checkList:[],
				getdata:{
					id: this.$store.state.userinfo.id,
					flag: this.$store.state.userinfo.flag,
					title: "",
					status:""
				},
				getdata1:{
					dwid: this.$store.state.userinfo.id,
					flag: this.$store.state.userinfo.flag,
				},
				class_id:"",
				totalPage:0,
				leftlist:[],
				rightlist:[]
			}
		},
		props:{
			dialogVisible:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			// 左侧试题分类
			classList(){
				var that = this;
				xxjy.questionClassList(that.getdata).then(res => {
					that.leftlist = res.data;
					that.class_id = that.leftlist[0].id;
					that.datalist();
				})
			},
			// 右侧资源列表
			datalist(){
				var that = this;
				xxjy.allQuestionList(that.getdata1).then(res => {
					that.rightlist = res.data;
				})
			},
			closeEdit(){
				var that = this;
				that.checkList = [];
				that.$emit("closeEdit");
			},
			submit(){
				var that = this;
				that.$emit("pushData",that.checkList)
				that.$emit("closeEdit");
			},
			// 编辑绑定
			bindData(data){
				
			},
			// 分页筛选
			changedata(current){
				var that = this;
				that.getdata1.page = current;
				that.datalist()
			}
		},
		mounted() {
			this.classList();
		}
	}
</script>

<style lang="scss">
	.databank{
		width: 100%;
		height: 400px;
		display: flex;
		box-sizing: border-box;
		justify-content: space-between;
		.type{
			height: 100%;
			overflow-y: scroll;
			overflow-x: hidden;
			width: 25%;
			padding: 10px;
			box-sizing: border-box;
			border: 1px solid #DDDDDD;
			&_class{
				line-height: 40px;
				font-size: 16px;
				color: #333;
				font-weight: bold;
				border-bottom: 1px solid #DDDDDD;
			}
			&_list{
				width: 100%;
				margin-top: 5px;
				height: 330px;
				overflow-y: scroll;
				.list_item{
					padding: 0 20px;
					cursor: pointer;
					line-height: 40px;
					overflow: hidden;
					font-size: 14px;
				}
				.list_item:hover{
					background-color: rgba(187, 0, 0, 0.15);
				}
				.select_item{
					background-color: rgba(187, 0, 0, 0.15);
				}
			}
		}
		.list{
			height: 100%;
			margin-left: 2%;
			width: 74%;
			padding: 10px;
			box-sizing: border-box;
			border: 1px solid #DDDDDD;
			&_class{
				height: 40px;
				line-height: 40px;
				padding-bottom: 10px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			&_lists{
				width: 100%;
				height: 330px;
				.el-checkbox-group{
					height: 100%;
					width: 100%;
					overflow-y: scroll;
					.el-checkbox{
						display: block !important;
						padding: 0 20px;
						cursor: pointer;
						line-height: 40px;
						overflow: hidden;
						font-size: 14px;
					}
				}
			}
		}
	}
	.el-dialog--center .el-dialog__body{
		padding-top: 0 !important;
		padding-bottom: 0 !important;
	}
</style>
