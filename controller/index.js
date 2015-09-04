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

  prompting: {

    // First we ask for the controller's name
    promptingForName: function() {

      var done = this.async();

      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the brilliant ' + chalk.red('AngularRequireFullstack') + ' generator! by ' + chalk.blue('MONITS')
      ));

      this.log(
        'I am going to scaffold a controller for you.'
      );

      var prompts = [{
        type: 'input',
        name: 'controllerName',
        message: 'Controller name:',
        default: this.appname
      }];

      this.prompt(prompts, function (props) {
        this.props = props;

        this.controllerName = this.props.controllerName;
        // To access props later use this.props.someOption;

        done();
      }.bind(this));

    },

    // We need to ask the user for the route of this controller before procceding
    promptingForRoute: function() {

      var done = this.async();

      this.prompt({
        type: 'input',
        name: 'controllerViewRoute',
        message: 'The route for the view in this controller',
        validate: function (routeName) {
          if (routeName.length > 0) {
            return true;
          }

          return 'You need to enter a valid path';
        }

      }, function (answers) {

        var tempRoute = answers.controllerViewRoute.trim();

        // Lets add slashes at the front and remove the slash from the back of the route (if there arent)
        if (tempRoute[0] !== '/') {
          tempRoute = '/' + tempRoute;
        }

        if (tempRoute[tempRoute.length - 1] === '/') {
          tempRoute = tempRoute.substr(0, tempRoute.length - 1);
        }

        this.controllerViewRoute = tempRoute;
        this.controllerViewRoutePartial = '/views' + this.controllerViewRoute + '/' + this.controllerName + '.html';
        this.controllerViewRouteFull = '/app' + this.controllerViewRoutePartial;

        this.log(
          chalk.gray('  (btw, your default view will be located in: ' + chalk.bold(this.controllerViewRouteFull) + ')')
        );

        done();
      }.bind(this));

    }

  },

  writing: {
    controller: function () {
      // Controllers
      this.fs.copyTpl(
        this.templatePath('/_controllerTemplate.js'),
        this.destinationPath('/app/scripts/controllers/' + this.controllerName + '.js'),
        this
      );

      // Controller View Route
      this.fs.copyTpl(
        this.templatePath('/views/_viewControllerTemplate.html'),
        this.destinationPath(this.controllerViewRouteFull),
        this
      );

    },

    updatingRoutesJs: function() {

      var hook = '/* ===== yeoman hook ===== */';
      var path = this.destinationPath('/app/scripts/routes.js');

      // route.js exists? If not, we can't update it
      if (!this.fs.exists(path)) {
        this.log(
          chalk.red(
            chalk.bold(
              'Yikes! I can\'t find ' +
              chalk.underline('/app/scripts/routes.js') + '. ' +
              'Thus I can\'t make my splendid update :(\n'
            )
          )
        );

        return;
      }

      // If exists, we read the file
      var file = this.fs.read(path);

      // We need a healthy hook
      if (file.indexOf(hook) === -1) {
        this.log(
          chalk.red('Oops... I couldn\'t update routes.js because I can\'t find my hook :(')
        );

        this.log(
          chalk.gray('  (try adding \'' + hook + '\' after the last item inside the routes object in routes.js)') + '\n'
        );

        return;
      }

      // If the key doesnt exist, we add our view to routes.js
      if (file.indexOf(this.controllerViewRoute) === -1) {

        var tab = '    ';

        // We want a block with the following format:
        //  'controllerViewRoute': {
        //      templateUrl: 'controllerViewRoutePartial',
        //      controller: 'controllerName',
        //  }
        //  /* ===== yeoman hook ===== */
        //
        // (the last line -hook- is added once again to enable further uses)
        var newBlockToAppend =
          '\'' + this.controllerViewRoute + '\': {\n' +
          tab + tab + tab + tab + 'templateUrl: \'' + this.controllerViewRoutePartial + '\',\n' +
          tab + tab + tab + tab + 'controller: \'' + this.controllerName + '\'\n' +
          tab + tab + tab + '}\n' +
          tab + tab + tab + hook;

        // Let's add a comma in the previous block before adding a new one
        var positionOfLastParenthesis = file.lastIndexOf('}', file.indexOf(hook));
        file = file.substr(0, positionOfLastParenthesis + 1) + ',' + file.substr(positionOfLastParenthesis + 1);

        // And we replace the content with the new block
        this.fs.write(path, file.replace(hook, newBlockToAppend));

      }

    }
  },

  end: function () {
    this.log('Run ' + chalk.red('grunt serve') + ' to see the app in action or ' + chalk.blue('grunt build') + ' when you are ready to deploy it');
    this.log('Visit our blog at ' + chalk.blue('https://medium.com/monits-blog'));
  }
});
