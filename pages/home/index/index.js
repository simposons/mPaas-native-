function getBoundingClientRect(selector) {
  return new Promise((resolve) => {
    my.createSelectorQuery()
      .select(selector)
      .boundingClientRect()
      .exec((ret) => {
        if (ret && ret[0]) {
          resolve(ret[0]);
        }
      });
  });
}
Page({
  data: {
    current: 0,
    scrollTop: 0,
    items: [
      {
        title: '直播',
        subTitle: 'zb',
        index: 0,
      },
      {
        title: '智讯',
        subTitle: 'zx',
        index: 1,
       
      },
      {
        title: '7x24',
        subTitle: '7',
        index: 2,

      },
      {
        title: '关注',
        subTitle: 'gz',
        index: 3,

      },
      {
        title: '发售',
        subTitle: 'fs',
        index: 4,
      },
    ],
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    my.setBackgroundTextStyle({
      textStyle: 'dark', // 下拉背景字体、loading 图的样式为 dark light
    });
    this.pageScrollTop = 0;
    this.tabsTop = 0;
  },
  async onReady() {
    // 页面加载完成
    this.getDataByCurrent(this.data.current);
    this.tabsTop = (await getBoundingClientRect('.home-tabs')).top;
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
  async onPullDownRefresh() {
    // 页面被下拉
    this.getDataByCurrent(this.data.current);
  },
  onPageScroll(e) {
    // 页面滑动
    this.pageScrollTop = e.scrollTop;
  },
  onReachBottom(e) {
    // 页面被拉到底部
    console.log({ e });
    // 当模块是7x24时触发底部更新数据
    if (this.data.current === 2) {
      this.newLiveInfo.loadNoticeMore();
    }
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  // swipe change事件
  onSwipeChange(e) {
    this.setData({
      current: e.detail.current,
    });
    this.getDataByCurrent(e.detail.current);
  },
  // tabs change事件
  onChange(current) {
    this.getDataByCurrent(current);
    this.setData({
      current,
    });
    setTimeout(() => {
      my.pageScrollTo({
        scrollTop: this.pageScrollTop > this.tabsTop ? this.tabsTop : this.pageScrollTop,
        duration: 300,
      });
    }, 400);
  },
  // tab 标签点击
  tabTap(e) {
    console.log({ e });
    my.pageScrollTo({
      scrollTop: this.pageScrollTop > this.tabsTop ? this.tabsTop : this.pageScrollTop,
      duration: 300,
    });
  },
  // 根据tab的current判断刷新或者调用哪个组件的方法
  async getDataByCurrent(current) {
    console.log({ current });
    switch (current) {
      case 0:
        await this.newBestLive.getBestLiveList();
        break;
      case 1:
        break;
      case 2:
        await this.newLiveInfo.getLiveNoticeList();
        break;
      case 3:
        break;
      case 4:
        await this.hotSale.getHotSaleProducts();
        break;
      default:
        break;
    }
    setTimeout(() => {
      my.stopPullDownRefresh();
    }, 200);
  },
  go() {
    // 带参数的跳转，从 page/index 的 onLoad 函数的 query 中读取 xx
    my.navigateTo({
      url: '/pages/home/demo/demo?key=11111',
    });
  },
  // home-top home-banner home-menu 点击事件
  gotoFunctionEvent(id) {
    // gotoFunction(id)
  },
  // 7x24 资讯点击事件
  onBestLiveClick(info, buryPoint) {
    // bestLiveClick(info, buryPoint)
  },
});
