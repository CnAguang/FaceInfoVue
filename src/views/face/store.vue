<template>
<div class = "app-containe">

<div>
    <template>
  <el-select v-model="value" placeholder="请选择" @change="getGoods()" clearable>
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.type"
      :value="item.type">
    </el-option>
  </el-select>
</template>
 </div>

<div>
    <template>
        <el-table
        header-row-style="color:#67C21A;background:yellow"
            :data="list"
             style="width: 100%">
    <el-table-column
      label="商品类型"
      prop="type">
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="goodsName">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="comment">
    </el-table-column>
  </el-table>
  <el-pagination
         :current-page="page"
         :page-size="limit"
         :total="totalPage"
          style="padding: 30px 0; text-align: center;"
          layout="total, prev, pager, next, jumper"
          @current-change="getGoods()"  
    /> 
    </template>
</div>


</div>
</template>

<script>
import shopInfo from '@/api/shopInfo'

export default {
    data(){
        return{
        options:[],
        value:'请选择',
        list: [{
          type: '',
          goodsName: '',
          comment:''
        }],
        totalPage:0,
        page:1,
        limit:12
        }
    },
    created(){
        this.getType()
        this.getGoods()
    },
    methods:{
        getGoods(page = 1){
            if(this.value==''||this.value==null){
            this.value = '请选择'
            }   
            this.page = page
            shopInfo.getGoods(this.page,this.limit,this.value).then(response=>{
                this.list = response.data.list
                this.totalPage = response.data.total
                console.log(this.list)
                console.log(this.totalPage)
            })
        },
        getType(){
            shopInfo.getCategory().then(response=>{
                this.options = response.data.category;
                console.log(response.data.category)
            })
        }
    }
}
</script>

<style>
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>