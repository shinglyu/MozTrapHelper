self.on("click", function (node, data) {
  var clickEvt = new Event('click')
  var keyupEvt = new Event('keyup')
  var nodes = document.getElementsByClassName('item-summary');
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].click();
    //nodes[i].dispatchEvent(clickEvt);
    //nodes[i].dispatchEvent(keyupEvt);
  }
});
