self.on("click", function (node, data) {
  document.body.innerHTML += '<div id="popup" style="display: inline-block; position: absolute; top: 25%; left: 25%; width: 25%; height: 25%; min-width:0px; padding: 16px; border: 16px solid orange; background-color: white;">Select a JSON file to import<input type="file" id="files" name="files[]" /></div>' 

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
});

function handleFileSelect(evt) {
  var files = evt.target.files; 
  f = files[0];
  var reader = new FileReader();

  reader.onload = (function (theFile) {
    return function (e) {
      var JsonObj = e.target.result;
      var parsedJSON = JSON.parse(JsonObj);
      inputCase(parsedJSON[0]); //Currently only supports one case

    };
  })(f);
  reader.readAsText(f);
}

function inputCase(testcase){
  var name = document.getElementById('id_name');
  name.value = testcase.Name;

  document.getElementById('popup').style.display= 'hidden';
}

