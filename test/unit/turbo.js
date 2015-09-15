"use strict";

var turbopipe = require('../../src/index.ts');

var arr = ["1","2","3","4","5"];

var p = turbopipe.map(function(str) { return parseInt(str, 10);  })
  .filter(function(num) { return 0 === num % 2; })
	.map(function(num) { return num + 1; });

p.into([]).from(arr); // -> [3, 5]
