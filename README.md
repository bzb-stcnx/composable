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

#npm global install
it is preferable to install the npm dev dependencies listed in `package.json` system-wide
(`--global` option).

in that case, you might want to run `npm config set link true` once before using `npm install` in this package. this will set a user-level preference (in your home directory) to create links to the global installs in the local `node_modules` directory, and will avoid bloating the local modules with development dependencies.

note that a global install typically requires su priviledges (eg. `sudo`).

#npm scripts
* `build`: build 'build/index.js' from src/ and rebuild on modifications
* `build-once`: build 'build/index.js' from src/ only once and exit
* `test`: run unit tests defined in test/ and re-test on modifications
* `test-once`: run unit tests defined in test/ only once and exit

#typescript
this project supports typescript with annotations.

#commonjs modules
this project supports commonjs modules in the browser out of the box thanks to browserify.

#LICENSE
see [LICENSE.md](./LICENSE.md)

Copyright (c) 2015 bzb-stcnx
