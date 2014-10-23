var expect = chai.expect;

var mockTextCase = "Product: Firefox OS\nVersion: v2.1\nSuite: [Comms] Cost Control (cleanup for v2.1)\n ID Prefix: \n Priority: 2\n Name: This is a test title \n Add Tags: \n Description: This is a test desc \n When step001\n Then expect001\n When step002\n Then expect002\n"
var mockCaseObj = [
  {
    "Product":    "Firefox OS",
    "Version":    "v2.1",
    "Suite":      "[Comms] Cost Control (cleanup for v2.1)", "ID Prefix":   "",
    "Priority":   "2",
    "Name":       "This is a test title",
    "Add Tags":  [""],
    "Description":"This is a test desc",

    "Instructions":[
      {
      "Instruction":"step001",
      "Expected":"expect001"
      },
      {
      "Instruction":"step002",
      "Expected":"expect002"
      }
    ]
  }
]
var mockInstrs = "When Enable either Wi-Fi or 3G connection.\n Then\n When Reboot the device.\n Then \n When Open the clock app and wait for 10 sec.\n Then \n When Make a phone call to the device under test from another phone, do not answer it.\n Then The incoming call screen should show up.\n When Wait for 10 seconds and hand up the call.\n Then The call screen is dismissed and it goes back to the clock app.\n When Press the home button.\n Then Goes back to the home screen.\n When Wait for the seconds you set for AUM.REPORTINTERVAL in apps/system/js/appusage_metrics.js and check the metrics server\n Then The information should be sent to server\n When Go to metric server In left hand side, click Main > Logs\n Then A list of logs will be shown in right hand side\n When Open the newest log\n Then The usageTime for clock.gaiamobile.org should be ~10 sec. The usage time for callscreen.gaiamobile.org should be ~10 sec. The rest of the usage time should be attributed to verticalhome.gaiamobile.org.\n"

describe('Parse plaintext cases', function(){

  /*
  it('Can trim white spaces', function(){
    var input = " firefox os "
    var output = trim(input)
    expect(output).to.be.equal("firefox os")
  })
  */
  it('Can parse given field name', function(){
    //var fieldNames = Object.keys(mockCaseObj[0])
    var fieldNames = ['Product', 'Version', 'Suite', 'ID Prefix', 'Priority', 'Name', 'Description']

    fieldNames.forEach(function(fieldName){
      var value = parseField(fieldName, mockTextCase);
      expect(value).to.be.equal(mockCaseObj[0][fieldName], 'Can parse ' + fieldName);
    })
  });

  it('Can parse instructions section', function(){
    var steps = parseSteps(mockTextCase);
    expect(steps).to.have.length(mockCaseObj[0].Instructions.length)
    for (var stepNo in mockCaseObj[0]["Instructions"]){
      var expected = mockCaseObj[0]["Instructions"][stepNo]
      var actual = steps[stepNo]
      expect(actual.Instruction).to.be.equal(expected.Instruction)
      expect(actual.Expected).to.be.equal(expected.Expected)
    }

    var steps = parseSteps(mockInstrs);
    console.log(steps)
    expect(steps).to.have.length(9)
  })
  it('Can parse one step from steps', function(){
    var step = parseOneStep(mockTextCase);
    expect(step.instr).to.be.equal("step001")
    expect(step.expect).to.be.equal("expect001")
    expect(step.rest).to.be.equal(" When step002\n Then expect002\n")
  })

  it('Can parse plaintext cases', function(){
    var caseObj = parsePlainTextCase(mockTextCase);
    var fieldNames = ['Product', 'Version', 'Suite', 'ID Prefix', 'Priority', 'Name', 'Description']
    //Object.keys(mockCaseObj[0]).forEach(function(key){ 
    fieldNames.forEach(function(key){
      expect(caseObj[0][key]).to.be.equal(mockCaseObj[0][key], 'Can parse ' + key);

    });

    expect(caseObj[0]["Instructions"]).to.have.length(mockCaseObj[0]["Instructions"].length)
    for (var stepNo in mockCaseObj[0]["Instructions"]){
      var expected = mockCaseObj[0]["Instructions"][stepNo]
      var actual = caseObj[0]["Instructions"][stepNo]
      expect(actual.Instruction).to.be.equal(expected.Instruction)
      expect(actual.Expected).to.be.equal(expected.Expected)
    }
  });
});

var mockCaseList = "+, \"Add 001\",bla \n-,\"Remove 001\", efjeij, jij\n+, \"Add 002\", jeifjei, ejfiej\n-, \"Remove 002\", jfeijfei\n,fjiejfi,fjiejfi\n,efjiejf,efjiej"
var mockSuitePatch = {'adds': ["Add 001", "Add 002"], 'removes': ["Remove 001", "Remove 002"]};

describe('Import suite from file', function(){

  it('Can parse suites add/remove list', function(){
    //var fieldNames = Object.keys(mockCaseObj[0])
    var suitePatch = parseSuitePatch(mockCaseList);
    expect(suitePatch.adds).to.have.length(2)
    expect(suitePatch.removes).to.have.length(2)

    for (var idx in suitePatch.adds){
      expect(suitePatch.adds[idx]).to.be.equal(mockSuitePatch.adds[idx])
    }

    for (var idx in suitePatch.removes){
      expect(suitePatch.removes[idx]).to.be.equal(mockSuitePatch.removes[idx])
    }

  });

});

