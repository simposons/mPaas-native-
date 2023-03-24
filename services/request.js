/* eslint-disable no-unused-expressions */
const request = (url, method = 'POST', options = {}, loading = false) => {
  return new Promise((resolve, reject) => {
    loading && my.showLoading();
    const token = '';
    const data = { ...options, token };
    my.request({
      url,
      method,
      header: {
        'content-type': 'application/json', // 默认值
      },
      data,
      dataType: 'json',
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
        const SystemInfo = my.getSystemInfo();
        const { SDKVersion } = my;
        my.reportAnalytics('requestError', {
          SystemInfo,
          SDKVersion,
          err,
          url,
          data,
        });
      },
      complete: (res) => {
        loading && my.hideLoading();
        console.log(res);
      },
    });
  });
};

const ajax = {
  get(url, options) {
    return request(url, 'GET', options);
  },
  post(url, options) {
    return request(url, 'POST', options);
  },
  put(url, options) {
    return request(url, 'PUT', options);
  },
  del(url, options) {
    return request(url, 'DELETE', options);
  },
};

export default {
  ajax,
  request,
};
