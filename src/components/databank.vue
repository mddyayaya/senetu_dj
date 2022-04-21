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
					<div class="type_class">分类专题</div>
					<div class="type_list">
						<div class="list_item" 
							:class="{select_item:class_id == item.id}"
							@click="class_id = item.id;" 
							v-for="item in leftlist">{{item.name}}</div>
					</div>
				</div>
				<div class="list">
					<div class="list_class">
						<div>
							<el-input style="width: 200px;" 
								@input="page=1;rightlist=[];datalist()"
								clearable
								placeholder="搜索资源" 
								v-model="title1"></el-input>
						</div>
					</div>
					<div class="list_lists" id="appWrap">
						<el-checkbox-group
							v-model="checkList"
							v-if="rightlist.length > 0">
							<li v-for="item in rightlist" v-show="class_id == item.class_id">
								<el-checkbox :label="item" :value="item">{{item.title}}</el-checkbox>
							</li>
						</el-checkbox-group>
						<div v-if="rightlist.length == 0">该分类下暂无资源</div>
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
	import { databank } from '@/axios'
	export default{
		data() {
			return{
				title:"资料库",
				checkList:[],
				searchBox:"",
				class_id:1,
				leftlist:[],
				rightlist:[],
				title1:""
			}
		},
		props:{
			dialogVisible:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			// 资料库左侧分类列表
			classList(){
				var that = this;
				databank.resouceClass().then(res => {
					that.leftlist = res.data;
					that.datalist()
				})
			},
			// 右侧资源列表
			datalist(){
				var that = this;
				databank.resouceList({
					title:that.title1
				}).then(res => {
					if(res.data.length > 0){
						that.rightlist = res.data;
					}else{
						that.rightlist = [];
					}
				})
			},
			closeEdit(){
				var that = this;
				that.checkList = [];
				that.class_id = 1;
				that.$emit("closeEdit");
			},
			submit(){
				var that = this,arr = [];
				for(var i=0;i<that.checkList.length;i++){
					var subdata = {
						title:that.checkList[i].title,
						rid:that.checkList[i].id,
						type:1,//资源库
						bs_id:that.checkList[i].bs_id
					};
					arr.push(subdata)
				}
				that.$emit("pushData",arr)
				that.$emit("closeEdit");
			},
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
				overflow-y: scroll;
				.el-checkbox-group{
					height: 100%;
					width: 100%;
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
