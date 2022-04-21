<template>
	<div class="lineChar1t">
		<div :id="id"
		:style="{height:height,width:width}"></div>
	</div>
</template>

<script>
	export default{
		props:{
			id:{
				type:String,
				default:'chart'
			},
			lingdata:{
				type:Object,
				default:""
			},
			height:{
				type:String,
				default:'200px'
			},
			width:{
				type:String,
				default:'200px'
			},
			max:{
				type:Number,
				default:100
			},
			min:{
				type:Number,
				default:0
			}
		},
		data(){
			return{
				chart:null
			}
		},
		beforeDestroy() {
			if (!this.chart) {
				return
			}
			this.chart.dispose();
			this.chart = null
		},
		methods:{
			// chart
			drawChart(){
				var that = this;
				that.chart = that.$echarts.init(document.getElementById(that.id))
				// 党员统计
				that.chart.setOption({
					title: {
						text: ''
					},
					textStyle:{
					},
					tooltip: {
						trigger: 'axis',
						formatter: function (params) {
							
						},
						backgroundColor:'rgba(0,0,0,.2)',
						textStyle: { color: "#fff" } //提示标签字体颜色
					},
					legend: {
						textStyle:{
							color:'#838A9D',
							fontSize:'14'
						}
					},
					grid: {
						top:'5%',
						bottom: '0%',
						left:'0%',
						right:'3%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						axisLabel:{
							interval:0,
							textStyle:{
								fontSize:'14',
								color:'#838A9D'
							},
						},
						// 坐标线
						axisLine: {
						   lineStyle: {
							   type: 'solid',
							   color:'#F6F7F9',
							   width:'1'
						   },
					   },
						axisTick:{
							inside:true,
							lineStyle:{width:5,color:'#1266E3',type:'solid'}    // x轴刻度的颜色
						},
						data: ['01','02','03','04','05','06','07','08','09','10','11','12'],
					}],
					yAxis: [{
						type: 'value',
						axisLabel:{
							textStyle:{
								fontSize:'14',
								color:'#838A9D'
							},
						},
						min: that.min,
						max: that.max,
						// 坐标线
						axisLine: {
							lineStyle: {
								type: 'solid',
								color: '#fff',//左边线的颜色
								width:'2'//坐标线的宽度
							}
						},
						// 横坐标网格背景线
						 splitLine: {
							show:true,
							lineStyle: {  
								color:'#F6F7F9',
							}  
						},
					}],
					series: [{
						type: 'line',
						smooth:true,
						symbol:'none',
						itemStyle: {
							normal: {
								lineStyle: {
									color: '#00BB67' //改变折线颜色
								}
							}
						},
						data: that.lingdata.activData
					},
					{
						type: 'line',
						smooth:true,
						symbol:'none',
						itemStyle: {
							normal: {
								lineStyle: {
									color: '#1266E3' //改变折线颜色
								}
							}
						},
						data: that.lingdata.studyData
					}
				],
				zoom:1
			})
			window.onresize = function(){
				that.chart.resize();
			}
		}
	},
	created() {
		
	},
	mounted() {
		var that = this;
		that.drawChart();
	},
	watch:{
		lingdata(val){
			var that = this;
			if(val){
				that.drawChart();
			}
		}
	}
}
</script>

<style lang="scss">
	.lineChar1t{
		width: 100%;
		height: 100%;
		padding-bottom: 40px;
	}
</style>

 
 
 