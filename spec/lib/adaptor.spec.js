'use strict';

var Cylon = require('cylon');
var StubAdaptor = source("adaptor");

describe("Cylon.Adaptors.BeagleboneStub", function() {
  var adaptor = new StubAdaptor();

  it("Is a sub-class of Cylon.Adaptor", function() {
    expect(adaptor).to.be.instanceOf(Cylon.Adaptor);
  });

  it("Has the right name", function() {
    expect(adaptor.firmwareName()).to.equal('BeagleboneStub');
  });

  it("Calls the connect callback", function(done) {
    adaptor.connect(done);
  });

  it("Calls the disconnect callback", function(done) {
    adaptor.disconnect(done);
  });

  it("Emits the disconnect event", function(done) {
    adaptor.once('disconnect', done);
    adaptor.disconnect();
  });

  it("Validates digital pins", function() {
    try {
      adaptor.digitalWrite('bad_pin', 34);
      expect(false).to.equal(true);
    }
    catch (e) {
      expect(true).to.equal(true);
    }

    // Expect to not throw an exception
    adaptor.digitalWrite('P9_18', 1);
  });


  it("Returns pins and values", function() {
    var pins = adaptor.pins;
    expect(typeof pins).to.equal('object');
    expect(pins['P9_18']).to.equal(1);
  });

  it("Reads written digital values", function(done) {
    adaptor.digitalRead('P9_18', function(err, value) {
      expect(err).to.equal(null);
      expect(value).to.equal(1);
      done();
    });
  });

  it("Emits written digital values", function(done) {
    adaptor.digitalRead('P9_18');
    adaptor.once('digitalRead', function(value) {
      expect(value).to.equal(1);
      done();
    });
  });

  it("Validates analog pins", function() {
    try {
      adaptor.analogRead('P9_11');
      expect(false).to.equal(true);
    }
    catch (e) {
      expect(true).to.equal(true);
    }

    // Expect to not throw an exception
    adaptor.analogWrite('P9_40', .8);
  });

  it("Reads written analog values", function(done) {
    adaptor.analogRead('P9_40', function(err, value) {
      expect(err).to.equal(null);
      expect(value).to.equal(.8);
      done();
    });
  });

  it("Validates PWM pins", function() {
    try {
      adaptor.pwmWrite('P9_13');
      expect(false).to.equal(true);
    }
    catch (e) {
      expect(true).to.equal(true);
    }

    // Expect to not throw an exception
    adaptor.pwmWrite('P9_14', .8);
  });

  it("Emits written PWM values", function(done) {
    adaptor.pwmWrite('P9_14', .23);
    adaptor.once('pwmWrite', function(value) {
      expect(value).to.equal(.23);
      done();
    });
  });

  it("Writes servo values as PWM values", function(done) {
    adaptor.servoWrite('P9_42', .85, 2000, 2);
    adaptor.once('servoWrite', function(value) {
      expect(value).to.equal(.85);
      done();
    });
  });

  it("Emits written i2c values", function(done) {
    adaptor.i2cWrite('someAddress', 'someCmd', ['b','u','f'], function(err) {
      expect(err).to.equal(null);
      done();
    });
  });

  it("Reads written i2c values", function(done) {
    adaptor.i2cRead('someAddress', 'someCmd', 30, function(err, buf) {
      expect(err).to.equal(null);
      expect(Array.isArray(buf)).to.equal(true);
      expect(buf.length).to.equal(3);
      done();
    });
  });

});
