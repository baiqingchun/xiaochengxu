//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    loadingHidden:true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  toGather: function (event){
    var item = event.currentTarget.dataset.info;
    wx.navigateTo({
      url: './gather/gather?title='+item
    })
  },
  //支付开始
  pay: function () {
  


  },
  //支付结束
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    console.log('index onload')
    app.PromiseGetInfo.then(function(val){
      console.log('promise',val);
    })
 
  },
  loading: function () {
    this.setData({ loadingHidden: false });
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }, 
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: 'pages/index/gather/gather?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
