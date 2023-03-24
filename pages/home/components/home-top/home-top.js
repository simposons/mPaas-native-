Component({
  mixins: [],
  data: {
    menuList: [
      {
        title: '我要开户',
        imUrl: '/assets/image/home/shortcut01.png',
        to: '',
        id: '1001',
      },
      {
        title: '我的自选',
        imUrl: '/assets/image/home/shortcut05.png',
        to: '',
        id: '2001',
      },
      {
        title: '普通持仓',
        imUrl: '/assets/image/home/shortcut02.png',
        to: '',
        id: '1006',
      },
      {
        title: '两融持仓',
        imUrl: '/assets/image/home/shortcut04.png',
        to: '',
        id: '1007',
      },
      {
        title: '业务办理',
        imUrl: '/assets/image/home/shortcut03.png',
        to: '',
        id: '1003',
      },
    ],
  },
  props: {
    onFunctionEvent: () => {},
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    toItemPage(e) {
      console.log({ e }, e.target.dataset.id);
      const { id } = e.target.dataset;
      this.props.onFunctionEvent(id);
    },
  },
});
