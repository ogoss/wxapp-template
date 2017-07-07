import http from '../../utils/http'

Page({
  data: {
    text: 'This is home!!!'
  },
  onReady() {
    console.log(http)
  }
})
