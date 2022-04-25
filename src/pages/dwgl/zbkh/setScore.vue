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
                            <div class="zbname">
                                {{zbname}}
                            </div>
                        </div>
						<div class="rightBar">
                            <span style="color:#2A82E4;font-size:16px;margin-right:20px">当前季度共扣分：{{total}}分</span>
							<el-button type="primary" @click="$router.go(-1)">返回上级</el-button>
						</div>
					</div>
                    <div class="main_wrap">
                        <div class="main_part" :key="item.id" v-for="(item,index) in scoreList">
                            <div class="main_part_title">{{item.name}}({{item.score}})</div>
                            <div class="main_part_item">
                                <div class="main_part_items" :key="items.id" v-for="items in item.role">
                                    <i class="el-icon-success" @click="items.status=0;items.score = 0" style="color:#43CF7C" v-if="items.status==1"></i>
                                    <i class="el-icon-error" @click="items.status=1;items.score = 0" style="color:#ff0000" v-else></i>
                                    {{items.name}}
                                    <input type="number" 
                                    :max="0"
                                    v-model="items.score"
                                    v-if="items.status==0" :disabled="items.type == 0?true:false" >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="shuoming">说明：分数每季度清算一次</div>
                    <div class="submit">
                        <el-button type="primary" size="small" @click="submit">保存</el-button>
                    </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    let that;
    import {dwgl} from '@/axios'
	export default{
		data(){
			return{
				zbname:"一线党支部",
                scoreList:[]
			}
		},
        computed:{
            total(){
                let totals = 0
                that.scoreList.forEach(item => {
                    item.role.forEach(items => {
                        totals += parseFloat(items.score)
                    })
                });
                console.log(totals)
                return totals
            }
        },
		methods:{
			getScoreList(){
                dwgl.starSelectApproval({
                    year:that.$route.query.year,
                    zbid:that.$route.query.uid,
                    quarter:that.$route.query.quarter,
                }).then(res => {
                    if(res.code == 200){
                        that.scoreList = res.data;
                    }else{
                        Message.error(res.msg)
                    }
                    console.log(res)
                })
            },
            submit(){
                let arr = [];
                that.scoreList.forEach(item => {
                    arr.push(item.role)
                })
                dwgl.starDoApproval({
                    dwid:that.$store.state.userinfo.dwid,
                    uid:that.$route.query.uid,
                    year:that.$route.query.year,
                    quarter:that.$route.query.quarter,
                    score:that.total,
                    scoreList:arr
                }).then(res => {
                    if(res.code == 200){
                        that.getScoreList();
                    }else{
                        Message.error(res.msg)
                    }
                })
            }
		},
		mounted() {
            that.getScoreList();
		},
		created() {
		    that = this;
			that.$emit('selectTop',3)
		}
	}
</script>

<style lang="scss" scoped="scoped">
    .zbname{
        font-size: 16px;
        font-weight: bold;
        padding-bottom: 10px;
        border-bottom: 2px solid #bb0000;
    }
    .main_part{
        margin-top: 30px;
        width: 100%;
        border-bottom: 1px solid #A6A6A6;
        padding-bottom: 20px;
        .main_part_title{
            font-size: 16px;
            font-weight: bold;
        }
        &_item{
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            .main_part_items{
                font-size: 14px;
                margin-right: 50px;
                line-height: 70px;
                input{
                    width: 60px;
                    height: 20px;
                    text-align: center;
                    color: #2A82E4;
                    font-size: 14px;
                    border: 1px solid #D43030;
                    border-radius: 50px;
                }
            }
            .nopass{
                i{
                    color: #D43030;
                }
                input{
                    display: inline-block;
                }
            }
            .pass{
                i{
                    color: #43CF7C;
                }
            }
        }
    }
    .shuoming{
        font-size: 14px;
        color: #ededed;
        margin: 10px 0;
    }
    .submit{
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>

