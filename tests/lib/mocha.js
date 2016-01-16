var chai = require('chai');

global.should = require('chai').should();

if (!global.window) {
  var jsdom = require('jsdom');

  global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');

  global.window = global.document.defaultView;

  global.navigator = {
    userAgent: 'node.js',
  };

  for (var key in global.window) {
    if (!global.window.hasOwnProperty(key)) { continue; }
    if (key in global) { continue; }

    global[key] = global.window[key];
  }
}

var $ = require('teaspoon');
var React = require('react');
var TestUtils = require('react-addons-test-utils');

global.$ = $;
global.React = React;
global.TestUtils = TestUtils;