'use strict';

var hbs = require('handlebars'),
    Component = require('./component');

var components = {};

var Seagull = {

  registerComponent : function(path, options){
    options = options || {};

    // Initialize the Component
    var component = new Component(path, options);

    // Register it as a handlebar helper and save it
    hbs.registerHelper(component.name, component.getRenderer());
    components[component.name] = component;
  }

};

module.exports = Seagull;
