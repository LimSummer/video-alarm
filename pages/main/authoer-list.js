// pages/main/authoer-list.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    accountlist: [
      // {
      //   accountName: "怀旧历史影像馆",
      //   imageUrl: "https://p3-dy-ipv6.byteimg.com/img/tos-cn-i-0813/697c778a7f5f477e8d57be9712c3ba31~c5_720x720.jpeg?from=4010531038"
      // },
      // {
      //   accountName: "怀旧历史影像馆",
      //   imageUrl: "https://p3-dy-ipv6.byteimg.com/img/tos-cn-i-0813/697c778a7f5f477e8d57be9712c3ba31~c5_720x720.jpeg?from=4010531038"
      // },
      // {
      //   accountName: "怀旧历史影像馆",
      //   imageUrl: "https://p3-dy-ipv6.byteimg.com/img/tos-cn-i-0813/697c778a7f5f477e8d57be9712c3ba31~c5_720x720.jpeg?from=4010531038"
      // },
      // {
      //   accountName: "怀旧历史影像馆",
      //   imageUrl: "https://p3-dy-ipv6.byteimg.com/img/tos-cn-i-0813/697c778a7f5f477e8d57be9712c3ba31~c5_720x720.jpeg?from=4010531038"
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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

  navigatetoInputUrl : function(event) {
    console.log(event);
    _this = this;
    wx.navigateTo({
      url: 'input-url',
      events: {
        onFetchDyAccount: function(e) {
          console.log(e);
          let url = e.data;
          let request_url = app.globalData.tcloudUrl + "/dy-api/account-by-url?url=" + url;
          console.log(request_url);
          let cookie = wx.getStorageSync('cookieKey');
          wx.request({
            url: request_url,
            header: {
              'Content-Type' : 'application/json;charset=UTF-8',
              'Cookie' : cookie
            },
            success: res => {
              console.log(res);
              let accoutList = _this.data.accountlist;
              accoutList.push(
                {
                  accountName: res.data.data.accountName,
                  imageUrl: res.data.data.imgUrl
                }
              );
              _this.setData({
                accountlist: accoutList
              });
            },
            fail: res => {
               console.log(res);
            }
          })
        }
      }
    });
  }
})