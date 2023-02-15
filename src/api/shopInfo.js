import request from '@/utils/request'

export default{
    getTeenagerPercent(){
        return request({
            url:'http://localhost:8009/shopInfo/getTeenPercen',
            method:'get'
        })
    },
    getMiddlePercent(){
        return request({
            url:'http://localhost:8009/shopInfo/getMiddlePercen',
            method:'get'
        })
    },
    getOldPercent(){
        return request({
            url:'http://localhost:8009/shopInfo/getOldPercen',
            method:'get'
        })
    },
    getCategory(){
        return request({
            url:'http://localhost:8009/region/goods/getCategory',
            method:'get'
        })
    },
    getGoods(current,limit,category){
        return request({
            url:'http://localhost:8009/region/goods/getGoodsBaseOnCategory/'+current+'/'+limit+'/'+category,
            method:'post'
        })
    }
}