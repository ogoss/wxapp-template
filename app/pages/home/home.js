import http from '../../utils/http'
import cfg from '../../utils/config'

const app = getApp();

Page({
  data: {
    title: '',
    subjects: []
  },
  onReady() {
    http.wxRequest(cfg.inTheaters, { options: { city: app.data.city, start: 0, count: 32 } })
      .then((msg) => {
        this.setData({
          title: msg.data.title,
          subjects: msg.data.subjects
        })
      });
  }
})
