# What is `Flocks`? 😨

`Flocks` is an *application layer* for `React`.  The purpose of `Flocks` is to make application
development simple and straightforward, by providing basic tools for state management and mounting.

The central goal of `Flocks` is ***extreme simplicity***.



## A teaser

This is a sketch of a complete Flocks application.  It just needs some controls.

We'll get through what this means shortly.

```javascript
var Target = document.getElementById("YourMountPoint"),
    Update = Flocks.create({ "target": Target, "control": YourApp });

// stuff happens in your app and you want to change your UI
Update({ "authed": true, "user": "BobDobbs", "session":"..." });
```



## What problem does this solve?

We feel that `React` is most of an extremely lightweight, high productivity toolset for
building hilariously modular sites by faking making new tags, but ditching the whole binding
disaster.  The `React` authors at Instagram made one really smart decision early on: `React`
was going to follow `The Unix Way`, and stay a small tool that didn't hard-lock into other
tools.

To that end, `Facebook` (who purchased Instagram) has now produced several different,
incompatible layers above `React`, such as `Flux`, `Relay`, and so on.  But, no definitive
`Flux` implementation exists; it's just an idea, and you're to implement it yourself.

Others in the community have made a pile of `Flux` variants, each adding or removing from the
general pattern.  `Fluxxor`, `ReactFlux`, `Fynx`, `Reflux`, `Fluxy`, `Marty`, `McFly`,
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

```javascript
var Target = document.getElementById("YourMountPoint"),
    Update = Flocks.create({ "target": Target, "control": YourApp });

// stuff happens in your app and you want to change your UI
Update({ "authed": true, "user": "BobDobbs", "session":"..." });
```

The steps are simple:

  1. Use `Flocks` to mount your root-level control
  1. Add the `Flocks` mixin to any controls that use state
  1. Use `the Flocks Context` and `the Flocks Updater` for state

You're done!  Throw away all your boilerplate. 😃

The idea is that `the Flocks Context` is a single datastructure that you keep your state in.
When you update it, `Flocks` will handle re-painting the UI for you.  The  whole "one-way flow
of data" loop that everyone talks about gets reduced to a single method call.

This method call is available both inside of and outside of the React component tree.  Flocks
doesn't want to control how you work.  It just wants to clean up state management.



# A tiny, complete example 🎆 🎊 🎉

The simplest example that seems convenient is a spinner, made of several react controls, which
has an upper and lower bound.  The next section is a step by step creation, but let's whet your
appetite now.

Honestly, this is simple enough to just read in a single pass.

```html
<!doctype html>
<html>

  <head>

    <meta charset="utf-8">
    <title>Example Spinner App</title>

    <style type="text/css">
      body   { font-size: 600%; }
      button { font-size: 50%; margin: 2em; }
    </style>

    <script defer src="http://fb.me/JSXTransformer-0.12.2.js"></script>
    <script defer src="http://fb.me/react-0.12.2.js"></script>
    <script defer src="http://cdnjs.cloudflare.com/ajax/libs/flocks.js/0.14.3/flocks.js"></script>

    <script defer type="text/jsx">

      var Up = React.createClass({
        mixins: [ window.flocksjs2.member ],
        inc:    function() { this.fset('value', this.fctx['value'] + 1) },
        render: function() { return <button onClick={this.inc}>▲</button>; }
      });

      var Down = React.createClass({
        mixins: [ window.flocksjs2.member ],
        dec:    function() { this.fset('value', this.fctx['value'] - 1) },
        render: function() { return <button onClick={this.dec}>▼</button>; }
      });

      var SpinnerApp = React.createClass({
        mixins: [ window.flocksjs2.member ],
        render: function() { return <div><Up/>{this.fctx['value']}<Down/></div>; }
      });

      var FlocksConfig = { target: document.body, control: SpinnerApp };
      var InitialState = { value: 0 };

      var Updater      = window.flocksjs2.create(FlocksConfig, InitialState);

    </script>

  </head>

  <body></body>

</html>
```

Notice that we have several different controls at different levels of heirarchy interacting with
one another's data with zero boilerplate.  No figuring out actions, or dispatchers, or stores,
or how things are best divided up.  Just a simple object.  This is `Flocks` simplicity. 🏄


# What's next? 😃
