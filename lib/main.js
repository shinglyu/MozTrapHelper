var pageMod = require("sdk/page-mod");
var data = require("sdk/self").data;

pageMod.PageMod({
    include: /.*moztrap.mozilla.org.*/,
      contentScriptFile: data.url("addons.js")
});

var cm = require("sdk/context-menu")
cm.Item({
  label: "Export as CSV",
  //context: cm.URLContext("https://moztrap.mozilla.org/*"),
  context: cm.URLContext(/.*moztrap.mozilla.org\/manage\/cases.*/),
  contentScriptFile: [data.url('jquery-1.11.1.min.js'), data.url('exportcsv.js')]
  /*
  contentScript: 'self.on("click", function (node, data) {' +
    '  console.log("Item clicked!");' +
    '});'
  */
});
