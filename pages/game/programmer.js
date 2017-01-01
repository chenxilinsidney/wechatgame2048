// pages/game/programmer.js
var game2048 = require('../../utils/game2048.js');
Page({
  data:{
    test_value:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    restart_text:"restart",
    hard_level:[1,2,3,4,5],
    level_default_idx: [2],
    level_prompt:"hard",
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    console.log("on onReady");
  },
  onShow:function(){
    // 页面显示
    console.log("on show");
    game2048.printAuthor();
    game2048.resetGame();
    var gameArray = game2048.getGameArray().slice();
    this.setData({
      test_value:gameArray
    });
    // test
    // game2048.testModule();
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  handleRestart:function(event){
    // 游戏重新开始
    console.log(event);
    game2048.resetGame();
    this.setData({
      test_value:game2048.getGameArray().slice()
    });
  },
  handleMove:function(event){
    // 游戏网格界面触摸
    console.log(event);
    game2048.playGame("moveButtom");
    console.log(game2048.getGameArray());
    var gameArray = game2048.getGameArray().slice();
    console.log(gameArray);
    this.setData({
      test_value:gameArray
    });
  },
  handleMoveTop:function(event) {
    // 测试按钮，上滑
    console.log(event);
    game2048.playGame("moveTop");
    this.setData({
      test_value:game2048.getGameArray().slice()
    });
    console.log(game2048.getGameScore());
    console.log(game2048.getGameStatus());
  },
  handleMoveButtom:function(event) {
    // 测试按钮，下滑
    console.log(event);
    game2048.playGame("moveButtom");
    this.setData({
      test_value:game2048.getGameArray().slice()
    });
    console.log(game2048.getGameScore());
    console.log(game2048.getGameStatus());
  },
  handleMoveLeft:function(event) {
    // 测试按钮，左滑
    console.log(event);
    game2048.playGame("moveLeft");
    this.setData({
      test_value:game2048.getGameArray().slice()
    });
    console.log(game2048.getGameScore());
    console.log(game2048.getGameStatus());
  },
  handleMoveRight:function(event) {
    // 测试按钮，右滑
    console.log(event);
    game2048.playGame("moveRight");
    this.setData({
      test_value:game2048.getGameArray().slice()
    });
    console.log(game2048.getGameScore());
    console.log(game2048.getGameStatus());
  }
})