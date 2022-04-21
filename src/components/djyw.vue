<template>
    <div class="shyk">
        <Tit title="党建要闻" :more="true"></Tit>
        <div class="lists">
            <div class="header">
                <div>序号</div>
                <div>主题</div>
                <div>时间</div>
            </div>
            <div class="swiper swiper-container djyw" >
                <div class="swiper-wrapper">
                    <div class="items swiper-slide" :key="index" v-for="(item,index) in 4">
                        <div>{{index+1}}</div>
                        <div>举办活动</div>
                        <div>2022-03-21</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Tit from './small_title.vue'
	import Swiper from 'swiper';
    let that;
    export default{
        data(){
            return{
                mySwiper:null
            }
        },
        components:{Tit},
        created(){that = this},
        mounted(){
            that.mySwiper = null;
            that.$nextTick(()=>{
                that.mySwiper = new Swiper('.djyw', {
                    autoplay: {
                        delay:0,
                        disableOnInteraction:false,
                        pauseOnMouseEnter:true
                    },
                    speed:1000,
                    direction:'vertical',
                    slidesPerView:4,
                    loop:true,
                    observer:true,
                    observeParents:true
                });
            })
        },
    }
</script>


<style scoped lang="scss">
    .header{
        width: 100%;
        display: flex;
        padding: 0 1.6vh;
        justify-content: space-between;
        background: linear-gradient(180deg, rgba(237, 12, 12, 0.8) 0%, rgba(251, 88, 88, 0.35) 100%);
        >div{
            font-size: 1.8vh;
            color: #fff;
            width: 100%;
            height: 3.8vh;
            line-height: 3.8vh;
        }
        >div:nth-child(1){
             width: 20%;
        }
        >div:nth-child(2){
            flex: 1;
        }
        >div:nth-child(3){
            width: 30%;
        }
    }
    .djyw{
        width: 100%;
        overflow: hidden;
        height:  16vh !important;
        .swiper-wrapper{
            transition-timing-function: linear !important;
        }
    }
    .items{
        cursor: pointer;
        width: 100%;
        display: flex;
        padding: 0 1.6vh;
        justify-content: space-between;
        color: #fff;
        line-height: 3.8vh !important;
        font-size: 1.4vh;
        >div:nth-child(1){
             width: 20%;
        }
        >div:nth-child(2){
            flex: 1;
        }
        >div:nth-child(3){
            width: 30%;
        }
    }
    .items:hover{
        color:   #FAD97A !important;
    }
    .items:nth-child(odd){
        background: rgba(204, 59, 60, 0.35);
    }
</style>