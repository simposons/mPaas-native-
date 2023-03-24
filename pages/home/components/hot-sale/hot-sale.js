/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
// import thsNative from '/utils/js-bridge/thscommon';
import { hrmallRequest } from '/services/index';

const others = {
  product_sub_type: {
    // 产品子类别
    FUND: '0', // 基金
    FINANCIAL: '1', // 理财
    INFO: '3', // 资讯
    SERVICE: '2', // 服务
    ZHOUYY: '6',
    OTC: '9',
  },
  finaBelongsTypeDic: {
    oldjj: '0', // 基金
    oldlc: '1', // 理财
    oldotc: '9',
  },
  prodTypeDic: {
    zg: '101', // 资管
    jzjysm: '102', // 集中交易私募
    jzjyjj: '103', // 集中交易基金
    yhlc: '104', // 银行理财
    zgxjh: '105', // 资管小集合
    xtcp: '106', // 信托产品
    xttz: '1061', // 信托投资
    xtjz: '1062', // 信托基准
    xtxj: '1063', // 信托现金
    sypz: '107', // 收益凭证
    yljj: '108', // 养老基金
  },
  fina_belongs: {
    // 理财产品类型
    security: '1', // 资管
    bank: '9', // 银行理财
    sypz: 'E', // 收益凭证
    xtcp: '5', // 信托产品
    smjj: 'J', // 私募基金
    zgxjh: '8', // 资管小集合
    zg: '6', // 资管
    tfund: '7', // 集中交易资金
  },
};
Component({
  mixins: [],
  data: {
    loading: true,
    loginState: false,
    hotSaleDataObjectArr: [],
  },
  props: {},
  didMount() {
    this.$page.hotSale = this;
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    getHotSaleProducts() {
      this.setData({
        loading: true,
      });
      // thsNative.thsGetCacheData('yhthaslogin', (r) => {
      //   this.setData({
      //     loading: r.data == 1,
      //   });
      // thsNative.thsGetUserRiskInfo((r) => {
      //   let level = '';
      //   if (r.level) {
      //     level = r.level;
      //   } else {
      //     level = '';
      //   }
      const level = '';
      hrmallRequest
        .hotSaleProducts({
          user_risk_level: level,
          recom_sort: 1,
        })
        .then((res) => {
          const { data } = res;
          this.setData({
            loading: false,
            // hotSaleDataObjectArr: [],
          });
          if (data.error_no == 0) {
            this.fillHotSaleData(data.results);
          } 
        })
        .catch((res) => {
          this.setData({
            loading: false,
            hotSaleDataObjectArr: [],
          });
        });
      // });
      // });
    },
    finaBelongsType(ptype) {
      const { finaBelongsTypeDic } = others;
      if (ptype == '103' || ptype == '108') {
        // 基金
        return finaBelongsTypeDic.oldjj;
      } else if (ptype == '101' || ptype == '102') {
        // 理财
        return finaBelongsTypeDic.oldlc;
      } else if (ptype != '101' && ptype != '102' && ptype != '103' && ptype != '108') {
        // otc
        return finaBelongsTypeDic.oldotc;
      } else {
        return '';
      }
    },
    riskLevel(a) {
      let b = '';
      switch (a) {
        case '0':
          b = '基本无';
          break;
        case '1':
          b = '低';
          break;
        case '2':
          b = '中低';
          break;
        case '3':
          b = '中';
          break;
        case '4':
          b = '中高';
          break;
        case '5':
          b = '高';
          break;
        case '6':
          b = '极高';
          break;
        default:
          b = '--';
          break;
      }
      return b;
    },
    jumpToDetial(page, urlKey, query) {
      const json = {
        pagename: page,
        action: 'ymtz',
      };
      // goToNativePage(json, urlKey, query);
    },
    prodType(ptype, pfina_belongs, psubFina_belongs) {
      const { prodTypeDic } = others;
      if (ptype == 9 && pfina_belongs == 6 && psubFina_belongs == 61) {
        return prodTypeDic.zg;
      } else if (ptype == 9 && pfina_belongs == 'J') {
        return prodTypeDic.jzjysm;
      } else if ((ptype == 9 && pfina_belongs == 7) || ptype == 0) {
        if (psubFina_belongs == '78') {
          return prodTypeDic.yljj;
        }
        return prodTypeDic.jzjyjj;
      } else if (ptype == 9 && pfina_belongs == 9) {
        return prodTypeDic.yhlc;
      } else if (ptype == 9 && pfina_belongs == 6 && psubFina_belongs == '6a') {
        return prodTypeDic.zgxjh;
      } else if (ptype == 9 && pfina_belongs == 'E') {
        return prodTypeDic.sypz;
      } else if (ptype == 9 && pfina_belongs == 5 && psubFina_belongs == '52') {
        return prodTypeDic.xttz;
      } else if (ptype == 9 && pfina_belongs == 5 && psubFina_belongs == '5a') {
        return prodTypeDic.xtjz;
      } else if (ptype == 9 && pfina_belongs == 5 && psubFina_belongs == '5b') {
        return prodTypeDic.xtxj;
      } else {
        return '';
      }
    },
    toFundPage(e) {
      const { data } = e.target.dataset;
      const productId = data.product_id;
      const productSubType = data.product_sub_type;
      const productCode = data.product_code;
      const mprodType = this.prodType(
        data.product_sub_type,
        data.fina_belongs,
        data.fina_belongs_sub,
      );
      const param = {
        product_id: productId,
        product_code: productCode,
        finanDetail_prePageCode: 'indexHQB',
      };
      if (
        productSubType == others.product_sub_type.FUND
          || this.finaBelongsType(mprodType) == '0'
      ) {
        // 基金
        if (data.text == '请登录查看') {
          // this.$thsNative.thsOpenWebView('#/login');
        } else {
          this.jumpToDetial('netmall', 'fundDetail', param);
        }
      } else if (
        productSubType == others.product_sub_type.FINANCIAL
          || productSubType == others.product_sub_type.OTC
      ) {
        if (data.text == '请登录查看') {
          // this.$thsNative.thsOpenWebView('#/login');
        } else {
          this.jumpToDetial('netmall', 'finanDetail', param);
        }
      }
    },
    fillHotSaleData(result) {
      const arr = [];
      for (const item of result) {
        const mprodType = this.prodType(
          item.product_sub_type,
          item.fina_belongs,
          item.fina_belongs_sub,
        );
        let name = item.product_abbr;
        name = name && name.length > 15 ? (name = name.substring(0, 15) + '...') : name;
        let incomeunit = '';
        if (this.finaBelongsType(mprodType) == '9') {
          incomeunit = item.incomeunit
            ? parseFloat(item.incomeunit * 100).toFixed(2)
            : '--';
        } else {
          incomeunit = item.incomeunit ? parseFloat(item.incomeunit).toFixed(2) : '--';
        }
        const risk_level = this.riskLevel(item.risk_level) + '风险';

        let text = '';
        let annual_profit = '';
        const dengluyanzheng = this.data.loginState;
        const { fina_belongs } = others;
        if (
          !dengluyanzheng
              && (item.fina_belongs == fina_belongs.smjj
                  || item.fina_belongs == fina_belongs.xtcp
                  || item.fina_belongs == fina_belongs.zg
                  || item.fina_belongs == fina_belongs.sypz)
        ) {
          annual_profit = '--';
          text = '请登录查看';
        } else if (item.fina_belongs == fina_belongs.xtcp) {
          if (mprodType == '1061') {
            annual_profit = item.netvalue || '--';
            text = '最新净值';
          } else if (mprodType == '1062') {
            annual_profit = parseFloat(item.incomeunit * 100)
              ? parseFloat(item.incomeunit * 100).toFixed(2)
              : '--';
            text = '业绩基准';
          } else if (mprodType == '1063') {
            annual_profit = parseFloat(item.yieldrate7d * 100)
              ? parseFloat(item.yieldrate7d * 100).toFixed(2)
              : '--';
            text = '七日年化';
          }
        } else if (item.fina_belongs == fina_belongs.zg) {
          annual_profit = item.netvalue || '--';
          text = '最新净值';
        } else if (mprodType == '104' || mprodType == '107') {
          // 银行理财和收益凭证
          text = '基准收益率(年化)';
          annual_profit = incomeunit;
        } else if (mprodType == '102') {
          annual_profit = item.current_price || '--';
          text = '最新净值';
        } else if (
          this.finaBelongsType(mprodType) == '0'
              && item.product_status == '1'
        ) {
          annual_profit = item.subscribe_end_time;
          text = '认购截止日';
        } else if (this.finaBelongsType(mprodType) == '0') {
          if (item.fund_type == '7') {
            annual_profit = parseFloat(item.annual_profit * 100)
              ? parseFloat(item.annual_profit).toFixed(2)
              // eslint-disable-next-line no-useless-concat
              : '--' + '%';
            text = '七日年化';
          } else {
            annual_profit = item.current_price || '--';
            text = '最新净值';
          }
        }

        let current_price;
        if (this.finaBelongsType(mprodType) == '0') {
          current_price = item.current_price ? item.current_price : false;
        } else if (!item.investment_horizon || item.investment_horizon == '') {
          current_price = false;
        } else {
          current_price = item.investment_horizon;
        }
        let product_feature = '';
        if (item.product_feature && this.finaBelongsType(mprodType) !== '9') {
          product_feature = item.product_feature;
        }
        let saleMeter = null;
        if (this.finaBelongsType(mprodType) == '9' && item.sale_meter !== '200') {
          saleMeter = item.sale_meter;
        }
        const dataObject = {
          product_id: item.product_id,
          shouyilv:
                  annual_profit.length > 5 || text == '最新净值'
                    ? annual_profit
                    : annual_profit + '%',
          text,
          current_price,
          product_name: name,
          product_code: item.product_code,
          per_buy_limit: item.per_buy_limit,
          risk_level,
          svg_text: item.fund_label, // svg
          fund_label: item.fund_label,
          product_feature,
          product_sub_type: item.product_sub_type,
          fina_belongs: item.fina_belongs,
          fina_belongs_sub: item.fina_belongs_sub,
          // saleMeter: saleMeter,
          sale_meter: saleMeter,
        };
        arr.push(dataObject);
      }
      this.setData({
        hotSaleDataObjectArr: arr,
      });
    },
  },
});
