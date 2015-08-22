import React from 'react';
import PaperInput from '../core/PaperInput';
import PaperTextArea from '../core/PaperTextArea';

var GenericKeyValue = React.createClass({
  getDefaultProps: function() {
    return {
      value: {}
    }
  },
  render: function() {
    let _val = (this.props.valueType === "textarea") ?
                  <PaperTextArea disabled={this.props.disabled || false} placeholder="value" ref="i1" value={ this.props.value.value || "" } /> :
                  <PaperInput disabled={this.props.disabled || false} placeholder="value" ref='i1' value={ this.props.value.value || "" } />;
    return (
      <div>
        <div className='row'>
          <div className='col-md-3'>
            <PaperInput disabled={this.props.disabled || false} placeholder="key" ref='i0' value={ this.props.value.key || "" } />
          </div>
          <div className='col-md-9'>
            { _val }
          </div>
        </div>
      </div>
    )
  },
  getValue: function() {
    let _out = {
      "key": "",
      "value": ""
    };
    if(this.refs['i0'].getValue() && this.refs['i1'].getValue()) {
      _out['key'] = this.refs['i0'].getValue();
      _out['value'] = this.refs['i1'].getValue();
    }
    return _out;
  }
});

module.exports = GenericKeyValue;
