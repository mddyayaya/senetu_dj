<template>
    <div  class="wrapper">
        <div class="bigData">
            <div class="item_same">
                <zzgk></zzgk>
                <shyk></shyk>
                <hyjl title="会议记录"></hyjl>
            </div>
            <div class="center">
                <div class="center_top">
                    <div class="center_text">党建宣传展示平台</div>
                </div>
                <centerChart></centerChart>
                <centerData></centerData>
            </div>
            <div class="item_same">
                <dqgj></dqgj>
                <fczs :more="true"></fczs>
                <djyw :more="true"></djyw>
                <djgk :more="true"></djgk>
            </div>
        </div>
        <anim></anim>
        <anims></anims>
    </div>
</template>

<script>
    import zzgk from '@/components/zzgk.vue'
    import shyk from '@/components/shyk.vue'
    import hyjl from '@/components/hyjl.vue'
    import djyw from '@/components/djyw.vue'
    import djgk from '@/components/djgk.vue'
    import centerChart from '@/components/center_chart.vue'
    import centerSwpier from '@/components/center_swiper.vue'
    import centerData from '@/components/center_data.vue'
    import anim from '@/components/animate.vue'
    import dqgj from '@/components/dqgj.vue'
    import fczs from '@/components/fczs.vue'
    import anims from '@/components/earth/index.vue'
    export default{
        data(){
            return{
                
            }
        },
        components:{
            zzgk,shyk,
            hyjl,centerChart,
            centerSwpier,anim,
            dqgj,djyw,djgk,anims,fczs,
            centerData
        }
    }
</script>

<style lang="scss">
    .bigData{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 20;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        .item_same{
            padding: 1% 1%;
            margin: 2vh 1.8vh;
            width: 29vw;
            height: 96.5%;
            background: url(~@/assets/item_same.png) no-repeat;
            background-size: 100% 100%;
        }
        .center{
            flex: 1;
            height: 100%;
            overflow: hidden;
            .center_top{
                height: 10vh;
                display: flex;
                justify-content: center;
                text-align: center;
                background: url(~@/assets/center_top.png) no-repeat;
                background-size: 100% 100%;
                width: 100%;
                .center_text{
                    font-weight: bold;
                    color: #FFFFFF;
                    line-height: 8.5vh;
                    font-size: 4vh;
                    letter-spacing: 0.8vh;
                    background: linear-gradient(180deg, #FFFFFF 0%, #DEDEDE 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }
        }
    }
</style>
