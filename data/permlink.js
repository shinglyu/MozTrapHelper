function getPermlink(){
  console.log("getPermlink: " + unsafeWindow.MT.getActionAjaxReplaceUri());
  return unsafeWindow.MT.getActionAjaxReplaceUri();
  //return document.getElementsByClassName('url-text')[0].value;
}

var permlink = getPermlink();

function watchPermlinkChange(){
  var newPermlink = getPermlink();
  if (newPermlink != permlink){
    permlink = newPermlink
    console.log(permlink)
    window.history.pushState(null, document.title, permlink)
  }
}

function watchUrlBarChange(){
  var urlbar = window.location.href.replace(/^.*\/\/[^\/]+/,'');
  var newPermlink = getPermlink();
  if (newPermlink != urlbar){
    permlink = newPermlink
    console.log(permlink)
    window.history.pushState(null, document.title, permlink)
  }
}


window.history.replaceState(null, document.title, permlink) //1st time
window.setInterval(watchPermlinkChange, 5000);
window.setInterval(watchUrlBarChange, 10000);
