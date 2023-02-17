<template>
    <div class="app-container" >
    
    <!--查询表单-->
<el-form :inline="true" class="demo-form-inline">
  
    <el-form-item label="添加时间">
    <el-date-picker
      v-model="faceQuery.startTime"
      type="datetime"
      placeholder="选择开始时间"
      value-format="yyyy-MM-dd HH:mm:ss"
      default-time="00:00:00"
    />
  </el-form-item>

  <el-form-item>
    <el-date-picker
      v-model="faceQuery.endTime"
      type="datetime"
      placeholder="选择截止时间"
      value-format="yyyy-MM-dd HH:mm:ss"
      default-time="00:00:00"
    />
  </el-form-item>

  <!-- <el-form-item >
    <el-input v-model="faceQuery.address" placeholder="地址"/>
  </el-form-item> -->

  <el-form-item  label-width="80%" >
    <el-select v-model="faceQuery.age" clearable placeholder="年龄段" >
      <el-option value="青年人(16~40岁)" label="青年人(16~40岁)"/>
      <el-option value="中年人(41~60岁)" label="中年人(41~60岁)"/>
      <el-option value="老年人(60岁以上)" label="老年人(60岁以上)"/>
    </el-select>
  </el-form-item>

  <el-form-item label-width="50%">
    <el-select v-model="faceQuery.gender" clearable placeholder="性别">
      <el-option value="男性" label="男性"/>
      <el-option value="女性" label="女性"/>
    </el-select>
  </el-form-item>


  <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
  <el-button type="default" @click="resetData()">清空</el-button>
</el-form>




  <!-- 表格 -->
    <el-table
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>
      
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="age" label="年龄" width="80" />
      <el-table-column  label="性别" width="80" >
        <template slot-scope="scope">
          {{scope.row.gender===0?'男':'女'}}
        </template>
      </el-table-column>

      <!-- <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column> -->

      <el-table-column prop="address" label="地址" />

      <el-table-column prop="createTime" label="添加时间" width="160"/>

      <el-table-column label="添加购买物品" align="left" width="310">
       <!-- <template>
        <div class="block">
          <span class="demonstration">单选可搜索</span>
        <el-cascader
          placeholder="试试搜索：指南"
          :options="options"
          filterable>
        </el-cascader>
      </div>
      </template> -->
        <template slot-scope="scope">
            <div class="block">
          <el-cascader
          ref="cascaderAddr" 
          placeholder="点击搜索"
          :props="defaultParams"
          :options="options"
          filterable
          @change="optionChange"
          >
        </el-cascader>
            <el-button type="primary" size="mini"  icon="el-icon-edit" @click="open(scope.row.id)">添加</el-button></div>
        </template>
      </el-table-column>

      <el-table-column label="已购物品" width="400" align="left">
        <template slot-scope="scope">
            {{scope.row.goods}}
        </template>
      </el-table-column>

      <el-table-column label="操作 " width="200" align="center">
        <template slot-scope="scope">
          <!-- <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">添加</el-button>
          </router-link> -->
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

        <!-- 分页 -->
    <el-pagination
         :current-page="page"
         :page-size="limit"
         :total="totalPage"
          style="padding: 30px 0; text-align: center;"
          layout="total, prev, pager, next, jumper"
          @current-change="getList"  
    />          
    <!-- 页面切换就调用getList方法 自动传参数-->
    

    </div>
</template>
<script>
//引入teacher.js文件
 import face from '@/api/face'
 import shopInfo from '@/api/shopInfo'
export default {
 //   data:{
    // },
    data(){ //定义遍历和初始值
        return{
            options:[],
            defaultParams: { 
              label: 'lable',
              value: 'value',
              children: 'children'
            },
            shopName:'',
            list:null,  //查询之后接口返回集合
            page:1,     //当前页
            limit:12,   //每页记录数
            totalPage:0, //总记录数
            faceQuery:{} //条件封装对象
        }
    },
    created(){
        this.getCategoryAndGoods()
        this.getList()        //调用
    },   
    methods:{
      optionChange(val){
        console.log(val[1])
        this.shopName = val[1];
      },
        //下拉表商品
        getCategoryAndGoods(){
          shopInfo.getGoodsAndCategory().then(response=>{
            this.options = response.data.list
            console.log(this.options)
          })
        },
        //讲师列表的方法
        getList(page = 1){
            this.page = page
            face.getFaceInfoByCondition(this.page,this.limit,this.faceQuery)
            .then(response =>{//请求成功
                //response接口返回的数据
                this.list= response.data.list
                this.totalPage= response.data.total
                console.log(this.totalPage)
                console.log(this.list)
            //    console.log(response)
            })
        },
        resetData(){
          //表单数据的清空
          this.faceQuery={}
          //查询所有讲师数据
          this.getList();
        },
        open(id) {
          //根据id添加商品
          face.addShopping(id,this.shopName).then(response=>{
            this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.getList()
          })
        },
        // //逻辑删除讲师的功能
        removeDataById(id){
           this.$confirm('是否删除该条信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          face.removeFaceInfoById(id);
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          setTimeout(() => {
            this.getList()
          }, 1000)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        }
        //
    }
}
</script>
<style >
button.el-button.el-button--primary.el-button--mini {
    float: right
}
.app-container{
  background-color: white;
}
</style>