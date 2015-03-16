
/** @jsx React.DOM */
/* jshint node: true, browser: true */



// the game of life renderable grid

var LifeGrid = flocks.createClass({





  componentDidMount: function() {
    this.rAF();
  },





  nextGrid: function(oldGrid) {

    var newGrid = {
      width   : oldGrid.width,
      height  : oldGrid.height,
      wrap    : oldGrid.wrap,
      rule    : oldGrid.rule,
      rulemap : oldGrid.rulemap
    };

    var XL, XR,
        YU, YD,
        Sum;

    var countNeighborsWithWrap = function(GridSource, X, Y, W, H) {
      // assumes cell contents are 0 or 1
      XL = ((X===0)    ? W-1 : X-1);
      XR = ((X===(W-1))?  0  : X+1);
      YU = ((Y===0)    ? H-1 : Y-1);
      YD = ((Y===(H-1))?  0  : Y+1);

      return GridSource[YU][XL] + GridSource[YU][X] + GridSource[YU][XR] +
             GridSource[Y][XL]           +            GridSource[Y][XR]  +
             GridSource[YD][XL] + GridSource[YD][X] + GridSource[YD][XR];
    };

    var outcome = function(GridSource, X, Y, W, H, RuleMap) {
      var count = countNeighborsWithWrap(GridSource, X, Y, W, H);
      return GridSource[Y][X]? RuleMap.survive[count] : RuleMap.born[count];
    };

    var newData = new Array(oldGrid.height);
    for (var i=0, iC = oldGrid.height; i<iC; ++i) {
      newData[i] = new Array(oldGrid.width);
      for (var j=0, jC = oldGrid.width; j<jC; ++j) {
        newData[i][j] = outcome(oldGrid.data, j, i, jC, iC, oldGrid.rulemap);
      }
    }

    newGrid.data = newData;

    return newGrid;

  },





  nextGen: function() {
    this.flock();

    this.fset('generation', (this.fctx.generation || 0) + 1);
    this.fset('grid',       this.nextGrid(this.fctx.grid));

    this.funlock();
  },





  rAFhook: function() {

    if (this.fctx.running) {
      this.nextGen();
    }

    this.rAF();

  },





  rAF: function() {
    window.requestAnimationFrame(this.rAFhook);
  },





  render: function() {

    var grid = this.fctx.grid,
        rows = [],
        row,
        key,
        style;

    for (var j=0; j<grid.height; ++j) {
      row = [];

      for (var i=0; i<grid.width; ++i) {

        (function(ii, jj, fs, gd) { // break aliases // sigh js

          var tog = function() { fs(['grid', 'data', jj, ii], gd? 0 : 1); };
          key = 'td_' + ii.toString() + '_' + jj.toString();
          style = { backgroundColor: gd? 'blue' : 'white' };
          row.push(<td key={key}style={style} onClick={ tog }></td>);

        })(i,j, this.fset, this.fctx.grid.data[j][i]);

      }

      rows.push(<tr key={'tr_'+j.toString()}>{row}</tr>);
    }

    return <table id="grid">{rows}</table>;

  }





});
