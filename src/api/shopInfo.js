import request from '@/utils/request'

export default{
    getcigaretteChart(data){
        return request({
            url:'http://localhost:8009/shopInfo/getCigarette',
            method:"post",
            data:data
        })
    },
    getTypePieChart(data){
        return request({
            url:'http://localhost:8009/shopInfo/getTypeChart',
            method:"post",
            data:data
        })
    },
    addStore(goodsvo){
        return request({
            url:'http://localhost:8009/region/goods/addStore',
            method:'post',
            data:goodsvo
        })
    },
    getGoodsAndCategory(){
        return request({
            url:'http://localhost:8009/region/consumption/getCategoryAndGoods',
            method:'get'
        })
    },
    getTeenagerPercent(data){
        return request({
            url:'http://localhost:8009/shopInfo/getTeenPercen',
            method:'post',
            data:data
        })
    },
    getMiddlePercent(data){
        return request({
            url:'http://localhost:8009/shopInfo/getMiddlePercen',
            method:'post',
            data:data
        })
    },
    getOldPercent(data){
        return request({
            url:'http://localhost:8009/shopInfo/getOldPercen',
            method:'post',
            data:data
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