# A quick example

So let's say you want to make a tip calculator.



## Getting started with `Flocks`

You can load `Flocks` through AMD/CommonJS (node-style) `require()`, or directly
and then fetch it from `window`.  For the micro-example, let's keep it simple,
and fetch it from CDN from the global instance.  To keep this example extra
simple, we'll also keep the controls in their own files, and just load the files
from script tags.  In a production environment we'd concatenate and uglify
instead.

What we'll do is build the calculator step by step.  In each heading you'll see
a "checkpoint" that points to a Github revision.  Those checkpoints are always
runable in a browser, and the Github revision pointed to contains the code as
the tutorial has gotten to up and until that point.

The text makes you think a little bit about where things go, to help things
sink in about how to do the work, but there's always the
Github repo to fall
bac



## Housing `HTML` document

First you'll need a simple housing `HTML` document.

```html
<!doctype html>
<html>

  <head>

    <title>Example Tip Calculator</title>

    <script defer src="http://fb.me/JSXTransformer-0.13.1.js"></script>
    <script defer src="http://fb.me/react-0.13.1.js"></script>
    <script defer src="http://cdnjs.cloudflare.com/ajax/libs/flocks.js/1.6.0/flocks.js"></script>

  </head>

  <body></body>

</html>
```

> ⛺ Source checkpoint: [housing document](https://github.com/StoneCypher/flocks-tipcalc/commit/5dea23db19e69805656faf9aaa28432e5ea03141)

This won't do anything but load the two `React` libraries and the one `Flocks`
library.  React will mention in the console logs that you aren't using
server-side rendering (duh.)

In the browser, this should white-screen.



## Host app

Next, let's make a `React` component which represents the main application.
Initially the control will be trivial; we'll flesh it out as we go, but one
thing at a time.

We're going to use the `Flocks` wrapper for `React`'s `.createClass`, which
just adds the `Flocks plumbing mixin` to the control for us.  This is not a
requirement; it's a convenience.  Later tutorials will get into the details,
but the short version is "that's where `.fctx` and `.fset` get set up," which
will itself make sense momentarily.

For now, the app.



### `TipCalcApp.jsx`

```javascript
var TipCalcApp = flocks.createClass({

  render: function() {

    return <div>Basic App!</div>;

  }

});
```

We'll also need to add that to `<head>` as a `<script>` (in a production system
we'd concatenate and uglify instead, but tutorials should stay simple,) like so:

```html
<script type="text/jsx" defer src="TipCalcApp.jsx"></script>
```

> ⛺ Source checkpoint: [currently unused tipcalc app](https://github.com/StoneCypher/flocks-tipcalc/commit/86efc890bbeb9643d8992f278568a28c72bee4cd)

But nothing will render yet, because the app isn't being mounted yet.  So this
will still white-screen.

Note: if you look at the Github repo, you'll see that this control and all the




## Mount the app

We like immediate results, don't we?

```html
<script type="text/jsx" defer>

  flocks.mount(
    {target: document.body, control: TipCalcApp},
    {bill: 0, total: 0}
  );

</script>
```

> ⛺ Source checkpoint: [mounted; can see application run](https://github.com/StoneCypher/flocks-tipcalc/commit/5d06fe6b9327c1f12101c48a8e0c78b5c562e2e1)

Toss that into `<head>` also, at the end, and suddenly in-browser you should see
"Basic App!".

That just tells `Flocks` that its configuration is to use the `<body>` of the
document as its mount point, and that its root control should be `TipCalcApp`;
also, that the initial state is for `bill` and `total` each to be `0`.

You now have a (trivial) working `React / Flocks` application.  Let's make it do
stuff.



## Layout control

Let's create a basic layout control and get that nonsense out of the way.  In
the theme of being gross for simplicity, we're just going to make a single
`<table>` with a single `<tr>` and single `<td>` to get trivial full centering,
then throw a `<div>` in there with the actual app.  No responsive or any such
stuff for this tutorial.



### `TipCalcLayout.jsx`:

```javascript
var TipCalcLayout = flocks.createClass({

  render: function() {

    var tdstyle = { verticalAlign: 'middle', textAlign: 'center' };

    return (
      <table id="layout">
        <tr>
          <td style={tdstyle}>{this.props.children}</td>
        </tr>
      </table>
    );

  }

});
```

Notice the bit that says `{this.props.children}` inside the central `<td>`.
There are two things to learn there: one is that `{ }` braces inside JSX allow
you to include arbitrary javascript, and two is that `this.props.children`
refers to the parse of the interior of this control when used from the outside.

That is, if you were making `<foo>`, and you had a structure like

```html
<div><foo><bar>hello</bar><quux>ohai</quux></foo></div>
```

then the `this.props.children` array would contain two elements - the first for
`<bar>` and the second for `<quux>`.

Then we can change the render function in `TipCalcApp` to read

```javascript
render: function() {
  return <TipCalcLayout>Basic App in layout!</TipCalcLayout>;
}
```

And we'll need to add a line to the `<head>` to include this new control,
*before* the line where it's used:

```html
<script type="text/jsx" defer src="TipCalcLayout.jsx"></script>
```

> ⛺ Source checkpoint: [now using layout](https://github.com/StoneCypher/flocks-tipcalc/commit/2d5a6e06765493d8cc107675ae19af66cebd6124)

And now you should see the new text; if you inspect the document in a browser
debugger, you'll see there is indeed a `<table>` there.

Of course, merely having a table doesn't make it do centering for us.  For that
we'll need to start some `CSS`.

We'll start with three rules: one that sets both `<html>` and `<body>` to fill
the client area with no margins, padding, or borders; one that does the same for
our table with the id `#layout` while adding position rules to enforce location;
and one which sets `vertical-align` to `middle` on the solo `<td>` in `#layout`.





### `TipCalc.css`:

```css
html, body {
  height  : 100%;
  width   : 100%;
  padding : 0;
  margin  : 0;
  border  : 0;
}

#layout {
  position : fixed;
  top      : 0;
  left     : 0;
  right    : 0;
  bottom   : 0;
  height   : 100%;
  width    : 100%;
}

#layout td {
  vertical-align : middle;
}
```

Simple enough.  We'll also need to toss a `<link>` into the `<head>` to load it:

```html
<link rel="stylesheet" type="text/css" href="TipCalc.css">
```

> ⛺ Source checkpoint: [we now have vertical centering](https://github.com/StoneCypher/flocks-tipcalc/commit/d61c325fbbc831ee28e62567b0b18acf09bd8a6a)



## Making the app panel

We'll want a panel to contain the stuff so that it looks uniform.  It'll have
our widgets and behavior on it, because we're keeping things simple and a bit
gross for the tutorial.

We'll need an input for the bill amount; three buttons for unhappy, nonplussed,
and happy, for tip selection; and a place to put the output text.  We can
make them attractive later; first we're just going to make it function.

A quick first draft of our UI might look like:



### `TipCalcPanel`:

```javascript
var TipCalcPanel = flocks.createClass({

  render: function() {

    return (

      <div id="panel">

        <label id="amt" for="billAmount">
          Bill amount: $<input id="billAmount"/>
        </label>

        <div id="howHappy">
          <input type="button" value={"25%"}/>
          <input type="button" value={"20%"}/>
          <input type="button" value={"15%"}/>
        </div>

        <div id="result">
          Total: $
        </div>

      </div>

    );

  }

});
```

We'd also need to modify the `TipCalcApp` to actually use this panel, instead of
our dummy text, next:

```javascript
var TipCalcApp = flocks.createClass({

  render: function() {
    return (
      <TipCalcLayout>
        <TipCalcPanel/>
      </TipCalcLayout>
    );
  }

});
```

Then we'd need to include the new control in the `<head>`, again above the
control using it:

```html
<script type="text/jsx" defer src="TipCalcPanel.jsx"></script>
```

> ⛺ Source checkpoint: [rudimentary, terrible-looking panel](https://github.com/StoneCypher/flocks-tipcalc/commit/d24ce425bda58c110581e18d5ca402aa9efc3611)

It looks awful, but it shows what we need.  We'll work on the appearance in a
minute; first it's time to make it actually work.



## Hooking up the `total` display

We have two values in our `Flocks Context` - the `bill` and the `total`.  The
`bill` is the amount the user is being charged; the `total` is the amount after
the appropriate tip has been added.  We've initialized them both to zero, so we
are safe to just start displaying them immediately.

Let's hook up the display for `total`, which currently will only show zero since
that's what we've initialized it to, and aren't yet updating it.

's actually really easy. 😁

Remember how we said curly braces `{ }` could add arbitrary javascript?  Let's
make use of that.  In the part of the `render` function for `TipCalcPanel` that
looks like

```html
<div id="result">
  Total: $
</div>
```

Let's add a block to read out the `total` member of the `Flocks Context`.

```html
<div id="result">
  Total: ${this.fctx.total}
</div>
```

> ⛺ Source checkpoint: [First display of information from Flocks Context](https://github.com/StoneCypher/flocks-tipcalc/commit/868ad0681b9969549ac130d11011969b63a8f949)

That zero that comes out?  That's live.  It'll update on its own as it needs to.
(The dollar sign isn't part of the code.  Notice that it renders in the browser.
That's just because the bill will be in dollars.)

Let's set up some causes to see that number change.



## Hooking up the `bill` input

We'll need that bill amount to do something too.  Relatively straightforward,
though it won't be *immediately* visible.

First, let's add a method to the control, so that there's a function label we
can give to the form element in a closure.  That method will read the current
value of the `<input>` every time it changes, then parse that as a float, then
assign that to the `bill` value in the `Flocks Context`.  (We'll also
temporarily assign it to the `total` just so that we can see the value being
set, but that'll get promptly removed because it's not correct.)

Given that `TipCalcPanel` used to look like

```javascript
var TipCalcPanel = flocks.createClass({

  render: function() {
    ... whatever ...
  }

});
```

Let's now add a method:

```javascript
var TipCalcPanel = flocks.createClass({

  update: function() {
    var NewBill = parseFloat(document.getElementById('billAmount').value);
    this.fset('bill', NewBill);
    this.fset('total', NewBill); // TEMPORARY AND WRONG
  },

  render: function() {
    ... whatever ...
  }

});
```

We'll also need to modify the line with the actual `<input>` in the `render`
method to call that updater when there's a change.  To do that, we write the
following:

```javascript
Bill amount: $<input id="billAmount" onChange={this.update}/>
```

> ⛺ Source checkpoint: [Working bill update; intentionally wrong total update](https://github.com/StoneCypher/flocks-tipcalc/commit/f79ea4e7b3dc64314340a5e83a08b20af0c248b5)

The value in `{ }` curly braces will evaluate at *creation time* to be the
member of the component `this.update`.  So, when the input changes, that
function will get called.  Try it; you'll see the `total` display change
(incorrectly, because the tip isn't yet added.)



## Setting the `total` correctly

So let's stop whining about the `total` being wrong, and make it right instead.
To do that, we need to hook up a way to set it with a given percentage, and we
also need to hook up the tipping happiness buttons.

First let's add a method to the control which gives us a nicely formatted number
with two mantissa digits:

```javascript
fmt: function(Tip) {
  return ((this.fctx.bill || 0) * Tip).toFixed(2);
},
```

This will take the current bill from the `Flocks Context`; if bill is something
that evaluates to falsey, then it'll common sense substitute zero; then it'll
multiply that by the number given as the tip, and return the number formatted to
two mantissa digits, which you want for US money.

Next, let's add a handler for the button clicks.  Because we need to pass a
value in, which means we have to make a call, what'll be on the button is the
result of the function, and since that also has to be a function, we'll *return*
a function from this handler (making it actually a handler generator.)

```javascript
  setTotal: function(Becomes) {
    var fset = this.fset,
        fmt  = this.fmt;
    return function() { fset('total', fmt(Becomes)); };
  },
```

The reason we assign the two methods to variables then call the variable is that
`this` will be replaced by the time those functions are called, with the event,
so this gives us a way to still get at those methods, by passing the variables
in through the downwards closure.

Then we need to use the handler generator on the buttons.  What was

```html
<input type="button" value={"25%"}/>
<input type="button" value={"20%"}/>
<input type="button" value={"15%"}/>
```

shall now be

```html
<input type="button" value={"25%"} onClick={this.setTotal(1.25)}/>
<input type="button" value={"20%"} onClick={this.setTotal(1.20)}/>
<input type="button" value={"15%"} onClick={this.setTotal(1.15)}/>
```

We can also now fix the fake total update.  What was

```javascript
this.fset('total', NewBill); // TEMPORARY AND WRONG
```

shall now be

```javascript
this.fset('total', '');
```

Because when the bill changes, the total should be cleared prior to a new tip
being chosen.

> ⛺ Source checkpoint: [Basic functional app](https://github.com/StoneCypher/flocks-tipcalc/commit/10eb7abe8bf5eefed7d58eb82829b24a98b9f664)

This gives us a basic functional app.  However let's make it look better.



## Time for some appearance work!

Let's paint the shed a bit.



### Buttons, panel centering, and panel width

First, let's fix the width of that panel at 30em, and center it; then let's make
those buttons larger, so that they'll be sensible on phones.  Also, a gap above
the buttons after the first will help with Fitts' Law.

```css
#panel {
  width      : 30em;
  margin     : 0 auto;
  text-align : left;
}

#howHappy {
  margin : 4em 0;
  width  : 30em;
}

#howHappy input {
  font-size        : 300%;
  width            : 100%;
  background-color : #f0f0f0;
  border           : thin solid gray;
}

#howHappy input+input {
  margin-top : 0.5em;
}
```

> ⛺ Source checkpoint: [buttons decently styled](https://github.com/StoneCypher/flocks-tipcalc/commit/771cd12f43ae63c7c0726ed9eeda1a8c4995ce53)



### Amount row

Next let's increase the size of the text on the amount row, style the input to
look a bit better, and get the label to make room.

```css
#amt {
  font-size: 300%;
}

#amt input {
  font-size           : 100%;
  width               : 4em;
  border              : 0 solid gray;
  border-bottom-width : thin;
  padding-left        : 0.2em;
}

label {
  display : block;
}
```

> ⛺ Source checkpoint: [Amount row styled](https://github.com/StoneCypher/flocks-tipcalc/commit/848005e7b36cc5de44284f800ad0521cbf8827c7)



### Live tips and emoji

Let's make the buttons show the tip amount before you press them; it makes the
user feel more in power in real time.  Let's also put emoji on the buttons to
remind people in-line what they're supposed to do based on their satisfaction.

Both quite straightforward.  To add the live calculation means switching the
strings to a bit of inline javascript, then using the `.fmt` method we already
made.  So,

```html
<input type="button" value="25%" onClick={this.setTotal(1.25)}/>
<input type="button" value="20%" onClick={this.setTotal(1.20)}/>
<input type="button" value="15%" onClick={this.setTotal(1.15)}/>
```

becomes

```html
<input type="button" value={"25% = $" + this.fmt(0.25)} onClick={this.setTotal(1.25)}/>
<input type="button" value={"20% = $" + this.fmt(0.20)} onClick={this.setTotal(1.20)}/>
<input type="button" value={"15% = $" + this.fmt(0.15)} onClick={this.setTotal(1.15)}/>
```

Then stuffing in emoji is simple, because it's just unicode.

```html
<input type="button" value={"😁 25% = $" + this.fmt(0.25)} onClick={this.setTotal(1.25)}/>
<input type="button" value={"😑 20% = $" + this.fmt(0.20)} onClick={this.setTotal(1.20)}/>
<input type="button" value={"😦 15% = $" + this.fmt(0.15)} onClick={this.setTotal(1.15)}/>
```

> ⛺ Source checkpoint: [Live values and emoji](https://github.com/StoneCypher/flocks-tipcalc/commit/ad05d582f821024ec1f8e9fc5526d62c61a31ea4)



### Formatting the footer; focus colors

Let's finally format the footer to look nice, and put focus colors on the
buttons, to make it more obvious when they're active.

The footer is easy: bigger text, centered, bolded; done.

```css
#result {
  font-size   : 300%;
  font-weight : bold;
  text-align  : center;
}
```

Then focus colors are also easy: just set background colors, controlling which
input you get with the successor selector, and overriding the previous by
specificity:

```css
#howHappy input:focus             { background-color: #e0ffe0; }
#howHappy input+input:focus       { background-color: #ffffe0; }
#howHappy input+input+input:focus { background-color: #ffe0e0; }
```

> ⛺ Source checkpoint: [footer styling; button focus colors](https://github.com/StoneCypher/flocks-tipcalc/commit/5272591fcb47107c1b35e8c41252bd33b951c8c4)



# We're done!

By now, varying on your platform (mostly over fonts and emoji,) you should have
something that looks roughly like this:

![](TipCalc.png)



## Source

You can pick up the complete code at
[the Flocks TipCalc repository](https://github.com/StoneCypher/flocks-tipcalc/).

Next, let's look at some deeper examples. 😁