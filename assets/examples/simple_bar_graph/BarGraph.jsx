
/** @jsx React.DOM */
/* jshint node: true, browser: true */



var BarGraph = flocks.createClass({

  render: function() {

    var style = {

      width       : this.props.width      || '300px',
      height      : this.props.height     || '200px',
      hgap        : this.props.gap        || '3px',
      vgap        : this.props.gap        || '2px',
      border      : this.props.axis_style || 'solid',
      borderWidth : this.props.axis_width || '0 0 thin thin',
      borderColor : this.props.axis_color || 'black',

    };

    var barStyle = {
      backgroundColor : this.props.bar_color  || '#24a9e1'
    };

    return (

      <div style={style}>
        <div style={barStyle}>123</div>
      </div>

    );

  }

});
