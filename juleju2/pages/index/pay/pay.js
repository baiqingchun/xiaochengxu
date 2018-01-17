// pages/index/pay/pay.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    total:0.01
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  addRecord:function(){

  },
  addpay:function(){
    wx.request({
      url: app.g_site_server + 'api/pay?token='+app.token,
      method: 'POST', 
      data: {
        userId: 18310627605,
        amount_change: 100,
        details: 'aaa',
        reason: 'wxpay'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  orderquery:function(fun){
    wx.request({
      url: app.g_site_server + '/wxpay/orderquery', 
      data: {
        trade_no:app.trade_no
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        let data = res.data.data
        if(data){
           fun();
        }
      }
    })
  },
  pay:function(){
    let total_fee = this.data.total*100//所有金额转换以分为单位
    wx.request({
      url: app.g_site_server + '/getpay',
      method: 'POST',
      data: {

        total_fee:total_fee,   /*订单金额*/
        openid: app.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        let body = res.data.data
        console.log('预支付', body)
        if(body){
          wx.requestPayment({
            'timeStamp': body.timeStamp,
            'nonceStr': body.nonceStr,
            'package': 'prepay_id=' + body.prepay_id,
            'signType': 'MD5',
            'paySign': body._paySignjs,
            'success': function (res) {
              console.log(res);
              app.trade_no = res.data.data.xml.out_trade_no[0]//订单号

            },
            'fail': function (res) {
              console.log('fail:' + JSON.stringify(res));
            }
          })
        }
     
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})