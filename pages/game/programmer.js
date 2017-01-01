// pages/game/programmer.js
var game2048 = require('../../utils/game2048.js');
Page({
  data:{
    // 游戏数组值
    gridValue:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    // 游戏重新开始提示
    restartPrompt:"重新开始",
    // 游戏难度：1.时间160ms;2.时间80ms;3.时间40ms;4.时间20ms;5.时间10ms;
    gameLevel:[1,2,3,4,5],
    // 游戏默认难度 index of gameLevel
    levelDefault: [2],
    // 游戏难度提示
    levelPrompt:"难度",
    // 游戏模式：1.输出2,4;2.输出2.4.8;3.输出2.4.8.16;4.输出2.4.8.16.32;5.输出2.4.8.16.32.64;
    gameMode: [1,2,3,4,5],
    // 游戏默认模式 index of gameMode
    modeMode: [0],
    // 游戏模式提示
    modePrompt:"模式",
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    game2048.resetGame();
    var gameArray = game2048.getGameArray().slice();
    this.setData({
      gridValue:game2048.getGameArray().slice()
    });
  },
  onShow:function(){
    // 页面显示
    game2048.printAuthor();
    // test
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  handleRestart:function(event){
    // 游戏重新开始
    game2048.resetGame();
    this.setData({
      gridValue:game2048.getGameArray().slice()
    });
  },
  handleMove:function(event){
    // 游戏网格界面触摸
    console.log(event);
    game2048.playGame("moveButtom");
    this.setData({
      gridValue:game2048.getGameArray().slice()
    });
  },
  handleMoveTop:function(event) {
    // 测试按钮，上滑
    game2048.playGame("moveTop");
    this.setData({
      gridValue:game2048.getGameArray().slice()
    });
  },
  handleMoveButtom:function(event) {
    // 测试按钮，下滑
    game2048.playGame("moveButtom");
    this.setData({
      gridValue:game2048.getGameArray().slice()
    });
  },
  handleMoveLeft:function(event) {
    // 测试按钮，左滑
    game2048.playGame("moveLeft");
    this.setData({
      gridValue:game2048.getGameArray().slice()
    });
  },
  handleMoveRight:function(event) {
    // 测试按钮，右滑
    game2048.playGame("moveRight");
    this.setData({
      gridValue:game2048.getGameArray().slice()
    });
  }
})