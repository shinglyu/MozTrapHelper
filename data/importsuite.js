var fileSelectorHtml = '\
<style> \
  #popup {\
    display: inline-block;\
    position: absolute;\
    top: 25%;\
    left: 25%;\
    width: 25%;\
    height: 25%;\
    min-width:0px;\
    padding: 16px;\
    border: 16px solid orange;\
    background-color: white;\
  }\
</style> \
<div id="popup"> \
  <h3>Import a Suite</h3>\
  Select a file to import \
  <br>\
  <a href="https://rawgit.com/shinglyu/MozTrapAnnotator/master/doc/moztraphelper_doc.html#Suite%20File%20Syntax">File syntax guide</a>\
  <br>\
  <input type="file" id="files" name="files[]" /> \
</div>\
';

self.on("click", function (node, data) {
  $(fileSelectorHtml).appendTo('body');

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
});

function handleFileSelect(evt) {
  var files = evt.target.files; 
  f = files[0];
  var reader = new FileReader();

  reader.onload = (function (theFile) {
    return function (e) {
      var fileContent= e.target.result;
      //var parsedJSON = JSON.parse(JsonObj);
      var suitePatch = parseSuitePatch(fileContent);
      applySuitePatch(suitePatch); //Currently only supports one case

    };
  })(f);
  reader.readAsText(f);
}

function parseSuitePatch(caseText){
  var suitePatch = {'adds':[], 'removes':[]};
  var lines = caseText.split("\n");
  lines.forEach(function(line){
    var regex = /([+-]?)\ *,\ *"?(.*?)"?\ *,(.*)/
    var matches = regex.exec(line)
    if (matches !== null){
      //console.log(matches)
      switch (matches[1]) {
        case '+':
          suitePatch.adds.push(matches[2].trim())
          break;
        case '-':
          suitePatch.removes.push(matches[2].trim())
          break;
        default:
          //console.log("Can't parse " + matches[0])
      }
    }
  })
  suitePatch.adds = unique(suitePatch.adds)
  suitePatch.removes = unique(suitePatch.removes)
  return suitePatch
}
//function selectCases(caselist, listDom){ }
function selectCasesToAdd(suitePatch){
  var lists = document.getElementsByClassName('selectbox itemlist');
  var availList = lists[0].getElementsByClassName('selectitem');
  var notFoundCases = []
  for (var pidx = 0; pidx <  suitePatch.adds.length; ++pidx){
    var found = false;
    for (var lidx = 0; lidx < availList.length; ++lidx){
      if (suitePatch.adds[pidx] == availList[lidx].getAttribute('data-title')){
        availList[lidx].getElementsByClassName('bulk-value')[0].checked = true;
        found = true;
        break;
      }
    }
    if (!found){
      notFoundCases.push(suitePatch.adds[pidx])
    }
  }
  return notFoundCases
}
//TODO: 
function selectCasesToRemove(suitePatch){
  var lists = document.getElementsByClassName('selectbox itemlist');
  var inSuiteList = lists[1].getElementsByClassName('selectitem');
  var notFoundCases = []
  for (var pidx = 0; pidx <  suitePatch.removes.length; ++pidx){
    var found = false;
    for (var lidx = 0; lidx < inSuiteList.length; ++lidx){
      if (suitePatch.removes[pidx] == inSuiteList[lidx].getAttribute('data-title')){
        inSuiteList[lidx].getElementsByClassName('bulk-value')[0].checked = true;
        found = true;
        break;
      }
    }
    if (!found){
      notFoundCases.push(suitePatch.removes[pidx])
    }
  }
  return notFoundCases
}

function execute(){
  document.getElementsByClassName('action-include')[0].click();
  document.getElementsByClassName('action-exclude')[0].click();
}

function applySuitePatch(suitePatch){
  addNotFound = selectCasesToAdd(suitePatch);
  removeNotFound = selectCasesToRemove(suitePatch);
  alert(formatSummary(suitePatch, addNotFound, removeNotFound));
  clickConfirmButtons();
  $('div#popup').css('display', 'none')
  //execute();
}

function formatSummary(suitePatch, addNotFoundCases, removeNotFoundCases){
  var addCount = suitePatch['adds'].length
  var removeCount = suitePatch['removes'].length
  var addNotFoundCount = addNotFoundCases.length
  var removeNotFoundCount = removeNotFoundCases.length
  var msg = "Summary\n======================\n"
  msg +=   ("Added\t" + (addCount - addNotFoundCount) + "\tcases\n")
  msg +=   ("Removed\t" + (removeCount - removeNotFoundCount) + "\tcases\n")
  msg +=   ("Can't find\t" + (addNotFoundCount) + "\tcases to add:\n")
  addNotFoundCases.forEach(function(title){
    msg += ("  * " + title + "\n");
  })
  msg +=   ("Can't find\t" + (removeNotFoundCount) + "\tcases to remove:\n")
  removeNotFoundCases.forEach(function(title){
    msg += ("  * " + title + "\n");
  })
  return msg
}

function clickConfirmButtons(){
  $('button.action-include').click()
  $('button.action-exclude').click()
}

function unique(arr) {
  //credit: http://stackoverflow.com/questions/11688692/most-elegant-way-to-create-a-list-of-unique-items-in-javascript
  var u = {}, a = [];
  for(var i = 0, l = arr.length; i < l; ++i){
    if(!u.hasOwnProperty(arr[i])) {
      a.push(arr[i]);
      u[arr[i]] = 1;
    }
  }
  return a;
}
