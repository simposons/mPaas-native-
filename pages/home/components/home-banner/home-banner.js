Component({
  mixins: [],
  data: {
    bannerList: [
      {
        goto: '2023',
        src: '/assets/image/home/ad01.png',
      }, {
        goto: 'jiniukuanian',
        src: '/assets/image/home/ad02.png',
      }, {
        goto: '2036',
        src: '/assets/image/home/ad01.png',
      }, {
        goto: '2039',
        src: '/assets/image/home/ad04.png',
      }, {
        goto: '3007',
        src: '/assets/image/home/ad05.png',
      }, {
        goto: '3001',
        src: '/assets/image/home/ad06.png',
      }, {
        goto: '3004',
        src: '/assets/image/home/ad07.png',
      }, {
        goto: '3002',
        src: '/assets/image/home/ad08.png',
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
