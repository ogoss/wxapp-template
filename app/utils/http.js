import Promise from '../plugins/es6-promise.min'

const http = {}

http.wxRequest = (url, { method = 'GET', options }) => {
  return new Promise((resolve, reject) => {
    wx.request({
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
    })
  })
}

http.getLocation = () => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      success(res) {
        resolve(res)
      },
      fail(res) {
        reject(err)
      }
    })
  })
}

export default http
