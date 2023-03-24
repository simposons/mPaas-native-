import { dayjs } from '/utils/index.js';
import { yzhRequest } from '/services/index';
import { imgUrl } from '/config/index';
import store from '/store/index';

const app = getApp();
const pickerData = ['1', ' 2', '3', '4'];

Page(store.register({
  data: {
    scrollTop: '200rpx',
    bgColor: '#ff0000',
    bgColorTop: '#00ff00',
    bgColorBottom: '#0000ff',
    nbTitle: '标题',
    nbLoading: false,
    nbFrontColor: '#000000',

    title: 'demo',
    num: 1,
    picker: '1',
    url: imgUrl.test,
    testData: [1, 2, 3],
    chartData: { 
      categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
      series: [
        {
          name: '目标值',
          data: [35, 36, 31, 33, 13, 34],
        },
        {
          name: '完成量',
          data: [18, 27, 21, 24, 6, 28],
        },
      ],
    },
    // 您可以通过修改 config-ucharts.js 文件中下标为 ['column'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。
    // 实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
    opts: {
      color: ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#FC8452'], 
      padding: [15, 15, 0, 5],
      enableScroll: false,
      legend: {},
      xAxis: {
        disableGrid: true,
        yAxis: {
          data: [
            {
              min: 0,
            },
          ],
        },
        extra: {
          column: {
            type: 'group',
            width: 30,
            activeBgColor: '#000000',
            activeBgOpacity: 0.08,
          },
        },
      },
    },
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    const page = getCurrentPages();
    console.log(page);
    const date = dayjs().format('YYYY-MM-DD');
    console.log(date);
    my.hideBackHome();
    console.log({ app }, app.globalData);
    this.dispatch('loadPageData'); 
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
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  go() {
    // 带参数的跳转，从 page/index 的 onLoad 函数的 query 中读取 xx
    my.navigateTo({
      url: '/pages/index/index',
    });
  },
  numChange() {
    this.setData({
      num: this.data.num + 1,
    });
  },
  leftTap(e) {
    console.log('leftTap', e);
  },
  async ajaxTest() {
    const param = {};
    const data = await yzhRequest.testAjax(param);
    console.log({ data });
    my.showToast({ content: data.data.error_info });
  },
  onPickerTap() {
    my.showActionSheet({
      title: '请选择',
      items: pickerData,
      success: (res) => {
        console.log({ res });
        this.setData({
          picker: pickerData[res.index],
        });
      },
    });
  },
  goWebView() {
    const link = 'https://render.alipay.com/p/w/tinyapp-demo-h5/index.html';
    const link2 = 'https://opendocs.alipay.com/mini/component/web-view';
    my.navigateTo({
      url: `/pages/webview/common-web-view/common-web-view?url=${encodeURIComponent(link2)}`,
    });
  },
  spliceDataTest() {
    console.log(this.data.testData);
    const data = [4, 5, 6];
    this.$spliceData({
      testData: data,
    }, () => {
      console.log(this.data);
    });
  },
  // API-DEMO page/API/watch-shake/watch-shake.js
  watchShake() {
    my.watchShake({
      success() {
        console.log('动起来了');
        my.alert({ title: '动起来了 o.o' });
      },
    });
  },
}));
