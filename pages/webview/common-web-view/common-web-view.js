Page({
  data: {
    src: '',
    allOptions: '',
  },
  onLoad(query) {
    console.log({ query });
    // 页面加载
    this.setData({
      src: decodeURIComponent(query.url),
      allOptions: query,
    });
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage(options) {
    // 返回自定义分享信息
    return {
      title: '分享 web-View 组件',
      desc: 'View 组件很通用',
      path: 'page/component/component-pages/webview/baidu',
      'web-view': options.webViewUrl,
    };
  },
  onmessage(e) {
    my.alert({
      content: '拿到数据' + JSON.stringify(e), // alert 框的标题
    });
  },
  webViewLoad(e) {
    console.log({ e });
  },
  webViewError(e) {
    console.log({e})
  }
});
