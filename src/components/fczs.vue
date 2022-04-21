<template>
    <div class="fczs">
        <Tit title="风采展示" :more="false"></Tit>  
        <div class="fc_wrap">
            <div class="fc_item">
                <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F052420110515%2F200524110515-2-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652516977&t=10dc0f1880162e6461590fd93b4c15c4" alt="">
            </div>
            <div class="fc_item">
                <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F052420110515%2F200524110515-2-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652516977&t=10dc0f1880162e6461590fd93b4c15c4" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    import Tit from './small_title.vue'
    export default {
        data(){
            return{
                
            }
        },
        components:{Tit}
    }
</script>


<style scoped lang="scss">
    .fczs{
        width:100%;
        margin-bottom: 1.8vh;
    }
    .fc_wrap{
        width: 100%;
        height: 15vh;
        display: flex;
        justify-content: space-between;
        .fc_item{
            padding: 0.3vh 0.3vh;
            background: url(~@/assets/swiper_bg.png) no-repeat;
            background-size: 100% 100%;
            height: 100%;
            width: 49%;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>