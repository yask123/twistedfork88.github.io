
import React from 'react';
import PaperInput from '../core/PaperInput';
import PaperButton from '../core/PaperButton';
import FabButton from '../core/FabButton';
import DropDownMenu from '../core/DropDownMenu';
import MultipleComponent from '../core/MultipleComponent';
import GenericKeyValue from '../core/GenericKeyValue';

var KeyValueComponent = React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired
  },
  getValue: function() {
    let _out = {};
    for(let key in this.props.value) {
      _out[key] = this.refs[key].getValue();
    }
    return _out;
  },
  render: function() {

    let _json = this.props.value, _columns = [];
    for(let key in _json) {
      _columns.push(<td><h5>{ key }</h5>{ React.addons.cloneWithProps(<PaperInput placeholder={ key } value={ _json[key] } />, { ref: key }) }</td>);
    }

    return (
      <div>
        <table width='100%'>
          <tr>
            { _columns }
          </tr>
        </table>
      </div>
    )
  }
});

module.exports = KeyValueComponent;
