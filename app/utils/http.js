import Promise from '../plugins/es6-promise.min';

/**
 * 设置接口调用参数
 * @param {Function} resolve
 * @param {Function} reject
 * @param {Object} options 自定义参数
 */
function setApiParams(resolve, reject, options = {}) {
  return Object.assign(options, {
    success(res) {
      resolve(res);
    },
    fail(err) {
      reject(err);
    }
  });
}

/**
 * 微信小程序api请求封装,返回promise对象
 * @type {Object}
 */
const http = {
  /**
   * wx.request
   */
  wxRequest(url, { method = 'GET', options }) {
    return new Promise((resolve, reject) => {
      wx.request(setApiParams(resolve, reject, {
        url,
        method,
        header: { 'Content-Type': 'json' },
        data: Object.assign({}, options)
      }));
    });
  }
};

export default http;
