
import React from 'react';
import PaperInput from './PaperInput';
import DropDownMenu from './DropDownMenu';
import { generateRandomString } from '../../utils/FKUtils';

var TableControl = React.createClass({
  getInitialState: function() {
    return {
      rows: this.props.rows || [],
      activeRows: this.props.rows || [],
      _className: "",
      maxRowsToShow: 5,
      currentPaginateIndex: 0
    }
  },
  componentDidMount: function() {
    this._dom = React.findDOMNode(this);
    $(this._dom).find("tr").each(function(row) {
      $(row).addClass('show');
    });
  },
  updatePaginateIndex: function(value) {
    this.setState({
      currentPaginateIndex: this.state.currentPaginateIndex+value
    });
  },
  getPrimitiveValueFromReactElement: function(component) {
    if(typeof component.props.children === "string" || typeof component.props.children === "number") {
      return component.props.children;
    }
    this.getPrimitiveValueFromReactElement(component.props.children);
  },
  filterItems: function(value) {
    let _filter = this.state.rows.slice(1).filter((row) => {
      let _r = row.some((item) => {
        let _val = item;
        if(React.isValidElement(item)) {
          try {
            _val = this.getPrimitiveValueFromReactElement(item);
          }
          catch(e) {
            _val = "";
          }
        }
        return _val && _val.toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1;
      });
      return _r;
    });

    let _header = this.state.activeRows.slice(0, 1);
    _filter = _header.concat(_filter);
    this.setState({
      activeRows: _filter || [],
      currentPaginateIndex: 0
    });
  },
  numItemsChange: function(value) {
    value = parseInt(value) || 5;
    this.setState({
      maxRowsToShow: value,
      currentPaginateIndex: 0
    });
  },
  render: function() {

    let _tRows = this.state.activeRows.slice(),
        _header = _tRows.splice(0, 1);

    _header = _header.map(function(row) {
      let cols = row.map(function(val) {
        return <th key={ generateRandomString(32, '#A') }>{ val }</th>;
      }.bind(this));
      return <tr key={ generateRandomString(32, '#A') }>{ cols }</tr>;
    }.bind(this));

    let _startIndex = this.state.currentPaginateIndex*this.state.maxRowsToShow,
        _endIndex = _startIndex + this.state.maxRowsToShow;

    if(_endIndex >= this.state.activeRows.length) {
      _endIndex = this.state.activeRows.length - 1;
    }

    _tRows = _tRows.slice(_startIndex, _endIndex);

    let _rows = _tRows.map(function(row) {
      let cols = row.map(function(val) {
        return <td key={ generateRandomString(32, '#A') }>{ val }</td>;
      }.bind(this));
      return <tr key={ generateRandomString(32, '#A') }>{ cols }</tr>;
    }.bind(this));

    _rows = _header.concat(_rows);

    //check if pagination is needed else disable it
    let _leftControl = <div className='control'>
      <i className="material-icons" onClick={ this.updatePaginateIndex.bind(this, -1) }>keyboard_arrow_left</i>
    </div>,
        _rightControl = <div className='control'>
          <i className="material-icons" onClick={ this.updatePaginateIndex.bind(this, 1) }>keyboard_arrow_right</i>
        </div>;

    if(this.state.currentPaginateIndex === 0) {
      _leftControl = <div className='control inactive'>
        <i className="material-icons">keyboard_arrow_left</i>
      </div>;
    }

    if(_endIndex === this.state.activeRows.length - 1 ) {
      _rightControl = <div className='control inactive'>
        <i className="material-icons">keyboard_arrow_right</i>
      </div>;
    }

    let _labelStyle = {
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
      lineHeight: '30px',
      backgroundColor: 'transparent'
    }


    return (
      <div className='tablecontrol'>
        <div className='filterinput'>
          <PaperInput
            placeholder={ this.props.searchPlaceholder || 'filter items here...' }
            icon='search'
            changeHandler={ this.filterItems }
          />
        </div>
        <table width='100%'>
          <tbody>
            { _rows }
          </tbody>
        </table>
        <br/>
        <div className='paginatecontrols'>
          { _leftControl }
          { _rightControl }
          <div className='control' style={_labelStyle}>
            {
              ((_startIndex+1 <= _endIndex) ? (_startIndex+1):_startIndex) + "-"+ _endIndex+" of "+(this.state.activeRows.length-1)
            }
          </div>
          <div style={{ width: '200px', marginLeft: '1rem', marginTop: '0.5rem', float: 'left'}}>
            <div style={{ width: '50px', float: 'left', marginTop: '-2rem' }}>
              <DropDownMenu items={ [ 5, 10, 20, 30, 40 ] } value={ '5' } selectHandler={ this.numItemsChange } />
            </div>
            <span>{ " items" }</span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TableControl;
