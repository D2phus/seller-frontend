// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scanImage: "/images/icons/scan_open.png"
  },

  onTap: function() {
    console.log("开门")
    wx.request({
      url: 'http://192.168.1.109:8000/openDoor',
      method:'POST',
      data:{
        "username": "rocketeerli",
        "password": "rocketeerli"
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
      }
    })
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

  },
  /**
   * 扫码
   */
  scanCodeEvent: function(){
    wx.scanCode({
      onlyFromCamera: true,
      success(res){
        console.log("扫码成功：" + JSON.stringify(res))
        console.log("开门")
        wx.request({
          // url: 'http://192.168.1.109:8000/openDoor',
          url: res.result,
          method:'POST',
          data:{
            "username": "rocketeerli",
            "password": "rocketeerli"
          },
          header: {
            // 'content-type': 'application/json'
            'content-type':'application/x-www-form-urlencoded'
          },
          success: function(res) {
            console.log(res.data)
          }
        })
      },
      fail(res){
          wx.showToast({
            title: '扫码失败！',
          })
          console.log("扫码失败：" + JSON.stringify(res))
      }
    })
  }
})