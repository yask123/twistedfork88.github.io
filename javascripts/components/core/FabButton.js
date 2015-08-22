
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

    $(document).on('themechange', (evt) => {
      this.setState({
        _className: "fabbutton " + evt.theme
      });
    });
  },
  render: function() {
    if(this.props.tooltip) {
      return (
        <div
          className={ this.state._className }
          onClick={this.onClick}
          data-toggle="tooltip"
          data-placement={ this.props.placement }
          title={ this.props.tooltip }
          >
          { this.props.children }
        </div>
      )
    }
    else {
      return (
        <div className={ this.state._className } onClick={this.onClick}>{ this.props.children }</div>
      );
    }
  }
});

module.exports = FabButton;
