// pages/commodity/commodity.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsTypeNum: "",
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从数据库获取data
    this.updateGoodsInfo();
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
  updateGoodsInfo: function() {
    //商品种数
    var goodsTypeNum = this.data.goods.length;
    this.setData({
      goodsTypeNum: goodsTypeNum
    })
  },
  toEdit: function(e){
// 点击编辑按钮；id-index-更新item中的updating标志（local，脏写？）；
// 商品管理是对应售货柜的吗？
    var id = e.target.dataset.id;
    var editIndex = null;
    if(id!=null){
      this.data.goods.forEach(function(item, index){
        if(item.id == id){
          editIndex = index;
          return;
        }
      })
    }else{
      console.log("toEdit: invalid id");
    }
    if(editIndex == null){
      console.log("toEdit: cannot read editIndex");
      return;
    }
    var origin = this.data.goods[editIndex];
    var modified = 'goods[' + editIndex + ']';
    origin.updating = true;
    this.setData({
      [modified]: origin
    })
  },
  toSave: function(e){
// 点击完成按钮，更新数据库并刷新页面数据
    var id = e.detail.value.goodsId;
    var name = e.detail.value.goodsName;
    var price = e.detail.value.goodsPrice;
    var introduction = e.detail.value.goodsIntro;
    // 还有图片！
    console.log("id: "+id+";name:"+name+";price:"+price+";introduction:"+introduction);
    var editIndex = null;

    if(id!=null){
      //更新数据库-更新data
      //当前是按照index修改data
      this.data.goods.forEach(function(item, index){
        if(item.id == id){
          editIndex = index;
          return;
        }
      })
    }else{
      console.log("toSave: invalid id");
    }
    if(editIndex == null){
      console.log("toSave: cannot read editIndex");
      return;
    }
    var origin = this.data.goods[editIndex];
    var modified = 'goods[' + editIndex + ']';
    origin.name = name;
    origin.price = price;
    origin.introduction = introduction;
    origin.updating = false;

    this.setData({
      [modified]: origin
    })
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
          //更新data
          if(id!=null){
            this.data.goods.forEach(function(item, index){
              if(item.id == id){
                editIndex = index;
                return;
              }
            })
          }else{
            console.log("toEdit: invalid id");
          }
          if(editIndex == null){
            console.log("toEdit: cannot read editIndex");
            return;
          }   
          var origin = this.data.goods[editIndex];
          var modified = 'goods[' + editIndex + ']';
          origin.image = res.tempFilePaths[0];
          this.setData({
            [modified]: origin
          })
        }
      }
    })

  },
  toDelete: function(e){
    var id = e.target.dataset.id;
    var goods = this.data.goods;
    var editIndex;

    wx.showModal({
      title: "",
      content: "确认删除这项商品吗？删除后将无法恢复！",
      confirmText: "确认",
      cancelText: "取消",
      success: res => {
        //删除数据库中的数据-更新data
        if(res.confirm){
          if(id!=null){
            this.data.goods.forEach(function(item, index){
              if(item.id == id){
                editIndex = index;
                return;
              }
            })
            if(editIndex == null){
              console.log("toSave: cannot read editIndex");
              return;
            }
            goods.splice(editIndex, 1);
            this.setData({
              goods: goods
           })       
           this.updateGoodsInfo();   
          }else{
            console.log("toDelete: invalid id");
          }
        }
      }
    })
  }
})
// 应该是更新数据库-更新data
// 目前是按照索引更新的data