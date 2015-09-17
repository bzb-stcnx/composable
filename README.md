# about
efficient transducer library.

transducers are extremely memory efficient, process data collections significantly faster than other approaches and naturally enable lazy evaluation.

transducers also enable a clean separation of concerns: the processing of the data is independent from iterating through the collection and building the resulting collection. the same transducer can be applied to any type of collection: arrays, observables, immutable sets, etc.

for a more detailed explanation, see ["Transducers.js: A JavaScript Library for Transformation of Data"](http://jlongster.com/Transducers.js--A-JavaScript-Library-for-Transformation-of-Data).
thanks to James Longster for his inspiring [transducers.js](https://github.com/jlongster/transducers.js) library.

#fluent API
```javascript
var pipe = turbopipe()
        .filter(str => str.length % 2)
        .map(str => str.toUpperCase());
        
var arr = [ "a", "bc", "def", "ghij", "klmno" ];
pipe.into([]).from(arr); // => [ "A", "DEF", "KLMNO" ]
```

#performance
http://jsperf.com/composables/3

#status
experimental concept

#dependencies
none

the dependencies listed in package.json are either development deps or optional for illustration purposes only.

#npm scripts
* `build`: build 'build/index.js' from src/ and rebuild on modifications
* `build-once`: build 'build/index.js' from src/ only once and exit
* `test`: run unit tests defined in test/ and re-test on modifications
* `test-once`: run unit tests defined in test/ only once and exit

#typescript
this project requires typescript >= 1.6 for development.
the corresponding development dependency is included in [package.json](./package.json).

# rxjs
this project is set up for import of [rxjs](https://www.npmjs.com/package/rx) in unit tests with:
```javascript
var Rx = require("rx/index");
```
"rx/index" includes all the rx options, eg. rx.testing.

#commonjs modules
this project supports commonjs modules in the browser out of the box thanks to [browserify](https://www.npmjs.com/package/browserify).

#LICENSE
see [LICENSE.md](./LICENSE.md)

Copyright (c) 2015 bzb-stcnx
