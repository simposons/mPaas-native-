Component({
  mixins: [],
  data: {
    islogin: 1,
    shortcutData: [{
        title: '我的资产',
        imUrl:  '/assets/image/me/icon1.png',
        des: '',
        id: 'myassets'
      },
      {
        title: '业务办理',
        imUrl: '/assets/image/me/icon2.png',
        des: '',
        id: 'business'
      },
      {
        title: '我的关注',
        imUrl: '/assets/image/me/icon3.png',
        des: '',
        id: 'myfocus'
      },
      {
        title: '我的收藏',
        imUrl: '/assets/image/me/icon4.png',
        des: '',
        id: 'mycollection'
      }
    ]
  },
  props: {},
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    gotoLogin() {},
  },
});