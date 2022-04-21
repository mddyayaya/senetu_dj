<template>
  <div>
      <div class="earth" id="earth"></div>
      <div class="earth1" id="earth1"></div>
  </div>
</template>

<script>
import aa from './index.js'
export default {
    data(){
        return{
            chart:null
        }
    },
    methods:{

    },
    mounted(){
        this.chart = this.$echarts.init(document.getElementById("earth"))
        this.chart1 = this.$echarts.init(document.getElementById("earth1"))
        let data = aa;
        function getAirportCoord(idx) {
          let data = aa;
          return [data.airports[idx][3], data.airports[idx][4]];
      }
      var routes = data.routes.map(function (airline) {
        return [getAirportCoord(airline[1]),getAirportCoord(airline[2])];
      });
      this.chart.setOption({
        backgroundColor:'rgba(0,0,0,0)',
        environment :"none",
        opacity:0.1,
			  globe:{
          baseTexture: require("@/assets/earth_bg.png"),
			    shading:"color",
			    realisticMaterial: {
		            roughness: 0.01,
                textureTiling :0,
		        },
          postEffect: {
            enable: true
          }
        }
      });
      this.chart1.setOption({
        backgroundColor:'rgba(0,0,0,0)',
        environment :"none",
			  globe:{
          baseTexture: require("@/assets/earth_bg1.png"),
			    shading:"color",
			    realisticMaterial: {
		            roughness: 0.01,
                textureTiling :0,
		        },
          postEffect: {
            enable: true
          }
        }
      });
    }
}
</script>

<style lang="scss" scoped>
  .earth{
    opacity: 0.8;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-40%);
    width: 25vw;
    height: 25vw;
    position: fixed;
    z-index: 10;
  }
  .earth1{
    opacity: 0.5;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-40%);
    width: 28vw;
    height: 28vw;
    position: fixed;
    z-index: 10;
  }
</style>