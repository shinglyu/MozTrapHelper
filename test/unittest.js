var expect = chai.expect;

var mockTextCase = "Product: Firefox OS\nVersion: v2.1\nSuite: [Comms] Cost Control (cleanup for v2.1)\n ID Prefix: \n Priority: 2\n Name: This is a test title \n Add Tags: \n Description: This is a test desc \n When step001\n Then expect001\n When step002\n Then expect002\n"
var mockCaseObj = [
  {
    "Product":    "Firefox OS",
    "Version":    "v2.1",
    "Suite":      "[Comms] Cost Control (cleanup for v2.1)",
    "ID Prefix":   "",
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

