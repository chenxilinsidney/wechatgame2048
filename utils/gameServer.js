function inspectUser(username, callback) {
    console.log(username);
    wx.request({
        url:'https://www.chenxilin.club/game2048/users',
      data: {
        'name':username,
      },
      method: 'GET',
      success: function(res) {
        var result = res.data;
        callback(result);
      },
      fail: function(res) {
        var result = {
            "errno": -11,
            "errMsg": res.errMsg,
            "statusCode": res.statusCode
        }
        callback(result);
      },
      complete: function(res) {
          //do nothing
      }
    });
}
function updateUser(user, callback) {
    console.log(user);
    wx.request({
        url:'https://www.chenxilin.club/game2048/users',
      data: user,
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function(res) {
        var result = res.data;
        callback(result);
      },
      fail: function(res) {
        var result = {
            "errno": -11,
            "errMsg": res.errMsg,
            "statusCode": res.statusCode
        }
        callback(result);
      },
      complete: function(res) {
          //do nothing
      }
    });
}
function getRank(callback) {
    wx.request({
      url:'https://www.chenxilin.club/game2048/stats',
      data: {},
      method: 'GET',
      success: function(res) {
        var result = res.data;
        callback(result);
      },
      fail: function(res) {
        var result = {
            "errno": -11,
            "errMsg": res.errMsg,
            "statusCode": res.statusCode
        }
        callback(result);
      },
      complete: function(res) {
          //do nothing
      }
    });
}
function updateGame(user, callback) {
    console.log(user);
    wx.request({
        url:'https://www.chenxilin.club/game2048/users',
      data: user,
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      //dataType: 'json',
      success: function(res) {
        var result = res.data;
        callback(result);
      },
      fail: function(res) {
        var result = {
            "errno": -11,
            "errMsg": res.errMsg,
            "statusCode": res.statusCode
        }
        callback(result);
      },
      complete: function(res) {
          //do nothing
      }
    });
}
module.exports = {
    inspectUser:inspectUser,
    updateUser:updateUser,
    getRank:getRank
}