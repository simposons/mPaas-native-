/*
 * @Description: 业务逻辑相关代码
 * @Version: 2.0
 * @Autor: lrp
 * @Date: 2020-07-13 11:19:35
 * @LastEditors: sujie
 * @LastEditTime: 2021-12-24 15:45:52
 */
import thsNative from './thscommon'
import api from '@/services/yzh/api'
import { getBaseUrl } from '@/services/yzh/baseApi'
import store from '@/store/index' //vuex
import { compareDate } from './common' //工具类
const yhtplatform = store.state.commonConfig.yhtplatform
import {getClientLevel} from '@/views/yzh/me/clientgrading/clientGrading'
var path_kwl = store.state.commonConfig.path_kwl
/**
 *  跳转到云柜台(业务办理)
 *  jumpFlag:跳转标识，
 *  jumpFlag=1 电子签名约定书
 *  jumpFlag=2 签署协议
 *  jumpFlag=3 资料变更
 */
export function gotoYGT(jumpFlag, callBack) {
    thsNative.thsGetCacheData("yhthaslogin", function(r) {
        var loginFlag = r.data;

        if ("1" != loginFlag) {
            thsNative.thsSetCacheData("jumpFlag", jumpFlag);
            thsNative.thsSetCacheData("logingotopage", "gotoYGT"); //保存去向的页面地址
            thsNative.thsOpenWebView("#/login");

        } else {
            thsNative.thsGetCacheData("yhttoken", function(r) {
                var token = r.data;
                api.yhtRequest.getYgtToken(token).then(function(res) {

                    if (res.errorNo == 0) {
                        var aToken = res.result[0].token;
                        var ygtUrl = getBaseUrl('ygt')
                        var url = ygtUrl + path_kwl + jumpFlag + "&token=" + aToken;
                        jumpToYgt(url);
                        if (callBack) {
                            callBack();
                        }
                    } else {
                        thsNative.thsShowConfirm("", res.errorMsg, "确定", "", null, null);
                    }
                })
            });
        }
    });
}
/**
 *  跳转到云柜台
 */
export function jumpYGT() {
    thsNative.thsGetCacheData("yhttoken", function(r) {
        var token = r.data;
        api.yhtRequest.getYgtToken(token).then(function(res) {

            if (res.errorNo == 0) {
                thsNative.thsGetCacheData("jumpFlag", function(r) {
                    var jumpFlag = r.data;
                    thsNative.thsSetCacheData("jumpFlag", "");
                    thsNative.thsCloseWebView();
                    var aToken = res.result[0].token;
                    var ygtUrl = getBaseUrl('ygt')
                    var url = ygtUrl + path_kwl + jumpFlag + "&token=" + aToken;
                    jumpToYgt(url);
                });
            } else {
                thsNative.thsShowConfirm("", res.errorMsg, "确定", "", null, null);
            }

        })
    })
}

/**
 * 跳转到云柜台
 * @param url
 */
export function jumpToYgt(url) {
    var json = {
        pagename: "opennethall",
        url: url,
        isHiddenNavigationBar: "1",
        action: "thirdjump"
    };

    thsNative.thsGoToNativePage(json);
}
/**
 * @description: 我的界面埋点
 * @param {type}
 * @return:
 * @author: lrp
 */
 export function meDataTracking(eventId) {
    buryPointCount('me_home', eventId)
}
/**
 *  埋点统计
 *  @param pageId
 *  @param eventId
 */
export function buryPointCount(pageId, eventId, aUrl) {
    var pageId = pageId;
    var eventId = eventId;
    thsNative.thsGetLocalData("yhtphone", function(r) {

        var loginNum = r.data;
        var json = {
            loginNum: loginNum,
            pageId: pageId,
            eventId: eventId
        }

        api.buryPoint.buryPointCount(json)
    })
}
/**
 * @description: 跳转原生页面
 * @param {json:页面配置信息，urlKey:页面地址key，query:传递参数}
 * @return:
 * @author: lrp
 */
export function goToNativePage(json, urlKey, query) {
    console.log(json, urlKey)
    var params = json
    if (query != undefined) {
        var pageurl = getBaseUrl(urlKey)
        for (let key in query) {
            pageurl = pageurl + '&' + key + '=' + query[key]
        }
        params['url'] = pageurl
    } else if (urlKey && urlKey.length) {
        var pageurl = getBaseUrl(urlKey)
        params['url'] = pageurl
    }
    console.log('goToNativePage', params)
    thsNative.thsGoToNativePage(params)
}
/**
 * @description: 跳转原生页面
 * @param {json:页面配置信息，urlKey:页面地址key, url：追加地址}
 * @return:
 * @author: hanhui
 */
export function goToNativePage2(json, urlKey, url) {
    console.log(json, urlKey)
    var params = json
    if (urlKey && urlKey.length) {
        var pageurl = getBaseUrl(urlKey)
        params['url'] = pageurl
    }
    if (url && url.length) {
        params['url'] = params['url'] + url
    }
    console.log('goToNativePage2', params)
    thsNative.thsGoToNativePage(params)
}

/**
 * 处理跳转前的登录判断
 * @param strUrl
 * @param strTitle
 */
export function doGoToPage(strUrl, strTitle) {
    thsNative.thsSetCacheData("logingotopage", strUrl);
    thsNative.thsSetCacheData("logingotopageTitle", strTitle);
    thsNative.thsGetCacheData("yhthaslogin", function(r) {
        var loginFlag = r.data;
        if (loginFlag == "1") { //"1"表示已经登录
            if (strTitle) {
                thsNative.thsOpenWebViewWithTitle(strUrl, strTitle);
                return;
            }
            thsNative.thsOpenWebViewNoCache(strUrl);
        } else { //还没有登录
            thsNative.thsOpenWebView("#/login");
        }
    });
}

/**
 * 处理跳转前的登录判断
 * @param aPageFlag     页面标识
 * @param strUrl    地址
 * @param strTitle  标题
 */
export function goToPage(aPageFlag, strUrl, strTitle) {
    thsNative.thsSetCacheData("logingotopage", aPageFlag);
    thsNative.thsSetCacheData("logingotopageTitle", strTitle);
    thsNative.thsGetCacheData("yhthaslogin", function(r) {
        var loginFlag = r.data;
        if (loginFlag == "1") {
            if (strTitle) {
                thsNative.thsOpenWebViewWithTitle(strUrl, strTitle);
                return;
            }
            thsNative.thsOpenWebViewNoCache(strUrl);
        } else {
            thsNative.thsOpenWebView("#/login");
        }
    });
}

/**
 * @description: 获取跳转页面的URL
 * @param {type}
 * @return:
 * @author: lrp
 */
export function getPageUrl(urlKey) {
    if (!urlKey) {
        return ''
    }
    return getBaseUrl(urlKey)
}
/**
 * 处理登录后的跳转逻辑
 * @param params
 * @param bindState
 * @param callBack
 */
export function handleJumpLogic(bindState) {
    thsNative.thsGetCacheData("logingotopage", function(r) {
        var logingotopage = r.data;
        thsNative.thsSetCacheData("logingotopage", "");
        console.log("--commonLogic-logingotopage:" + logingotopage);
        if (logingotopage && logingotopage != "null") {
            if (logingotopage == "gotoYGT") {
                // 跳转到云柜台
                jumpYGT();
            } else if (logingotopage == "gznhg") {
                // 国债逆回购
                if (bindState.trade == true) {
                    thsNative.thsOpenWebViewSelfWithTitle("#/gznhgProduct", "国债逆回购产品");
                } else {
                    thsNative.thsShowConfirm("", "您还没有关联证券交易账户呐，是否去关联呢？", "确定", "取消", function(data) {
                        var input = {
                            "title": "trade",
                            "bindtype": "1"
                        };
                        thsNative.thsSetCacheData("bindtype", input);
                        thsNative.thsOpenWebViewSelfWithTitle("#/bind", "账户关联");
                    }, null);
                }
            } else if (logingotopage == "gotoMFdetail") {
                // 提前埋伏详情
                thsNative.thsOpenWebViewSelfWithTitle("#!/info/boardChanceNews.html", "资讯详情");
            } else if (logingotopage == "gotoGZ") {
                thsNative.thsOpenWebViewSelfWithTitle("#/productsGZ", "股转申购");
            } else if (logingotopage == 'gotoNewShare') {
                thsNative.thsOpenWebViewSelf("#/newShare");
            } else if (logingotopage == "question") {
                jumpToQuestion()
            } else if (logingotopage == "stockMatch") {
                var url = getPageUrl('stockMatch')
                thsNative.thsOpenWebViewSelfNoBack(url)
            } else if (logingotopage == "assetView") {
                var url = getPageUrl('userAssetUrl')
                thsNative.thsOpenWebViewSelfNoBack(url)
            } else if (logingotopage == "bills") {
                var url = getPageUrl('userAssetUrl_bills')
                thsNative.thsOpenWebViewSelfNoBack(url)
            } else if (logingotopage == "advisor") {
                thsNative.thsOpenWebViewSelfNoBack("#/invAdvisor")
            } else if(logingotopage.indexOf("clientlevel_") == 0){
                var mpageArr = logingotopage.split('_')
                getClientLevel(mpageArr[1],mpageArr[2])
            } else if (logingotopage == 'sourcesecurities') {
                thsNative.thsOpenWebViewSelfNoBack('#/sourcesecurities')
            } else if(logingotopage.indexOf("myfocus") == 0){
                thsNative.thsOpenWebViewSelfNoBack("xgb#/myFocus")
            }  else if(logingotopage.indexOf("mycollection") == 0){
                thsNative.thsOpenWebViewSelfNoBack("xgb#/myCollection")
            } else {
                thsNative.thsGetCacheData("logingotopageTitle", function(r) {
                    var logingotopageTitle = r.data;
                    if (logingotopageTitle) {
                        thsNative.thsOpenWebViewSelfWithTitle(logingotopage, logingotopageTitle);
                    } else {
                        thsNative.thsOpenWebViewSelf(logingotopage);
                    }
                });
            }
            // 更新界面
            updateAllNativePage();
        } else {
            updateAllNativePage();
            thsNative.thsCloseWebView();
        }
    });
}
/**
 * @description: 跳转电子问券回访
 * @param {type}
 * @return:
 * @author: lrp
 */
function jumpToQuestion() {
    thsNative.thsGetCacheData("yhttoken", function(r) {
        var token = r.data;
        if (token && token != "null") {
            thsNative.thsGetCacheData("userId", function(r) {
                var khbh = r.data;
                var params = {
                    "khbh": khbh,
                    "token": token
                }
                api.yhtRequest.queryVisitData(params).then(function(res) {
                    var rwlj = res.result[0].data[0].RWLJ;
                    thsNative.thsSetCacheData("rwlj", rwlj);
                    var sftp = res.result[0].data[0].SFTP;
                    var sfjysj = res.result[0].data[0].SFJYSJ;
                    if (sftp == '1') {
                        if (sfjysj == '1') {
                            thsNative.thsShowConfirm("", "尊敬的客户:\n" + "  您好！为保障您的合法权益，根据监管机构相关规定，请您配合" +
                                "填写客户回访问卷，感谢您的理解与支持!", "立即参与", "稍后参与",
                                function(data) {
                                    thsNative.thsOpenWebViewWithTitle(rwlj, "查询客户事件列表");
                                }, null);
                        } else {
                            thsNative.thsShowConfirm("", "尊敬的客户:\n" + "  您好！为保障您的合法权益，根据监管机构相关规定，请您配合" +
                                "填写客户回访问卷，感谢您的理解与支持!", "立即参与", "",
                                function(data) {
                                    thsNative.thsOpenWebViewWithTitle(rwlj, "查询客户事件列表");
                                }, null);
                        }
                    }
                    thsNative.thsCloseWebView();
                    thsNative.thsOpenWebViewWithTitle(rwlj, "查询客户事件列表");

                })
            })
        }
    })

}
/**
 * 更新其他模块
 */
function updateAllNativePage() {
    thsNative.thsUpdateWebView("nethall", ""); // 更新"我的"界面
    thsNative.thsUpdateWebView("index", ""); // 更新"首页"界面
    thsNative.thsUpdateWebView("netmall", ""); // 更新"商城"界面
}


/**
     退出用户登陆，更新未登录状态
     **/
export function exitLogin() {

    thsNative.thsSetCacheData("yhthaslogin", "0");
    thsNative.thsSetCacheData("logingotopage", "");
    thsNative.thsSetCacheData("yhttoken", "");
    thsNative.thsSetCacheData('gradeLevel', '1')

}
/**
  绑定交易账户
  **/
export function bindTrade() {
    var input = {
        "title": "trade",
        "bindtype": "1"
    };
    thsNative.thsSetCacheData("bindtype", input);
    thsNative.thsOpenWebViewWithTitle("#/bind", "账户关联");
}

/**
 * 获取同花顺token
 * @param callBack
 */
export function getThsToken(callBack) {
    thsNative.thsGetCacheData("yhttoken", function(r) {
        var token = r.data;
        var param = {
            "func": "100043",
            "token": token
        };
        api.yhtRequest.commonRequest(param).then(function(data) {
            if (data.errorNo == 0) {
                var obj = data.result[0];
                var token = obj.token;
                callBack(token);
            }
        })
    })
}
/**
 * 交易登录后，来自原生的触发事件，用于处理交易登录后的业务逻辑
 */
export function openAccountUrl() {
    if (yhtplatform == 1) {
        return 'openAccountAndroid'
    } else if (yhtplatform == 2) {
        return 'openAccountIos'
    }
    return 'openAccountIos'
}
/**
 * 交易登录后，来自原生的触发事件，用于处理交易登录后的业务逻辑
 */
export function afterTradeLoginHandle() {

}
/**
 * 风险评测
 */
export function queryRiskTest(param, flag, expDate, callBack) {

    if (flag == "1") {
        thsNative.thsShowConfirm("风险评测",
            "尊敬的投资者，您尚未进行“风险承受能力调查问卷”测评，为了不影响您的正常交易，请您进行测评。",
            "立即评测",
            "稍后评测",
            function() {
                var json = {
                    pagename: "risktest",
                    action: "ymtz"
                };
                thsNative.thsGoToNativePage(json);
            }, null);
    } else if (flag == "2") {
        // 过期,去评测
        thsShowConfirm("风险评测",
            "尊敬的投资者，您的风险承受能力测评结果已过期，为了不影响您的正常交易，请您重新测评。",
            "立即评测", "稍后评测",
            function() {
                var json = {
                    pagename: "risktest",
                    action: "ymtz"
                };
                thsNative.thsGoToNativePage(json);
            }, null);
    } else if (flag == "3") {
        // 过期,去评测
        thsNative.thsShowConfirm("风险评测",
            "尊敬的投资者，您的风险承受能力测评结果将于" + expDate + "到期，为了不影响您的正常交易，请您重新测评。",
            "立即评测", "稍后评测",
            function() {
                var json = {
                    pagename: "risktest",
                    action: "ymtz"
                };
                thsNative.thsGoToNativePage(json);
            },
            function() {
                // param.riskTestFlag = "0"; //用于用户点击稍后评测后继续下单
                // requestSell(param);
                callBack('1')
            });
    }
}
