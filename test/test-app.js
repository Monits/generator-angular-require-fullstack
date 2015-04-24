'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('angular require fullstack:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
    .withOptions({ skipInstall: true })
    .withPrompts({ projectName: 'Test', continueOption: true })
    .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'bower.json',
      'package.json',
      '.editorconfig',
      '.eslintrc',
      'app/scripts/Test.js',
      'app/scripts/build.js',
      'app/scripts/paths.js',
      'app/scripts/routes.js',
      'app/scripts/i18n/',
      'Gruntfile.js',
      'app/robots.txt',
      'app/scripts/controllers/IndexCtrl.js',
      'app/scripts/controllers/HomeCtrl.js',
      'app/scripts/directives/sample.js',
      'app/scripts/services/sampleService.js',
      'app/scripts/services/dependencyResolverFor.js',
      'app/images/yeoman.png',
      'app/styles/',
      'app/index.html',
      'app/404.html',
      'app/views/home.html'
      ]);
  });
});
