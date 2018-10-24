// pages/roomdetail/roomdetail.js
var tool = require("../../utils/util.js");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    roomtypename: ["", "大数据学院", "多媒体教室", "普通教室"],
    roomdetails:null,
    isfinish:true,
    pass:1,
    timeList: [{
      time: 1,
      start: "08:00",
      end: "08:45"
    },
    {
      time: 2,
      start: "08:45",
      end: "09:30"
    }, {
      time: 3,
      start: "09:45",
      end: "10:30"
    }, {
      time: 4,
      start: "10:30",
      end: "11:15"
    }, {
      time: 5,
      start: "11:25",
      end: "12:10"
    }, {
      time: 6,
      classz: '',
      timetext: "午2",
      start: "12:10",
      end: "12:55"
    }, {
      time: 7,
      start: "13:05",
      end: "13:50"
    }, {
      time: 8,
      start: "13:50",
      end: "14:35"
    }, {
      time: 9,
      start: "14:50",
      end: "15:35"
    }, {
      time: 10,
      start: "15:35",
      end: "16:40"
    }, {
      time: 11,
      start: "16:30",
      end: "17:15"
    }, {
      time: 12,
      start: "17:15",
      end: "18:00"
    }, {
      time: 13,
      start: "18:10",
      end: "18:55"
    }, {
      time: 14,
      start: "18:55",
      end: "19:40"
    }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      roomdetails: JSON.parse(options.roomdetails),
      userid: app.Appuserinfo.userid,
    })
    var nowtime = Date.parse(new Date());
    let today = tool.toDate(nowtime);
    console.log("today" + today);
    //未完成
    if (this.data.roomdetails.data <= today){
      this.setData({
        isfinish:false
      })
      console.log("取消" + this.data.roomdetails.data);
    }else{
      this.setData({
        isfinish: true
      })
    }
    console.log("sss" + typeof(this.data.roomdetails));
  },
  submitT:function(options){
    var that = this;
    wx.showModal({
      title: '',
      content: '是否取消预约',
      showCancel: false,
      confirmText: '确定',
      cancelText:"取消",
      confirmColor: "#77a9fb",
      success:function(res){
        var cdata = that.data.roomdetails;
        var cdateday = cdata.data.split("-").join("");
        console.log(cdateday);
        var submission = cdata.submission;
        var Classtime = new Array(15);
        for (var j = 0; j < Classtime.length; j++) {
          Classtime[j] = 0;
        }
        for (var i = that.data.roomdetails.ftime; i <= that.data.roomdetails.ltime; i++) {
          Classtime[i] = 1;
        }
        console.log("传递的时间" + Classtime);
        wx.request({
          //url: '',
          url: 'http://localhost:8080/CanleServlet',
          data: {
            roomid: that.data.roomdetails.roomid,
            Daydata: cdateday,
            time: Classtime,
            submission: that.data.roomdetails.submission,
            username: that.data.userid
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            // let roomjson = JSON.stringify(res.data);
            // console.log(typeof (roomjson))
            // let urlgo = '../oneroomlist/oneroomlist?roomjson=' + roomjson + "&Daydata=" + Daydata + "&Classtime=" + Classtime + "&sinfonia=" + sinfonia;
            // wx.redirectTo({
            //   url: urlgo
            // })
            wx.redirectTo({
              url: '../record/record',
            })
          },
          fail: function (e) {
            // wx.showModal({
            //   title: '提示',
            //   content: '连接服务器失败，请稍后再试！',
            //   showCancel: false,
            //   confirmText: '确定',
            //   confirmColor: "#77a9fb"
            // })
          },
        })
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