
import React from 'react';
import PaperInput from './PaperInput';
import Checkbox from './Checkbox';
import { isEmpty, getReactDOMNode, getReactDOMNodeForRef, bytesToSize } from '../../utils/FKUtils';

var FileInput = React.createClass({
  propTypes: {
    maxSize: React.PropTypes.number,
    multiple: React.PropTypes.bool,
    mimeTypes: React.PropTypes.array,
    showDropZone: React.PropTypes.bool,
    onValueChange: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      multiple: this.props.multiple || false,
      showDropZone: this.props.showDropZone || false,
      file: null,
      fileName: this.props.fileName || "No file chosen",
      validationErrorMessage: ""
    }
  },
  file: null,
  selectFile: function(evt) {
    evt.preventDefault();

    $(this._fileInputDOM).trigger('click');
  },
  checkFileSize: function(size) {
    if(this.props.maxSize > 0) {
      return size <= this.props.maxSize;
    }
    return true;
  },
  checkMimeType: function(type) {
    if(this.props.mimeTypes) {
      return this.props.mimeTypes.some((mime) => {
        return mime === type ;
      });
    }
    return true;
  },
  fileSelected: function(evt) {
    if(evt.target.files && evt.target.files.length) {
      let _file = evt.target.files[0];
      if(_file) {

        //clear the file input value
        this._fileInputDOM.value = "";

        //check for max length
        if(this.props.maxSize && !this.checkFileSize(files[0].size)) {
          this.setState({
            validationErrorMessage: 'File size is more than maximum allowed limit.'
          });
          return;
        }

        //check for mimetype match
        if(!this.checkMimeType(_file.type)) {
          this.setState({
            validationErrorMessage: 'Invalid file format. Please select file with correct format.'
          });
          return;
        }
        else {
          this.setState({
            file: _file,
            fileName: _file.name,
            validationErrorMessage: null
          });
        }
      }
    }
  },
  getValue: function() {
    return this.state.file;
  },
  componentDidMount: function() {

    this._dom = getReactDOMNode(this);
    this._fileInputDOM = getReactDOMNodeForRef(this.refs['file']);

    if(this.state.showDropZone) {
      this.attachEventListeners();
    }
  },
  attachEventListeners: function() {
    this._bgImg = $(this._dom).find('.bgImg');

    this._bgImg.on('dragover', (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      //evt.target.classList.add('drag');
    });

    this._bgImg.on('dragenter', (evt) => {

      evt.preventDefault();
      evt.stopPropagation();
      evt.target.classList.add('drag');

    });

    this._bgImg.on('dragleave', (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      evt.target.classList.remove('drag');
    });

    this._bgImg.on('drop', (evt) => {

      evt.preventDefault();
      evt.stopPropagation();

      this._bgImg.classList.remove('drag');

      let files = evt.originalEvent.dataTransfer.files;
      if(files && files.length) {

        //check for max length
        if(this.props.maxSize && !this.checkFileSize(files[0].size)) {
          this.setState({
            validationErrorMessage: 'File size is more than maximum allowed limit.'
          });
          return;
        }

        //check for mimetype match
        if(this.props.mimeTypes && !this.checkMimeType(files[0].type)) {
          this.setState({
            validationErrorMessage: 'Invalid file format. Please select file with correct format.'
          });
          return;
        }

        this.setState({
          file: files[0],
          fileName: files[0].name,
          validationErrorMessage: null
        });
      }

    });
  },
  toggleDropZone: function(value) {
    setTimeout(() => {

      this.setState({
        showDropZone: value
      }, () => {

        if(this.state.showDropZone) {
          this.attachEventListeners();
        }

      });

    }, 500);
  },
  render: function() {

    let _fileInfo = "";

    if(this.state.file && this.state.file.name) {
      let _s = {
        th: {
          fontSize: '1.4rem',
          fontFamily: 'Riona-Medium',
          padding:'0.5rem'
        },
        td: {
          fontSize: '1.4rem',
          padding:'0.5rem'
        }
      }
      _fileInfo = <div><br/><table style={ _s.td } width='300px'><tr style={ _s.th }><th width='200px'>File name</th><th style={ _s.th }>File size</th></tr><tr><td>{ this.state.fileName }</td><td>{ bytesToSize(this.state.file.size) }</td></tr></table></div>;
    }

    let _fileDrop = "", _validationError = "";
    if(this.state.showDropZone) {
      _fileDrop = <div className='filedropzone'>
        <div className='bgImg'></div>
        <div className='labelmsg'>Drop file here or select ADD FILE link below</div>
      </div>;
    }

    if(this.state.validationErrorMessage) {
      _validationError = <div className='label_error' style={{display:'inline-block'}}>{ this.state.validationErrorMessage }</div>;
    }

    return (
      <div className='fileinput'>
        { _fileDrop }
        <table width='500px' style={{backgroundColor:'#f7f7f7'}}>
          <tr>
            <td style={ {
              maxWidth: '200px',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              fontSize: '1.3rem',
              paddingTop:'0.8rem'
            }}>
            <label>{ this.state.fileName }</label>
            </td>
            <td width='120px' style={{paddingLeft:'0.5rem', verticalAlign:'top', fontSize: '1.3rem'}}>
              <a href='#' className='paperLink' onClick={ this.selectFile }>ADD FILE</a>
            </td>
          </tr>
        </table>
        { _fileInfo }
        <Checkbox label="show drop zone" checked={ this.state.showDropZone } onChange={ this.toggleDropZone } />

        { _validationError }
        <input type='file' ref='file' style={{display:'none'}}  onChange={ this.fileSelected } />

      </div>
    )
  }

});

module.exports = FileInput;
