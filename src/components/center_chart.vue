<template>
    <div class="center_chart">
        <div class="charts">
            <div class="chart_name">党员年龄分布</div>
            <div class="chartitem">
                <douChart :barWidth="15" :max="10" :show="false" :lineData="lineData" id="ages" height="100%" :datas="data"></douChart>  
            </div>
        </div>
        <div class="charts">
            <div class="chart_name">党员性别比例</div>
            <div class="chartitem chartperson">
                <div class="person">
                    <waterChart :max="1" :data="0.5" id="man"></waterChart>
                    <div>男:90%</div>
                </div>
                <div class="person">
                    <waterChart :max="1" :data="0.6"  id="woman"></waterChart>
                    <div>女:10%</div>
                </div>
            </div>
        </div>
        <div class="charts">
            <div class="chart_name">党员学历分布</div>
            <div class="chartitem">
                <douChart :barWidth="15" :max="10" :show="false" :lineData="lineData" id="edu" height="100%" :datas="data"></douChart>  
            </div>
        </div>
    </div>
</template>

<script>
    import Tit from './small_title.vue'
    import douChart from './charts/douChart.vue'
    import waterChart from './charts/waterChart.vue'
    export default{
        props:{
            
        },
        data(){
            return{
                data:[5,1,8,9],
                lineData:["18-30","31-40","41-50","50以上"]
            }
        },
        components:{Tit,douChart,waterChart}
    }
</script>


<style scoped lang="scss">
    .center_chart{
        width: 100%;
        margin-top: 3vh;
        margin-bottom: 2vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .charts{
            overflow: hidden;
            width: 32.5%;
            height: 16.2vh;
            text-align: center;
            background: url(~@/assets/chart_bg.png) no-repeat;
            background-size: 100% 100%;
            padding: 11px 20px;
            .chart_name{
                width: 100%;
                font-weight: bold;
                color: #FFFFFF;
                line-height: 2vh;
                letter-spacing: 0.1vh;
                background: linear-gradient(180deg, #FFFFFF 0%, #D1D1D1 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .chartitem{
                margin-top: 1vh;
                height: 10.5vh;
                overflow: hidden;
            }
            .chartperson{
                color: #FFFFFF;
                font-size: 1.3vh;
                text-align: center;
                display: flex;
                justify-content: space-between;
                align-content: flex-start;
            }
        }   
    }
</style>