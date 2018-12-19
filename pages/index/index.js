var app = getApp();
var API_URL = app.appServlet.servlet +'LognServlet';
// @需要字段:用户姓名username  学部department 学号studentnumber
// 学号可以为空
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    username: null,
    department: null,
    studentnumber: null,
    islogin: false,
    flag: true,
    userid:null
  },
    code: function () {
        var that = this
        wx.scanCode({
            onlyFromCamera: true, //仅仅相机
            success: (res) => {
                console.log(res)
            },
            //错误返回 
            fail: (res) => {
                wx.showToast({
                    title: 'fail',
                    icon: 'none',
                    duration: 1000
                })
            },
            complete: function (res) {
                wx.showToast({
                    title: 'complete',
                    icon: 'none',
                    duration: 1000
                })
            },
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      username: app.Appuserinfo.username,
      department: app.Appuserinfo.department,
      studentnumber: app.Appuserinfo.studentnumber,
      islogin: app.Appuserinfo.islogin,
    })
    console.log(this.data.username);
  },
  ToSetup: function () {
    wx.redirectTo({
      url: '',
    })
  },
  go: function (event) {
    if (this.data.islogin == false) {
      wx.showModal({
        content: '请先登录',
        showCancel: false,
        confirmText: '确定',
        confirmColor: "#77a9fb"
      })
    } else {
      wx.redirectTo({
        url: event.currentTarget.dataset.href
      })
    }

  },
  //登录弹出层
  login: function (e) {
    this.setData({
      flag: false,
    })
  },
  hide: function () {
    this.setData({
      flag: true,
    })
  },
  //登录
  formBindsubmit: function (res) {
    var that = this;
    that.setData({
      userid: res.detail.value.userName
    })
    console.log("userid" + that.data.userid);
    wx.request({
      url: API_URL+ "?userName=" + res.detail.value.userName + "&&userPwd=" + res.detail.value.userPwd,
      header: {
        "Content-Type": "json"
      },
      data: {},
      method: 'GET',
      success: function (e) {
        console.log(e)
        if (e.data == "") {
          wx.showModal({
            content: '用户名和密码不正确，请重新输入！',
            title: '提示',
            showCancel: false,
            confirmText: '确定',
            confirmColor: "#77a9fb"
          })
        }
        else {
          console.log("zzz")
          //全局变量赋值
          app.Appuserinfo.userid = that.data.userid,
          app.Appuserinfo.username = e.data[0].name,
            app.Appuserinfo.department = e.data[0].department,
            app.Appuserinfo.studentnumber = e.data[0].studentnumber,
            app.Appuserinfo.islogin = true,
            // app.Appuserinfo.username = "呆霸王",
            // app.Appuserinfo.department = "zz",
            // app.Appuserinfo.studentnumber = 123,
            // app.Appuserinfo.islogin = true,
            //登陆成功
            that.setData({
              flag: true,
              username: app.Appuserinfo.username,
              department: app.Appuserinfo.department,
              studentnumber: app.Appuserinfo.studentnumber,
              islogin: app.Appuserinfo.islogin,
            })
        }
      },
      fail: function (e) {
        wx.showModal({
          title: '提示',
          content: '连接服务器失败，请稍后再试！',
          showCancel: false,
          confirmText: '确定',
          confirmColor: "#77a9fb"
        })
      },
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