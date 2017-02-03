// pages/game/programmer.js
var game2048 = require('../../utils/game2048.js');
var gameServer = require('../../utils/gameServer.js');
var util = require('../../utils/util.js');
var app = getApp()
Page({
  data:{
    // 游戏数组值
    gridValue:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    // 游戏重新开始提示
    restartPrompt:"重新开始",
    // 游戏难度：1.时间160ms;2.时间80ms;3.时间40ms;4.时间20ms;5.时间10ms;
    gameLevel:[1,2,3,4,5],
    // 游戏难度初始值 index of gameLevel
    level: 3,
    // 游戏难度提示
    levelPrompt:"难度",
    // 游戏模式：1.输出2,4;2.输出2.4.8;3.输出2.4.8.16;4.输出2.4.8.16.32;5.输出2.4.8.16.32.64;
    gameMode: [1,2,3,4,5],
    // 游戏模式初始值 index of gameMode
    mode: 1,
    // 游戏模式提示
    modePrompt:"模式",
    // 游戏运行时间
    gameTime:"00:00:00",
    // 游戏运行开始时间
    gameStartDate:0,
    // 游戏运行结束时间
    gameEndDate:0,
    // 游戏触摸控制
    gameTouchInfo: {
        pointOrigin: {
            x: 0,
            y: 0
        },
        pointTarget: {
            x: 0,
            y: 0
        },
        isValid: false
    },
    // 游戏触摸控制阈值
    gameDistanceThreshold:10,
    // 排行榜
    chartsUsers: [
      {
        avatar:"http://wx.qlogo.cn/mmopen/vi_32/l8W3SEfertzlK6csQd23scfZG30hXDVP0mT2ODFqoPlkmmeic1ZXoiczVicppy68kPiajjEIbA5Daf7d6erlRdib5uQ/0",
        name:"chenxi****",
        score:"2048",
        level:"3级",
        mode:"3",
        time:"05:34"
      }, {
        name:"**********",
        score:"4096",
        level:"5级",
        mode:"5",
        time:"15:03"
      }
    ]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    game2048.resetGame();
    this.setData({
      gridValue:game2048.getGameArray().slice()
    });
    // 用户数据获取
    this.inspectUserServer();
    // time
    console.log("gameStartDate:", this.data.gameStartDate);
    var that = this;
    setInterval(function() {
      var _gameEndDate = Date.now();
      var playTime = Math.floor((_gameEndDate - that.data.gameStartDate) / 1000);
      that.setData({
        gameEndDate: _gameEndDate,
        gameTime: util.formatSecondsTime(playTime)
      });
      },1000);
  },
  onShow:function(){
    // 页面显示
    game2048.printAuthor();
    // test
    this.setData({
      gameStartDate:new Date().getTime()
    });
    // 排行榜
    this.getRank();
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
      gridValue:game2048.getGameArray().slice(),
      gameStartDate:new Date().getTime(),
      gameTime:"00:00:00"
    });
  },
  handleTouchMove:function(event){
    // 游戏2048网格界面触摸移动
    // console.log(event);
    // game2048.playGame("moveButtom");
    // this.setData({
    //  gridValue:game2048.getGameArray().slice()
    // });
  },
  handleTouchStart:function(event){
    // 游戏2048网格界面触摸开始
    // console.log(event);
    if (!this.data.gameTouchInfo.isValid) {
      this.setData({
        'gameTouchInfo.pointOrigin.x': event['changedTouches'][0].pageX,
        'gameTouchInfo.pointOrigin.y': event['changedTouches'][0].pageY,
        'gameTouchInfo.isValid': true
      });
    }
  },
  handleTouchEnd:function(event){
    // 游戏2048网格界面触摸结束
    // console.log(event);
    if (this.data.gameTouchInfo.isValid) {
      this.setData({
        'gameTouchInfo.pointTarget.x': event['changedTouches'][0].pageX,
        'gameTouchInfo.pointTarget.y': event['changedTouches'][0].pageY,
        'gameTouchInfo.isValid': false
      });
      var direction = this.getTouchDirection(this.data.gameTouchInfo.pointOrigin,
        this.data.gameTouchInfo.pointTarget, this.data.gameDistanceThreshold)
      console.log(direction);
      game2048.playGame(direction);
      this.setData({
        gridValue:game2048.getGameArray().slice()
      });
    }
  },
  handleTouchCancel:function(event){
    // 游戏2048网格界面触摸打断
    console.log(event);
    if (this.data.gameTouchInfo.isValid) {
      this.setData({
        'gameTouchInfo.isValid': false
      });
    }
  },
  handleGameModeSetting:function(event) {
    // 设置游戏模式
    console.log(event);
    var _mode = this.data.gameMode[event.detail.value[0]];
    // set game mode after reset game
    game2048.resetGame();
    this.setData({
      mode:_mode,
      gridValue:game2048.getGameArray().slice()
    });
    game2048.setGameMode(_mode);
  },
  handleGameLevelSetting:function(event) {
    // 设置游戏难度
    console.log(event);
    var newLevel = this.data.gameMode[event.detail.value[0]];
    game2048.setGameLevel(newLevel);
    this.setData({
      level:newLevel
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
  },
  getTouchDirection:function(pointOrigin, pointTarget, distanceThreshold) {
    // 触摸方向判定, x横向，y纵向
    if (!("x" in pointOrigin) || !("y" in pointOrigin) ||
      !("x" in pointTarget) || !("y" in pointTarget))
      return "unknown";
    if (pointOrigin.x == pointTarget.x && pointOrigin.y == pointTarget.y)
      return "stand";
    var distance = Math.sqrt(Math.pow(pointOrigin.x - pointTarget.x, 2) + Math.pow(pointOrigin.y - pointTarget.y, 2))
    if (distance < distanceThreshold)
      return "stand";
    if (Math.abs(pointTarget.y - pointOrigin.y) < Math.abs(pointTarget.x - pointOrigin.x)) {
        if (pointOrigin.x < pointTarget.x)
            return "moveRight";
        else
            return "moveLeft";
    } else {
        if (pointOrigin.y > pointTarget.y)
            return "moveTop";
        else
            return "moveButtom";
    }
  },
  inspectUserServer:function() {
    var user;
    app.getUserInfo(function(userInfo){
      user = userInfo;
    });
    console.log(user);
    gameServer.inspectUser(user.nickName, function(res) {
      console.log(res);
      if (res.errno != 0) {
        newuser = {
          name: user.nickName,
          photo: user.avatarUrl,
          gender: user.gender,
          country: user.country,
          province: user.province,
          city: user.city,
          country: user.country
        };
        gameServer.updateUser(newuser,function(res) {
          console.log(res);
        });
      }
    });
  },
  updateUserServer:function() {
    var user;
    app.getUserInfo(function(userInfo){
      user = userInfo;
    });
    console.log(user);
    var newuser = {
      name: user.nickName,
      photo: user.avatarUrl,
      gender: user.gender,
      country: user.country,
      province: user.province,
      city: user.city,
      country: user.country
    };
    gameServer.updateUser(newuser,function(res) {
      console.log(res);
    });
  },
  getRank:function() {
    var lchartsUsers = [];
    var that = this;
    gameServer.getRank(function(res) {
      if (res.errno != 0)
        return;
        var rank = res.rank;
        rank.forEach(function(currentValue,index,array){
          var data = {
            avatar:"http://wx.qlogo.cn/mmopen/vi_32/l8W3SEfertzlK6csQd23scfZG30hXDVP0mT2ODFqoPlkmmeic1ZXoiczVicppy68kPiajjEIbA5Daf7d6erlRdib5uQ/0",
            name: currentValue.name_id,
            mode: currentValue.game_mode,
            level: currentValue.game_level,
            score: currentValue.game_score,
            time: currentValue.game_time
          };
          console.log(data);
          lchartsUsers.push(data);
        });
        console.log(lchartsUsers);
        that.setData({
          chartsUsers:lchartsUsers
        });
    });
    console.log(lchartsUsers);
  }
})
