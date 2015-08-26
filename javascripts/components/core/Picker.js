

import React from 'react';
import _jQ from 'jquery';
import PaperInput from './PaperInput';
import PaperButton from './PaperButton';
import IconButton from './IconButton';
import { generateRandomString } from '../../utils/FKUtils';
import Slider from './Slider';

var DatePicker = React.createClass({
  styles: {
    day: {
      width: '100%',
      height: '40px',
      backgroundColor: '#2196F3',
      textAlign: 'center',
      fontSize: '1.3rem',
      lineHeight: '4.4rem',
      textTransform: 'uppercase',
      color: 'white'
    },
    fullDate: {
      width: '100%',
      minHeight: '40px',
      backgroundColor: '#1976D2',
      textAlign: 'center',
      textTransform: 'uppercase',
      color: 'white',
      paddingTop: '2rem',
      paddingBottom: '1rem'
    }
  },
  statics: {
    weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  },
  getInitialState: function() {
    let _d = new Date();
    return {
      hours: '0',
      minutes: '0',
      weekDay: _d.getDay(),
      date: _d.getDate(),
      month: _d.getMonth(),
      year: _d.getFullYear()
    }
  },
  selectDate: function(date, evt) {
    Array.prototype.slice.call(this._dom.querySelectorAll('.monthdays > div'))
    .forEach((div) => {
      div.classList.remove('active');
    });
    evt.target.classList.add('active');

    let _d = new Date(date+" "+DatePicker.months[this.state.month]+" "+this.state.year);
    this.setState({
      date: date,
      weekDay: _d.getDay()
    }, () => {
      this.heightAdjustment();
    });
  },
  getNumberOfDaysInMonth: function(month, year) {
    let _isLeapYear = false;
    if(year % 4 === 0 && year % 100 === 0 && year % 400 === 0) {
      _isLeapYear = true;
    }
    if([0, 2, 4, 6, 7, 9, 11 ].indexOf(parseInt(month)) > -1) {
      return 31;
    }
    else if(month === 1) {
      if(_isLeapYear) {
        return 29;
      }
      else {
        return 28;
      }
    }
    return 30;
  },
  getWeekDayForFirstDayInMonth: function(timestamp) {
    let _d = "01 "+DatePicker.months[this.state.month]+" "+ this.state.year,
        _firstDay = new Date(_d);
    return _firstDay.getDay();
  },
  dateSelectionDone: function(type) {

    if(this.props.onClose && typeof this.props.onClose === "function") {
      this.props.onClose.call(null, this.getValue(), type);
    }
  },
  timeChange: function(type, evt, value) {
    if(type === 'hours') {
      this.setState({
        hours: Math.floor(value*24)
      });
    }
    else if(type === "minutes") {
      this.setState({
        minutes: Math.floor(value*60)
      });
    }
  },
  componentDidMount: function() {
    this._dom = React.findDOMNode(this);
    this.heightAdjustment();
  },
  heightAdjustment: function() {
    let _height = this._dom.offsetHeight;
    this._dom.style.marginTop = -_height/2+'px';

    let _dayWidth = this._dom.querySelector('.monthdays > div').offsetWidth;

    _jQ(this._dom).find('.weekdays > div, .monthdays > div').css('height', _dayWidth+'px');
  },
  getValue: function() {

    let _val =  {
      date: {
        day: this.state.weekDay,
        date: this.state.date,
        month: this.state.month,
        year: this.state.year
      }
    };
    if(this.props.showTimeSelect) {
      _val['time'] = {
        hours: this.refs.hrs.getValue(),
        minutes: this.refs.min.getValue()
      }
    }
    return _val;
  },
  changeDate: function(val) {
    let { date, month, year, weekDay } = this.state;
    month = month + val;
    if(month < 0) {
      month = 11;
      year = year - 1;
    }
    else if(month > 11) {
      month = 0;
      ++year;
    }
    let _d = null;
    if(date <= this.getNumberOfDaysInMonth(month, year)) {
      _d = new Date(date+" "+DatePicker.months[month]+" "+year);
    }
    else{
      date = 1;
      _d = new Date("01 "+DatePicker.months[month]+" "+year);
    }

    this.setState({
      date: date,
      weekDay: _d.getDay(),
      month: month,
      year: year
    }, function() {
      this.heightAdjustment();

    }.bind(this));
  },
  render: function() {

    let _numofDays = this.getNumberOfDaysInMonth(this.state.month, this.state.year),
        _firstDay = this.getWeekDayForFirstDayInMonth(),
        _currDay = 1,
        _days = [],
        _class="",
        _timeSelect = "";
    for(var i=0; _numofDays > 0 ; i++) {
      let _key = generateRandomString(32, "#A!");
      if(i < _firstDay) {
        _days.push(<div key={ _key } >{ " " }</div>);
        continue;
      }
      _class = "";
      if(_currDay === this.state.date) {
        _class = "active";
      }
      _days.push(<div key={ _key } className={ _class } onClick={ this.selectDate.bind(this, _currDay) }>{ _currDay++ }<span className='hoverripple'></span></div>);
      --_numofDays;
    }

    if(this.props.showTimeSelect) {
      _timeSelect =
      <div className='timeselect' style={{padding:'1rem'}}>
        <h6>SELECT TIME</h6>
        <div >
          <Slider ref='hrs' type="pin" min={0} max={23} value={10} />
        </div>
        <br/><br/>
        <div>
          <Slider ref='min' type="pin" value={30} min={0} max={59} />
        </div>
      </div>;
    }

    return (
      <div className='datepicker'>
        <div className='weekday'>{ DatePicker.weekdays[this.state.weekDay] }</div>
        <div style={this.styles.fullDate}>
          <div style={{fontSize:'2rem'}}>{ DatePicker.months[this.state.month] }</div>
          <div style={{fontSize:'4rem'}}>{ this.state.date }</div>
          <div style={{fontSize:'2rem', color:"rgba(240,240,240,0.7)"}}>{ this.state.year }</div>
        </div>
        <div className='calendar'>
          <div className='navigate'>
            <table width='100%'>
              <tr>
                <td style={{float:'left'}}>
                  <IconButton type="default" clickHandler={ this.changeDate.bind(this, -1) }>
                    <i className="material-icons">keyboard_arrow_left</i>
                  </IconButton>
                </td>
                <td style={{ textAlign: 'center', fontSize: '1.4rem'}}>{ DatePicker.months[this.state.month] }&nbsp;{ this.state.year }</td>
                <td style={{float:'right'}}>
                  <IconButton type="default" clickHandler={ this.changeDate.bind(this, 1) }>
                    <i className="material-icons">keyboard_arrow_right</i>
                  </IconButton>
                </td>
              </tr>
            </table>
          </div>
          <div className='days'>
            <div className='weekdays'>
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className='monthdays'>{ _days }</div>
          </div>
          { _timeSelect }
          <table>
            <tr>
              <td><PaperButton clickHandler={ this.dateSelectionDone.bind(this, 'submit') } type="link success">OKAY</PaperButton></td>
              <td><PaperButton clickHandler={ this.dateSelectionDone.bind(this, 'cancel') } type="link error">CANCEL</PaperButton></td>
            </tr>
          </table>
        </div>
      </div>
    )
  }
});

var Picker = React.createClass({
  getDefaultProps: function() {
    return {
      showTimeSelect: false
    }
  },
  componentDidMount: function() {
    this._dom = React.findDOMNode(this);
    this._modal = this._dom.querySelector('.pickermodal');
    this._calendar = this._dom.querySelector('.calendarcontainer');

    this._modal.addEventListener('click', () => {
      this.clearAll();
    });

  },
  onClose: function(value, type) {
    if(type !== 'cancel') {
      this
        .refs['date']
        .setValue(value.date.date+"/"+DatePicker.months[value.date.month]+"/"+value.date.year);

      if(this.props.showTimeSelect) {
        this
          .refs['time']
          .setValue(value.time.hours+":"+value.time.minutes);
      }
    }
    this.clearAll();

  },
  clearAll: function() {
    this._modal.classList.remove('show');
    React.unmountComponentAtNode(this._calendar);
  },
  showPicker: function() {
    this._modal.classList.add('show');
    React.render(
      <DatePicker showTimeSelect={ this.props.showTimeSelect || false } onClose={ this.onClose } />,
      this._calendar
    );
  },
  render: function() {

    let _timeSelectVal = "";
    if(this.props.showTimeSelect) {
      _timeSelectVal = <PaperInput placeholder="time" ref="time"/>;
    }

    return (
      <div className='picker'>
        <div className="pickermodal"></div>
        <div className='calendarcontainer'></div>
        <div className='row'>
          <div className='col-md-4'>
            <PaperInput placeholder="select date" ref="date" onFocus={ this.showPicker } />
          </div>
          <div className='col-md-8'>
            { _timeSelectVal }
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Picker;
