<template>
	<div class="lineChar1t">
		<div class="lendgen">
			<div :key="index" v-for="(item,index) in datas" v-if="show">
				<span>{{item}}次</span>
			</div>
		</div>
		<div :id="id"
		:style="{height:height,width:width}"></div>
	</div>
</template>

<script>
	import { markRaw } from 'vue'
	let that;
	export default{
		props:{
			show:{
				type:Boolean,
				default:true
			},
			barWidth:{
				type:Number,
				default:18
			},
			id:{
				type:String,
				default:'chart'
			},
			datas:{
				type:Array,
				default:[]
			},
			lineData:{
				type:Array,
				default:[]
			},
			height:{
				type:String,
				default:'100%'
			},
			width:{
				type:String,
				default:'100%'
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
		created(){that = this;},
		methods:{
			// chart
			drawChart(){
				// 党员统计
				this.chart.setOption({
					title: {
						textStyle:{
							color:'#fff',
							fontSize:'2vh'
						}
					},
					tooltip: {
						formatter: function (params) {
							var info = '<div style="border-radius:0.5vh;padding:0.5vh 1vw;text-align:center;background:#F15454;color:#fff;font-size:1vh">'+params.value+'人</p></div>'
							return info;
						},
						backgroundColor:'none',
						textStyle: { color: "#fff" } //提示标签字体颜色
					},
					xAxis: {
						data: this.lineData,
						axisLabel: {
							color: "#fff",
							fontSize:"12"
						},
						axisLine:{
							show:true,
							lineStyle:{
								color:'#CC3B3C',
								width:2,
							},
						},
						axisTick: {
							show: false
						},
					},
					yAxis: {
						max:this.max,
						axisLine:{
							show:false,
						},
						axisLabel:{					//---坐标轴 标签
							show:false,					//---默认取轴线的颜色
						},
						type:'value',
						title: {
							text: ''
						},
						splitLine: {
							show: false,                         
						},
						axisTick: {
							show: false
						},
					},
					grid : {
						left : '0%',   //组件离容器左侧的距离
						right : '0%',
						top:'10%',
						bottom:'0%',
						containLabel : true     //grid 区域是否包含坐标轴的刻度标签
					},
					series: [{
						barHeight:500,
						barWidth:this.barWidth,
						barCateGoryGap:'20%',
						name: '年龄',
						type: 'bar',
						data: this.datas,
						showBackground: true,
                        backgroundStyle: {
                            color: 'rgb(114,30,38)',
							barBorderRadius:[10, 10, 0, 0]
                        },
						itemStyle: {
							normal: {
								barBorderRadius:[10, 10, 0, 0],
								color: new this.$echarts.graphic.LinearGradient(
									0, 0.25, 0.5,1,
									[
										{offset: 0, color: '#FF8383'},
										{offset: 1, color: '#FF2A2A'}
									]
								)
							}
						}
					}]
				})
				window.onresize = function(){
					this.chart.resize();
				}
			}
		},
		created() {
			
		},
		mounted() {
			this.chart = this.$echarts.init(document.getElementById(this.id))
			this.drawChart();
		}
	}
</script>

<style lang="scss">
	.lineChar1t{
		width: 100%;
		height: 100%;
		.lendgen{
			display: flex;
			color: #fff;
			div{
				width: 25%;
				text-align: center;
				span{
					font-size: 12px;
					height: 4vh;
					background: #F15454;
					border-radius: 2px;
					text-align: center;
					padding: 0.7vh 1.55vh;
				}
			}
		}
	}
</style>

 
 
 