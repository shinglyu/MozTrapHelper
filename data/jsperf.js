//override default autocomplete
unsafeWindow.$('#text-filter').unbind()

var autocomplete_suggestion_template = '\
{{# suggestions }}\
<li>\
  <a href="#" class="suggestion{{# newSuggestion }} new{{/ newSuggestion }}" {{# id }}data-id="{{ id }}" {{/ id }}{{# type }}data-type="{{ type }}" {{/ type }}data-name="{{ name }}"{{# responseDataName }}{{# responseDataVal }} data-{{ responseDataName }}="{{ responseDataVal }}"{{/ responseDataVal }}{{/ responseDataName }}>{{ preText }}<b>{{ typedText }}</b>{{ postText }}{{# displayType }} <i>[{{ displayType }}]</i>{{/ displayType }}{{^ displayType }}{{# type }} <i>[{{ type }}]</i>{{/ type }}{{/ displayType }}</a>\
</li>\
{{/ suggestions }}\
';
ich.addTemplate('autocomplete_suggestion', autocomplete_suggestion_template);
