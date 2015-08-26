
import React from 'react';
import { getReactDOMNode } from '../../utils/FKUtils';

var Checkbox = React.createClass({
  propTypes: {
    checked: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    onChange: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      disabled: this.props.disabled || false,
      checked: this.props.checked || false
    }
  },
  toggle: function() {

    if(this.state.disabled) {
      return;
    }

    this._ripple.classList.add('checked');
    this.setState({
      checked: !this.state.checked
    }, () => {
      if(this.props.onChange && typeof this.props.onChange === "function") {
        this.props.onChange.call(null, this.getValue());
      }
    });

    /** remove the checked class for ripple once animation ends */
    this._ripple.addEventListener('animationend', (evt) => {
      evt.target.classList.remove('checked');
    });
    this._ripple.addEventListener('webkitAnimationEnd', (evt) => {
      evt.target.classList.remove('checked');
    });
    this._ripple.addEventListener('mozAnimationEnd', (evt) => {
      evt.target.classList.remove('checked');
    });
  },
  setValue: function(value) {
    if(typeof value === "boolean") {
      this.setState({
        checked: value
      });
    }
    else {
      this.setState({
        checked: Boolean(value)
      });
    }
  },
  getValue: function() {
    return this.state.checked;
  },
  componentDidMount: function() {
    this._dom = getReactDOMNode(this);
    this._ripple = this._dom.querySelector('.ripple');
  },
  render: function() {
    let _boxClass = (this.state.checked) ? "box checked": "box";
    return (
      <div className='checkbox' onClick={ this.toggle }>
        <div>
          <div className='check'>
            <p className={ _boxClass }></p>
            <p ref="ripple" className='ripple'></p>
          </div>
        </div>
        <div><label>{ this.props.label || "" }</label></div>
      </div>
    )
  }
});

module.exports = Checkbox;
