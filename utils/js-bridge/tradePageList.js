/*
 * @Description: 涉及交易的相关页面
 * @Version: 2.0
 * @Autor: sujie
 * @Date: 2022-03-29 16:42:21
 * @LastEditors: sujie
 * @LastEditTime: 2022-04-20 15:09:29
 */
import thsNative from './thscommon.js'
export const tradePageList = [
    'buyin', //普通交易买入
    'buyout', //普通交易卖出
    'myhold', //普通持仓页面
    'traderevoke', //普通交易撤单
    'marginbuyin', //融资买入
    'marginbuyout', //融券卖出
    'jiaoyi_rzrq_zjhq', //直接还券(现券还券）
    'marginmyhold' //融资融券持仓查询
]
export function checkIfEmployee(callback) {
    thsNative.thsGetCacheData('isEmployee', function(r){
        console.log("isEmployee:" + r.data)
        if(r.data&&r.data==1) {
            thsNative.thsShowConfirm(
                '',
                '您账号受限，无法进行交易操作！',
                '确定',
                '',
                null,
                null
            )
            return false
        } else {
           return callback()
        }
    })
}