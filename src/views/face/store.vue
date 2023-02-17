<template>
<div class = "app-containe">

<div>
    <template>

  <el-select v-model="value" placeholder="请选择类别" @change="getGoods()" clearable>
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.type"
      :value="item.type">
    </el-option>
  </el-select>

  <el-button type="primary" @click="dialogFormVisible=true" style="float:right;margin-right:10px">添加货物</el-button>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="选择类型" :label-width="formLabelWidth">
      <el-select v-model="form.type" placeholder="请选择活动区域">
        <el-option label="香烟" value="香烟"></el-option>
        <el-option label="零食" value="零食"></el-option>
        <el-option label="饮料" value="饮料"></el-option>
        <el-option label="生活用品" value="生活用品"></el-option>
        <el-option label="学习用品" value="学习用品"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="物品名称" :label-width="formLabelWidth">
      <el-input v-model="form.goodsName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="物品描述" :label-width="formLabelWidth">
      <el-input v-model="form.comment" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false;addGoods()">确 定</el-button>
  </div>
</el-dialog>
</template>
 </div>

<div>
    <template>
        <el-table
        header-row-style="color:#67C21A"
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
        value:'请选择类别',
        list: [{
          type: '',
          goodsName: '',
          comment:''
        }],
        totalPage:0,
        page:1,
        limit:12,
        dialogFormVisible: false,
        form: {
          goodsName: '',
          type: '',
          comment:''
        },
        formLabelWidth: '120px'
        }
    },
    created(){
        this.getType()
        this.getGoods()
    },
    methods:{
      addGoods(){
        shopInfo.addStore(this.form).then(response =>{
          this.getGoods()
          this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
        })
      },
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