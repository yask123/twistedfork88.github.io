
import React from 'react';
import { getReactDOMNode, isNull, isUndefined, isNaN } from '../../utils/FKUtils';

var PaperInput = React.createClass({
  propTypes: {
    disabled: React.PropTypes.bool,
    value: React.PropTypes.string,
    pattern: React.PropTypes.string,
    changeHandler: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func
  },
  getInitialState: function() {
    let _v = "";
    if(!isNull(this.props.value) && !isUndefined(this.props.value)) {
      _v = this.props.value.toString();
    }
    return {
      disabled: this.props.disabled || false,
      value: _v
    }
  },
  componentDidMount: function() {
    this._dom = getReactDOMNode(this);
    this._input = this._dom.querySelector('input');
    this.value = this.props.value || "";

    //remove pattern attribute if not present
    if(!this.props.pattern) {
      this._input.removeAttribute('pattern');
    }

    if(this.state.value) {
      this._input.focus();
    }

    this._input.blur();

    if(this.props.disabled) {
      this._input.setAttribute('disabled', 'true');
    }

  },
  setValue: function(value) {
    this.setState({
      value: value
    });
    if(value) {
      this._input.focus();
    }
  },
  focus: function(evt) {

    if(!this.state.disabled || (this.state.disabled && this.state.value)) {
      evt.target.parentNode
        .querySelector('.fakePlaceholder')
        .classList.add('fakeAnimate');
    }

    if(!this.state.disabled) {
      evt.target.parentNode
        .querySelector('.belowborder')
        .classList.add('belowborderanimate');

      if(this.props.onFocus && typeof this.props.onFocus === "function") {
        this.props.onFocus.call(null, this.getValue());
      }
    }
  },
  blur: function(evt) {

    evt.target
      .parentNode
      .querySelector('.belowborder')
      .classList.remove('belowborderanimate');

    if(!this.state.value) {
      evt.target
        .parentNode
        .querySelector('.fakePlaceholder')
        .classList.remove('fakeAnimate');

      if(this.props.required) {
        evt.target
          .parentNode
          .querySelector('.belowborder')
          .classList.add('invalid');
      }
    }
    else {
      evt.target
        .parentNode
        .querySelector('.belowborder')
        .classList.remove('invalid');
    }
    if(!this.state.disabled) {
      if(this.props.onBlur && typeof this.props.onBlur === "function") {
        this.props.onBlur.call(null, this.getValue());
      }
    }
  },
  handleChange: function(evt) {
    if(!this.state.disabled) {

      let _v = evt.target.value;
      if(!isNull(_v) && !isUndefined(_v)) {
        _v = _v.toString();
      }

      this.setState({
        value: _v
      }, function(value) {

        if(this.props.changeHandler && typeof this.props.changeHandler === "function") {
          this.props.changeHandler.call(null, value);
        }

      }.bind(this, evt.target.value));
    }
  },
  getValue: function() {

    let _value = 0;
    let valueType = this.props.valueType || "string";

    switch (valueType) {
      case "string":
        _value = this.state.value || "";
        break;

      case "number":
        if(this.state.value === "") {
          _value = "";
        }
        else {
          _value = Number(this.state.value);
          if(isNaN(_value)) {
            _value = "";
          }
        }
        break;

      case "integer":
        _value = parseInt(this.state.value);
        if(isNaN(_value)) {
          _value = "";
        }
        break;

      default:
        _value = this.state.value || "";
        break;
    }

    return _value;
  },
  render: function() {
    let _inpField = <input
      type={ this.props.type || 'text' }
      value={ this.state.value || "" }
      pattern={ this.props.pattern || "" }
      onFocus={ this.focus }
      onBlur={ this.blur }
      onChange={ this.handleChange }
    />;
    if(this.props.required) {
      _inpField = <input
        type={ this.props.type || 'text' }
        pattern={ this.props.pattern || "" }
        value={ this.state.value || "" }
        required
        onFocus={ this.focus }
        onBlur={ this.blur }
        onChange={ this.handleChange }
      />
    }

    let _fakePlaceholderClass = (this.state.disabled) ? 'fakePlaceholder disabled': 'fakePlaceholder',
        _fakePlaceholderIcon = (this.props.icon) ? <span><i className="material-icons" style={{
            float: 'left',
            position: 'absolute',
            left: 0,
            top: 0,
            fontSize: '1.5rem'
        }}>{ this.props.icon }</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> : "";
    return (
      <div className={ 'paperinput'+' '+((this.props.icon) ? 'icon '+this.props.icon : "")  }>
        { _inpField }
        <label className={ _fakePlaceholderClass }>
          { this.props.placeholder || "write something here" }
        </label>
        <span className='belowborder'></span>
        <span className='highlight'></span>
      </div>
    );
  }
});

module.exports = PaperInput;
