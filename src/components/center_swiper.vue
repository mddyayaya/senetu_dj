<template>
    <div class="center_swiper">
        <div class="swiper-container swipers">
            <div class="swiper-wrapper">
                <div class="swiper-slide" :key="index" v-for="(item,index) in 5">
                    <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F032120114622%2F200321114622-4-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651888449&t=7d13699a455ad0ac38848a99702e5015" alt="">
                </div>
            </div>
        </div>
        <div class="swiper-button-prev"></div><!--左箭头。如果放置在swiper外面，需要自定义样式。-->
        <div class="swiper-button-next"></div><!--右箭头。如果放置在swiper外面，需要自定义样式。-->
    </div>
</template>

<script>
	import Swiper, {Autoplay} from 'swiper';
    Swiper.use([Autoplay]);
    export default{
        props:{
            
        },
        mounted(){
            this.$nextTick( () => {
                var mySwiper = new Swiper('.swipers', {
                    speed:1000,
                    loop:true,
                    autoplay: {
                        delay:1000,
                        disableOnInteraction:false,
                        pauseOnMouseEnter:true
                    },//可选选项，自动滑动
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                });
            })
        },
        data(){
            return{
                
            }
        }
    }
</script>


<style scoped lang="scss">
    .center_swiper{
        position: relative;
        width: 100%;
        height: 36.5vh;
        .swipers{
            box-sizing: border-box;
            width: 32.7vw !important;
            height: 100% !important;
            margin: auto;
            background: url(~@/assets/swiper_bg.png) no-repeat;
            background-size: 100% 100%;
            overflow: hidden;
            .swiper-slide{
                overflow: hidden;
                padding: 0.5vh;
                width: 100%;
                height: 100%;
                img{
                    width: 100%;
                    height: 100%;
                    // object-fit: scale-down;
                }
            }
        }
        .swiper-wrapper{
            transition-timing-function: linear;
        }
        .swiper{
            --swiper-theme-color: #ff6600;/* 设置Swiper风格 */
            --swiper-navigation-color: #00ff33;/* 单独设置按钮颜色 */
            --swiper-navigation-size: 30px;/* 设置按钮大小 */
        }
    }
</style>