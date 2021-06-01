const util = require("../../utils/util");

// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperNav:[
      {
        tabName:'已完成',
        cond: true
      },
      {
        tabName:'异常',
        cond: false
      },
    ],
    // 时间选择控件
    date: "",
    startDate: "2021-01-01",
    endDate: "",
    // 当日订单信息
    ordersNum: "",
    goodsNum: "",
    ordersIncome: "",
    // 订单详细信息
    orders:[
      //应该还有售货柜字段？
      {
        id: 1,
        state: "已完成",
        time: "2021-3-29 14:31:26",
        orders: [
          {name: "脉动", price: 3, number: 9},
          {name: "康师傅红茶", price: 3, number: 3},
        ],
        totalPrice: 36,
        totalNumber: 12,
      },
      {
        id: 2,
        state: "已完成",
        time: "2021-3-29 14:31:26",
        orders: [
          {name: "芬达", price: 3, number: 9},
        ],
        totalPrice: 27, 
        totalNumber: 9,
      },
      {
        id: 3,
        state: "已退款",
        time: "2021-3-29 14:31:26",
        orders: [
          {name: "加多宝", price: 3, number: 8},
          {name: "芬达", price: 3, number: 2},
          {name: "康师傅红茶", price: 3, number: 2}
        ],
        totalPrice: 36,
        totalNumber: 12,
      },
      {
        id: 4,
        state: "已退款",
        time: "2021-3-29 14:31:26",
        orders: [
          {name: "美汁源", price: 3, number: 1},
          {name: "康师傅红茶", price: 3, number: 1}
        ],
        totalPrice: 6,
        totalNumber: 2,
      }
    ],
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date: util.formatDate(new Date),
      endDate: util.formatDate(new Date)
    });
    this.updateOrdersInfo();
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
   * 选择导航栏条目
   */
  swiperNav: function(e){
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index;
    var arr = this.data.swiperNav;
    for(let i = 0; i< arr.length; i++)
    {
      if(i == index){
        arr[i].cond = true;
      }else{
        arr[i].cond = false;
      }
    }
    this.setData({
        swiperNav : arr
      })
  },
  dateChange: function(e){
    // 获得选择后的日期
    this.setData({
      date: e.detail.value
    });
  },
  updateOrdersInfo: function() {
    //上传当日订单总数、卖出物品总数、总收入
    var ordersNum = 0;
    var goodsNum = 0;
    var ordersIncome = 0;
    this.data.orders.forEach(function(item){
      ordersNum += 1;
      goodsNum += item.totalNumber;
      ordersIncome += item.totalPrice;
    });
    this.setData({
      ordersNum: ordersNum,
      goodsNum: goodsNum,
      ordersIncome: ordersIncome
    })
  }
})
////// 订单时间和状态的判断应该是后台完成的？whatever状态判断先放在wxml了
