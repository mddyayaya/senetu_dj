<template>
	<div class="lineChart">
		<div :id="id"
		:style="{height:height,width:width}"></div>
	</div>
</template>

<script>
	import * as  Echarts  from 'echarts'
	import 'echarts-liquidfill/src/liquidFill.js'
	export default{
		name:"lineCharts",
		data(){
			return{
				chart:null
			}
		},
		props:{
			id:{
				type:String,
				default:'chart'
			},
			height:{
				type:String,
				default:'8vh'
			},
			width:{
				type:String,
				default:'8vh'
			},
			data:{
				type:Number,
				default:0
			},
			max:{
				type:Number,
				default:1
			},
			min:{
				type:Number,
				default:0
			}
		},
		beforeDestroy() {
			if (!this.chart) {
				return
			}
			this.chart.dispose();
			this.chart = null
		},
		mounted(){
			this.chart = this.$echarts.init(document.getElementById(this.id))
			this.drawChart();
		},
		methods:{
			// chart
			drawChart(){
				// 党员统计
				this.chart.setOption({
					series: [{
						waveAnimation:true,
						type: "liquidFill",
						data: [this.data],
						label: {
							show:false,
						    fontSize: 10
						},
						outline: {
							show: true,
							borderDistance: 2,
							itemStyle: {
								borderColor: '#F15454', // 轮廓颜色
								borderWidth: 1, // 轮廓大小
								shadowBlur: 'none', // 轮廓阴影
							}
						},
						itemStyle: {
						    normal: {
								barBorderRadius:[10, 10, 0, 0],
						        color: new Echarts.graphic.LinearGradient(
									0, 0, 0,1,
						            [
						                {offset: 0, color: '#FF6767'},
						                {offset: 1, color: '#FF3636'}
						            ]
						        )
						    },
						},
						backgroundStyle: {
						    color: 'none',
						},
						radius: '90%'
					}]
				})
				window.onresize = function(){
					this.chart.resize();
				}
			}
		},
		created() {
			
		}
	}
</script>

<style lang="scss">
</style>

 
 
 