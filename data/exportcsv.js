self.on("click", function (node, data) {

  var mozTrapBaseUrl = 'https://moztrap.mozilla.org'
  var csvContentArray = [];

  $('article.listitem').each(function() {
    var title = $(this).find('h3.title').text()
    var priority = $(this).find('div.priority').text()
    var product = $(this).find('div.product').text()
    var modified = $(this).find('div.modified').text()
    var detailUrl = $(this).find('a.summary.item-summary').attr('href')
    detailUrl = mozTrapBaseUrl + detailUrl;
    detailUrl = '=HYPERLINK(\"'+ detailUrl + '\")'

    list = [title, priority, product, modified, detailUrl];
    listWQuotes = [];
    list.forEach(function(item){
      listWQuotes.push('"' + item + '"');
    })
    csvContentArray.push(listWQuotes.join(','))
  });

  var csvContent = "data:text/csv;charset=utf-8," + csvContentArray.join('\n');
  var encodedUri = encodeURI(csvContent);

  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "moztrap_export.csv");
  document.body.appendChild(link);

  link.click(); 

  console.log('csv exported')
});
