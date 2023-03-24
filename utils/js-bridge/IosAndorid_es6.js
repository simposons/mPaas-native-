import { handleDataFromNative, yzhLogout } from './commonFunctions'
const IosAndorid = {
  checkJsBridge: function () {
    try {

      this.connectWebViewJavascriptBridge((bridge) => {
        bridge.init((message, responseCallback) => { })
        bridge.registerHandler("yzhLogout", function (data, responseCallback) {
          yzhLogout(responseCallback);
        });

        bridge.registerHandler("messageFromNative", function (data, responseCallback) {
          if (!data) {
            return;
          }
          handleDataFromNative(data, responseCallback);
        });
      })
    } catch (e) {

      if (e.message.includes('WebViewJavascriptBridge.init called') === true ||
        (e.message.includes('Blocked a frame with origin "null" from') === true && e.message.includes('frame.Protocols, domains, and ports must match.') === true)) { } else {
        var timer = setTimeout(() => {
          this.checkJsBridge()
          clearTimeout(timer)
        }, 100)
      }
    }
  },
  // 是否安卓系统
  isAndroid: /Android/.test(window.navigator.userAgent) || /Linux/.test(window.navigator.userAgent),
  // 是否苹果手机
  isIphone: /Iphone/.test(window.navigator.userAgent) || /iPhone/.test(window.navigator.userAgent),
  /**
   * 调用客户端方法封装函数
   * @param callback function 回调函数
   */
  connectWebViewJavascriptBridge: function (callback) {

    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge);
    }

    document.addEventListener('WebViewJavascriptBridgeReady', function () {
      console.log('WebViewJavascriptBridgeReady')
      callback(WebViewJavascriptBridge)
    }, false)

    if (window.WVJBCallbacks) {
      console.log('WVJBCallbacks0')
      return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)

  },

  /**
   * 弹框或toast提示方法
   * @param params 调用方法的入参
   */
  hxDialog (params = {}) {
    try {
      this.connectWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('hxDialog', params, function (response) { })
      })
    } catch (e) {
      alert('hxDialogError: ' + JSON.stringify(e))
    }
  },

  /**
   * 弹框
   * @param params
   * @returns {Promise}
   */
  showDialog: function (params = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.connectWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler('hxDialog', params, function (response) {
            if (response) {
              resolve(response)
            } else {
              reject(new Error('数据操作失败!'))
            }
          })
        })
      } catch (e) {
        reject(e)
      }
    })
  },

  /**
   * 页面跳转方法
   * @param params 调用方法的入参
   *
   * 参数说明：
   * pagename:    跳转目标页面的名称
   * action:      一般值为：ymzt,跳转第三方sdk为thirdjump
   * isHiddenNavigationBar:   webview容器页面是否隐藏标题栏：隐藏1，默认不隐藏0
   * isHiddenBottomBar:       是否隐藏底部tab栏，隐藏1，不隐藏0
   * detailURL/url:       webview容器页面加载的地址
   * isNoNeedWtLogin:     是否需要委托登陆，默认0不需要，1需要
   * isNeedHQLogin:       是否需要行情登陆，默认0不需要，1需要
   * mode:       =forcenew表示强制创建一个新的页面入栈，原有页面不出栈，配合pagename=webview使用。=old时，在原有界面加载
   * isGobackLastTab:       跳转后是否需要返回上一页面 1需要 默认0不需要
   */
  routeAction (params = {}) {
    try {
      this.connectWebViewJavascriptBridge(function (bridge) {
        console.log('bridge', bridge)
        bridge.callHandler('routeAction', params, function (response) {

        })
      })
    } catch (e) {
      alert('RouteError: ' + JSON.stringify(e))
    }
  },

  /**
   * 改变页面标题方法
   * @param params 调用方法的入参
   */
  changeWebViewTitle (params = {}) {
    try {
      this.connectWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('changeWebViewTitle', params, function (response) { })
      })
    } catch (e) {
      alert('TitleError: ' + JSON.stringify(e))
    }
  },
  /**
   * 数据操作方法
   * @param params 调用方法的入参(json对象)
   *
   * 所传参数说明：
   * type:             操作类型                1-读取，2-存储，3-删除
   * name:             关键字名称(文件名称)     为空则不存储                          必需
   * data:             关键字内容(文件内容)     (敏感数据需加密)为空则删除对应内容
   * storeLocation:    存储类型                1-内存(app退出时清除)，2-永久，3-缓存(系统清除)  必需
   * storeType:        存储形式                1-setting,2-file                      必需
   * source:           标识来源                固定值：hrInnerWeb                    必需
   *
   * 出参说明：
   * code: 结果   1-成功，0-失败 (单个目录下超过10兆会报错：文件超过了限制10兆大小，请先清理掉不需要文件再存储)
   * data: 取值数据    type=1时，返回数据，其它不返回
   * msg:  结果说明
   */
  dataIO: function (params = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.connectWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler('dataIO', params, function (response) {
            if (response) {
              resolve(response)
            } else {
              reject(new Error('数据操作失败!'))
            }
          })
        })
      } catch (e) {
        reject(e)
      }
    })
  },
  /**
   * 自选操作方法
   * @param params 调用方法的入参
   */
  selfCodeAction: function (params = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.connectWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler('selfCodeAction', params, function (response) {
            if (response) {
              resolve(response)
            } else {
              reject(new Error('自选操作失败!'))
            }
          })
        })
      } catch (e) {
        reject(e)
      }
    })
  },
  /**
   * 获取app版本号方法
   * @param params 调用方法的入参
   */
  getAppInfo: function (params = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.connectWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler('getAppInfo', params, function (response) {
            if (response) {
              resolve(response)
            } else {
              reject(new Error('自选操作失败!'))
            }
          })
        })
      } catch (e) {
        reject(e)
      }
    })
  },

  // 设置交易时长
  setTradeTime: function (params = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.connectWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler('tradeTimeLengthDialog', params, function (response) {
            if (response) {
              resolve(response)
            } else {
              reject(new Error('设置交易时长失败!'))
            }
          })
        })
      } catch (e) {
        reject(e)
      }
    })
  },

  /**
   * 关闭当前webview页面方法
   * @param params 调用方法的入参
   */
  goback (params = {}, callback) {
    try {
      this.connectWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('goback', params, function (response) {
          callback()
        })
      })
    } catch (e) {
      alert('gobackError: ' + JSON.stringify(e))
    }
  },
  /**
   * 分享方法
   * @param params 调用方法的入参
   */
  hexinShare (params = {}) {
    try {
      this.connectWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('hexinShare', params, function (response) { })
      })
    } catch (e) {
      alert('ShareError: ' + JSON.stringify(e))
    }
  },
  /**
   * 调客户端登录方法
   * @param params 调用方法的入参
   */
  doAppLogin: function (params = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.connectWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler('doAppLogin', params, function (response) {
            if (response) {
              resolve(response)
            } else {
              reject(new Error('客户端登录失败!'))
            }
          })
        })
      } catch (e) {
        reject(e)
      }
    })
  },

  /**
   * 刷新webview
   * @param params 调用方法的入参
   *
   * 参数说明：
   * pagename：    要刷新的页面名称        必传
   * url           要刷新的url，如果不传，就将指定的webview reload       可选
   */
  refreshWebView (params = {}) {
    try {
      this.connectWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('refreshWebView', params, function (response) { })
      })
    } catch (e) {
      alert('refreshWebViewError: ' + JSON.stringify(e))
    }
  },

  /**
   * 客户端交易退出
   * @param params
   */
  wtLogOut: function (params = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.connectWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler('wtLogOut', params, function (response) {
            if (response) {
              resolve(response)
            } else {
              reject(new Error('客户端交易退出失败!'))
            }
          })
        })
      } catch (e) {
        reject(e)
      }
    })
  },
  /**
   * 调起用户登录框
   * 国新该接口功能有定制，只返回登录状态，不返回用户加密信息
   * @param params 调用方法的入参
   */
  doYzhLogin: function (params = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.connectWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler('getUserInfoByRsa', params, function (response) {
            if (response) {
              resolve(response)
            } else {
              reject(new Error('调用户登录框登录失败!'))
            }
          })
        })
      } catch (e) {
        reject(e)
      }
    })
  },

  /**
   * 调起微信小程序
   * @param params 调用方法的入参
   */
   toWXMinApp: function (params = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.connectWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler('wxLaunchMiniProgram', params, function (response) {
            if (response) {
              resolve(response)
            } else {
              reject(new Error('调微信小程序失败!'))
            }
          })
        })
      } catch (e) {
        reject(e)
      }
    })
  },

  /**
   * 获取本地消息
   * @param params 调用方法的入参
   */
  localMessageCenterAction: function (params = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.connectWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler('localMessageCenterAction', params, function (response) {
            if (response) {
              resolve(response)
            } else {
              reject(new Error('获取本地消息失败!'))
            }
          })
        })
      } catch (e) {
        reject(e)
      }
    })
  },

  /**
   * 获取用户风险等级相关信息
   * @param params 调用方法的入参
   */
  getUserRiskInfo: function (params = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.connectWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler('getUserRiskInfo', params, function (response) {
            if (response) {
              resolve(response)
            } else {
              reject(new Error('获取用户风险等级失败!'))
            }
          })
        })
      } catch (e) {
        reject(e)
      }
    })
  },

  /**
   * 获取交易留痕相关信息
   * @param params 调用方法的入参
   */
  getDeviceInfo: function (params = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.connectWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler('getDeviceInfo', params, function (response) {
            if (response) {
              resolve(response)
            } else {
              reject(new Error('获取交易留痕相关信息失败!'))
            }
          })
        })
      } catch (e) {
        reject(e)
      }
    })
  },

  /**
   * 用于处理跨域请求的数据请求，原生请求返回给网页
   * @param params 调用方法的入参
   */
  httpGetFunc: function (params = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.connectWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler('httpGetFunc', params, function (response) {
            if (response) {
              resolve(response)
            } else {
              reject(new Error('获取数据失败!'))
            }
          })
        })
      } catch (e) {
        reject(e)
      }
    })
  },
  /**
   * 弹框或toast提示方法
   * @param params 调用方法的入参
   */
  iosLog (params = {}) {
    try {
      this.connectWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('iosLog', params, function (response) { })
      })
    } catch (e) {
      alert('ioslog: ' + JSON.stringify(e))
    }
  },

  /**
   * 是否支持指纹面容识别
   * @param params 调用方法的入参
   */
   queryAppBiometricsAuthentication: function (params = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.connectWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler('queryAppBiometricsAuthentication', params, function (response) {
            if (response) {
              resolve(response)
            } else {
              reject(new Error('获取是否支持指纹面容识别失败!'))
            }
          })
        })
      } catch (e) {
        reject(e)
      }
    })
  },

  /**
   * 调起指纹面容验证
   * @param params 调用方法的入参
   */
   evaluateAppBiometricsAuthentication: function (params = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.connectWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler('evaluateAppBiometricsAuthentication', params, function (response) {
            if (response) {
              resolve(response)
            } else {
              reject(new Error('指纹面容验证失败!'))
            }
          })
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}
IosAndorid.checkJsBridge()
export default IosAndorid