// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: null,
    nickName: null,
    avatarUrl: null,
    options: [
      {
        option: "订单管理",
        url: "/pages/order/order"
      }, {
        option: "商品管理",
        url: "/pages/commodity/commodity"
      }, {
        option: "售货柜管理",
        url: "/pages/vending_machine/vending_machine"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    // 查看是否授权
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              self.setData({
                userInfo: res.userInfo,
                avatarUrl: res.userInfo.avatarUrl,
                nickName: res.userInfo.nickName
              })
            }
          })
        } else {
          console.log("用户没有授权!!!")
        }
      }
    })
  },
  
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo){
      this.setData({
        userInfo: e.detail.userInfo,
        avatarUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName
      })
    } else {
      wx.showToast({
        title: '授权失败',
        icon: 'error',
        duration: 3000
      });
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