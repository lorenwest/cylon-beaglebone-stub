/*
 * cylon-beaglebone-stub adaptor
 *
 * Copyright (c) 2014-2015 Loren West
 * Licensed under the MIT license.
 */

"use strict";

var Cylon = require('cylon');
var NOP = function() {};

var BeagleboneStub = module.exports = function BeagleboneStub(opts) {
  BeagleboneStub.__super__.constructor.apply(this, arguments);

  this.pins = {};
  this.i2cAddresses = {};
  opts = opts || {};
};

Cylon.Utils.subclass(BeagleboneStub, Cylon.Adaptor);
var proto = BeagleboneStub.prototype;

var PINS = [
  "P8_3", "P8_4", "P8_5", "P8_6", "P8_7", "P8_8", "P8_9", "P8_10", "P8_11", "P8_12",
  "P8_13", "P8_14", "P8_15", "P8_16", "P8_17", "P8_18", "P8_19", "P8_20", "P8_21",
  "P8_22", "P8_23", "P8_24", "P8_25", "P8_26", "P8_27", "P8_28", "P8_29", "P8_30",
  "P8_31", "P8_32", "P8_33", "P8_34", "P8_37", "P8_38", "P8_39", "P8_40", "P8_41",
  "P8_42", "P8_43", "P8_44", "P8_45", "P8_46", "P9_11", "P9_12", "P9_13", "P9_14",
  "P9_15", "P9_16", "P9_17", "P9_18", "P9_19", "P9_20", "P9_21", "P9_22", "P9_23",
  "P9_24", "P9_25", "P9_26", "P9_27", "P9_28", "P9_29", "P9_30", "P9_31"
];

var PWM_PINS = [
  "P9_14", "P9_21", "P9_22", "P9_29", "P9_42", "P8_13", "P8_34", "P8_45", "P8_46"
];

var ANALOG_PINS = [
  "P9_39", "P9_40", "P9_37", "P9_38", "P9_33", "P8_36", "P8_35"
];

proto.commands = [
  'pins', 'analogRead', 'analogWrite', 'digitalRead', 'digitalWrite', 'pwmWrite',
  'servoWrite', 'firmwareName', 'i2cWrite', 'i2cRead'
];

proto.firmwareName = function() {
  return 'BeagleboneStub';
};

proto.connect = function(callback) {
  callback = callback || NOP;
  Cylon.Logger.debug("Connecting to '" + this.name + "'...");
  process.nextTick(callback);
};

proto.disconnect = function(callback) {
  var my = this;
  callback = callback || NOP;
  Cylon.Logger.debug("Disconnecting from '" + this.name + "'...");
  process.nextTick(function(){
    my.emit('disconnect');
    callback();
  });
};

proto.analogRead = function(pinNum, callback) {
  var my = this;
  callback = callback || NOP;
  my._validateAnalogPin(pinNum);
  process.nextTick(function() {
    my.emit('analogRead', my.pins[pinNum]);
    callback(null, my.pins[pinNum]);
  });
  return true;
};

// This is for testing instrumentation.  There is no real analogWrite.
proto.analogWrite = function(pinNum, value) {
  var my = this;
  my._validateAnalogPin(pinNum);
  my.pins[pinNum] = value;
  process.nextTick(function() {
    my.emit('analogWrite', value);
  });
  return value;
};

proto.digitalRead = function(pinNum, callback) {
  var my = this;
  callback = callback || NOP;
  my._validateDigitalPin(pinNum);
  process.nextTick(function() {
    my.emit('digitalRead', my.pins[pinNum]);
    callback(null, my.pins[pinNum]);
  });
  return true;
};

proto.digitalWrite = function(pinNum, value) {
  var my = this;
  my._validateDigitalPin(pinNum);
  my.pins[pinNum] = value;
  process.nextTick(function() {
    my.emit('digitalWrite', value);
  });
  return value;
};

proto.pwmWrite = function(pinNum, scaledDuty, freq, pulseWidth, eventName) {
  var my = this;
  my._validatePWMPin(pinNum);
  my.pins[pinNum] = scaledDuty;
  process.nextTick(function() {
    eventName = eventName || 'pwm';
    my.emit(eventName + 'Write', my.pins[pinNum]);
  });
};

proto.servoWrite = function(pinNum, scaledDuty, freq, pulseWidth) {
  var my = this;
  var args = Array.prototype.slice.call(arguments);
  args.push('servo');
  my.pwmWrite.apply(this, args);
};

proto.i2cWrite = function(address, cmd, buff, callback) {
  var my = this;
  callback = callback || NOP;
  buff = buff != null ? buff : [];
  my.i2cAddresses[address] = buff;
  process.nextTick(function(){
    callback(null);
  });
};

proto.i2cRead = function(address, cmd, length, callback) {
  var my = this;
  callback = callback || NOP;
  process.nextTick(function(){
    callback(null, my.i2cAddresses[address]);
  });
};

proto._validateDigitalPin = function(pinNum) {
  if (PINS.indexOf(pinNum) < 0) {
    throw new Error("Pin '" + pinNum + "' not a digital pin.");
  }
}
proto._validateAnalogPin = function(pinNum) {
  if (ANALOG_PINS.indexOf(pinNum) < 0) {
    throw new Error("Pin '" + pinNum + "' not an analog pin.");
  }
}
proto._validatePWMPin = function(pinNum) {
  if (PWM_PINS.indexOf(pinNum) < 0) {
    throw new Error("Pin '" + pinNum + "' not a PWM pin.");
  }
}
