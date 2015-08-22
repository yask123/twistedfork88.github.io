
var RippleMixin = {
  createRipple: function(evt, container) {
    var posX = $(container).offset().left;
		var posY = $(container).offset().top;

		var parHeight = $(evt.target).parent().height()/2;
		var parWidth = $(evt.target).parent().width()/2;
		var d = Math.max(parHeight, parWidth);

		if($(container).find('.ink').length){
		  $(container).find('.ink').remove();
		}

		var ink = document.createElement('div');
    $(ink).attr('class', 'ink');
		$(container).append($(ink));

		var inkElem = $(container).find('.ink')[0];
		$(inkElem).removeClass('animate');

		$(inkElem)
		  .css({
		    'top': (evt.pageY - posY)+'px',
		    'left': (evt.pageX - posX)+'px',
		    'width': '10px',
		    'height': '10px'
		});

    /** remove the ink element after animation ends. */
		$(inkElem)
      .on('animationend webkitAnimationEnd mozAnimationEnd', function(evt){
        $(evt.target).remove();
      })
      .addClass('animate');

  }
}

module.exports = RippleMixin;
