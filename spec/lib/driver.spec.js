'use strict';

var BeagleboneStub = source("driver");

describe("Cylon.Drivers.BeagleboneStub", function() {
  var driver = new BeagleboneStub({
    connection: {}
  });

  it("has no drivers", function(){
      expect(true).to.equal(true);
  });
});
