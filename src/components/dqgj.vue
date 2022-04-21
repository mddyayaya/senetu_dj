<template>
    <div class="dqgj">
        <Tit title="党群共建" :more="false"></Tit>  
        <div class="dqgj_list">
            <div class="dqgj_item" :key="index" v-for="(item,index) in dqgj">
                <img class="icon" :src="item.icon" alt="" />
                <div class="word">{{item.title}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Tit from './small_title.vue'
    export default {
        data(){
            return{
                dqgj:[
                    {title:"党建带动",icon:require('@/assets/dqgj1.png')},
                    {title:"服务互助",icon:require('@/assets/dqgj2.png')},
                    {title:"业务发展",icon:require('@/assets/dqgj3.png')}
                ]
            }
        },
        components:{Tit}
    }
</script>


<style scoped lang="scss">
    .dqgj{
        width:100%;
        margin-bottom: 1vh;
        .dqgj_list{
            display: flex;
            justify-content: space-between;
            .dqgj_item{
                cursor: pointer;
                width: 8.4vw;
                text-align: center;
                color: #fff;
                font-size: 1.6vh;
                .icon{
                    width: 9.5vh;
                    height: 9.5vh;
                    margin-bottom: 1vh;
                    border-radius: 50%;
                }
                .word{
                    border-radius: 0.5vh;
                    height: 4.1vh;
                    line-height: 4.1vh;
                    background: rgba(204,59,60,.35);
                    border: 0.2vh solid #CC3B3C;
                }
            }
            .dqgj_item:hover{
                color: #FCE496  !important;
                .word{
                    border: 0.2vh solid #FCE496 !important;
                }
            }
        }
    }
</style>