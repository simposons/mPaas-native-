/**
 * h5与同花顺原生通信的业务接口封装层
 * author:  jerry
 * 2019.7.18
 */
import IosAndorid from './IosAndorid_es6.js'
import { baseApi, env } from '/config/index';
import { tradePageList, checkIfEmployee } from './tradePageList.js'
const xgbURL = baseApi['newVueXgbUrl'][env]
// 初始化方法

const thsNative = {
    /**
     * 打开全屏不带标题栏的webview
     * @param url
     */
    thsOpenWebView(url) {
        var fUrl
        var aIsNeedHQLogin = arguments[1] // 第二个参数是否需要行情登陆，0不需要，1需要。不传代表需要
        if (url && url.indexOf("xgb#/") != -1) {
            url = url.slice(3)
            fUrl = xgbURL + url;
        } else if (url && url.startsWith("#/")) {
            fUrl = "http://hxfile.com/m/yzh/index.html" + url;
        } else {
            fUrl = url
        }
        if (typeof(aIsNeedHQLogin) == 'undefined' || aIsNeedHQLogin == true) {
            aIsNeedHQLogin = 1
        } else {
            aIsNeedHQLogin = 0
        }
        console.log('fUrl', fUrl)
            /*
            * 参数说明：
            * pagename:    跳转目标页面的名称
            * action:      一般值为：ymtz,跳转第三方sdk为thirdjump
            * isHiddenNavigationBar:   webview容器页面是否隐藏标题栏：隐藏1，默认不隐藏0
            * isHiddenBottomBar:       是否隐藏底部tab栏，隐藏1，不隐藏0
            * detailURL/url:       webview容器页面加载的地址
            * isNeedWtLogin:     是否需要委托登陆，默认0不需要，1需要
            * pageTitle:   目标界面的title
            * isNeedHQLogin:       是否需要行情登陆，默认0不需要，1需要
            * mode:     =forcenew:  强制创建一个新的页面入栈，原有页面不出栈，返回可返回上一个页面
                        =old:  使用当前webview加载新url，可返回上个url，前后两个url要保证标题栏的一致性，即都用原生或都用H5
                        =replace:  使用当前webview加载新url，不能返回上个url
            * isGobackLastTab:       跳转后是否需要返回上一页面 1需要 默认0不需要(只有webview跳原生交易才用此参数，webview到webview不用)
            */
        var json = {
            pagename: 'webview',
            url: fUrl,
            action: 'ymtz',
            isHiddenNavigationBar: '1',
            isHiddenBottomBar: '1',
            isNeedWtLogin: '0',
            mode: 'forcenew',
            isNeedHQLogin: aIsNeedHQLogin
        }
        IosAndorid.routeAction(json)
    },
    /**
     * 打开全屏带标题栏的webview
     * @param url
     */
    thsOpenWebViewWithTitle(url, aTitle) {
        var fUrl;
        if (url && url.indexOf("xgb#/") != -1) {
            url = url.slice(3)
            fUrl = xgbURL + url;
        } else if (url && url.startsWith("#/")) {
            fUrl = "http://hxfile.com/m/yzh/index.html" + url;
        } else {
            fUrl = url;
        }
        console.log('curUrl', fUrl)

        /*
         * 参数说明：
         * pagename:    跳转目标页面的名称
         * action:      一般值为：ymtz,跳转第三方sdk为thirdjump
         * isHiddenNavigationBar:   webview容器页面是否隐藏标题栏：隐藏1，默认不隐藏0
         * isHiddenBottomBar:       是否隐藏底部tab栏，隐藏1，不隐藏0
         * detailURL/url:       webview容器页面加载的地址
         * isNeedWtLogin:     是否需要委托登陆，默认0不需要，1需要
         * pageTitle:   目标界面的title
         * isNeedHQLogin:       是否需要行情登陆，默认0不需要，1需要
         * mode:     =forcenew:  强制创建一个新的页面入栈，原有页面不出栈，返回可返回上一个页面
                     =old:  使用当前webview加载新url，可返回上个url，前后两个url要保证标题栏的一致性，即都用原生或都用H5
                     =replace:  使用当前webview加载新url，不能返回上个url
         * isGobackLastTab:       跳转后是否需要返回上一页面 1需要 默认0不需要(只有webview跳原生交易才用此参数，webview到webview不用)
         */
        var json = {
            pagename: "webview",
            url: fUrl,
            action: "ymtz",
            isHiddenNavigationBar: "0",
            isHiddenBottomBar: "1",
            isNeedWtLogin: "0",
            pageTitle: aTitle,
            mode: "forcenew",
            isNeedHQLogin: "1"
        };
        IosAndorid.routeAction(json);
    },
    /**
     * 打开全屏不带标题栏的webview且不缓存
     * @param url
     */
    thsOpenWebViewNoCache(url) {
        var fUrl
            // eslint-disable-next-line eqeqeq
        if (url && url.indexOf("xgb#/") != -1) {
            url = url.slice(3)
            fUrl = xgbURL + url;
        } else if (url && url.startsWith("#/")) {
            fUrl = "http://hxfile.com/m/yzh/index.html" + url;
        } else {
            fUrl = url
        }
        console.log('fUrl', fUrl)
            /*
            * 参数说明：
            * pagename:    跳转目标页面的名称
            * action:      一般值为：ymtz,跳转第三方sdk为thirdjump
            * isHiddenNavigationBar:   webview容器页面是否隐藏标题栏：隐藏1，默认不隐藏0
            * isHiddenBottomBar:       是否隐藏底部tab栏，隐藏1，不隐藏0
            * detailURL/url:       webview容器页面加载的地址
            * isNeedWtLogin:     是否需要委托登陆，默认0不需要，1需要
            * pageTitle:   目标界面的title
            * isNeedHQLogin:       是否需要行情登陆，默认0不需要，1需要
            * mode:     =forcenew:  强制创建一个新的页面入栈，原有页面不出栈，返回可返回上一个页面
                        =old:  使用当前webview加载新url，可返回上个url，前后两个url要保证标题栏的一致性，即都用原生或都用H5
                        =replace:  使用当前webview加载新url，不能返回上个url
            * isGobackLastTab:       跳转后是否需要返回上一页面 1需要 默认0不需要(只有webview跳原生交易才用此参数，webview到webview不用)
            * cachePolicy	浏览器缓存情况，0：默认缓存策略，1：忽略缓存
            */
        var json = {
            pagename: 'webview',
            url: fUrl,
            action: 'ymtz',
            isHiddenNavigationBar: '1',
            isHiddenBottomBar: '1',
            isNeedWtLogin: '0',
            mode: 'forcenew',
            cachePolicy: '1',
            isNeedHQLogin: '1'
        }
        IosAndorid.routeAction(json)
    },
    /**
     * 打开全屏带标题栏的webview且不缓存
     * @param url
     */
    thsOpenWebViewWithTitleNoCache(url, aTitle) {
        var fUrl;
        if (url && url.indexOf("xgb#/") != -1) {
            url = url.slice(3)
            fUrl = xgbURL + url;
        } else if (url && url.startsWith("#/")) {
            fUrl = "http://hxfile.com/m/yzh/index.html" + url;
        } else {
            fUrl = url;
        }
        console.log('curUrl', fUrl)

        /*
         * 参数说明：
         * pagename:    跳转目标页面的名称
         * action:      一般值为：ymtz,跳转第三方sdk为thirdjump
         * isHiddenNavigationBar:   webview容器页面是否隐藏标题栏：隐藏1，默认不隐藏0
         * isHiddenBottomBar:       是否隐藏底部tab栏，隐藏1，不隐藏0
         * detailURL/url:       webview容器页面加载的地址
         * isNeedWtLogin:     是否需要委托登陆，默认0不需要，1需要
         * pageTitle:   目标界面的title
         * isNeedHQLogin:       是否需要行情登陆，默认0不需要，1需要
         * mode:     =forcenew:  强制创建一个新的页面入栈，原有页面不出栈，返回可返回上一个页面
                     =old:  使用当前webview加载新url，可返回上个url，前后两个url要保证标题栏的一致性，即都用原生或都用H5
                     =replace:  使用当前webview加载新url，不能返回上个url
         * isGobackLastTab:       跳转后是否需要返回上一页面 1需要 默认0不需要(只有webview跳原生交易才用此参数，webview到webview不用)
         * cachePolicy	浏览器缓存情况，0：默认缓存策略，1：忽略缓存
         */
        var json = {
            pagename: "webview",
            url: fUrl,
            action: "ymtz",
            isHiddenNavigationBar: "0",
            isHiddenBottomBar: "1",
            isNeedWtLogin: "0",
            pageTitle: aTitle,
            mode: "forcenew",
            cachePolicy: '1',
            isNeedHQLogin: "1"
        };
        IosAndorid.routeAction(json);
    },
    /**
     * 在当前webview加载界面
     * @param url
     */
    thsOpenWebViewSelfWithTitle(url, aTitle) {
        var fUrl;
        if (url && url.indexOf("xgb#/") != -1) {
            url = url.slice(3)
            fUrl = xgbURL + url;
        } else if (url && url.startsWith("#/")) {
            fUrl = "http://hxfile.com/m/yzh/index.html" + url;
        } else {
            fUrl = url;
        }
        console.log('curUrl', fUrl)
            /*
             * 参数说明：
             * pagename:    跳转目标页面的名称
             * action:      一般值为：ymtz,跳转第三方sdk为thirdjump
             * isHiddenNavigationBar:   webview容器页面是否隐藏标题栏：隐藏1，默认不隐藏0
             * isHiddenBottomBar:       是否隐藏底部tab栏，隐藏1，不隐藏0
             * detailURL/url:       webview容器页面加载的地址
             * isNeedWtLogin:     是否需要委托登陆，默认0不需要，1需要
             * pageTitle:   目标界面的title
             * isNeedHQLogin:       是否需要行情登陆，默认0不需要，1需要
             * mode:     =forcenew:  强制创建一个新的页面入栈，原有页面不出栈，返回可返回上一个页面
                         =old:  使用当前webview加载新url，可返回上个url，前后两个url要保证标题栏的一致性，即都用原生或都用H5
                         =replace:  使用当前webview加载新url，不能返回上个url
             * isGobackLastTab:       跳转后是否需要返回上一页面 1需要 默认0不需要(只有webview跳原生交易才用此参数，webview到webview不用)
             */
        var json = {
            pagename: "webview",
            url: fUrl,
            action: "ymtz",
            isHiddenNavigationBar: "0",
            isHiddenBottomBar: "1",
            isNeedWtLogin: "0",
            pageTitle: aTitle,
            mode: "replace",
            isNeedHQLogin: "1"
        };
        IosAndorid.routeAction(json);
    },
    /**
     * 在当前webview加载界面
     * @param url
     */
    thsOpenWebViewSelf(url) {
        var fUrl;
        if (url && url.indexOf("xgb#/") != -1) {
            url = url.slice(3)
            fUrl = xgbURL + url;
        } else if (url && url.startsWith("#/")) {
            fUrl = "http://hxfile.com/m/yzh/index.html" + url;
        } else {
            fUrl = url;
        }
        console.log('curUrl', fUrl)
            /*
             * 参数说明：
             * pagename:    跳转目标页面的名称
             * action:      一般值为：ymtz,跳转第三方sdk为thirdjump
             * isHiddenNavigationBar:   webview容器页面是否隐藏标题栏：隐藏1，默认不隐藏0
             * isHiddenBottomBar:       是否隐藏底部tab栏，隐藏1，不隐藏0
             * detailURL/url:       webview容器页面加载的地址
             * isNeedWtLogin:     是否需要委托登陆，默认0不需要，1需要
             * pageTitle:   目标界面的title
             * isNeedHQLogin:       是否需要行情登陆，默认0不需要，1需要
             * mode:     =forcenew:  强制创建一个新的页面入栈，原有页面不出栈，返回可返回上一个页面
                         =old:  使用当前webview加载新url，可返回上个url，前后两个url要保证标题栏的一致性，即都用原生或都用H5
                         =replace:  使用当前webview加载新url，不能返回上个url
             * isGobackLastTab:       跳转后是否需要返回上一页面 1需要 默认0不需要(只有webview跳原生交易才用此参数，webview到webview不用)
             */
        var json = {
            pagename: "webview",
            url: fUrl,
            action: "ymtz",
            isHiddenNavigationBar: "1",
            isHiddenBottomBar: "1",
            isNeedWtLogin: "0",
            mode: "old",
            isNeedHQLogin: "1"
        };
        IosAndorid.routeAction(json);
    },

    /**
     * 在当前webview加载界面
     * @param url
     */
    thsOpenWebViewSelfNoBack(url) {
        var fUrl;
        if (url && url.indexOf("xgb#/") != -1) {
            url = url.slice(3)
            fUrl = xgbURL + url;
        } else if (url && url.startsWith("#/")) {
            fUrl = "http://hxfile.com/m/yzh/index.html" + url;
        } else {
            fUrl = url;
        }
        console.log('curUrl', fUrl)
            /*
             * 参数说明：
             * pagename:    跳转目标页面的名称
             * action:      一般值为：ymtz,跳转第三方sdk为thirdjump
             * isHiddenNavigationBar:   webview容器页面是否隐藏标题栏：隐藏1，默认不隐藏0
             * isHiddenBottomBar:       是否隐藏底部tab栏，隐藏1，不隐藏0
             * detailURL/url:       webview容器页面加载的地址
             * isNeedWtLogin:     是否需要委托登陆，默认0不需要，1需要
             * pageTitle:   目标界面的title
             * isNeedHQLogin:       是否需要行情登陆，默认0不需要，1需要
             * mode:     =forcenew:  强制创建一个新的页面入栈，原有页面不出栈，返回可返回上一个页面
                         =old:  使用当前webview加载新url，可返回上个url，前后两个url要保证标题栏的一致性，即都用原生或都用H5
                         =replace:  使用当前webview加载新url，不能返回上个url
             * isGobackLastTab:       跳转后是否需要返回上一页面 1需要 默认0不需要(只有webview跳原生交易才用此参数，webview到webview不用)
             */
        var json = {
            pagename: "webview",
            url: fUrl,
            action: "ymtz",
            isHiddenNavigationBar: "1",
            isHiddenBottomBar: "1",
            isNeedWtLogin: "0",
            mode: "replace",
            isNeedHQLogin: "1"
        };
        IosAndorid.routeAction(json);
    },

    /**
     * 跳转到原生界面
     * @param url
     */
    thsGoToNativePage(aJson) {
        /*
         * 参数说明：
         * pagename:    跳转目标页面的名称
         * action:      一般值为：ymtz,跳转第三方sdk为thirdjump
         * isHiddenNavigationBar：   webview容器页面是否隐藏标题栏：隐藏1，默认不隐藏0
         * url:       加载的地址
         * isGobackLastTab:       跳转后是否需要返回上一页面 1需要 默认0不需要(只有webview跳原生交易才用此参数，webview到webview不用)
         */
        var json = {
            pagename: aJson.pagename,
            url: aJson.url,
            isHiddenNavigationBar: aJson.isHiddenNavigationBar,
            isGobackLastTab: '1',
            type: aJson.type,
            funId: aJson.funId,
            action: aJson.action,
            rzrqTradeType:aJson.rzrqTradeType,
            stockcode:aJson.stockcode,
            pageType:aJson.pageType
        }
        // 判断是否为交易页面
        if(tradePageList.indexOf(aJson.pagename) > -1) {
            let that = this
            console.log("aJson.pagename:" + aJson.pagename)
            // 获取是否为员工账号标志
            checkIfEmployee(() => {
                IosAndorid.routeAction(json)
            })
        } else {
            IosAndorid.routeAction(json)
        }
    },

    /**
     * 跳转到优品sdk
     * @param url
     */
    thsGoToNativePageForYP(aJson) {
        /*
         * 参数说明：
         * pagename:    跳转目标页面的名称
         * action:      一般值为：ymtz,跳转第三方sdk为thirdjump
         * isHiddenNavigationBar：   webview容器页面是否隐藏标题栏：隐藏1，默认不隐藏0
         * url:       加载的地址
         * isGobackLastTab:       跳转后是否需要返回上一页面 1需要 默认0不需要(只有webview跳原生交易才用此参数，webview到webview不用)
         */
        var json = {
            pagename: aJson.pagename,
            url: aJson.url,
            isHiddenNavigationBar: aJson.isHiddenNavigationBar,
            isGobackLastTab: '1',
            type: aJson.type,
            funId: aJson.funId,
            tipsId:aJson.tipsId,
            action: aJson.action
        }
        IosAndorid.routeAction(json)
    },
    /**
     * 关闭当前webview
     */
    thsCloseWebView(callBack) {
        var json = {
            type: 'component'
        }
        IosAndorid.goback(json, callBack)
    },
    /**
     * 刷新指定的webview
     * @param aPageName
     * @param aUrl
     */
    thsUpdateWebView(aPageName, aUrl) {
        var json = {
            pagename: aPageName,
            url: aUrl
        }
        IosAndorid.refreshWebView(json)
    },
    /**
     * 跳转到个股详情
     * @param stock
     */
    thsGoToStockPage(symbol, isMarket = false) {
        console.log('symbol', symbol)
        const stock = symbol
        const code = stock.split('.')[0]
        var json = {
            pagename: 'stocktimesharing',
            stockcode: code,
            action: 'ymtz'
        }
        if (isMarket === true) {
            const marketId = stock.split('.')[1]
            const marketIds = {
                SZ: 32,
                SS: 16,
            }
            if (marketIds[marketId]) {
                json.stockmarket = marketIds[marketId]
                if (code == '000001' && marketIds[marketId] == '16') {
                    json.stockcode = '1A0001'
                }
            }

        }
        console.log('json', json)
        IosAndorid.routeAction(json)
    },
    /**
     * 永久存储数据
     * @param aKey:     关键字
     * @param aValue：  要存储的内容
     */
    thsSetLocalData(aKey, aValue) {
        var json = { type: "2", name: aKey, data: aValue, storeLocation: "2", storeType: "1", source: "hrInnerWeb" };
        IosAndorid.dataIO(json).then(function(res) {});
    },
    /**
     * 根据key获取永久数据
     * @param aKey：     关键字
     * @param callBack： 回调
     */
    thsGetLocalData(aKey, callBack) {

        var json = { type: "1", name: aKey, storeLocation: "2", storeType: "1", source: "hrInnerWeb" };
        console.log(json)
        IosAndorid.dataIO(json).then(function(res) {
            return callBack(res);
        });
    },
    /**
     * 根据key获取缓存数据
     * @param aKey：     关键字
     * @param callBack： 回调
     */
    thsGetCacheData(aKey, callBack) {
        var json = { type: "1", name: aKey, storeLocation: "1", storeType: "1", source: "hrInnerWeb" };
        IosAndorid.dataIO(json).then(function(res) {
            return callBack(res);
        });
    },
    /**
     * 缓存临时数据
     * @param aKey:     关键字
     * @param aValue：  要存储的内容
     */
    thsSetCacheData(aKey, aValue) {
        var json = { type: "2", name: aKey, data: aValue, storeLocation: "1", storeType: "1", source: "hrInnerWeb" };
        IosAndorid.dataIO(json).then(function(res) {});
    },
    /**
     * toast提示
     * @param msg：提示内容
     */
    thsToast(msg) {
        var data = { type: "toast", msg: msg };
        IosAndorid.hxDialog(data);
    },

    /**
     * 弹出提示框
     * @param title
     * @param msg
     * @param btnTextLeft
     * @param btnTextRight
     * @param callBackLeft
     * @param callBackRight
     */
    thsShowConfirm(title, msg, btnTextLeft, btnTextRight, callBackLeft, callBackRight) {
        var textLeft, textRight;
        var arr = new Array();
        if (btnTextLeft) {
            textLeft = { "buttonText": btnTextLeft, "respondCode": "1" };
            arr.push(textLeft);
        }
        if (btnTextRight) {
            textRight = { "buttonText": btnTextRight, "respondCode": "2" };
            arr.push(textRight);
        }
        var json = { type: "dialog", msg: msg, title: title, buttons: arr };
        IosAndorid.showDialog(json).then(function(res) {
            if (res.code == 1) { // 成功
                if (res.respondCode == 1) {
                    if (callBackLeft) {
                        callBackLeft();
                    }
                } else if (res.respondCode == 2) {
                    if (callBackRight) {
                        callBackRight();
                    }
                }
            }
        });
    },

    /**
     * 调起用户登录框
     * 国新该接口功能有定制，只返回登录状态，不返回用户加密信息
     * @param params 调用方法的入参
     */
    thsDoYzhLogin(aJson, callBack) {
        IosAndorid.doYzhLogin(aJson).then(function(res) {
            return callBack(res);
        });
    },

    /**
     * 调微信小程序
     * @param params 调用方法的入参
     */
     thsToWXMinApp(aJson, callBack) {
        IosAndorid.toWXMinApp(aJson).then(function(res) {
            return callBack(res);
        });
    },

    /**
     * 分享
     * @param aJson    分享的数据
     * @param callBack  回调
     */
     thsShare(aJson, callBack) {
        IosAndorid.hexinShare(aJson).then(function(res) {
            return callBack(res);
        });
    },

    /**
     * 接口被调用时，网页需要做等待转圈，客户端在10s内做登录操作，若超时会失败都会回调失败信息。
     * 若成功则会回调成功信息。网页再收到回调后处理后续逻辑。
     * @param aToken    同花顺单点登录token
     * @param callBack
     */
    thsDoTradeLogin(aJson, callBack) {
        IosAndorid.doAppLogin(aJson).then(function(res) {
            return callBack(res);
        });
    },

    thsShowConfirmAndForbidBackKey(title, msg, btnTextLeft, btnTextRight, callBackLeft, callBackRight) {
        var textLeft, textRight;
        var arr = new Array();
        if (btnTextLeft) {
            textLeft = { "buttonText": btnTextLeft, "respondCode": "1" };
            arr.push(textLeft);
        }
        if (btnTextRight) {
            textRight = { "buttonText": btnTextRight, "respondCode": "2" };
            arr.push(textRight);
        }
        var json = { type: "dialog", msg: msg, title: title, buttons: arr, isForbidKeyDownBack: "1" };
        // isForbidKeyDownBack  1：禁用物理返回键 0：可以使用物理返回键 默认0
        IosAndorid.showDialog(json).then(function(res) {
            if (res.code == 1) { // 成功
                if (res.respondCode == 1) {
                    if (callBackLeft) {
                        callBackLeft();
                    }
                } else if (res.respondCode == 2) {
                    if (callBackRight) {
                        callBackRight();
                    }
                }
            }
        });
    },
    /**
     * 跳转到优品投顾第三方sdk
     * @param url
     */
    thsGoToTGThirdPage(aJson) {
        /*
         * 参数说明：
         * pagename:    跳转目标页面的名称
         * action:      一般值为：ymtz,跳转第三方sdk为thirdjump
         * isHiddenNavigationBar：   webview容器页面是否隐藏标题栏：隐藏1，默认不隐藏0
         * url:       加载的地址
         * isGobackLastTab:       跳转后是否需要返回上一页面 1需要 默认0不需要(只有webview跳原生交易才用此参数，webview到webview不用)
         */
        var json = {
            pagename: "opentg",
            type: aJson.type,
            funId: aJson.funId,
            url:aJson.url,
            stageId: aJson.stageId,
            tipsId:aJson.tipsId,
            isHiddenNavigationBar: "1",
            action: "thirdjump"
        };
        console.log('thsGoToTGThirdPage', json)
        IosAndorid.routeAction(json);
    },
    /**
     * 获取用户风险等级相关信息
     * @param aJson
     * @param callBack
     */
    thsGetUserRiskInfo(callBack) {
        IosAndorid.getUserRiskInfo().then(function(res) {
            return callBack(res);
        });
    },
    /**
     * 若webview页面标题为自带标题，调用此方法可以回退到上一个界面
     * @param aRefreshFlag,返回后界面是否需要刷新，aRefreshFlag=1，刷新。等于0或者空不刷新
     */
    thsGoBackLastWebViewAndRefresh() {
        var json = { type: "webpage", refresh: "1" };
        IosAndorid.goback(json);
    },
    /**
     * 若webview页面标题为自带标题，调用此方法可以回退到上一个界面
     */
    thsGoBackLastWebView() {
        var json = { type: "webpage" };
        IosAndorid.goback(json);
    },
    /**
     * 客户端交易退出
     * @param aToken
     * @param callBack
     */
    thsDoTradeLogout(aJson, callBack) {
        IosAndorid.wtLogOut(aJson).then(function(res) {
            return callBack(res);
        });
    },
    /**
     * 获取或设置消息推送的接口
     * @param aJson
     * @param callBack
     */
    thsPushNewsAction(aJson, callBack) {
        IosAndorid.localMessageCenterAction(aJson).then(function(res) {
            return callBack(res);
        });
    },
    /**
     * 获取交易留痕相关信息
     * @param aJson
     * @param callBack
     */
    thsGetDeviceInfo(callBack) {
        IosAndorid.getDeviceInfo().then(function(res) {
            return callBack(res);
        });
    },

    /**
     * 获取app版本信息
     * @param callBack
     */
    thsGetAppInfo(callBack) {
        IosAndorid.getAppInfo().then(function(res) {
            return callBack(res);
        });
    },

    // 设置交易时长
    thsSetTradeTime() {
        IosAndorid.setTradeTime().then(function(res) {
            return;
        });
    },

    /**
     * 获取是否支持指纹面容识别
     * @param aJson
     * @param callBack
     */
     thsIsSupportBiometrics(callBack) {
        IosAndorid.queryAppBiometricsAuthentication().then(function(res) {
            return callBack(res);
        });
    },

    /**
     * 调起指纹面容验证
     * @param aJson
     * @param callBack
     */
     thsVerifyBiometrics(callBack) {
        IosAndorid.evaluateAppBiometricsAuthentication().then(function(res) {
            return callBack(res);
        });
    }

}

export default thsNative