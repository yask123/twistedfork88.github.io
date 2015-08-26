
import React from 'react';
import Utils from '../../utils/FKUtils';

var PaperTextArea = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    charLimit: React.PropTypes.number,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      value: this.truncateValue(this.props.value) || "",
      length: (this.props.value) ? this.props.value.length : 0,
      disabled: this.props.disabled || false
    }
  },
  truncateValue: function(value) {
    if(!value) {
      return "";
    }
    if(this.props.charLimit && this.props.charLimit > 0) {
      value = value.substr(0, this.props.charLimit);
    }
    return value;
  },
  componentDidMount: function() {
    this._dom = Utils.getReactDOMNode(this);
    this._txtArea = this._dom.querySelector('textarea');
    this.value = this.props.value || "";

    if(this.state.value) {
      this._txtArea.focus();
      this.processKeyUp(this._txtArea);
    }

    if(this.props.charLimit) {
      this._charcounter = Utils.getReactDOMNodeForRef(this.refs['charcounter']);
    }

    this._txtArea.blur();

    if(this.props.disabled) {
      this._txtArea.setAttribute('disabled', 'true');
    }

  },
  focus: function(evt) {

    if(!this.state.disabled || (this.state.disabled && this.state.value)) {
      evt.target
        .parentNode
        .querySelector('.fakePlaceholder')
        .classList.add('fakeAnimate');
    }

    if(!this.state.disabled) {
      evt.target
        .parentNode
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
    }
    if(!this.state.disabled) {
      if(this.props.onBlur && typeof this.props.onBlur === "function") {
        this.props.onBlur.call(null, this.getValue());
      }
    }
  },
  keyUp: function(evt) {
    this.processKeyUp(evt.target);
  },
  processKeyUp: function(target) {
    target.style.height = 'auto';
    target.style.height = target.scrollHeight+20+'px';
  },
  handleChange: function(evt) {
    if(this.state.disabled) {
      return;
    }
    if(this.props.charLimit && evt.target.value.length > this.props.charLimit) {
      this._charcounter.classList.add('invalid');
      return;
    }
    else {
      if(this._charcounter) {
        this._charcounter.classList.remove('invalid');
      }
      this.setState({
        value: evt.target.value,
        length: evt.target.value.length,
        disabled: false
      }, () => {
        if(this.props.onChange && typeof this.props.onChange === "function") {
          this.props.onChange.call(null, this.getValue());
        }
      });
    }
  },
  getValue: function() {
    return this.state.value || "";
  },
  setValue: function(value) {
    value = this.truncateValue(value);
    this.setState({
      value: value
    });
  },
  render: function() {
    let _charcounter = "", _value,
    _fakePlaceholderClass = (this.state.disabled) ? 'fakePlaceholder disabled': 'fakePlaceholder';
    if(this.props.charLimit && this.props.charLimit > 0) {
      _charcounter = <span className='charcounter' ref="charcounter">{ this.state.length } / { this.props.charLimit }</span>;
    }
    return (
      <div>
        <div className='paperinput'>
          <textarea
            type={ this.props.type || 'text' }
            value={ this.state.value || "" }
            onFocus={ this.focus }
            onBlur={ this.blur }
            onChange={ this.handleChange }
            onKeyUp={ this.keyUp }
          />
          <label className={ _fakePlaceholderClass }>
            { this.props.placeholder || "write something here" }
          </label>
          <span className='belowborder'></span>
          <span className='highlight'></span>
        </div>
        { _charcounter }
      </div>
    );
  }
});

module.exports = PaperTextArea;
