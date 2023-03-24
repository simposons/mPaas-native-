import { xgbRequest } from '/services/index';

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
    this.$page.newLiveInfo = this;
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    // 获取资讯
    getLiveNoticeList() {
      this.setData({
        loading: true,
      });
      xgbRequest.getLiveNotice()
        .then((res) => {
          if (res.data.error_no === 0) {
            this.setData({
              items: res.data.results,
              loading: false,
            });
          }
        })
        .catch(() => {
          this.setData({
            loading: false,
          });
        });
    },
    // 获取旧资讯
    loadNoticeMore() {
      const length = this.data.items.length - 1;
      console.log({ length }, this.data.items);
      if (length === 0) {
        return;
      }
      this.setData({
        loading: true,
      });
      const timeStap = this.data.items[length].msg_time_stamp;
      xgbRequest.getNoticeHistory(timeStap)
        .then((res) => {
          if (res.data.error_no === 0) {
            this.setData({
              items: this.data.items.concat(res.data.results),
              loading: false,
            });
          }
        })
        .catch(() => {
          this.setData({
            loading: false,
          });
        });
    },
    // 跳转到资讯详情页
    itemTap(e) {
      console.log({ e });
      const { item } = e.target.dataset;
      const id = item.msg_id;
      const { style } = item;
      const url = `#/kxLiveDetail/${id}/${style}`;
      // this.$thsNative.thsOpenWebViewWithTitle(url, '资讯详情')
      this.props.onItemTap(e);
    },
  },
});
