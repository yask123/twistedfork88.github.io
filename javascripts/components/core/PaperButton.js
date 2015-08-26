

import React from 'react';
import RippleMixin from '../../mixins/RippleMixin';
import { generateRandomString } from '../../utils/FKUtils';

var PaperButton = React.createClass({
  propTypes: {
    disabled: React.PropTypes.bool,
    clickHandler: React.PropTypes.func
  },
  mixins:[RippleMixin],
  getInitialState: function() {
    return {
      disabled: this.props.disabled || false,
      _className: "paperbutton " + (this.props.type || "")
    }
  },
  onClick: function(evt) {

    if(this.state.disabled){
      return;
    }

    //do the ink stuff
    this.createRipple(evt, evt.currentTarget);

    if(this.props.clickHandler) {
      setTimeout(function() {
        this.props.clickHandler.call(null, this.props);
      }.bind(this), 250);
    }
  },
  componentDidMount: function() {

  },
  render: function() {
    let _content = this.props.children, _style={};
    if(this.props.icon) {
      _style = {
        padding: '0.8rem 1rem 0.7rem 1rem'
      }
      _content = []
      _content.push(
        <div key={ generateRandomString(5, 'Aa') }><i className="material-icons">{ this.props.icon }</i></div>,
        <div key={ generateRandomString(5, 'Aa') }>{ this.props.children }</div>
      );
    }

    if(!this.state.disabled) {
      return (
        <div style={_style} className={ this.state._className } onClick={this.onClick}>{ _content }</div>
      );
    }
    else {
      if(!this.props.icon) {
        return <button className='paperbutton disabled' disabled>{ _content }</button>;
      }
      else {
        return <button style={_style} className='paperbutton disabled' disabled>{ _content }</button>;
      }
    }
  }
});

module.exports = PaperButton;
