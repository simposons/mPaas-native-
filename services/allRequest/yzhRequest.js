// 一账户
import { baseApi, env } from '/config/index';
import { ajax, request } from '/services/request';

const URL = 'main_url';
const BASE_API = baseApi[URL][env];

const yzhRequest = {
  testAjax(param) {
    const params = {
      funcNo: '',
      ...param,
    };
    return ajax.post(BASE_API, params);
  },
  testRequest(params) {
    return request(BASE_API, 'POST', params, false);
  },
};
export default yzhRequest;
