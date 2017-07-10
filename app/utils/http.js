import Promise from '../plugins/es6-promise.min'

export default function(url, { method = 'GET', options }) {
  return new Promise((resolve, reject) => {
    let params = {
      url,
      method,
      header: { 'Content-Type': 'json' },
      data: Object.assign({}, options),
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    }
    wx.request(params)
  })
}
