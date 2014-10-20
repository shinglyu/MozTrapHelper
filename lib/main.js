var data = require("sdk/self").data;
var cm = require("sdk/context-menu")

cm.Item({
  label: "Export as CSV",
  context: cm.URLContext(/.*moztrap.mozilla.org\/manage\/cases.*/),
  contentScriptFile: [data.url('jquery-1.11.1.min.js'), data.url('exportcsv.js')]
});

cm.Item({
  label: "Expand/hide All",
  context: cm.URLContext(/.*moztrap.mozilla.org\/manage\/.*/),
  //contentScriptFile: [data.url('jquery-1.11.1.min.js'), data.url('expandall.js')]
  contentScriptFile: [data.url('expandall.js')]
});

cm.Item({
  label: "Import from JSON",
  context: cm.URLContext(/.*moztrap.mozilla.org\/manage\/case\/add.*/),
  contentScriptFile: [data.url('jquery-1.11.1.min.js'), data.url('importjson.js')]
});


