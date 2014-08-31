'use strict';
/* jshint ignore:start */

var hbs = require('handlebars'),
    expect = require('chai').expect,
    Seagull = require('../index');

describe('Simple test', function(){

  it('should render a simple template', function(){
    var template = hbs.compile('<p>Hello {{name}}!</p>');
    var html = template({ name: 'Jack' });
    expect(html).to.be.equal('<p>Hello Jack!</p>');
  });

  it('should render an input text', function(){
    var template = hbs.compile('{{input type="email" value=""}}');
    var html = template();
    expect(html).to.be.equal('<input type="email" value="" />');
  });

});

/* jshint ignore:end */
