"use strict";

function push(arr, val) {
  arr.push(val);
  return arr;
}

function pipe(reducer) {
  if ("function" == typeof reducer) reducer = [ reducer  ];
  return {
    pipe: function(compose) {
      reducer.push(compose);
      return pipe(reducer);
    },
    append: function(append) {
      return reducer.reduceRight(function(reducer, compose) {
        return compose(reducer);
      }, append);
    }
  };
}

function filter(fn) {
  return function compose(reduce) {
    return function _filter(acc, val) {
      return fn(val) ? reduce(acc, val) : acc;
    };
  };
};

function map(fn) {
  return function compose(reduce) {
    return function _map(acc, val) {
      return reduce(acc, fn(val));
    };
  };
};

var arr = ["1","2","3","4","5"];

var p = pipe(map(function(str) { return parseInt(str, 10);  }))
        .pipe(filter(function(num) { return !(num %2);  }))
        .append(push);
console.log(arr.reduce(p, []));
//console.log(p.into([]).from(arr));
