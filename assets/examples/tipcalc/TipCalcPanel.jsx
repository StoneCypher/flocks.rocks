
var TipCalcPanel = flocks.createClass({

  fmt: function(Tip) {
    return ((this.fctx.bill || 0) * Tip).toFixed(2);
  },

  setTotal: function(Becomes) {
    var fset = this.fset,
        fmt  = this.fmt;
    return function() { fset('total', fmt(Becomes)); };
  },

  update: function() {
    var NewBill = parseFloat(document.getElementById('billAmount').value);
    this.fset('bill', NewBill);
    this.fset('total', '');
  },

  render: function() {

    return (

      <div id="panel">

        <label id="amt" htmlFor="billAmount">
          Bill amount: $<input id="billAmount" onChange={this.update}/>
        </label>

        <div id="howHappy">
          <input type="button" value={"😁 25% = $" + this.fmt(0.25)} onClick={this.setTotal(1.25)}/>
          <input type="button" value={"😑 20% = $" + this.fmt(0.20)} onClick={this.setTotal(1.20)}/>
          <input type="button" value={"😦 15% = $" + this.fmt(0.15)} onClick={this.setTotal(1.15)}/>
        </div>

        <div id="result">
          Total: ${this.fctx.total}
        </div>

      </div>

    );

  }

});
