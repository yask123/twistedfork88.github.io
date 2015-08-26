
import React from 'react';
import RippleMixin from '../../mixins/RippleMixin';
import { getReactDOMNode } from '../../utils/FKUtils';

var FabButton = React.createClass({
  mixins:[RippleMixin],
  propTypes: {
    disabled: React.PropTypes.bool,
    clickHandler: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      disabled: this.props.disabled || false,
      _className: "fabbutton " + (this.props.type || "")
    }
  },
  onClick: function(evt) {

    if(this.state.disabled) {
      return;
    }

    //do the ink stuff
    this.createRipple(evt, evt.currentTarget);

    if(this.props.clickHandler) {
      setTimeout(() => {
        this.props.clickHandler.call(null, this.props);
      }, 250);
    }
  },
  componentDidMount: function() {
    this._dom = getReactDOMNode(this);
    $('[data-toggle]').tooltip();

  },
  render: function() {
    if(this.props.tooltip) {
      if(!this.state.disabled) {
        return (
          <div
            className={ this.state._className }
            onClick={this.onClick}
            data-toggle="tooltip"
            data-placement={ this.props.placement }
            data-original-title={ this.props.tooltip }
            >
            { this.props.children }
          </div>
        );
      }
      else {
        return <button className='fabbutton disabled'>{ this.props.children }</button>;
      }
    }
    else {
      if(!this.state.disabled) {
        return (
          <div className={ this.state._className } onClick={this.onClick}>{ this.props.children }</div>
        );
      }
      else {
        return <button className='fabbutton disabled'>{ this.props.children }</button>;
      }
    }
  }
});

module.exports = FabButton;
