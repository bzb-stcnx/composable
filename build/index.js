(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
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
    if (!arguments.length)
        reducer = [];
    else if (isFunction(reducer))
        reducer = [reducer];
    function _pipe(compose) {
        reducer.push(compose);
        return turbopipe(reducer);
    }
    function _composer(compose) {
        return function (fn) {
            return _pipe(compose(fn));
        };
    }
    function _reducer(dst, append) {
        if (!isFunction(append)) {
            if (Array.isArray(dst))
                append = push;
            else
                append = drop;
        }
        return reducer.reduceRight(function (reducer, compose) {
            return compose(reducer);
        }, append);
    }
    return {
        pipe: _pipe,
        map: _composer(turbopipe.map),
        filter: _composer(turbopipe.filter),
        into: function (dst, append) {
            reducer = _reducer(dst, append);
            return {
                from: function from(src) {
                    return src.reduce(reducer, dst);
                }
            };
        }
    };
}
var turbopipe;
(function (turbopipe) {
    function filter(fn) {
        return function compose(reduce) {
            return function _filter(acc, val) {
                return fn(val) ? reduce(acc, val) : acc;
            };
        };
    }
    turbopipe.filter = filter;
    ;
    function map(fn) {
        return function compose(reduce) {
            return function _map(acc, val) {
                return reduce(acc, fn(val));
            };
        };
    }
    turbopipe.map = map;
    ;
})(turbopipe || (turbopipe = {}));
module.exports = turbopipe;

},{}]},{},[1])
//# sourceMappingURL=index.js.map
