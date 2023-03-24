/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
// 选股宝
import { baseApi, env } from '/config/index';
import { ajax } from '/services/request';

const URL = 'xgbBaseUrl';
const BASE_API = baseApi[URL][env];

const xgbRequest = {
  // 获取优品最火直播数据
  getBestLive() {
    const params = {
      size: 6,
    };

    return ajax.get(BASE_API, params);
  },
  // 直播快讯首次请求
  getLiveNotice() {
    const params = {
      funcNo: 6000013,
      req_type: 1,
    };
    return ajax.get(BASE_API + '/xgb?', params);
  },
  // 请求最新直播快讯
  getNoticeNew(time_stamp) {
    const params = {
      funcNo: 6000013,
      req_type: 2,
      msg_time_stamp: time_stamp,
    };
    return ajax.get(BASE_API + '/xgb?', params);
  },
  // 请求历史直播快讯
  getNoticeHistory(time_stamp) {
    const params = {
      funcNo: 6000013,
      req_type: 3,
      msg_time_stamp: time_stamp,
    };
    return ajax.get(BASE_API + '/xgb?', params);
  },
  // 获取已关注列表
  getFocusList(param) {
    const params = {
      funcNo: 6000048,
      ...param,
    };
    return ajax.get(BASE_API + '/xgb?', { params });
  },
};
export default xgbRequest;
