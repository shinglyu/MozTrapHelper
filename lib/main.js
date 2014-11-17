var data = require("sdk/self").data;
var cm = require("sdk/context-menu");
var pm = require("sdk/page-mod");

cm.Item({ label: "Export as CSV",
  context: cm.URLContext(/.*moztrap.mozilla.org\/manage\/cases.*/),
  contentScriptFile: [data.url('jquery-1.11.1.min.js'), data.url('exportcsv.js')]
});

cm.Item({
  label: "Expand/hide All",
  context: cm.URLContext(/.*moztrap.mozilla.org\/manage\/.*s\//),
  //contentScriptFile: [data.url('jquery-1.11.1.min.js'), data.url('expandall.js')]
  contentScriptFile: [data.url('expandall.js')]
});

cm.Item({
  label: "Import from file",
  context: cm.URLContext(/.*moztrap.mozilla.org\/manage\/case\/add.*/),
  contentScriptFile: [data.url('jquery-1.11.1.min.js'), data.url('importjson.js')]
});

cm.Item({
  label: "Import from file",
  context: cm.URLContext(/.*moztrap.mozilla.org\/manage\/suite\/.*/),
  contentScriptFile: [data.url('jquery-1.11.1.min.js'), data.url('importsuite.js')]
});

pm.PageMod({
  include: /.*moztrap.mozilla.org.*/,
  contentScriptFile: [data.url('jquery-1.11.1.min.js'), data.url('overridesearch.js')]
});

pm.PageMod({
  include: /.*moztrap.mozilla.org\/manage\/suite.*/,
  contentScriptFile: [data.url('jsperf.js')],
  contentScriptWhen: "start"
});

pm.PageMod({
  include: /.*moztrap.mozilla.org.*/,
  //contentScriptFile: [data.url('jquery.custom-autocomplete.js'), data.url('init.js'), data.url('jsperf.js')],
  //contentScriptFile: [data.url('init.js'), data.url('jsperf.js')],
  //contentScriptFile: [data.url('jquery.custom-autocomplete.js'), data.url('jsperf.js')],
  contentScriptFile: [
    data.url('jsperf.js'), 
    data.url('jquery-1.11.1.min.js'), 
    data.url('moztrap/jquery.ba-dotimeout.js'), 
    //data.url('moztrap/ICanHaz.js'), 
    data.url('moztrap/jquery.custom-autocomplete.js'), 
    data.url('moztrap/init.js')
  ],
  //contentScriptWhen: "start"
});


