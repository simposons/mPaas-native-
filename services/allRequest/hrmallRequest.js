/* eslint-disable no-param-reassign */
// 优品
import { baseApi, env } from '/config/index';
import { ajax } from '/services/request';

const URL = 'hrmall';
const BASE_API = baseApi[URL][env];

const hrmallRequest = {
  // 火热发售请求
  hotSaleProducts() {
    const params = {
      funcNo: '2000008',
    };
    return ajax.get(BASE_API, params);
  },
};
export default hrmallRequest;
