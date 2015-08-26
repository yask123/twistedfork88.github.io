
import React from 'react';
import touchRippleMixin from '../../mixins/TouchRipple';
import { getReactDOMNode } from '../../utils/FKUtils';


var Switch = React.createClass({
  propTypes: {
    checked: React.PropTypes.bool,
    onValueChange: React.PropTypes.func
  },
  mixins: [ touchRippleMixin ],
  getInitialState: function() {
    return {
      checked: this.props.checked || false
    }
  },
  toggle: function() {
    this.setState({
      checked: !this.state.checked
    }, () => {
      if(this.props.onValueChange && typeof this.props.onValueChange === "function") {
        this.props.onValueChange.call(null, this.getValue());
      }
    });
  },
  getValue: function() {
    return this.state.checked;
  },
  setValue: function(value) {
    let _v;
    if(typeof value === "boolean") {
      _v = value;
    }
    else {
      _v = Boolean(value);
    }
    this.setState({
      checked: value
    });
  },
  componentDidMount: function() {
    this._dom = getReactDOMNode(this);
    this._ball = this._dom.querySelector('.ball');

    this._attachRipple(this._ball);
  },
  render: function() {
    let _class = (this.state.checked) ? " checked": "";
    return (
      <div className={ 'switch ' + (this.props.type || "") +_class }>
        <div className={ "ball " + (this.props.type || "") + _class } onClick={ this.toggle }></div>
      </div>
    )
  }
});

module.exports = Switch;
