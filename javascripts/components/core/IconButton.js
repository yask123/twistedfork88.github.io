
import React from 'react';
import { getReactDOMNode } from '../../utils/FKUtils';
import RippleMixin from '../../mixins/RippleMixin';

var IconButton = React.createClass({
  mixins: [ RippleMixin ],
  propTypes: {
    clickHandler: React.PropTypes.func
  },
  onClick: function(evt) {
    //do the ink stuff
    this.createRipple(evt, evt.currentTarget);

    if(this.props.clickHandler) {
      setTimeout(function() {
        this.props.clickHandler.call(null, this.props);
      }.bind(this), 250);
    }
  },
  addEventListener: function(event, cb) {
    //$(this._dom).on(event, cb);
  },
  componentDidMount: function() {
    this._dom = getReactDOMNode(this);
  },
  render: function() {
    let _className = "iconbutton " + (this.props.type || "");

    if(this.props.tooltip) {
      return (
        <div
          className={ _className }
          onClick={this.onClick}
          >
          { this.props.children }
        </div>
      )
    }
    else {
      return (
        <div className={ _className } onClick={this.onClick}>{ this.props.children }</div>
      );
    }
  }
});

module.exports = IconButton;
