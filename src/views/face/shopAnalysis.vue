<template>
<div class = "app-containe">

    <div class = "block1">   <!--  区块1 -->
        <!-- 第一小块 -->
        <div style="height:30%">
        <div style="margin-top: 100px;">
            <button style="color:white;background-color:#409EFF;border:2px solid #409EFF;border-radius: 10px; width:220px;height: 50px;margin-left: 35%;">选择标签</button>
        </div>
        <div style="margin-top: 20px;margin-left: 28%;">
            <button style="width:150px;height:40px;border-radius: 10px;border: 2px;" ref="male"  @click="male()" >男性</button>
            <button style="width:150px;height:40px;border-radius: 10px;border: 2px;margin-left: 10px;" ref="female"  @click="female()">女性</button>
        </div>
        <div style="margin-top: 20px;margin-left: 20%;">
            <button style="width:150px;height:40px;border-radius: 10px;border: 2px;" ref="teenager" @click="teenager()">青年</button>
            <button style="width:150px;height:40px;border-radius: 10px;border: 2px;" ref="middle" @click="middle()">中年</button>
            <button style="width:150px;height:40px;border-radius: 10px;border: 2px;" ref="old" @click="old()">老年</button>
        </div>
        </div>
        <!-- 第三小块 -->
        <div style="height:70%" id="chart1"> 

        </div>
    </div>

    <div class = "block">
        <!-- 区块2 -->
            <!-- 第二小块 -->
            <div style="height: 50%" id="chart2"></div>
            <!-- 第四小块 -->
            <div style="height: 50%" >
                <div style="height: 50%;float: left;width: 50%;">


                  <div style="margin-left:70px">
                  <h1 style="color:#EEA331;" >本季度销售情况</h1>
                  </div>
                  <div style="float:left">
                  <h3 style="color:white">最吸引的人群为:      </h3>
                  </div>
                  <div style = "float:left;margin-left:20px">
                  <h3 style="color:aquamarine"> {{this.popularity }}</h3>
                  </div>
                

                  <div style="float:left">
                  <h3 style="color:white">最多人购买的商品为:   </h3>
                  </div>
                  <div style = "float:left;margin-left:20px">
                  <h3 style="color:aquamarine"> {{this.goods }}</h3>
                  </div>


                </div>
                <div style="float:left;height: 50%;width: 50%; " id="miniChart1">
                  最受欢迎类型

                </div>
                <div style="height: 50%;float: left;width: 50%;" id="miniChart2">
                 第二
                </div>
                <div style="float:left;height: 50%;width: 50%;" id="miniChart3">
                第三
                </div>
            </div>
    </div>

</div>


</template>

<script>
import shopInfo from '@/api/shopInfo'
import echarts from 'echarts'
export default {
    data(){
        return{
            conditions:{
                clickMale:'',
                clickFemale:'',
                clickTeenager:'',
                clickMiddle:'',
                clickOld:'',
                chart1:null,
                chart2:null,
                miniChart1:null,
                miniChart2:null,
                miniChart3:null,
                numberOne:null,
                numberTwo:null,
                numberThree:null
            },
            nums:[],
            goodsName:[],
            values:[],
            list1:[],
            list:[],
            list3:[],
            popularity:'',
            number:null,
            goods:'',
            sell:null
        }
    },
    mounted(){
        this.showChart1();
        this.showChart2();
        // this.showChart3(); 
        this.showMiniChart1();
        this.showMiniChart3();
        this.showMiniChart2();
    },
    created(){
      this.popularityRecommend()
      this.besetSeller()
    },
    methods:{
      besetSeller(){
        shopInfo.besetSeller().then(response=>{
          this.goods = response.data.goodsName
          this.sell = response.data.value
        })
      },
      popularityRecommend(){
        shopInfo.popularity().then(response=>{
          this.popularity = response.data.popular
          this.number = response.data.data
        })
      },
       showMiniChart1(){
        shopInfo.getThreeCharts().then(response =>{
          this.list1 = response.data.list1
          console.log(this.list1)
        this.miniChart1 = echarts.init(document.getElementById("miniChart1"),'dark');
      var  option = {
  title: {
    text: '最受欢迎的类型',
    subtext: '前三名购买情况',
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
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      color:["#DC541B","#EC7696","#FCC307"],
      data: [
        { value: this.list1[0].sell, name: this.list1[0].goodsName},
        { value: this.list1[1].sell, name: this.list1[1].goodsName },
        { value: this.list1[2].sell, name: this.list1[2].goodsName },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};  
      this.miniChart1.setOption(option);          
    })
       },
       showMiniChart2(){
        shopInfo.getThreeCharts().then(response =>{
          this.list = response.data.list
        this.miniChart2 = echarts.init(document.getElementById("miniChart2"),'dark');
      var  option = {
  title: {
    text: '第二受欢迎的类型',
    subtext: '前三名购买情况',
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
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: this.list[0].sell, name: this.list[0].goodsName },
        { value: this.list[1].sell, name: this.list[1].goodsName },
        { value: this.list[2].sell, name: this.list[2].goodsName },
      ],
      color:["#73c0de","#9a60b4","#EE2746"],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};  
      this.miniChart2.setOption(option);})

       },
       showMiniChart3(){
        shopInfo.getThreeCharts().then(response=>{
          this.list3 = response.data.list3
          console.log(this.list3)
        this.miniChart3 = echarts.init(document.getElementById("miniChart3"),'dark');
      var  option = {
  title: {
    text: '第三受欢迎的类型',
    subtext: '前三名购买情况',
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
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: this.list3[0].sell, name: this.list3[0].goodsName },
        { value: this.list3[1].sell, name: this.list3[1].goodsName },
        { value: this.list3[2].sell, name: this.list3[2].goodsName },
      ],
      color:["#91cc75","#fac858","#ee6666"],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};  
      this.miniChart3.setOption(option);  })
       },
        showChart2(){
            shopInfo.getcigaretteChart(this.conditions).then(response =>{
            this.chart2 = echarts.init(document.getElementById("chart2"),'dark');
           var option = {
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  color:[
    "#7cffb2"
    ],
  series: [
    {
      data: [],
    //   {
    //       value: 200,
    //       itemStyle: {
    //         color: '#7cffb2'
    //       }
    //     },
    //     {
    //       value: 200,
    //       itemStyle: {
    //         color: '#fddd60'
    //       }
    //     },
    //     {
    //       value: 200,
    //       itemStyle: {
    //         color: '#ff6e76'
    //       }
    //     },      
    //     {
    //       value: 200,
    //       itemStyle: {
    //         color: '#58d9f9'
    //       }
    //     },
    //     {
    //       value: 200,
    //       itemStyle: {
    //         color: '#05c091'
    //       }
    //     },
    //     {
    //       value: 200,
    //       itemStyle: {
    //         color: '#ff8a45'
    //       }
    //     },
      
      type: 'bar'
    }
  ]
            };
            this.goodsName = response.data.data
            this.values = response.data.values;
            option.xAxis.data = this.goodsName
            var length = this.values.length
            console.log( option)
            for(var i = 0;i<length;i++){
              option.series[0].data[i] = this.values[i];
            }
        this.chart2.setOption(option);  
        })
        },
        showChart1(){   
            shopInfo.getTypePieChart(this.conditions).then(response =>{
                this.nums = response.data.values
                this.chart1 = echarts.init(document.getElementById("chart1"),'dark');
              var  option = {
  title: {
    text: '消费类型分布',
    subtext: '购买数据',
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
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      color:["#4992ff","#7cffb2","#fddd60","#ff6e76","#58d9f9","#05c091"],
      data: [
        { value: this.nums[0], name: '香烟' },
        { value: this.nums[1], name: '酒' },
        { value: this.nums[2], name: '零食' },
        { value: this.nums[3], name: '生活用品' },
        { value: this.nums[4], name: '学习用品' },
        { value: this.nums[5], name:'饮料'}
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};           this.chart1.setOption(option);

                    
             })
        },
        male(){
            if(this.conditions.clickMale=='男'){
                // 该标签被点击,再次点击清空
                this.$refs.male.style.backgroundColor=""
                this.$refs.male.style.color=""
                this.conditions.clickMale=''
             
                if(this.conditions.clickTeenager =='青年'){
                    //已经点击了
                    this.conditions.clickTeenager='';//清空条件,为了再计算一遍
                    this.teenager()
                }
                if(this.conditions.clickMiddle =='中年'){
                    //已经点击了
                    this.conditions.clickMiddle='';//清空条件,为了再计算一遍
                    this.middle()
                }
                if(this.conditions.clickOld =='老年'){
                    //已经点击了
                    this.conditions.c
                    lickOld='';//清空条件,为了再计算一遍
                    this.old()
                }
                this.showChart1()
                this.showChart2();
            }else{
                this.$refs.male.style.backgroundColor="#6FD13F"
                this.$refs.male.style.color="white"
                this.conditions.clickMale='男'
                if(this.conditions.clickTeenager =='青年'){
                    //已经点击了
                    this.conditions.clickTeenager='';//清空条件,为了再计算一遍
                    this.teenager()
                }
                if(this.conditions.clickMiddle =='中年'){
                    //已经点击了
                    this.conditions.clickMiddle='';//清空条件,为了再计算一遍
                    this.middle()
                }
                if(this.conditions.clickOld =='老年'){
                    //已经点击了
                    this.conditions.clickOld='';//清空条件,为了再计算一遍
                    this.old()
                }
                this.showChart1()
                this.showChart2();
            }

        },
        female(){
            if(this.conditions.clickFemale=='女'){
                // 该标签被点击
                this.$refs.female.style.backgroundColor=""
                this.$refs.female.style.color=""
                this.conditions.clickFemale=''
                if(this.conditions.clickTeenager =='青年'){
                    //已经点击了
                    this.conditions.clickTeenager='';//清空条件,为了再计算一遍
                    this.teenager()
                }
                if(this.conditions.clickMiddle =='中年'){
                    //已经点击了
                    this.conditions.clickMiddle='';//清空条件,为了再计算一遍
                    this.middle()
                }
                if(this.conditions.clickOld =='老年'){
                    //已经点击了
                    this.conditions.clickOld='';//清空条件,为了再计算一遍
                    this.old()
                }
                this.showChart1()
                this.showChart2();
            }else{
                this.$refs.female.style.backgroundColor="#6FD13F"
                this.$refs.female.style.color="white"
                this.conditions.clickFemale='女'
                if(this.conditions.clickTeenager =='青年'){
                    //已经点击了
                    this.conditions.clickTeenager='';//清空条件,为了再计算一遍
                    this.teenager()
                }
                if(this.conditions.clickMiddle =='中年'){
                    //已经点击了
                    this.conditions.clickMiddle='';//清空条件,为了再计算一遍
                    this.middle()
                }
                if(this.conditions.clickOld =='老年'){
                    //已经点击了
                    this.conditions.clickOld='';//清空条件,为了再计算一遍
                    this.old()
                }
                this.showChart1()
                this.showChart2();
            }
        },
        //计算青年百分比
        teenager(){
           if(this.conditions.clickTeenager !='青年'){//如果未点击
            this.conditions.clickTeenager = '青年'
            shopInfo.getTeenagerPercent(this.conditions).then(response =>{
                var teenPercent = response.data.teenPercent;
                this.$refs.teenager.style.backgroundColor="#6FD13F"
                this.$refs.teenager.style.color="white"
                this.$refs.teenager.innerHTML='青年\n'+teenPercent+'%'
            })
            this.showChart1()
            this.showChart2();
           }else{
            //已点击，再点一次
            this.$refs.teenager.innerHTML='青年'
            this.$refs.teenager.style.backgroundColor=""
            this.$refs.teenager.style.color=""
            this.conditions.clickTeenager = ''
           }
           this.showChart1()
           this.showChart2();
        },
        //计算中年百分比
        middle(){
           if(this.conditions.clickMiddle!='中年'){//点击
            this.conditions.clickMiddle = '中年'
            shopInfo.getMiddlePercent(this.conditions).then(response =>{
                var middlePercent = response.data.middlePercent;
                this.$refs.middle.style.backgroundColor="#92EF64"
                this.$refs.middle.style.color="white"
                this.$refs.middle.innerHTML='中年\n'+middlePercent+'%'
            })
            this.showChart1()
            this.showChart2();
           }else{
            console.log(1)
            this.$refs.middle.innerHTML='中年'
            this.$refs.middle.style.backgroundColor=""
            this.$refs.middle.style.color=""
            this.conditions.clickMiddle = ''
            this.showChart1()
            this.showChart2();
           }
        },
        //计算老年百分比
        old(){
           if(this.conditions.clickOld!='老年'){
            this.conditions.clickOld='老年'
            shopInfo.getOldPercent(this.conditions).then(response =>{
                var oldPercent = response.data.oldPercent;
                this.$refs.old.style.backgroundColor="#92EF64"
                this.$refs.old.style.color="white"
                this.$refs.old.innerHTML='老年\n'+oldPercent+'%'
            })
            this.showChart1()
            this.showChart2();
           }else{
            this.$refs.old.innerHTML='老年'
            this.$refs.old.style.backgroundColor=""
            this.$refs.old.style.color=""
            this.conditions.clickOld=''
            this.showChart1()
            this.showChart2();
           }
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
.block1{
  width:50%;
  height: 921px;
  float:left;
}
.block{
  width:50%;
  height: 921px;
  float: left;
}

</style>