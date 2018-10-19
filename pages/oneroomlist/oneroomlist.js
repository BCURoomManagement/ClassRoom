// pages/oneroomlist/oneroomlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomtype:null,
    array1: [{
      roomname: " 大数据学院119", roomplace: "3号实训楼1层北侧", roompeople: 40, roomimg: "../../images/room1.png", wifi: false, ty: true, jsj: true, key: true, network: false, tv: true, studentcomputer: false, desk: false, ytj: false, hy: true, kt: false, gddesk: true
    }],
    screenheight: wx.getSystemInfoSync().windowHeight,
    flag1: true,
    flag2: false,
    selectjson: null,
    items:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.setData({
      items: this.data.array1.length,
      roomjson: options.roomjson
    })
    console.log(this.data.screenheight+"xxxxxxxx")
    console.log(this.data.roomjson)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  go: function (e) {
    wx.redirectTo({
      url: '../timeselect/timeselect',
    })
  },
  //弹出层
  show: function (e) {
    this.setData({
      flag1: false,
      flag2: true,
      selectjson: e.currentTarget.dataset.item,
    })
    // var name = e.currentTarget.dataset.item;
    console.log("a", this.data.selectjson);
  },
  hide: function () {
    this.setData({
      flag1: true,
      flag2: false,
    })
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