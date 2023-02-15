<template>
<div class = "app-containe">
  <div>  
  <el-button type="primary" @click="redirect()">查看分析</el-button>
</div>
  <div class="container">
    <div id="chart" style="height:500px;width:50%;float:left" ></div>
    <div id="chart2" style="height:500px;width:50%;float:left"></div>
  </div>
</div>

</template>

<script>
import echarts from 'echarts'
import faceApi from '@/api/face'
export default {
    data(){
        return{
            chart:null,
            chart2:null
        }
    },
    mounted(){ 
      this.setchart();
      this.showChart(); 
    },
    methods:{
      redirect(){
        window.location.href='https://localhost/tobacco/index.html'
      },
        showChart(){
          faceApi.holidayPurchase()
          .then(response=>{
          this.chart2 = echarts.init(document.getElementById("chart2"),'dark');
          var option = {
          title: {
            text: '节假日商品购买影响对比'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {},
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['教师节', '中秋节', '国庆节', '星期六日']
          },
          color:["#4992ff","#91cc75","#fddd60","#ee6666"],
          series: [
            {
              name: '高端酒水',
              type: 'bar',
              data: response.data.wine
            },
            {
              name: '高端茶叶',
              type: 'bar',
              data: response.data.tea
            },
            {
              name: '生活用品',
              type: 'bar',
              data: response.data.live
            },
            {
              name: '零食',
              type: 'bar',
              data: response.data.snack
            }
          ]
        };
        this.chart2.setOption(option);
          })

        },
        setchart(){
          faceApi.weatherPeople()
          .then(response =>{
            console.log(response.data.name)
            console.log(response.data.value[0])
            this.chart = echarts.init(document.getElementById("chart"),'dark');
            var option = {
            title: {
                text: '天气对到店人数的影响',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 'left'
              },
              series: [
                {
                  name: '韶关一店',
                  type: 'pie',
                  radius: '50%',
                  data: [
                    { name: response.data.name[0],value:response.data.value[0]},
                    { name: response.data.name[1],value:response.data.value[1]},
                    { name: response.data.name[2],value:response.data.value[2]}
                  ],
                  color:["#4992ff","#91cc75","#fac858"],
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            }
            this.chart.setOption(option);
          })
            // this.chart = echarts.init(document.getElementById("chart"));
            // var option = {
            // title: {
            //     text: '天气对到店人数的影响',
            //     left: 'center'
            //   },
            //   tooltip: {
            //     trigger: 'item'
            //   },
            //   legend: {
            //     orient: 'vertical',
            //     left: 'left'
            //   },
            //   series: [
            //     {
            //       name: '韶关一店',
            //       type: 'pie',
            //       radius: '50%',
            //       data: [
            //         { value: 149, name: '晴天' },
            //         { value: 715, name: '小雨' },
            //         { value: 590, name: '大雨' },
            //       ],
            //       color:["#4992ff","#7cffb2","#fddd60"],
            //       emphasis: {
            //         itemStyle: {
            //           shadowBlur: 10,
            //           shadowOffsetX: 0,
            //           shadowColor: 'rgba(0, 0, 0, 0.5)'
            //         }
            //       }
            //     }
            //   ]
            // }
            // this.chart.setOption(option);
        }
    }
}
</script>

<style>
.container{
   margin-top: 150px;
}
.app-containe{
  background-color: #333;
  height: 921px;
}
.el-button--primary{
  margin-left: 10px;
  margin-top: 10px;
}
/* .app-main{
  /* background-color: rgb(210, 223, 231); */
   /* background-color: #333; */
/* } */ 
</style>