# API Overview

This is meant to be a quick overview to understand the general shape of `Flocks`.
For a more detailed understanding, please see [the `Flocks` Docs](flocks_docs.html).



## Basics
 * `flocks.createClass` - an analogue of `React.createClass` which adds `flocks.plumbing` to a `React`
   component spec automatically
 * `flocks.mount(config, state)` - accepts a `config` and a `data`set; mounts your root control; returns
   an updating function; triggers the `Flocks` lifecycle
   * `handler` - a validation gateway function which can refuse an update
   * `finalizer` - a function called after any update
 * `flocks.plumbing` - A mixin which is added to controls to provide `fctx` and `fset()`

## Setting values
 * `this.fset(key, value)` - set a `key` in the `Flocks context` to a `value`.
 * `this.fset_path(path, value)` - set a `path` to a `value` in the `Flocks context`.

## Getting values - the `Flocks Context`
 * `this.fctx` - where your `Flocks` application's state is found
 * `this.get_path(path)` - get the value at a `path` - occasionally useful as the dual of `.set_path`

## Utilities
 * `isArray(maybeArray)` - tests whether a value is an `array`
 * `isUndefined(maybeArray)` - tests whether a value is an `array`
 * `isNonArrayObject(maybeArray)` - tests whether a value is an `object` which is also not an `array`

