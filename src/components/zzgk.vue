<template>
    <div class="zzgk">
        <Tit title="组织概况" :more="false"></Tit>  
        <div class="content">
            <img class="zbimg" :src="zbinfo.src" />    
            <div class="zbinfo">
                <div class="zb zbname">{{zbinfo.zbname}}</div>
                <div class="zb">书记：{{zbinfo.zbsj}}</div>
                <div class="zb">副书记：{{zbinfo.zbfsj}}</div>
                <div class="zb">
                    委员：
                    <span :key="index" v-for="(item,index) in zbinfo.wylist">{{item}}、</span>
                </div>
            </div>
        </div> 
        <div class="box">
            <div class="boxitem" :key="index" v-for="(item,index) in counts">
                <div>{{item.name}}</div>
                <div>
                    <img :src="item.icon" alt="">
                    <span>{{item.num}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Tit from './small_title.vue'
    export default {
        data(){
            return{
                zbinfo:{
                    src:"",
                    zbname:"一线党支部",
                    zbsj:"赵寒影",
                    zbfsj:"李勤勤",
                    wylist:["李明明","李雷雷","韩梅梅","刘强强"]
                },
                counts:[
                    {name:"组织数量统计",icon:require("@/assets/icon1.png"),num:17},
                    {name:"活动数量统计",icon:require("@/assets/icon2.png"),num:18},
                    {name:"集中学习课时",icon:require("@/assets/icon3.png"),num:21}
                ]
            }
        },
        components:{Tit}
    }
</script>


<style scoped lang="scss">
    .zzgk{
        width:100%;
        margin-bottom: 1.8vh;
        .content{
            display: flex;
            align-items: center;
            color: #fff;
            .zbimg{
                width: 8vh;
                height: 8vh;
                border-radius: 50%;
                background: #fff;
                margin-right: 1.5vw;
            }
            .zbinfo{
                line-height: 2.5vh;
                font-size: 1.3vh;
                .zbname{
                    font-size: 1.8vh;
                    font-weight: bold;
                }
            }
        }
        .box{
            display: flex;
            width: 100%;
            margin-top: 36px;
            align-items: center;
            justify-content: space-between;
            .boxitem{
                color: #fff;
                width: 8.3vw;
                height: 7.4vh;
                background: rgba(255, 250, 237, 0.15);
                border-radius: 10px;
                border: 2px solid #FFFFFF;
                text-align: center;
                >div:nth-child(1){
                    margin-top: 1vh;
                    font-size: 1.3vh;
                }
                >div:nth-child(2){
                    display: flex;
                    font-weight: bold;
                    margin-left: 0.5vw;
                    font-size: 2.2vh;
                    align-items: center;
                    justify-content: center;
                    margin-top: 0.5vh;
                    img{
                        height: 2.5vh;
                        margin-right: 0.3vw;
                    }
                }
            }
        }
    }
</style>