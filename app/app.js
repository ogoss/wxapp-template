import http from './utils/http'
import cfg from './utils/config'

App({
  data: {
    city: '上海'
  },
  onLaunch() {
    http.getLocation()
      .then((msg) => {
        return http.wxRequest(cfg.baiduMap, {
          options: {
            output: 'json',
            ak: '1pNuv2i9plPAl5jCim44Ujx2',
            location: `${msg.latitude},${msg.longitude}`
          }
        })
      })
      .then((msg) => {
        this.data.city = msg.data.result.addressComponent.city.split('市')[0]
      })
  }
})
