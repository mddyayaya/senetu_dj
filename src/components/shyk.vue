<template>
    <div class="shyk">
        <Tit title="三会一课" :more="false"></Tit>
        <div class="chart">
            <douChart :max="10" 
                :barWidth="18" 
                :lineData="lineData" id="shyk" height="20vh" :datas="data"></douChart>  
        </div>
    </div>
</template>

<script>
    import Tit from './small_title.vue'
    import douChart from './charts/douChart.vue'
    export default{
        props:{
            
        },
        data(){
            return{
                data:[5,1,8,9],
                lineData:["支部党员大会","支部委员会","党小组会","党课"]
            }
        },
        components:{Tit,douChart}
    }
</script>


<style scoped lang="scss">
    .chart{
        padding: 0 2vw;
    }
    .shyk{
        margin-bottom: 2vh;
    }
</style>