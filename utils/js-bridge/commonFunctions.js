/*
 * @Description: 业务逻辑相关代码
 * @Version: 2.0
 * @Autor: lrp
 * @Date: 2020-07-13 08:34:25
 * @LastEditors: lrp
 * @LastEditTime: 2020-09-03 15:06:00
 */

import thsNative from './thscommon'
import { gotoYGT, afterTradeLoginHandle } from './commonLogic'
/**
 * 一账户退出
 */
export function yzhLogout (responseCallback) {
  thsNative.thsSetCacheData("mulAccount", ""); // 清除已经登录过的账号信息
  thsNative.thsSetCacheData("yhthaslogin", "0");
  thsNative.thsSetCacheData("logingotopage", "");
  thsNative.thsSetCacheData("yhttoken", "");
  thsNative.thsSetCacheData("bindstateString", "");
  if (responseCallback) {
    var json = { code: "0" };
    responseCallback(json);
  }
}
/**
 * 处理来自原生的数据
 * @param data
 */
export function handleDataFromNative (data, responseCallback) {
  if (data) {
    var func = data.func;
    switch (func) {
      case "1001": // 关闭软键盘
        closeKeyBoard();
        break;
      case "1002": // 跳转到业务办理-电子签名约定书
        gotoYGT(1, function () {
          var json = { "code": "0" };
          responseCallback(json);
        });
        break;
      case "1003": // 跳转到业务办理-开通基础设施基金交易权限
        gotoYGT(27, function () {
          var json = { "code": "0" };
          responseCallback(json);
        });
        break;
      case "2001": // 原生登录成功后，来自原生的触发事件，用于处理交易登录后的业务逻辑
        afterTradeLoginHandle();

        break;
    }
  }
}
/**
 * 关闭软键盘
 */
function closeKeyBoard () {
  var pageId = $("body .page[data-display='block']").attr("id");
  var pageCode = pageId.replace("_", "/");
  if (pageCode == "me/bind") {
    // seajs.use(["./scripts/me/bind"], function (page) {
    //   page.destroy();
    // });
  }
}
