// pages/commodity_add/commodity_add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    undefinedImg: "/images/icons/image_update.png",
    image: "undefined",
    id: "",
    name: "",
    price: "",
    number: "",
    introduction: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.InitiateGoodInfo();
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
  InitiateGoodInfo: function(){
    //获取一个新id
    this.setData({
      id: 1,
      number: 0
    })
  },
  toSave: function(e){
    var id = this.data.id;
    var number = this.data.number;
    var image = this.data.image;

    var name = e.detail.value.goodsName;
    var price = e.detail.value.goodsPrice;
    var introduction = e.detail.value.goodsIntro;
    if(image == "undefined" || !name || !price || !introduction){
      wx.showToast({
        title: '请完善信息！',
      })
      return;
    }
    wx.showModal({
      title: "信息确认",
      content: "id: " + id + "\n商品名: " + name + "\n价格: " + price + "\n剩余数量: " + number + "\n商品介绍: " + introduction,
      confirmText: "确认",
      cancelText: "取消",
      success: res =>{
        if(res.confirm){
          this.setData({
            name: name,
            price: price,
            introduction: introduction
          })
          // 更新数据库
          wx.showToast({
            title: id + "\n" + name + "\n" + price + "\n" + number + "\n" + introduction,
          })   
        }
      }
    })
    // this.setData({
    //   name: name,
    //   price: price,
    //   introduction: introduction
    // })
    // // 更新数据库
    // var image = this.data.image;
    // var id = this.data.id;
    // var name = this.data.name;
    // var price = this.data.price;
    // var number = this.data.number;
    // var introduction = this.data.introduction;
    // console.log("image: " + image + "id: " + id + "name: " + name + "price: " + price + "number:" + number + "introduction: " + introduction)
    // wx.showToast({
    //   title: id + "\n" + name + "\n" + price + "\n" + number + "\n" + introduction,
    // })
    // wx.navigateBack({
    //   delta: 1,
    // })
  },
  toUpdateImg: function(e){
    var id = e.target.dataset.id;
    var editIndex;

    let maxSize = 1024*1024;
    let maxLength = 1;
    let flag = true;
    // 选择图片
    wx.chooseImage({
      // 一次只能上传一张图片
      count: 1,      
      sizeType:['original', 'compressed'],
      sourceType:['album', 'camera'],
      success: res => {
        wx.showToast({
          title: '正在上传……',
          icon:"loading",
          mask: true,
          duration: 500
        })
        // 图片大小合法性判断
        if(res.tempFilePaths[0].size > maxSize){
          flag = false;
          console.log("toUpdateImg: image too large");
          wx.showModal({
            title: "",
            content: "图片过大！",
            showCancel: false,
            confirmText: "确认",
          })
        }
        // 图片数量合法性判断
        if(res.tempFilePaths.length > maxLength){
          console.log(res.tempFilePaths[0].length);
          console.log("toUpdateImg: 1 image once");
          wx.showModal({
            title: "",
            content: "只能上传一张照片！",
            showCancel: false,
            confirmText: "确认"
          })
        }
        if(flag && res.tempFilePaths.length <= maxLength){
          this.setData({
            image: res.tempFilePaths[0]
          })
        }
      }
    })
  },
})