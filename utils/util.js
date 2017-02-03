function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatSecondsTime(seconds) {
  var second = seconds % 60;
  var minute = Math.floor(seconds / 60) % 60;
  var hour = Math.floor(minute / 60) % 60;
  return [hour, minute, second].map(formatNumber).join(':')
}


function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatSecondsTime: formatSecondsTime
}
