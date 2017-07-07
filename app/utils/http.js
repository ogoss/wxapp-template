import Promise from '../plugins/es6-promise.min'

export default function(url, { method = 'GET', options }) {
  return new Promise((resolve, reject) => {
    let params = {
      url,
      method,
      success(res) {
        console.log(res)
        resolve(res)
      },
      fail(err) {
        console.log(err)
        reject(err)
      }
    }

    if (options) params = Ojbect.assign(params, options)

    wx.request(params)
  })
}
