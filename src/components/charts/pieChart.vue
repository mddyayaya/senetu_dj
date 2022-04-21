<template>
	<div class="lineChart">
		<div :id="id"
		style="margin:10px auto;"
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
				type:Array,
				default:""
			},
			height:{
				type:String,
				default:'400px'
			},
			width:{
				type:String,
				default:'400px'
			},
			data:{
				type:Array,
				default:""
			},
			radius:{
				type:Array,
				default:""
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
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b}: {c} ({d}%)'
				},
				legend: {
					// orient: 'vertical',
					show:true,
					bottom: 10,
					left:"center",
					data: that.lingdata,
					icon: "circle"
				},
				series: [
					{
						type: 'pie',
						radius: that.radius,
						avoidLabelOverlap: true,
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							label: {
								show: true,
								fontSize: '25',
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: that.data,
						itemStyle: {
							normal: {
								color: function(params) {
									var colorList = ['#5B8FF9','#5AD8A6','#5D7092','#F6BD16','#E8684A','#6495ED','#D2B48C','#FF0000','#7CFC00','#9400D3'];
									var index = params.dataIndex;
									return colorList[index];
								},
							},
						},
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
		setTimeout(function(){
			that.drawChart();
		},300)
	}
}
</script>

<style lang="scss">
	.lineChart{
		width: 100%;
		height: 100%;
	}
</style>

 
 
 