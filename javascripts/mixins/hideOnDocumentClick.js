
module.exports = {
  hideOnDocumentClick: function(ctx, elem, stateVar, value) {
    window.document.addEventListener('mouseup', (evt) => {
      if((elem != evt.target) && !ctx.hasChild(elem, evt.target)) {
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
  },
  hasChild: function(parent, child) {
    let node = child.parentNode;
    while (node) {
      if (node == parent) {
        return true
      }
      node = node.parentNode;
    }
    return false;
  }
};
