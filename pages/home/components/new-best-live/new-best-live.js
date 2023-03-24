import { ypRequest } from '/services/index';

Component({
  mixins: [],
  data: {
    loading: true,
    items: [],
  },
  props: {
    onItemTap: () => {},
  },
  didMount() {
    this.$page.newBestLive = this;
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    // 获取首页最火直播数据
    getBestLiveList() {
      this.setData({
        loading: true,
      });
      ypRequest.getBestLive().then((res) => {
        const { list } = res.data;
        this.setData({
          items: list,
          loading: false,
        });
      }).catch((err) => {
        this.setData({
          loading: false,
        });
      });
    },
    // 跳转到直播详情页
    itemTap(e) {
      console.log({ e });
      const { item } = e.target.dataset;
      const json = {
        type: '2',
        funId: '1',
        stageId: item.ID,
      };
      this.props.onItemTap(json, 'tg_user');
    },
  },
});
