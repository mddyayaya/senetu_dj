<template>
	<div class="wrap">
		<div class="navbar">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>党务管理</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="datawrap">
			<div class="datatable">
				<div class="datas">
					<div class="selectbar">
						<div class="leftBar">
						    <div class="selectSwitch">{{$route.query.u_name}}</div>
						</div>
						<div class="rightBar rightBars">
                            <div class="totals">当前季度得分:{{total_score}}</div>
							<el-button type="primary" @click="clearNum">积分清零</el-button>
							<el-button type="primary" @click="$router.go(-1)">返回 </el-button>
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
                                    align="center"
									prop="types[0].title"
									label="党性修养">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.types[0].title}}</span>
                                        <input class="setscore" type="number"
                                        :min="0"
                                        v-model="scope.row.types[0].score">
                                    </template>
								</el-table-column>
								<el-table-column
                                    align="center"
									prop="types[1].title"
									label="岗位履职">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.types[1].title}}</span>
                                        <input v-if="scope.row.types[1].title" 
                                        :min="0"
                                        class="setscore" type="number" v-model="scope.row.types[1].score">
                                    </template>
								</el-table-column>
								<el-table-column
                                    align="center"
									prop="types[2].title"
									label="作用发挥">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.types[2].title}}</span>
                                        <input v-if="scope.row.types[2].title" 
                                        :min="0"
                                        class="setscore" type="number" v-model="scope.row.types[2].score">
                                    </template>
								</el-table-column>
								<el-table-column
                                    align="center"
									prop="types[3].title"
									label="加分项">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.types[3].title}}</span>
                                        <input v-if="scope.row.types[3].title" 
                                        :min="0"
                                        class="setscore" type="number" v-model="scope.row.types[3].score">
                                    </template>
								</el-table-column>
								<el-table-column
                                    align="center"
									prop="types[4].title"
									label="扣分项">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.types[4].title}}</span>
                                        <input v-if="scope.row.types[4].title" 
                                        :max="0"
                                        class="setscore" type="number" v-model="scope.row.types[4].score">
                                    </template>
								</el-table-column>
							</el-table>
						</template>
                        <div class="save_btn">
                            <el-button type="primary"  @click="submit">保存</el-button>
                        </div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import {biaozhun} from './datas'
    import {dwgl} from '@/axios'
	let that;
	export default{
		data(){
			return{
                tableData:biaozhun,
			}
		},
        computed:{
            total_score(){
                let total = 0
                that.tableData.forEach(item => {
                    item.types.forEach(val => {
                        total+=parseInt(val.score)
                    })
                });
                return total
            }
        },
		methods:{
            getList(){
                dwgl.memberSelectStar({
                    uid:that.$route.query.u_id,
                    quarter:that.$route.query.quarter,
                    year:that.$route.query.year,
                }).then(res => {
                    console.log(res)    
                })
            },
			// 积分清零
			clearNum(){
                
			},
            // 
            submit(){
                let role = []
                 that.tableData.forEach(item => {
                    item.types.forEach(val => {
                        if(val.title!=""){
                            role.push({
                                id:val.id,
                                score:val.score,
                            })
                        }
                    })
                });
                dwgl.memberDoStar({
                    zbid:that.$route.query.uid,
                    uid:that.$route.query.u_id,
                    score:that.total_score,
                    quarter:that.$route.query.quarter,
                    year:that.$route.query.year,
                    role:role
                }).then(res => {

                })
            }
		},
		mounted() {
            that.getList();
		},
		created() {
			that = this;
			that.$emit('selectTop',3)
		}
	}
</script>

<style lang="scss" scoped="scoped">
    .selectSwitch{
        color: #333;
        font-weight: bold;
        line-height: 50px;
        border-bottom: 2px solid #bb0000;
    }
    .setscore{
        margin-left: 10px;
        height: 28px;
        width: 80px;
        font-size: 14px;
        color: #333;
        text-align: center;
        border: 1px solid #bb0000;
        border-radius: 20px;
    }
    .rightBars{
        display: flex;
        align-items: center;
        .totals{
            color: #2A82E4;
            font-size: 14px;
            margin-right: 40px;
        }
    }
    .save_btn{
        width: 100%;
        line-height: 60px;
        margin-top: 150px;
        text-align: center;
    }
</style>

