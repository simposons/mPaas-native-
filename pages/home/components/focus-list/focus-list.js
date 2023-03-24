import { xgbRequest } from '/services/index';

Component({
  mixins: [],
  data: {
    loading: false,
    mtoken: '',
    items: [],
    pageNum: 1,
  },
  props: {},
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    login() {
      this.$thsNative.thsOpenWebView('#/login');
    },
    getFocusList() {
      this.$thsNative.thsGetCacheData('yhttoken', (r) => {
        this.setData({
          mtoken: r.data,
        });
        if (this.data.mtoken && typeof this.data.mtoken !== 'undefined') {
          this.apiRequest();
        } else {
          this.setData({
            mtoken: '',
          });
        }
      });
    },
    apiRequest() {
      this.setData({
        loading: true,
      });
      const params = {
        pageSize: 10,
        pageNum: this.pageNum,
        token: this.data.mtoken,
      };
      xgbRequest.getFocusList(params).then((res) => {
        this.setData({
          loading: false,
        });
        const dataList = [];
        if (res.error_no === 0) {
          res.results.forEach((item) => {
            const obj = {};
            obj.title = item.title;
            obj.msgCreateTime = item.msgCreatedAt;
            obj.isCollect = item.isCollect;
            obj.msgId = item.msgId;
            if (item.subjs === '-1-') {
              obj.typeId = '1';
              obj.type = '早餐&晚报精选';
              obj.icon = '/assets/image/home/focusList/zwblogo.png';
            } else if (item.subjs === '-3-') {
              obj.typeId = '3';
              obj.type = '公告精选';
              obj.icon = '/assets/image/home/focusList/ggjxlogo.png';
            } else {
              obj.typeId = '2';
              obj.type = '每日复盘&A股五张图';
              obj.icon = '/assets/image/home/focusList/xgbjxlogo.png';
            }
            dataList.push(obj);
          });
          this.setData({
            items: dataList,
          });
        } else {
          this.setData({
            loading: false,
            items: [],
          });
        }
      }).catch(() => {
        this.setData({
          loading: false,
          items: [],
        });
      });
    },
  },
});
