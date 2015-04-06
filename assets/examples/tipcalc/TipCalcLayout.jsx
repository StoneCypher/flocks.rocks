
var TipCalcLayout = flocks.createClass({

  render: function() {

    return (
      <table id="layout">
        <tr>
          <td>{this.props.children}</td>
        </tr>
      </table>
    );

  }

});
