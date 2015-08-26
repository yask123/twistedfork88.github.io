
import React from 'react';
import RippleMixin from '../../mixins/RippleMixin';

var FlatButton = React.createClass({
  propTypes: {
    disabled: React.PropTypes.bool,
    clickHandler: React.PropTypes.func
  },
  mixins: [ RippleMixin ],
  getInitialState: function() {
    return {
      disabled: this.props.disabled || false,
      _className: "flatbutton " + (this.props.type || "")
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
    return (
      <div className={ this.state._className } onClick={this.onClick}>{ this.props.children }</div>
    );
  }
});

module.exports = FlatButton;
