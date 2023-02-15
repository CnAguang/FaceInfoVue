<template>
<div class = "app-containe">

    <div class = "block1">   <!--  区块1 -->
        <div style="margin-top: 100px;">
            <button style="color:white;background-color:#409EFF;border:2px solid #409EFF;border-radius: 10px; width:220px;height: 50px;margin-left: 35%;">选择标签</button>
        </div>
        <div style="margin-top: 20px;margin-left: 28%;">
            <button style="width:150px;height:40px;border-radius: 10px;border: 2px; " >男性</button>
            <button style="width:150px;height:40px;border-radius: 10px;border: 2px;margin-left: 10px;">女性</button>
        </div>
        <div style="margin-top: 20px;margin-left: 20%;">
            <button style="width:150px;height:40px;border-radius: 10px;border: 2px;" ref="teenager" @click="teenager()">青年</button>
            <button style="width:150px;height:40px;border-radius: 10px;border: 2px;" ref="middle" @click="middle()">中年</button>
            <button style="width:150px;height:40px;border-radius: 10px;border: 2px;" ref="old" @click="old()">老年</button>
        </div>
    </div>

    <div class = "block">
        <!-- 区块2 -->
        <div style="margin-top: 100px;">

        </div>
    </div>

</div>


</template>

<script>
import shopInfo from '@/api/shopInfo'
export default {
    data(){
        return{
            
        }
    },
    created(){

    },
    methods:{
        //计算青年百分比
        teenager(){
           var teen =  this.$refs.teenager.innerHTML;
           if(teen=='青年'){
            shopInfo.getTeenagerPercent().then(response =>{
                var teenPercent = response.data.teenPercent;
                this.$refs.teenager.style.backgroundColor="#92EF64"
                this.$refs.teenager.style.color="white"
                this.$refs.teenager.innerHTML='青年\n'+teenPercent+'%'
            })
           }else{
            this.$refs.teenager.innerHTML='青年'
            this.$refs.teenager.style.backgroundColor=""
            this.$refs.teenager.style.color=""
           }
        },
        //计算中年百分比
        middle(){
           var middle =  this.$refs.middle.innerHTML;
           if(middle=='中年'){
            shopInfo.getMiddlePercent().then(response =>{
                var oldPercent = response.data.middlePercent;
                this.$refs.middle.style.backgroundColor="#92EF64"
                this.$refs.middle.style.color="white"
                this.$refs.middle.innerHTML='中年\n'+oldPercent+'%'
            })
           }else{
            this.$refs.middle.innerHTML='中年'
            this.$refs.middle.style.backgroundColor=""
            this.$refs.middle.style.color=""
           }
        },
        //计算老年百分比
        old(){
           var old =  this.$refs.old.innerHTML;
           if(old=='老年'){
            shopInfo.getOldPercent().then(response =>{
                var oldPercent = response.data.oldPercent;
                this.$refs.old.style.backgroundColor="#92EF64"
                this.$refs.old.style.color="white"
                this.$refs.old.innerHTML='老年\n'+oldPercent+'%'
            })
           }else{
            this.$refs.old.innerHTML='老年'
            this.$refs.old.style.backgroundColor=""
            this.$refs.old.style.color=""
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