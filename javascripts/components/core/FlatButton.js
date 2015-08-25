
import React from 'react';

var FlatButton = React.createClass({
  propTypes: {
    disabled: React.PropTypes.bool,
    clickHandler: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      disabled: this.props.disabled || false,
      _className: "flatbutton " + (this.props.type || "")
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
      .on('animationend webkitAnimationEnd', function(evt){
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

  },
  render: function() {
    return (
      <div className={ this.state._className } onClick={this.onClick}>{ this.props.children }</div>
    );
  }
});

module.exports = FlatButton;
