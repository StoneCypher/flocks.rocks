
/** @jsx React.DOM */
/* jshint node: true, browser: true */



var BarGraph = flocks.createClass({

  render: function() {

    var colCount = (this.props.data || []).length,
        colWidth = ((101 - colCount) / colCount).toFixed(5) + '%',

        style = {

          lineHeight  : '100%',

          margin      : this.props.margin    || '0',
          padding     : this.props.padding   || '0',
          width       : this.props.width     || '300px',
          height      : this.props.height    || '200px',
/*
          hgap        : this.props.gap       || '3px',
          vgap        : this.props.gap       || '2px',
*/
          border      : this.props.axisStyle || 'solid',
          borderWidth : this.props.axisWidth || '0 0 thin thin',
          borderColor : this.props.axisColor || 'black'

        },

        barStyle = {
          width           : colWidth,
          textAlign       : 'center',
          verticalAlign   : 'bottom',
          display         : 'inline-block',
          fontFamily      : this.props.fontFamily || 'sans-serif',
          fontSize        : this.props.fontSize   || '70%',
          color           : this.props.color      || 'white',
          margin          : this.props.margin     || '0',
          padding         : this.props.padding    || '0',
          backgroundColor : this.props.barColor   || '#24a9e1'
        };

/*
      .b1   { height: 33pt; }
      .b2   { height: 37pt; }
      .b3   { height: 14pt; }
      .b4   { height: 28pt; }
      .b5   { height: 17pt; }

      .bar + .bar { margin: 0 0 0 1.5pt; }
*/

    return (

      <div style={style}>
        <div style={barStyle}>123</div>
        <div style={barStyle}>123</div>
        <div style={barStyle}>123</div>
        <div style={barStyle}>123</div>
        <div style={barStyle}>123</div>
      </div>

    );

  }

});
