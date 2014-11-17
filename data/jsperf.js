//console.log(unsafeWindow.MT);
/*
function onJqueryLoad(callback){
  if (typeof unsafeWindow.$ == 'undefined'){
    console.log('jQuery not ready')
    setTimeout(function(){onJqueryLoad(callback)}, 10)
  }
  else{
    console.log('jQuery  READY!')
    unsafeWindow.$.fn.cusomeAutocomplete = null;
    callback()
  }
}

function onScriptLoad(){
  if (typeof unsafeWindow.$.fn.customAutocomplete == 'undefined'){
    console.log('script not ready')
    setTimeout(onScriptLoad, 100)
  }
  else{
    console.log('script READY!')
    unsafeWindow.$.fn.cusomeAutocomplete = null;
  }
}

onJqueryLoad(onScriptLoad)
*/
//unsafeWindow.MT = null;

//var ich = unsafeWindow.ich;
unsafeWindow.$('#text-filter').unbind()
//exportFunction($.fn.customAutocomplete, unsafeWindow.$.fn, {defineAs: 'customAutocomplete'});

var autocomplete_suggestion_template = '\
{{# suggestions }}\
<li>\
  <a href="#" class="suggestion{{# newSuggestion }} new{{/ newSuggestion }}" {{# id }}data-id="{{ id }}" {{/ id }}{{# type }}data-type="{{ type }}" {{/ type }}data-name="{{ name }}"{{# responseDataName }}{{# responseDataVal }} data-{{ responseDataName }}="{{ responseDataVal }}"{{/ responseDataVal }}{{/ responseDataName }}>{{ preText }}<b>{{ typedText }}</b>{{ postText }}{{# displayType }} <i>[{{ displayType }}]</i>{{/ displayType }}{{^ displayType }}{{# type }} <i>[{{ type }}]</i>{{/ type }}{{/ displayType }}</a>\
</li>\
{{/ suggestions }}\
';
ich.addTemplate('autocomplete_suggestion', autocomplete_suggestion_template);
