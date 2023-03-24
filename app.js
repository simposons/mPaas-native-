import { updateManager } from '/utils';
import { isUpdate, setEnv } from '/config/index';

console.info('getSystemInfoSync', my.getSystemInfoSync());
console.info('SDKVersion', my.SDKVersion);
console.info('getEnterOptionsSync', my.getEnterOptionsSync());
console.log('component.observers', my.canIUse('component.observers'));
setEnv(my.env, my.isIDE);
App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    // 监听小程序初始化
    // 当小程序初始化完成时触发，全局只触发一次
    console.info('App onLaunch');
    if (isUpdate) {
      updateManager.getUpdateManager()
        .then((res, e) => {
          console.log({ res }, { e });
        })
        .catch((e) => {
          console.log({ e });
        });
    }
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
    // 监听小程序显示
    // 当小程序启动，或从后台进入前台显示时触发
    console.info('App Show');
  },
  onHide() {
    // 监听小程序隐藏
    // 当小程序从前台进入后台时触发
    console.info('App Hide');
  },
  onError(msg) {
    // 监听小程序错误
    // 当小程序发生 js 错误时触发
    console.info('App Error');
    console.log(msg);
  },
  onShareAppMessage() {
    // 全局分享配置。当页面未设置 page.onShareAppMessage 时，调用分享会执行全局的分享设置，具体内容参见
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  onPageNotFound(msg) {
    // 当跳转的页面有问题或者不存在时 提示或者跳转到自定义的错误页面
    // 未确定是否可以使用！！！
    console.info('App PageNotFound');
    console.log(msg);
  },
  globalData: {
    foo: true,
  },
});
// 全局进行调用
// var app = getApp()
// console.log(app.globalData) // 获取 globalData
