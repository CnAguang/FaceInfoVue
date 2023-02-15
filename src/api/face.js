import request from '@/utils/request'

export default{
    getFaceInfoByCondition(current,limit,faceVo){
        return request({
        //    url:'/edu/teacher/pageTeacherByCondition'+current+'/'+limit,
            url:`/face/getFaceInfoByCondition/${current}/${limit}`,
            method:'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据
            //data表示把对象转换json进行传递到接口里面
            data: faceVo
        })
    },
    removeFaceInfoById(id){
        return request({
            url:'/face/deleteFaceInfo/'+id+'',
            method:'post'
        })
    },
    addShopping(id,goods){
        return request({
            url:"/region/admin/updateShopping/"+id+"/"+goods,
            method:'post',
        })
    },
    weatherPeople(){
        return request({
            url:"http://localhost:8009/region/weather/weatherFactor",
            method:'get'    
        })
    },  
    holidayPurchase(){
        return request({
            url:'http://localhost:8009/region/weather/holiday',
            method:'get'
        })
    }
}    