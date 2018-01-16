Page({
  data: {
    animationData: {}
  },
  index: 0,
  length:3,
  distence:  wx.getSystemInfoSync().windowWidth,
  touchstart: function (event){
    var touch = event.touches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
    this.startPos = { x: touch.pageX, y: touch.pageY, time: +new Date }; //取第一个touch的坐标值
    this.isScrolling = 0; //这个参数判断是垂直滚动还是水平滚动
    this.animation.option.transition.duration = 0
  },
  touchmove: function (event){
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
  touchend: function (event){
    var duration = +new Date - this.startPos.time; //滑动的持续时间
    if (this.isScrolling === 0) { //当为水平滚动时
      // this.icon[this.index].className = '';
      if (Number(duration) > 10) {
        //判断是左移还是右移，当偏移量大于10时执行
        if (this.endPos.x > 10) {
          if (this.index !== 0) this.index -= 1;
        } else if (this.endPos.x < -10) {
          if (this.index !== this.length - 1) this.index += 1;
        }
      }
      // this.icon[this.index].className = 'curr';
      // this.slider.className = 'cnt f-anim';
      this.animation.option.transition.duration = 1000
      console.log(this.distence)
      this.animation.translate(-this.index * this.distence).step()
      this.setData({
        animationData: this.animation.export()
      })
      // this.slider.style.left = -this.index * 600 + 'px';
    }
  },
  test:function(){
    this.rotateAndScale()
  },
  a:0,
  onShow: function () {
    console.log(wx.getSystemInfoSync())
    var animation = wx.createAnimation({
      duration: 0,
      timingFunction: 'ease',
    })
    
    console.log(animation)
    this.animation = animation

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
    this.a = this.a+10;
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