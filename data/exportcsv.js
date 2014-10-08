self.on("click", function (node, data) {

  var mozTrapBaseUrl = 'https://moztrap.mozilla.org'
  var csvContentArray = [];

  $('article.listitem').each(function() {
    console.log($(this));
    var title = $(this).find('h3.title').text()
    //console.log(title);

    var priority = $(this).find('div.priority').text()
    //console.log(priority);

    var product = $(this).find('div.product').text()
    //console.log(product);

    var modified = $(this).find('div.modified').text()
    //console.log(modified); 
    var detailUrl = $(this).find('a.summary.item-summary').attr('href')
    detailUrl = mozTrapBaseUrl + detailUrl;
    detailUrl = '=HYPERLINK(\"'+ detailUrl + '\")'
    //console.log(modified);

    list = [title, priority, product, modified, detailUrl];
    listWQuotes = [];
    list.forEach(function(item){
      listWQuotes.push('"' + item + '"');
    })
    //console.log(listWQuotes.join(','))
    csvContentArray.push(listWQuotes.join(','))
  });
  /*
   * data.forEach(function(infoArray, index){

   dataString = infoArray.join(",");
   csvContentArray.push(dataString)

   }); 
   */
  var csvContent = "data:text/csv;charset=utf-8," + csvContentArray.join('\n');
  var encodedUri = encodeURI(csvContent);
  //window.open(encodedUri);
  //
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "moztrap_export.csv");
  document.body.appendChild(link);
  link.click(); 

  console.log('csv exported')
});
