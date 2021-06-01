const util = require("../../utils/util");
import * as echarts from '../../ec-canvas/echarts.min';


function setOption(chart, xlist, ylist){
  // 设置Echart基本参数
  // 动态赋值
  var option = {
    // 图例
    legend: {
      type: "plain",
      bottom: "4%",
      selected:{
        "销售额": true
      },
      textStyle:{
        color: "black",
      },
      tooltip: {
        show: true,
        color: "red"
      },
      data: [
        {
          name: "销售额", 
          icon: "square",
        }
      ],
    },
    // 提示框
    tooltip: {
      show: true,
      trigger: "item", 
      axisPointer: {
        type: "shadow",
        axis: "auto"
      },
      padding: 5,
      textStyle:{
        color: "black"
      }
    },
    // grid区域
    grid:{
      show: false,
      top: 30,
      containLabel: false,
      tooltop:{
        show: true,
        trigger: "item",
        textStyle: {
          color: "black",
        }
      }
    },
    // x轴
    xAxis:{
      show: true,
      position: "bottom",
      offset: 0,
      type: "category",
      name: "月份",
      nameLocation: "end",
      nameTextStyle: {
        color: "black",
        padding: [5, 0, 0, -5],
      },
      nameGap: 10,
      axisLine:{
        show: true,
        lineStyle:{
          color: "black",
          width: 1,
        },
      },
      axisTick:{
        show: true, 
        inside: true,
        lengt: 3, 
        lineStyle: {
          color: "black",
          width: 1
        },
      },
      axisLabel:{
        show: true,
        inside: false,
        rotate: 315,
        margin: 5,
        textStyle:{
          fontSize: 10
        }
      },
      splitLine: {
        show: false, 
      },
      splitArea: {
        show: false
      },
      data: xlist
    },
    // y轴
    yAxis: {
      show: true,
      position: "left",
      offset: 0,
      type: "value",
      name: "销售额",
      nameLocation: "end",
      nameTextStyle: {
        color: "black",
        padding: [5, 0, 0, 5]
      },
      nameGap: 15,
      axisLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: "black",

        },
      },
      axisTick:{
        show: true,
        inside: true,
        lengt: 3,
        lineStyle:{
          color: "black",
          width: 1
        },
      },
      axisLabel:{
        show: true,
        inside: false,
        rotate: 0, 
        margin: 8, 
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: "lightgrey",
          
        },
      },
      splitArea: {
        show: false
      }
    },
    // 内容数据
    series:[
      {
        name: "销售额",
        type: "bar",
        legendHoverLink: true,
        label: {
          show: true,
          position: "insdeTop",
          rotate: 0,
        },
        itemStyle: {
          normal: {
            color: "skyblue",
            barBorderRadius: 0,
            label: {
              show: true, //是否显示
              position: 'top',//显示在顶部
              textStyle: {
                color: 'black', //字体颜色
              }
            }
          },
        },
        // barWidth: "20",
        barCategoryGap: "65%",
        data: ylist
      }
    ],
    dataZoom: 
    {
      show: true,
      type: 'inside',
      realtime: true,
      start: 0,
      end: 35
    },
  };
  chart.setOption(option);
}

// pages/vending_statistics/vending_statistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 时间选择控件
    date: "",
    startDate: "2021-01",
    endDate: "",
    // 当日订单信息
    ordersNum: "",
    goodsNum: "",
    ordersIncome: "",

    //Echart 相关 
    ec: {
      lazyLoad: true
    },
    xlist: [],
    ylist: [],
    oneComponent: "",

    //售货机信息
    id:1,
    position: "position",
    model: "model",
    startTime: "2021-01-24", // 售货机投入使用的时间，时间选择和柱状图应当考虑到
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
    ],
    orders:[
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
        state: "已成功",
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
        state: "已成功",
        time: "2021-3-29 14:31:26",
        orders: [
          {name: "美汁源", price: 3, number: 1},
          {name: "康师傅红茶", price: 3, number: 1}
        ],
        totalPrice: 6,
        totalNumber: 2,
      }
    ],
    monthlyRankings:[]        
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      //date picker初始化
      date: util.formatMonth(new Date),
      endDate: util.formatMonth(new Date),
      // 售货柜id
      id: options.id
    })
    this.updateOrdersInfo();
    // 根据售货柜id和时间读数据库
    // 只统计成功的订单

    this.oneComponent = this.selectComponent("#columnEChart");
    this.getOneOption();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
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
   * 时间选择器
   */
  dateChange: function(e){
    // 获得选择后的日期
    console.log("chosen date: "+e.detail.value);
    this.setData({
      date: e.detail.value
    });
    // 日期改变后销售情况更新
    this.updateOrdersInfo();
  },
  /**
   * nav中的月份订单信息
   */
  updateOrdersInfo: function() {
    // 根据date从数据库获取当月数据
    //更新并显示订单总数、卖出物品总数、总收入
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
  },
  /**
   * 销量排行
   */
  updateMonthlyRankings: function(){
    // 后端算？
  },
  /**
   * Echart
   */
  getOneOption: function(){
    // 更新xlist和ylist
    this.setData({
      xlist: ['2020-08', '2020-09', '2020-10', '2020-11', '2020-12', '2021-01', '2021-02', '2021-03', '2021-04', '2021-05', '2021-06', '2021-07'],
      ylist: [15, 20, 45, 37, 15, 100, 45, 37, 15, 20, 100, 100], // x轴数据  
    })
    this.initOne(this.data.xlist, this.data.ylist) 
  },
  initOne: function (xdata, ylist){
    // 生成chart
    console.log(this.oneComponent);
    this.oneComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption(chart, xdata, ylist);
      // 点击数据，修改时间
      chart.on("click", params => {
        console.log(params);
        var clickDate = params.name;
        console.log(clickDate);
        this.setData({
          date: clickDate
        });
        this.updateOrdersInfo();
      })
      this.chart = chart;
      return chart;
    });
  },
})