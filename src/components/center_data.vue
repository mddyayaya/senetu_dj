<template>
    <div class="center_data">
        <div id="container">


        </div>
    </div>
</template>

<script>
    import BallBox from './anim/anim.js'
    import './anim/draw.js'
    let that;
    export default{
        data(){
            return{
                
            }
        },
        methods:{
            
        },
        created(){that = this},
        mounted(){
            var says=['撞三次改颜色','谁撞我','不想活了','来啊互相伤害','我要废了你','撞50次改大小','再撞下试试','试试就试试','窗前明月光','撞的心发慌','举头天花板','低头一肥皂'];
            var saysLength=says.length;
            var oC=document.getElementById('container');
            var mxwidth=oC.offsetWidth;
            var mxheight=oC.offsetHeight;

            var oB=new BallBox('container');
            console.log(oB)
            oB.ballRun();
            for(var i=0;i<15;i++){
                var b=rand(40,60);
                var x=rand(b,mxwidth-b);
                var y=rand(b,mxheight-b);
                var ball=new Ball({
                    'b':b,
                    'x':x,
                    'y':y,
                    'sx':rand(1,4),
                    'sy':rand(1,4),
                    'c':'url(img/paopao'+rand(1,6)+'.png)',
                    'opa':rand(60,100)/100,
                    'callBack':function(n){
                        //this.setB(rand(30,50));
                        //this.setM();
                        this.setOpa(rand(60,100)/100);
                        if(n%3==0){this.setC('url(img/paopao'+rand(1,6)+'.png)')};//撞三次改变下图片
                        if(n%50==0){
                            this.setB(rand(40+parseInt((n>1000?1000:n)/50),60+parseInt((n>1000?1000:n)/50)));
                        }//撞50次改大小
                        this.setHTML(says[rand(0,saysLength)]);
                    }
                });
                oB.addBall(ball);
            }
        },
    }
</script>


<style scoped lang="scss">
    .center_data{
        z-index: 1000;
        width: 100%;
        height: 50vh;
        overflow: hidden;
        #container{
            width: 100%;
            height: 100%;
        }
    }
    @keyframes run{
        0%{
            transform: translateX(0);
            left: -100%;
        }
        100%{
            transform: translateX(50vh);
            left: 0;
        }
    }
</style>