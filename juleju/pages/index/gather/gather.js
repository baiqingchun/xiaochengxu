// pages/index/gather/gather.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    will_list:[
      { img:'http://pic.gvrcraft.com/pic/gather1.png',id:1},
      { img:'http://pic.gvrcraft.com/pic/gather2.png',id:2},
      { img:'http://pic.gvrcraft.com/pic/gather3.png',id:2},
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(options)
     let will = this.data.will_list
    //  will.push({ id: 1, img:'../../image/3.png'})

     this.setData({
       will_list: will
     })
  },
  changePage: function (event){
    var item = event.currentTarget.dataset.info;
    wx.navigateTo({
      url: '../info/info?title=' + item
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