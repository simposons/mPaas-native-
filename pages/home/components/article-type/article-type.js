Component({
  mixins: [],
  data: {
    lanmuList: [
      {
        title: '早餐&晚报精选',
        info: '贴心精准的主题管家，只精选确定性最高的机会，不要上瘾哦。每天早晚各一篇，不见不散。',
        text: '每日市场概要及解读',
        img: '/assets/image/home/lanmu/zwbarticleType.png',
        id: 'bfSelection',
      },
      {
        title: '公告精选',
        info: '海量公告梳理，不仅输出公告内容，更告诉您里面的确定性与可操作性。',
        text: '每日市场概要及解读',
        img: '/assets/image/home/lanmu/ggjxarticleType.png',
        id: 'oneDayTwice',
      },
      {
        title: '每日复盘&A股五张图',
        info: '每日行情、热点回顾，带您了解当日最强题材概念板块。',
        text: '每日市场概要及解读',
        img: '/assets/image/home/lanmu/xgbjxarticleType.png',
        id: 'selectedStocks',
      },
    ],
  },
  props: {},
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    goToPage(id) {
      let url = '';
      switch (id) {
        case 'bfSelection':
          url = 'xgb#/bfSelection';
          // this.$thsNative.thsOpenWebView(url);
          break;
        case 'oneDayTwice':
          url = 'xgb#/oneDayTwice';
          // this.$thsNative.thsOpenWebView(url);
          break;
        case 'selectedStocks':
          url = 'xgb#/selectedStocks';
          // this.$thsNative.thsOpenWebView(url);
          break;
        default:
          break;
      }
    },
  },
});
