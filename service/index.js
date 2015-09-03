'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');

  },
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the brilliant ' + chalk.red('AngularRequireFullstack') + ' generator! by ' + chalk.blue('MONITS')
    ));
  
    this.log(
      'I am going to scaffold a service for you.'
    );

    var prompts = [{
      type: 'input',
      name: 'serviceName',
      message: 'Service name:',
      default: this.appname
    }];

    this.prompt(prompts, function (props) {
      this.props = props;

      this.serviceName = this.props.serviceName;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    service: function () { 
      // Services
      this.fs.copyTpl(
        this.templatePath('/_serviceTemplate.js'),
        this.destinationPath('/app/scripts/services/' + this.serviceName + '.js'),
        this
      );
      
    }
  },

  end: function () {
    this.log('Run ' + chalk.red('grunt serve') + ' to see the app in action or ' + chalk.blue('grunt build') + ' when you are ready to deploy it');
    this.log('Visit our blog at ' + chalk.blue('https://medium.com/monits-blog'));
  }
});
