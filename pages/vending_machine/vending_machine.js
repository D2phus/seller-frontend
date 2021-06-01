// pages/vending_machine/vending_machine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    machines:[
      {
        id:1,
        position: "position",
        model: "model",
        goods:[
          {
            id: 1,
            name: "脉动",
            price: 3,
            number: 9,
            introduction: "这是脉动的介绍",
            image: "../../images/goods/maidong.jpg",
            updating: false
          },
          {
            id: 2,
            name: "芬达",
            price: 4,
            number: 5,
            introduction: "这是芬达的介绍",
            image: "../../images/goods/fenda.jpg",
            updating: false
          }
        ]    
      },
      {
        id:2,
        position: "position_2",
        model: "model_2",
        goods:[
          {
            id: 2,
            name: "芬达",
            price: 4,
            number: 5,
            introduction: "这是芬达的介绍",
            image: "../../images/goods/fenda.jpg",
            updating: false
          },
          {
            id: 1,
            name: "脉动",
            price: 3,
            number: 9,
            introduction: "这是脉动的介绍",
            image: "../../images/goods/maidong.jpg",
            updating: false
          }
        ]    
      }

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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