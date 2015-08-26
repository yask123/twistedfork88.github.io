
import _jQ from 'jquery';

module.exports = {
  _attachRipple: function(centerElem) {

    _jQ(centerElem)
      .append("<div class='touchripple'></div>")
      .bind('click', (e) => {
        _jQ(centerElem)
          .find('.touchripple')
          .addClass('animate');
      });

      _jQ(centerElem).find('.touchripple').on('animationend webkitAnimationEnd', () => {
        _jQ(centerElem).find('.touchripple').removeClass('animate');
      });

  }
}
