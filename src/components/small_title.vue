<template>
    <div class="icon">
        <div class="icons">
            <img src="@/assets/icon.png" alt="">
            <div class="title">{{title}}</div>
        </div>
        <div class="more" v-if="more">
            更多
        </div>
    </div>
</template>

<script>
    export default{
        props:{
            title:{
                type:String,
                default:""
            },
            more:{
                type:Boolean,
                default:false
            },
        },
        data(){
            return{

            }
        }
    }
</script>


<style scoped lang="scss">
    .icon{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: linear-gradient(180deg, #FDEEB2 0%, #FAD97A 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 1.6vh;
        margin-bottom: 1vh;
        .icons{
            display: flex;
            align-items: center;
            img{
                width: 4.5vh;
                height: 4.5vh;
            }
            .title{
                margin-left: 0.5vw;
                font-size: 2vh;
                font-weight: bold;
            }
        }
        .more{
            cursor: pointer;
        }
    }
</style>