
import React from 'react/addons';
import Utils from '../../utils/FKUtils';
import PaperButton from './PaperButton';
import { getReactDOMNode } from '../../utils/FKUtils';

var MultipleComponent = React.createClass({
  propTypes: {
    disabled: React.PropTypes.bool,
    value: React.PropTypes.array.isRequired,
    component: React.PropTypes.element.isRequired,
    maxItems: React.PropTypes.number,
    tooltip: React.PropTypes.string,
    askConfirmation: React.PropTypes.bool,
    deleteConfirmationMessage: React.PropTypes.string
  },
  getInitialState: function() {

    let _components = [this.props.component];
    if(this.props.value.length > 1) {
      _components = this.props.value.map(function(item) {
        return this.props.component;
      }.bind(this))
    }
    return {
      disabled: this.props.disabled || false,
      maxItems: this.props.maxItems || Number.MAX_SAFE_INTEGER,
      components: _components,
      value: this.props.value,
      askConfirmation: this.props.askConfirmation || false
    }
  },
  refCount: 0,
  add: function(evt) {
    evt.preventDefault();

    let _currVal = this.getValue();

    var _items = this.state.components.slice();
    _items.push(this.props.component);

    this.setState({
      components: _items,
      value: _currVal
    }, () => {
      $(this._dom).find('[data-toggle]').tooltip();
    });
  },
  remove: function(index) {

    if(this.state.disabled) {
      return;
    }

    if(this.state.askConfirmation) {
      let _confirm = window.confirm(this.props.deleteConfirmationMessage || 'Are you sure you want to remove this item?');

      if(!_confirm) {
        return;
      }
    }

    //var _ind = React.findDOMNode(evt.currentTarget).dataset.ind;
    var _items = this.state.components.slice();
    var _value = this.getValue();
    _items.splice(index, 1);
    _value.splice(index, 1);

    let _deletedItem = this.props.value.slice().splice(index, 1);
    if(_deletedItem) {
      _deletedItem = _deletedItem[0];
    }

    this.setState({
      components: _items,
      value: _value
    }, (deletedItem) => {

      $(this._dom).find('[data-toggle]').tooltip();
      if(this.props.onRemove && typeof this.props.onRemove === "function") {
        this.props.onRemove.call(null, deletedItem);
      }

    }.bind(this, _deletedItem));

  },
  getValue: function() {
    let _val = [];
    for(let _ref in this.refs) {
      if(this.refs[_ref]) {
        let _refVal = this.refs[_ref].getValue();
        if(!Utils.isEmpty(_refVal)) {
          _val.push(_refVal)
        }
      }
    };
    return _val;
  },
  componentDidMount: function() {
    this._dom = getReactDOMNode(this);
    $(this._dom).find('[data-toggle]').tooltip();
  },
  render: function() {
    this.refCount = 0;
    var _items = this.state.components.map(function(item, ind) {
      let _eachItem = "";
      if(this.state.value && this.state.value.length) {
        _eachItem = React.addons.cloneWithProps(item, { key: ind, ref: this.refCount++, value: this.state.value[ind], disabled: this.props.disabled });
      }
      else {
        _eachItem = React.addons.cloneWithProps(item, { key: ind, ref: this.refCount++, disabled: this.props.disabled });
      }
      let _key = Utils.generateRandomString(64, "#A!");
      return <div key={ _key } style={ { marginBottom: '0.5rem' } }>
                <table width='100%'>
                  <tr>
                    <td>
                      { _eachItem }
                    </td>
                    <td width='40px' style={{textAlign:'right', paddingLeft:'0.4rem'}}>
                      <span
                        data-ind={ ind }
                        data-toggle='tooltip'
                        data-placement='bottom'
                        title={ (this.props.tooltip)? ("remove "+this.props.tooltip) : "" }
                        onClick={ this.remove.bind(this, ind) }
                        style={{ display: (this.state.disabled) ? 'none':'block' }}
                      >
                        <i className="material-icons" style={{fontSize:'1.5rem'}}>cancel</i>
                      </span>
                    </td>
                  </tr>
                </table>
              </div>;
    }.bind(this));

    let _addLink = <a href="#" data-toggle='tooltip' data-placement='bottom' title={ (this.props.tooltip)? ("add "+this.props.tooltip) : "" } className="navbar-link" onClick={ this.add }>add</a>;
    if(this.state.disabled || this.state.components.length > this.state.maxItems) {
      _addLink = "";
    }

    return (
      <div>
        { _items }
        <div style={ { paddingTop:'0.5rem' } }>
          { _addLink }
        </div>
      </div>
    )
  }
});

module.exports = MultipleComponent;
