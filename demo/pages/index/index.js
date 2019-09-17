// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '眯眼看世界',
    userInfo:{},
    isShow:true
  },
  handleClieck(){
    //点击跳转list页面
    /* 原来页面不保留
    wx.redirectTo({
      url: '/pages/list/list',
    })*/
    wx.switchTab({
      url:"/pages/list/list"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getUserInfo();
  },
  getUserInfo(){
    //判断用户是否授权了
    wx.getSetting({
      success: (data) => {
        console.log(data);
        if (data.authSetting['scope.userInfo']) {
          //用户已经授权
          this.setData({
            isShow: false
          })
        } else {
          //用户未授权
          this.setData({
            isShow: true
          })
        }
      }
    })

    //定时器 加载数据  执行一次
    //获取用户登录信息
    wx.getUserInfo({
      success: (data) => {
        console.log(data);
        this.setData({
          userInfo: data.userInfo
        })
      },
      fail: (data) => {
        console.log("获取用户信息失败");
      }
    })
  },
  handleGetUserInfo(data){
    console.log('用户点击了'+data);
    //判断用户判断的是否是允许
    if(data.detail.rawData){
      //用户点击的是允许
      this.getUserInfo();
    }
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
    //可以执行多次
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