/* eslint-disable no-param-reassign */
// 优品
import { baseApi, env } from '/config/index';
import { ajax } from '/services/request';

const URL = 'livesUrl';
const BASE_API = baseApi[URL][env];

const ypRequest = {
  // 获取优品最火直播数据
  getBestLive() {
    const params = {
      size: 6,
    };
    return ajax.get(BASE_API, params);
  },
};
export default ypRequest;
