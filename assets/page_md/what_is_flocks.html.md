# What is `Flocks`? 😨

`Flocks` is an *application layer* for `React`.  The purpose of `Flocks` is to make application
development simple and straightforward, by providing basic tools for state management and mounting.

The central goal of `Flocks` is ***extreme simplicity***.



## So what does `Flocks` do?

`Flocks` creates an environment for your `React` development that takes all the thinking out of your
tooling, and that lets you focus on your application.  No more worrying about how to split data up
across `stores`; whether to put your `AJAX` into `actions` or `stores` or `dispatchers`; how to get
your `dispatch`es to not get in each others' way.

Just work with something that feels like a global, and gives you a trivial update API.  😃

The steps are simple:

  1. Install `Flocks` into your application
  1. Use `Flocks` to mount your root-level control
  1. Add the `Flocks` mixin to any controls that use state

You're done!  Throw away all your boilerplate. 😃



## A quick example

So let's say you want to make a simple tip calculator.

```javascript
var abc = 123;
var def = 'four five six';
```
