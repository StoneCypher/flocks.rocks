# API Overview

This is meant to be a quick overview to understand the general shape of `Flocks`.
For a more detailed understanding, please see [the `Flocks` Docs](flocks_docs.html).



## Basics
 * `flocks.create` - accepts a `config` and a `data`set; returns an updating function
   * `handler` - a validation gateway function which can refuse an update
   * `finalizer` - a function called after any update
 * `mixin` - Added to controls to provide `fctx` and `fset()`

## Getting values - the `Flocks` Context
 * `this.fctx` - where your `Flocks` application's state is found

## Setting values
 * `this.fset` - set a `key` to a `value` in the `Flocks context`.
 * `this.fset_path` - set a `path` to a `value` in the `Flocks context`.
