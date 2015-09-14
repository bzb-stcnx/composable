"use strict";
// TODO convert to typescript

function isFunction(fn) {
  return "function" == typeof fn;
}

function push(arr, val) {
  arr.push(val);
  return arr;
}

function drop(arr, val) {
  return arr;
}

function pipe(reducer) {
  if ("function" == typeof reducer) reducer = [ reducer  ];
    
  function _pipe(compose) {
    reducer.push(compose);
    return pipe(reducer);
  }
    
  function _composer(compose) {
    return function(fn) {
      return _pipe(compose(fn))
    };
  }
  
  /** TODO add possibility to plugin appenders
   * @description 
   */
  function _reducer(dst, append) {
    if (!isFunction(append)) {
	  if (Array.isArray(dst)) append = push;
      else append = drop;
    }
    return reducer.reduceRight(function(reducer, compose) {
      return compose(reducer);
    }, append);
  }

  return {
    pipe: _pipe,
    map: _composer(map),
    filter: _composer(filter),
    into: function(dst, append?) {
      reducer = _reducer(dst, append);
      return {
        from: function from(src) {
          return src.reduce(reducer, dst);
        }
      }
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

// TODO move example into dedicated file
var arr = ["1","2","3","4","5"];

var p = pipe(map(function(str) { return parseInt(str, 10);  }))
  .filter(function(num) { return !(num %2); })
	.map(function(num) { return num+1; });

p.into([]).from(arr); // -> [3, 5]
