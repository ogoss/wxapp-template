import http from '../../utils/http'
import cfg from '../../utils/config'

Page({
  data: {
    text: 'This is Home!'
  },
  onReady() {
    http(cfg.requestUrl, { options: { data1: 'data1' } })
      .then((msg) => {
        console.log(msg);
      });
  }
})
