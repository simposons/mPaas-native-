Component({
  mixins: [],
  data: {
    businessList: [{
        title: '签署协议',
        imUrl: '/assets/image/me/agreement.png',
        des: '',
        showArrow: true,
        id: 'qsxy'
      },
      {
        title: '创业板开通',
        imUrl: '/assets/image/me/gemOpening.png',
        des: '',
        showArrow: true,
        id: 'cyb'
      },
      {
        title: '账户资料修改',
        imUrl: '/assets/image/me/accData.png',
        des: '',
        showArrow: true,
        id: 'zlbg'
      }
    ],
    shortcutData: [{
        title: '资产分析',
        imUrl: '/assets/image/me/assetDesc.png',
        des: '',
        showArrow: true,
        id: 'assetView'
      },
      {
        title: '限售股',
        imUrl: '/assets/image/me/resShares.png',
        des: '限售股查询',
        id: 'queryStockLimit'
      },
      {
        title: '我的服务专员',
        imUrl: '/assets/image/me/invAdvisor.png',
        des: '',
        showArrow: false,
        id: 'invAdvisor'
      },
      {
        title: '参与回访',
        imUrl: '/assets/image/me/returnVisit.png',
        des: '',
        showArrow: true,
        id: 'visit'
      },
      {
        title: '安全设置',
        imUrl: '/assets/image/me/password.png',
        des: '',
        showArrow: true,
        id: 'safesetting'
      },
      {
        title: '系统设置',
        imUrl: '/assets/image/me/setting.png',
        des: '',
        showArrow: true,
        id: 'systemsetting'
      },
      {
        title: '版本说明',
        imUrl: '/assets/image/me/appInfo.png',
        des: '',
        showArrow: true,
        id: 'versionInfo'
      }
    ],
  },
  props: {},
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {},
});