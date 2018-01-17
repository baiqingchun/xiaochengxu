//app.js
App({
  onLaunch: function () {
    var _this = this;
    console.log('onLaunch')
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // this.PromiseGetInfo  = new Promise(function (resolve, reject) {
    //   _this.login(resolve)
    // })
    this.PromiseGetInfo = this.getInfo();
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  PromiseGetInfo: null,
  globalData: {
    userInfo: null
  },
  openid:'',
  token:'',
  getXOR: function (message, key) {
    const arr = [];
    for (let i = 0; i < message.length; i++) {
      const m = message.charCodeAt(i);
      const k = key.charCodeAt(i % key.length);
      arr.push(String.fromCharCode(m ^ k));
  
    }
    return arr.join('');
  },
  getXOR2: function (message, key) {
    const arr = [];
    for (let i = 0; i < message.length; i++) {
      const m = message.charCodeAt(i);
      const k = key.charCodeAt(i % key.length);
      arr.push(String.fromCharCode(m ^ k));
    
    }
    return arr.join('');
  }, 
  onShow:function(){
    console.log('onshow')
    console.log('openid',wx.getStorageSync('openid'))
    this.PromiseGetInfo = this.getInfo();
  },
   g_site_server: "https://api.gvrcraft.com/",
  getInfo: function () {
    var _this = this;

    var promise = new Promise(function (resolve, reject) {
      wx.checkSession({
        success: function () {
          //session 未过期，并且在本生命周期一直有效
          console.log('已登录')
          let options = {
            'openid': wx.getStorageSync('openid'),
            'token': _this.getXOR(wx.getStorageSync('token'),'xcxstar'),
            'userinfo': wx.getStorageSync('userinfo'),
          }
          _this.openid = options.openid
          _this.token = options.token
          if (options.openid){
            console.log('有登录信息')
            resolve(options);
          }else{
            console.log('没有有登录信息')
            _this.login(resolve)
          }
          
          // console.log('调用app')
          // _this.login(resolve)
        },
        fail: function () {
          //登录态过期
          _this.login(resolve)

        }
      })
    });
    return promise;
  },
  login: function (resolve) {
    var _this = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.getUserInfo({
            success: function (resInfo) {
              var userInfo = resInfo.userInfo
              //发起网络请求
              wx.request({
                url: _this.g_site_server + '/api/login4',
                header: {
                  'content-type': 'application/json' // 默认值
                },
                method: 'POST',
                data: {
                  code: res.code,
                  nickname: userInfo.nickName,
                  headimgurl: userInfo.avatarUrl,
                  sex: userInfo.gender//性别 0：未知、1：男、2：女
                },
                success: function (data) {
                  let result = data.data.data
                  let xortoken = _this.getXOR(result.token, 'xcxstar')
                  wx.setStorageSync('openid', result.openid)
                  wx.setStorageSync('token', xortoken)
                  wx.setStorageSync('userinfo', userInfo)
                
                  let options = {
                    'openid': result.openid,
                    'token': result.token,
                    'userinfo': userInfo,
                  }
                  resolve(options);
                  //  app.openid = result.openid
                  //  app.token = result.token
                  // resolve(result);
                  // var openid = res.data.openid;
                },
                fail: function (err) {
                  console.log(err)
                }
              })
            }
          })

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }


      }
    })
  }
})