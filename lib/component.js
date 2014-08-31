'use strict';

var hbs = require('handlebars'),
    fs = require('fs'),
    path = require('path'),
    _ = require('underscore');

/* Component class constructor
 * @param comp_path: The component's path name
 * @options.name: The component's name. If omitted the template file name
 *                will be used as component name.
 */
var Component = function(comp_path, options){
  this.name = options.name || getNameFromPath(comp_path);
  this.parts = loadTemplate(comp_path);
  this.context = loadContext(comp_path);
};

// Returns a function capable of rendering the component as a Handlebar helper
Component.prototype.getRenderer = function(){
  var self = this;
  return function(options){
    var context = _.defaults(options.hash, self.context);

    var rendered = self.parts[0](context);

    for(var i = 1; i < self.parts.length; i++){
      if(typeof(options.fn) === 'function'){
        rendered += options.fn(this);
      }
      rendered += self.parts[i](context);
    }

    return new hbs.SafeString(rendered);
  };
};

// Obtains the component name from their path
var getNameFromPath = function(comp_path){
  var name = comp_path.split('/').pop();
  name = name.toLowerCase().replace(' ', '-');
  return name;
};

// Reads and compiles the component's template file
var loadTemplate = function(comp_path){
  var html = fs.readFileSync(comp_path + '.hbs', { encoding: 'utf8' });
  return _.map(html.split('{{...}}'), function(part){
    return hbs.compile(part);
  });
};

// Reads the component's context object
var loadContext = function(comp_path){
  var dest_path = path.join(process.cwd(), comp_path);
  var relPath = path.relative(__dirname, dest_path);
  return require(relPath);
};

module.exports = Component;
