<template>
    <div class="animate">
		<div class="img">
			<img src="@/assets/3.png" >
		</div>
		<div class="img2">
			<img src="@/assets/2.png" >
		</div>
		<div class="img3">
			<img src="@/assets/1.png" >
		</div>
		<div class="img4">
			<img src="@/assets/4.png" >
		</div>
		<div class="img5">
			<img src="@/assets/5.png" >
		</div>
		<div class="img6">
			<img src="@/assets/6.png" >
		</div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .animate{
        position: fixed;
        left: 0;
        bottom: -12%;
        width: 100%;
        height: 100%;
        z-index: 10;
        .img{
            opacity: 0.6;
            position: absolute;
            left: 50%;
            bottom: -6vh;
            transform: translateX(-50%);
            width: 36vw;
            height: 36vw;
        }
        .img img{
            width: 100%;
            height: 100%;
            transform:  rotateX(80deg);
            animation: rotate 4s linear infinite;
        }
        @keyframes rotate{
            0% {
            transform:  rotateX(80deg) rotateZ(0);
            }
            100% {
            transform:  rotateX(80deg) rotateZ(360deg);
            }
        }
        @keyframes rotate1{
            0% {
            transform:  rotateX(80deg) rotateZ(0);
            }
            100% {
            transform:  rotateX(80deg) rotateZ(-360deg);
            }
        }
        .img2{
            opacity: 0.5;
            position: absolute;
            left: 50%;
            bottom: -20vh;
            transform: translateX(-50%);
            width: 49vw;
            text-align: center;
            height: 49vw;
        }
        .img2 img{
            width: 100%;
            height: 100%;
            transform:  rotateX(80deg);
            animation: rotate1 4s linear infinite;
        }
        @keyframes rotate2{
            0% {
            transform:  rotateX(80deg) rotateZ(0);
            }
            100% {
            transform:  rotateX(80deg) rotateZ(-360deg);
            }
        }
        
        .img3{
            opacity: 0.4;
            position: absolute;
            left: 50%;
            bottom: -17vh;
            transform: translateX(-50%);
            width: 39vw;
            text-align: center;
            height: 39vw;
        }
        .img3 img{
            width: 100%;
            height: 100%;
            transform:  rotateX(80deg);
            animation: rotate2 4s linear infinite;
        }
        @keyframes rotate3{
                0% {
                transform:  rotateX(80deg) rotateZ(0);
                }
                100% {
                transform:  rotateX(80deg) rotateZ(-360deg);
                }
        }
        
        .img4{
            opacity: 0.6;
            position: absolute;
            left: 50%;
            bottom: -40vh;
            transform: translateX(-50%);
            width: 65vw;
            text-align: center;
            height: 65vw;
        }
        .img4 img{
            width: 100%;
            height: 100%;
            transform:  rotateX(80deg);
            animation: rotate3 4s linear infinite;
        }
        @keyframes rotate4{
                0% {
                transform:  rotateX(80deg) rotateZ(0);
                }
                100% {
                transform:  rotateX(80deg) rotateZ(-360deg);
                }
        }
        
        .img5{
            opacity: 0.4;
            position: absolute;
            left: 50%;
            bottom: -51vh;
            transform: translateX(-50%);
            width: 75vw;
            text-align: center;
            height: 75vw;
        }
        .img5 img{
            width: 100%;
            height: 100%;
            transform:  rotateX(80deg);
            animation: rotate4 1s linear infinite;
        }
        @keyframes  rotate5{
                0% {
                transform:  rotateX(80deg) rotateZ(0);
                }
                100% {
                transform:  rotateX(80deg) rotateZ(360deg);
                }
        }
        
        .img6{
            position: absolute;
            left: 50%;
            bottom: -35vh;
            transform: translateX(-50%);
            width: 65vw;
            text-align: center;
            height: 65vw;
        }
        .img6 img{
            /* transform-style: preserve-3d; */
            width: 100%;
            height: 100%;
            transform:   rotateX(80deg);
            animation: rotate5 2s linear infinite;
        }
    }
</style>