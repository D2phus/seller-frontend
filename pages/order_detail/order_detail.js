// pages/order_detail/order_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: 1,
    state: "已完成",
    time: "2021-3-29 14:31:26",
    orders: [
      {name: "脉动", price: 3, number: 9},
      {name: "康师傅红茶", price: 3, number: 3},
    ],
    totalPrice: 36,
    totalNumber: 12,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
      this.setData({
        orderId: options.id
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

//应该是从order page的跳转中获得order id，然后再次请求数据库？
