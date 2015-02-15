# What is `Flocks`? 😨

`Flocks` is an *application layer* for `React`.  The purpose of `Flocks` is to make application
development simple and straightforward, by providing basic tools for state management and mounting.

The central goal of `Flocks` is ***extreme simplicity***.



## What's the problem space?

The space is that `React` is most of an extremely lightweight, high productivity toolset for
building hilariously modular sites by faking making new tags, but ditching the whole binding
disaster.  The `React` authors at Instagram made one really smart decision early on: `React`
was going to follow `The Unix Way`, and stay a small tool that didn't hard-lock into other
tools.

To that end, `Facebook` (who purchased Instagram) has now produced several different,
incompatible layers above `React`, such as `Flux`, `Relay`, and so on.  But, no definitive
`Flux` implementation exists; it's just an idea, and you're to implement it yourself.

Others in the community have made a pile of `Flux` variants, each adding or removing from the
general pattern.  `ReactFlux`, `Fluxxor`, `Fynx`, `Reflux`, `Fluxy`, `Marty`, `McFly`,
`DeLorean`, and so forth.

Still others have tried to go the Clojure route with immutable datastructures - `Om`, `Mori`,
`Omniscient`, `Ancient Oak`, `Baobab`, `Morearty`, `Immutable`, and more.

The `Flocks` team is particularly enamored with `Cortex`, which follows a path moderately
similar to `Flocks`' own.

Clearly, there is room for an answer here, and it's not clear who offers the best tool.



## Why `Flocks` over the others?

The central goal of `Flocks` is ***extreme simplicity***.

`Flocks` wants you up and ready to go in under five minutes.  This doesn't mean ready to start.
There are only a handful of concepts, total.  Start to finish, five minutes, and you're done.



## So what does `Flocks` *actually do*?

`Flocks` creates an environment for your `React` development that takes all the thinking out of your
tooling, and that lets you focus on your application.  No more worrying about how to split data up
across `stores`; whether to put your `AJAX` into `actions` or `stores` or `dispatchers`; how to get
your `dispatch`es to not get in each others' way.

Instead, just work with something that feels like a global, and gives you a trivial update API.

The steps are simple:

  1. Install `Flocks` into your application
  1. Use `Flocks` to mount your root-level control
  1. Add the `Flocks` mixin to any controls that use state
  1. Use `the Flocks Context` and `the Flocks Updater` for state

You're done!  Throw away all your boilerplate. 😃

The idea is that `the Flocks Context` feels like a global.  It's a single datastructure that you
keep your state in.  When you update it, `Flocks` will handle re-painting the UI for you.  The
whole "one-way flow of data" loop that everyone talks about gets reduced to a single method call.



## A quick example

So let's say you want to make a simple grocery list.  We're going to keep the example here
in pseudo-code; if you want an actual working set of code to browse through, please see the
[`Flocks` tutorial](flocks_tutorial.html) or the [`React` tutorial](react_tutorial.html) as
appropriate.  We'll assume you've already gotten `React` and `Flocks` loaded into the page.

You can load `Flocks` through AMD/CommonJS (node-style) `require()`, or directly and then
fetch it from `window`.  For the micro-example, let's keep it simple.

### Housing document

First you'll need a simple housing `HTML` document.

```html
<!doctype html>
<html>

  <head>
    <title>Example Grocery List</title>
    <script type="text/javascript" src="http://fb.me/JSXTransformer-0.12.2.js"></script>
    <script type="text/javascript" src="http://fb.me/react-0.12.2.js"></script>
  </head>

</html>
```

### Layout control

Then you'll want to create a basic layout control.

```javascript
var GroceryLayout = React.createClass({
  render: function() {
    return <div>todo!</div>;
  }
});
```

### Flocks mounts the control into the document

Next, let's have `Flocks` mount `GroceryLayout` for us.

```javascript
var updater = window.flocks.create()
```
