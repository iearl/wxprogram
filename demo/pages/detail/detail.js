// pages/detail/detail.js
let datas = require('../../datas/list-data');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj:{},
    index:null,
    isCollectioned:false,
    isMuicPlay:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.index;
    //更新detailObj值
    this.setData({
      detailObj : datas.list_data[index],
      index
    });
    //根据本地缓存的数据判断用户是否收藏当前文章
    let detailStorage = wx.getStorageSync('isCollectioned');

    if (!detailStorage){
      wx.setStorageSync('isCollectioned', {});
    }
    //判断用户是否收藏
    if(detailStorage[index]){
      this.setData({
      })
    }
  },
  handlerCollectiom(){
    let isCollectioned = !this.data.isCollectioned;
    this.setData({
      isCollectioned
    });
    //提示用户
    let title = isCollectioned?'收藏成功':'取消收藏';
    wx.showToast({
      title: title,
      icon:'success'
    });

    //缓存数据到本地
    let {index} = this.data;
    wx.getStorage({
      key: 'isCollectioned',
      success:(datas)=> {
        console.log(datas,typeof datas);
        let obj = datas.data;
        obj[index] = isCollectioned;
        wx.setStorage({
          key: 'isCollectioned',
          data: obj,
        })
      }
    });
  },
  handlerMusic(){
    //处理音乐播放
    let isMuicPlay = !this.data.isMuicPlay;
    this.setData({
      isMuicPlay
    });
    //控制音乐播放
    if(isMuicPlay){
      let {dataUrl,title} = this.data.detailObj.music;
      wx.playBackgroundAudio({
        dataUrl: dataUrl,
        title: title
      })
    }else{
      wx.pauseBackgroundAudio();
    }
  }
})