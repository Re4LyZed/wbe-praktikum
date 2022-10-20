const parseToProto = ( json, proto ) => Object.assign(Object.create(proto), JSON.parse(json))

let proto = { category: "animal"}
let obj = parseToProto('{"type":"cat","name":"Mimi","age":3}', proto)
console.log(obj.age)
console.log(obj.category)

module.exports = { parseToProto }

/*
// testing
describe("A suite is just a function", function () {
    
  beforeEach(function() {
    json = '{"type":"cat","name":"Mimi","age":3}'
    proto = { category: "animal"}
  });

  it("result test for json type", function() {
    let obj = parseToProto(json, proto)
    expect(obj.type).toEqual('cat');
  });

  it("result test for proto category", function() {
    let obj = parseToProto(json, proto)
    expect(obj.category).toEqual('animal');
  });
})
*/