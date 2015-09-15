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

function turbopipe(reducer) {
  if (!arguments.length) reducer = [];
  else if (isFunction(reducer)) reducer = [ reducer  ];
        
  function _pipe(compose) {
    reducer.push(compose);
    return turbopipe(reducer);
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
    map: _composer(turbopipe.map),
    filter: _composer(turbopipe.filter),
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

namespace turbopipe {
  export function filter(fn) {
    return function compose(reduce) {
      return function _filter(acc, val) {
        return fn(val) ? reduce(acc, val) : acc;
      };
    };
  };

  export function map(fn) {
    return function compose(reduce) {
      return function _map(acc, val) {
        return reduce(acc, fn(val));
      };
    };
  };
}

export = turbopipe;
