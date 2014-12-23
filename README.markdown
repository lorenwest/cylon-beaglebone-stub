# Cylon.js Beaglebone stub for testing

[![NPM](https://nodei.co/npm/config.svg?downloads=true&downloadRank=true)](https://nodei.co/npm/cylon-beaglebone-stub/)&nbsp;&nbsp;
[![Build Status](https://secure.travis-ci.org/lorenwest/cylon-beaglebone-stub.svg?branch=master)](https://travis-ci.org/lorenwest/cylon-beaglebone-stub)&nbsp;&nbsp;
[release notes](https://github.com/lorenwest/cylon-beaglebone-stub/blob/master/History.md)

This repository conains what looks like a real beaglebone, but
is stubbed out so robots can be built and tested without being
connected to a beaglebone.

For more information about Cylon, check out the repo at
https://github.com/hybridgroup/cylon

## Getting Started

Install the module with: `npm install cylon-beaglebone-stub`

## Examples

See https://github.com/hybridgroup/cylon-beaglebone for the real
beaglebone connector.

## Connecting

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    beaglebone: {adaptor: 'beaglebone-stub' }
  },
  devices: {
    pump_motor_on: {
      driver: 'direct-pin',
      pin: 'P9_11',
      connection: 'beaglebone'
    }
  }

  work: function(my) {
    my.pump_motor_on.digitalWrite(1);
  }
}).start();
```

## License

Copyright (c) 2014-2015 Loren West and other contributors.
See `LICENSE` for more details
