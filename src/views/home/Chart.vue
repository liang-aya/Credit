<template>
  <div>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="main" ref="chart" style="width:100%;height:400px"></div>
  </div>
</template>
<script>
import echarts from 'echarts';
import axios from 'axios';
import 'echarts/map/js/china'
export default {
    data(){
        return{
            lists:[],
            myChart:''
        }
    },
    mounted(){
        //getinit()
        this.init();
        //图表响应式
        var self = this;
        window.onresize = function(){
            self.myChart.resize()
        }

    },
    methods:{
        init(){
            this.myChart = echarts.init(this.$refs.chart);
            var option={
                xAxis:{
                    type: 'category',
                    boundaryGap: false,
                    data:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis:{
                    type:'value'
                },
                series:[{
                    type:'line',
                    areaStyle:{},
                    data:[200,355,342,643,523,635,546],
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            this.myChart.setOption(option)
        },
        //从服务器湖获取数据
        getinit(){
            axios.get('http://127.0.0.1:3333/get_lists').then(res =>{
                this.lists = res.data;
                this.init()
            })
        }
    }
}
</script>
