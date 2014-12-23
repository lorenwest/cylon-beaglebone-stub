/*
 * cylon-beaglebone-stub
 *
 * Copyright (c) 2014-2015 Loren West
 * Licensed under the MIT license.
*/

'use strict';

var Adaptor = require('./adaptor'),
    Driver = require('./driver');

module.exports = {
  // Adaptors your module provides, e.g. ['spark']
  adaptors: ['beaglebone-stub'],

  // Drivers your module provides, e.g. ['led', 'button']
  drivers: [],

  // Modules intended to be used with yours, e.g. ['cylon-gpio']
  dependencies: ['cylon-gpio', 'cylon-i2c'],

  adaptor: function(opts) {
    return new Adaptor(opts);
  },

  driver: function(opts) {
    return new Driver(opts);
  }
};
