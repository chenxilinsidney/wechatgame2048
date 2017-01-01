// pages/game/programmer.js
var game2048 = require('../../utils/game2048.js')
Page({
  data:{
    test_value:[0,0,0,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192],
    restart_text:"restart",
    hard_level:[1,2,3,4,5],
    level_default_idx: [2],
    level_prompt:"hard"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    console.log("on show");
    game2048.printAuthor();
    // test
    game2048.testModule();
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  handlerestart:function(event){
    // 游戏重新开始
    console.log(event);
  },
  handlemove:function(event){
    // 游戏网格界面触摸
    console.log(event);
  }
})