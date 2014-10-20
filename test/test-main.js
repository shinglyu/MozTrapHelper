var main = require("./main");
var importjson = require("data/importjson.js");


exports["test parse case"] = function(assert) {
  var testcase = parsePlainTextCase(mockCaseStr);
  assert.equal(mockCaseObj, testcase, "Plain text case is parse correctly");
}

exports["test main"] = function(assert) {
  assert.pass("Unit test running!");
};

exports["test main async"] = function(assert, done) {
  assert.pass("async Unit test running!");
  done();
};

require("sdk/test").run(exports);
