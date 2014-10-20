self.on("click", function (node, data) {
  $('<div id="popup" style="display: inline-block; position: absolute; top: 25%; left: 25%; width: 25%; height: 25%; min-width:0px; padding: 16px; border: 16px solid orange; background-color: white;">Select a JSON file to import<input type="file" id="files" name="files[]" /></div>').appendTo('body');

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
      var parsedCase = parsePlainTextCase(fileContent);
      inputCase(parsedCase[0]); //Currently only supports one case

    };
  })(f);
  reader.readAsText(f);
}

function inputCase(testcase){

  $('select#id_product').find('option:contains("' + testcase.Product +'")').prop('selected',true);
  //$('select#id_product').change();//JQuery change() won't work, use native javascript
  var event = new Event('change');
  document.getElementById('id_product').dispatchEvent(event);
  $('select#id_productversion').find('option:contains("' + testcase.Version +'")').attr('selected',true);
  $('select#id_suite').find('option:contains("' + testcase.Suite + '")').attr('selected',true);
  $('select#id_priority').find('option:contains("' + testcase.Priority+ '")').attr('selected',true);

  $('#id_name').attr('value',  testcase.Name);
  //TODO: tags
  //$('#id_name').attr('value',  testcase.Name);
  $('#id_description').val(testcase.Description);
  var currStep = $('li.step-form-item').first()
  var currInstr = currStep.find('div.instruction-field textarea').first();
  var currExpected = currStep.find('div.expected-field textarea').first();

  testcase.Instructions.forEach(function(step){
    currInstr.focus();
    currInstr.val(step.Instruction);
    currExpected.val(step.Expected);

    currStep = currStep.next();
    currInstr = currStep.find('div.instruction-field textarea').first();
    currExpected = currStep.find('div.expected-field textarea').first();
  })

  $('div#popup').css('display', 'none')
}

function parseField(fieldName, caseText){
  var regex = new RegExp(fieldName + ':(.*)\n')
  var matches = regex.exec(caseText);
  return matches[1].trim();
}

function parseOneStep(stepsText){
  var stepRegex = /When((.|[\n\r])*?)Then(.*)[\n\r]((.|[\n\r])*)/
  var stepMatch = stepRegex.exec(stepsText);
  return {'instr': stepMatch[1].trim(), 'expect':stepMatch[3].trim(), 'rest': stepMatch[4] };
}
function parseSteps(caseText){
  var stepsRegex = /When((.|[\n\r])*)/
  var matches = stepsRegex.exec(caseText)
  var steps = matches[0]
  var stepsList = []
  var rest = steps
  do {
    var step = parseOneStep(rest)
    stepsList.push({"Instruction": step.instr, "Expected": step.expect});
    rest = step.rest
    //console.log(rest)
  } while (rest != "");
  //console.log(stepMatch)

  return stepsList
}

function parsePlainTextCase(caseText){
  var caseObj0 = {};
  var fieldNames = ['Product', 'Version', 'Suite', 'ID Prefix', 'Priority', 'Name', 'Description']
  fieldNames.forEach(function(fieldName){
    caseObj0[fieldName] = parseField(fieldName, caseText);
  })

  caseObj0["Add Tags"] = [""]; //Don't support yet
  caseObj0["Instructions"] = parseSteps(caseText)

  return [caseObj0]
}
