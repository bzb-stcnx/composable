# about
efficient transducer library.
transducers are extremely memory efficient, process data collections significantly faster than other approaches and naturally enable lazy evaluation.

#performance
http://jsperf.com/composables/3

#dependencies
none
the dependencies listed in package.json are either development deps or optional for illustration purposes only.

# npm global install
it is preferable to install the npm dev dependencies listed in `package.json` system-wide
(`--global` option). in that case, you might want to run `npm config set link true` once before using `npm install` in this package. this will set a user-level preference (in your home directory) to create links to the global installs in the local `node_modules` directory. this will avoid bloating the local modules with development dependencies.

note that a global install typically requires su priviledges (eg. `sudo`).

# npm scripts
* `build`: build 'build/index.js' from src/ and rebuild on modifications
* `build-once`: build 'build/index.js' from src/ only once and exit
* `test`: run unit tests defined in test/ and re-test on modifications
* `test-once`: run unit tests defined in test/ only once and exit

# typescript
this project supports typescript with annotations.

# commonjs modules
this project supports commonjs modules in the browser out of the box thanks to browserify.
