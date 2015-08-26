
import _jQ from 'jquery';

var RippleMixin = {
  createRipple: function(evt, container) {
    var posX = _jQ(container).offset().left;
		var posY = _jQ(container).offset().top;

		var parHeight = _jQ(evt.target).parent().height()/2;
		var parWidth = _jQ(evt.target).parent().width()/2;
		var d = Math.max(parHeight, parWidth);

		if(_jQ(container).find('.ink').length){
		  _jQ(container).find('.ink').remove();
		}

		var ink = document.createElement('div');
    _jQ(ink).attr('class', 'ink');
		_jQ(container).append(_jQ(ink));

		var inkElem = _jQ(container).find('.ink')[0];
		_jQ(inkElem).removeClass('animate');

		_jQ(inkElem)
		  .css({
		    'top': (evt.pageY - posY)+'px',
		    'left': (evt.pageX - posX)+'px',
		    'width': '10px',
		    'height': '10px'
		});

    /** remove the ink element after animation ends. */
		_jQ(inkElem)
      .on('animationend webkitAnimationEnd mozAnimationEnd', function(evt){
        _jQ(evt.target).remove();
      })
      .addClass('animate');

  }
}

module.exports = RippleMixin;
