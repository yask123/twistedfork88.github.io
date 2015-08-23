

import React from 'react';
import { generateRandomString } from '../../utils/FKUtils';

var PaperButton = React.createClass({
  propTypes: {
    disabled: React.PropTypes.bool,
    clickHandler: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      disabled: this.props.disabled || false,
      _className: "paperbutton " + (this.props.type || "")
    }
  },
  createRipple: function(evt) {
    var posX = $(evt.currentTarget).offset().left;
		var posY = $(evt.currentTarget).offset().top;

		var parHeight = $(evt.currentTarget).height()/2;
		var parWidth = $(evt.currentTarget).width()/2;
		var d = Math.max(parHeight, parWidth);

		if($(evt.currentTarget).find('.ink').length){
		  $(evt.currentTarget).find('.ink').remove();
		}

		var ink = document.createElement('div');
     	$(ink).attr('class', 'ink');
		$(evt.currentTarget).append($(ink));

		var inkElem =$(evt.currentTarget).find('.ink')[0];
		$(inkElem).removeClass('animate');

		$(inkElem)
		  .css({
		    'top': (evt.pageY - posY - d/2)+'px',
		    'left': (evt.pageX - posX - d/2)+'px',
		    'width': d,
		    'height': d
		});

    /** remove the ink element after animation ends. */
		$(inkElem)
      .on('animationend webkitAnimationEnd mozAnimationEnd', function(evt){
        $(evt.target).remove();
      })
      .addClass('animate');

  },
  onClick: function(evt) {

    if(this.state.disabled){
      return;
    }

    //do the ink stuff
    this.createRipple(evt);

    if(this.props.clickHandler) {
      setTimeout(function() {
        this.props.clickHandler.call(null, this.props);
      }.bind(this), 250);
    }
  },
  componentDidMount: function() {
    $(document).on('themechange', function(evt) {
      this.setState({
        _className: "paperbutton " + evt.theme
      });
    }.bind(this));
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

    return (
      <div style={_style} className={ this.state._className } onClick={this.onClick}>{ _content }</div>
    );
  }
});

module.exports = PaperButton;
