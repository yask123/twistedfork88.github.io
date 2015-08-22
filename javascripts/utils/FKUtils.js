
import React from 'react';
let _ = require('underscore');

class FKUtils {

  static getReactDOMNode(component) {
    return React.findDOMNode(component);
  }

  static getReactDOMNodeForRef(component) {
    return React.findDOMNode(component);
  }

  static generateRandomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) {
      result += mask[Math.round(Math.random() * (mask.length - 1))];
    }
    return result;
  }

  static isEmpty(object) {
    return _.isEmpty(object);
  }

  static isEqual(obj1, obj2) {
    return _.isEqual(obj1, obj2);
  }

  static isDOMElement(object) {
    return _.isElement(object);
  }

  static isArray(object) {
    return _.isArray(object);
  }

  static isObject(object) {
    return _.isObject(object);
  }

  static isFunction(object) {
    return _.isFunction(object);
  }

  static isString(input) {
    return _.isString(input);
  }

  static isNumber(input) {
    return _.isNumber(input);
  }

  static isFinite(input) {
    return _.isFinite(input);
  }

  static isBoolean(input) {
    return _.isBoolean(input);
  }

  static isNaN(input) {
    return _.isNaN(input);
  }

  static isNull(object) {
    return _.isNull(object);
  }

  static isUndefined(object) {
    return _.isUndefined(object);
  }

  static bytesToSize(bytes) {
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) {
      return '0 Byte';
    }
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }

  static createLogger() {
    window.log = log4javascript.getLogger('applog');
    window.log.setLevel(log4javascript.Level.INFO);

    var ajaxAppender = new log4javascript.AjaxAppender('/applog');
    var jsonLayout = new log4javascript.JsonLayout(false, false);

    ajaxAppender.setThreshold(log4javascript.Level.INFO);
    ajaxAppender.setLayout(jsonLayout);

    window.log.addAppender(ajaxAppender);
    window.onerror = function(errorMsg, url, lineNumber) {
        //window.log.fatal("Uncaught error " + errorMsg + " in " + url + ", line " + lineNumber);
    };
  }

  static staticMessages() {
    return {
      noItemsFound: 'No items found',
      fetchingDataMsg: 'Please wait. Fetching data...',
      invalidFileType: 'Invalid file format. Please select a file with correct format.'
    }
  }

}

module.exports = FKUtils;
