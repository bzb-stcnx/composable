"use strict";

var turbopipe = require('../../src/index.ts');

describe('turbopipe:', function() {
  it('is a function', function() {
    expect(typeof turbopipe).toBe("function");
  });
  it('has static properties #map and #filter which are functions', function() {
    expect(Object.keys(turbopipe))
    .toEqual(jasmine.arrayContaining([ 'filter', 'map' ]));
    expect(typeof turbopipe.filter).toBe("function");
    expect(typeof turbopipe.map).toBe("function");
  });

});

/*
var arr = ["1","2","3","4","5"];

var p = turbopipe.map(function(str) { return parseInt(str, 10);  })
  .filter(function(num) { return 0 === num % 2; })
	.map(function(num) { return num + 1; });

p.into([]).from(arr); // -> [3, 5]
*/
