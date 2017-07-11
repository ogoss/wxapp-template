import http from '../../utils/http'
import cfg from '../../utils/config'

const app = getApp();

Page({
  data: {
    title: `正在上映的电影 - ${app.data.city}`,
    subjects: []
  },
  onReady() {
    http.wxRequest(cfg.inTheaters, { options: { city: app.data.city, start: 0, count: 32 } })
      .then((msg) => {
        this.setData({
          subjects: msg.data.subjects
        })
      });
  }
})
