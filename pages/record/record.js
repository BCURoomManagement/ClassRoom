// pages/record/record.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{ name: "大数据学院", type: "1", color: "linear-gradient(to right bottom, #D486FF 0%,#9666fe 100%)" }, { name: "多媒体教室", type: "2", color: "linear-gradient(to right bottom, #FFBA96 0%,#FF7A95 100%)" }, { name: "普通教室", type: "3", color: "linear-gradient(to right bottom, #33CAFF 0%,#2A85FC 100%)" }],
    selecDetail:null,
    userid:null,
    recordlist:null,
    roomtypename: ["", "大数据学院", "多媒体教室", "普通教室"],
    typecolor: ["linear-gradient(to right bottom, #D486FF 0%,#9666fe 100%)", "linear-gradient(to right bottom, #FFBA96 0%,#FF7A95 100%)", "linear-gradient(to right bottom, #33CAFF 0%,#2A85FC 100%)"],
    datatime:"20181210"
  },
  godetail: function (e) {
    // let roomtype = event.currentTarget.dataset.type;
    // let typestr = JSON.stringify(roomtype);
    // let urlgo = event.currentTarget.dataset.href + "?roomtype=" + typestr;
    // wx.request({
    //   url: 'http://localhost:8080/IndexServlet',
    //   data: {
    //     type: roomtype,
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     wx.redirectTo({
    //       url: urlgo,
    //     });
    //   },
    // })
      this.setData({
        selecDetail: this.data.array[e.currentTarget.dataset.bindex],
      })
    
    let selecDetail = JSON.stringify(this.data.selecDetail);
    console.log("zzzzzzz" + typeof(selecDetail))
    //   console.log("zzzzzddddddddd" + typeof (this.data.selectjson))
    // let selectData = JSON.stringify(this.data.selectjson);
    wx.redirectTo({
      // url: '../oneroomsure/oneroomsure?selectData=' + selectData + "&Daydata=" + this.data.Daydata + "&Classtime=" + this.data.Classtime + "&sinfonia=" + this.data.sinfonia,
      url: '../roomdetail/roomdetail?roomdetails=' +selecDetail
    })
  },
  go: function (event) {
    wx.navigateTo({
      url: event.currentTarget.dataset.href
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      userid: app.Appuserinfo.userid,
    })
      wx.request({
          url: 'http://localhost:8080/RecordServlet',
          data: {
              username:"admin"
          },
          header: {
              'content-type': 'application/json' // 默认值
          },
          success: function (res) {
              that.setData({
                recordlist:res.data
              })
             for (let i = 0; i < that.data.recordlist.length; i++) {
               let str = that.data.recordlist[i];
               let dateyear = str.data.substr(0, 4);
               let datemonth = str.data.substr(4, 2);
               let dateday = str.data.substr(6, 2);
               let suredata = str.data;
               console.log(str.data)
               let listdata = "recordlist[" + i + "].data"
               that.setData({
                 [listdata]: dateyear + "-" + datemonth + "-" + dateday
               })
               let timestring = JSON.stringify(that.data.recordlist[i]);
               
               console.log(timestring)
            }
            
            console.log(that.data.recordlist)
          }
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