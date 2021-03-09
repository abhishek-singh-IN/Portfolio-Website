function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();

  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('clock').innerHTML =
    today.toDateString()+" "+ h + ":" + m + ":" + s;
  var t = setTimeout(startTime, 500);
}
// add zero in front of numbers < 10
function checkTime(i) {
  if (i < 10) {
    i = "0" + i
  };
  return i;
}
