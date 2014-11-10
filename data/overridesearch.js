//hide the original
var origSearch = document.getElementById('text-filter')
//origSearch.style.display= 'none';

var mysearch = document.createElement('input');
mysearch.setAttribute('id', 'mysearch')
mysearch.setAttribute('type', 'text')
mysearch.setAttribute('placeholder', 'Draft area (NO auto-completion)(press TAB when done)')

var searchdiv = document.getElementsByClassName('textual')[0];
//searchdiv.appendChild(mysearch);
searchdiv.insertBefore(mysearch, origSearch);
//searchdiv.innerHTML = "<input type='text' id='mysearch' placeholder='moztraphelper enhanced search'/>" + searchdiv.innerHTML;

var mySearch = document.getElementById('mysearch');


var timerID = 0;
var timeout = 0;
var minStrLen = 0

mySearch.oninput = function(){
  clearTimeout(timerID);
  if (mySearch.value.length > minStrLen){
    timerID = setTimeout(function(){
      search()
    }, timeout)
  }
};

function search(){
  //origSearch.attr('value', mySearch.value);
  $('#text-filter').val(mySearch.value)
  //$('#text-filter').focus()
  //mysearch.focus();
}

mysearch.focus()
