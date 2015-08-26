
module.exports = {
  hideOnDocumentClick: function(ctx, elem, cb) {
    window.document.addEventListener('mouseup', (evt) => {
      if((elem != evt.target) && !ctx.hasChild(elem, evt.target)) {
        if(cb && typeof cb === 'function') {
          cb();
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
