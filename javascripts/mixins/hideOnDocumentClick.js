'use strict';

module.exports = {

  //When the component mounts, listen to click events and
  //Call the componentClickAway function.
  _bindClickAway: function(ctx, elem, stateVar, value) {
    $(document).bind('mouseup', (evt) => {
      if(!$(elem).is(evt.target) && !$(elem).has(evt.target).length) {
        if(ctx && ctx.isMounted()) {
          try {
            let _o = {};
            _o[stateVar] = value;
            ctx.setState(_o);
          }
          catch(e) {
            console.error(e);
          }
        }
      }
    });
  }
};
