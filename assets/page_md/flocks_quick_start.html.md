# A quick example

So let's say you want to make a simple grocery list.  We're going to keep the example here
in pseudo-code; if you want an actual working set of code to browse through, please see the
[`Flocks` tutorial](flocks_tutorial.html) or the [`React` tutorial](react_tutorial.html) as
appropriate.  We'll assume you've already gotten `React` and `Flocks` loaded into the page.

You can load `Flocks` through AMD/CommonJS (node-style) `require()`, or directly and then
fetch it from `window`.  For the micro-example, let's keep it simple.  Similarly, that means
that this tutorial won't contain the very strictest of code; for example, because it's legal
in `HTML5` we'll leave the type off of the script tags, to keep things more readable, but in
production code we'd take the pain in the butt route and spell it out.



## Housing document

First you'll need a simple housing `HTML` document.

```html
<!doctype html>
<html>

  <head>
    <title>Example Grocery List</title>
    <script src="http://fb.me/JSXTransformer-0.13.1.js"></script>
    <script src="http://fb.me/react-0.13.1.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/flocks.js/1.6.0/flocks.js"></script>
  </head>

  <body></body>

</html>
```



## Layout control

Then you'll want to create a basic layout control.  For simplicity, for this tutorial, we're just
going to be gross and include a bunch of individual scripts.  We'll do a proper `CommonJS` system
in the tutorials; this is a "get you the idea, fast" type of situation.

`GroceryLayout.jsx`:

```javascript
var GroceryLayout = React.createClass({

  render: function() {
    return <div>Todo: build an app here</div>;
  }

});
```



## Flocks mounts the control into the document

Next, let's have `Flocks` mount `GroceryLayout` for us.

We need to:

  1. Identify the mount point to use in the document (we used the id `MountPoint`);
  1. Identify the application's main `React` control (for this example, `GroceryLayout`);
  1. Create an object mentioning the mount point and the control as `the Flocks config`;
  1. Tell `Flocks` to create a `Flocks Updater` from the `Flocks Config`.

```javascript
var MountPoint    = document.getElementById("MountPoint"),
    FlocksConfig  = {"target": MountPoint, "control": GroceryLayout},
    FlocksUpdater = window.flocks.create(FlocksConfig);
```

And now we have a working Flocks application (that does basically nothing so far.)

Let's make it do stuff! 🙌



# Our app works but is boring

