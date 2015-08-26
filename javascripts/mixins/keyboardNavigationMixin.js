
import React from 'react';
import _jQ from 'jquery';

/** Keyboard Navigation mixin for menu items and AutoComplete. Currently
  * it works for Menus only for keys UP_ARROW, DOWN_ARROW and ENTER.
  * Need to enhance to include switch and radio elements as well. Preferably
  * would use something like:
  *
  * The _bindKeyboardNav method would receive an object with structure:
  * {
  *   keyCode: callback
  * }
  *
  * The corresponding callbacks are executed for the keyCodes found for
  * the 'keydown' event.
  */

module.exports = {
  _bindKeyboardNav: function(ctx, list) {
    ctx.selectedIndex = 0;
    ctx.listElem = list;

    let _childrenLength = _jQ(list).children().length;

    _jQ(ctx.listElem).find('li').removeClass('selected');

    _jQ(React.findDOMNode(ctx)).bind('keydown', (ctx, e) => {

      e.preventDefault();

      switch(e.keyCode) {
        case 38:
          //up arrow
          ctx.selectedIndex = (ctx.selectedIndex > 1)? (ctx.selectedIndex - 1): 1;
          break;

        case 40:
          //down arrow
          ctx.selectedIndex = (ctx.selectedIndex < _childrenLength) ? (ctx.selectedIndex +1): _childrenLength;
          break;

        case 13:
          //enter key
          break;
      }

      _jQ(ctx.listElem).find('li').removeClass('selected');

      if(e.keyCode !== 13) {
        _jQ(ctx.listElem).find('li:nth-child('+(ctx.selectedIndex)+')').addClass('selected');
      }
      else {
        _jQ(ctx.listElem).find('li:nth-child('+(ctx.selectedIndex)+')').trigger('click');
      }

    }.bind(this, ctx));


  },
  _unbindKeyboardNav: function(ctx) {
    _jQ(React.findDOMNode(ctx)).unbind('keydown');
  }
}
