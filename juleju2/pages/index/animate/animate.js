Page({
  data: {
    animationData: {},
    indexSlider: 1,
    left: 0,
    list:[
      // { img: 'http://pic.gvrcraft.com/pic/title2.png', index: 2 },
      {img:'http://pic.gvrcraft.com/pic/title0.png',index:0},
      {img:'http://pic.gvrcraft.com/pic/title1.png',index:1},
      {img:'http://pic.gvrcraft.com/pic/title2.png',index:2},
      // { img: 'http://pic.gvrcraft.com/pic/title0.png', index: 0 }
    ]
  },
  index: 1,
  length: 3,
  // distence:  wx.getSystemInfoSync().windowWidth,
  distence: 220 / 375 * wx.getSystemInfoSync().windowWidth,
  touchstart: function (event) {
    var touch = event.touches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
    this.startPos = { x: touch.pageX, y: touch.pageY, time: +new Date }; //取第一个touch的坐标值
    this.isScrolling = 0; //这个参数判断是垂直滚动还是水平滚动
    this.animation.option.transition.duration = 0
  },
  touchmove: function (event) {
    //当屏幕有多个touch或者页面被缩放过，就不执行move操作

    if (event.touches.length > 1 || event.scale && event.scale !== 1) return;
    var touch = event.touches[0];
    this.endPos = { x: touch.pageX - this.startPos.x, y: touch.pageY - this.startPos.y };
    this.isScrolling = Math.abs(this.endPos.x) < Math.abs(this.endPos.y) ? 1 : 0; //isScrolling为1时，表示纵向滑动，0为横向滑动
    if (this.isScrolling === 0) {
      // event.preventDefault(); //阻止触摸事件的默认行为，即阻止滚屏
      // this.slider.className = 'cnt';

      this.animation.translate(-this.index * this.distence + this.endPos.x).step()
      this.setData({
        animationData: this.animation.export()
      })
      // this.slider.style.left = -this.index * 600 + endPos.x + 'px';
    }
  },
  touchend: function (event) {
    var duration = +new Date - this.startPos.time; //滑动的持续时间
    if (this.isScrolling === 0) { //当为水平滚动时
      // this.icon[this.index].className = '';
      if (Number(duration) > 10) {
        //判断是左移还是右移，当偏移量大于10时执行
        console.log('this.endPos.x',this.endPos.x)
        if (this.endPos.x > 10) {
          if (this.index !== 0) this.index -= 1;
          // if (this.index == 0) { this.popArry()}
        } else if (this.endPos.x < -10) {
          if (this.index !== this.length - 1) { this.index += 1; } else { this.index=0}
          
        }
      }
      // this.icon[this.index].className = 'curr';
      // this.slider.className = 'cnt f-anim';
      this.animation.option.transition.duration = 1000
      // console.log(this.distence)
      this.animation.translate(-this.index * this.distence).step()
      this.setData({
        animationData: this.animation.export(),
        indexSlider: this.index
      })
      // if (this.index == this.length - 1) { this.shiftArry() }
      // this.slider.style.left = -this.index * 600 + 'px';
    }
  },
  test: function () {
    this.rotateAndScale()
  },
  //把尾部元素放在头部
  popArry:function(){
    let lis = this.data.list
    let one  = lis.pop()
    lis.unshift(one)
    console.log(lis)
    this.setData({
      list:lis
    })
  },
  //把头部元素放在尾部
  shiftArry: function () {
    let lis = this.data.list
    let one = lis.shift()
    lis.push(one)
    console.log(lis)
    this.setData({
      list: lis
    })
  },
  a: 0,
  onShow: function () {
    console.log(wx.getSystemInfoSync())


    var animation = wx.createAnimation({
      duration: 0,
      timingFunction: 'ease',
    })

    console.log(animation)
    this.animation = animation
    //220是要滑动的图片的宽度
    // this.distence = 220 / 375 * wx.getSystemInfoSync().windowWidth
    console.log(wx.getSystemInfoSync().windowWidth / 2, this.distence / 2)
    this.setData({
      left: (wx.getSystemInfoSync().windowWidth / 2 - this.distence/2)
    })
    this.animation.translate(-this.index * this.distence).step()
    this.setData({
      animationData: this.animation.export()
    })
    // animation.scale(2, 2).rotate(45).step()

    // this.setData({
    //   animationData: animation.export()
    // })

    // setTimeout(function () {
    //   animation.translate(30).step()
    //   this.setData({
    //     animationData: animation.export()
    //   })
    // }.bind(this), 1000)
  },
  rotateAndScale: function () {
    // 旋转同时放大
    this.a = this.a + 10;
    this.animation.rotate(this.a).scale(2, 2).opacity(0.1).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateThenScale: function () {
    // 先旋转后放大
    this.animation.rotate(45).step()
    this.animation.scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateAndScaleThenTranslate: function () {
    // 先旋转同时放大，然后平移
    this.animation.rotate(45).scale(2, 2).step()
    this.animation.translate(100, 100).step({ duration: 1000 })
    this.setData({
      animationData: this.animation.export()
    })
  }
})