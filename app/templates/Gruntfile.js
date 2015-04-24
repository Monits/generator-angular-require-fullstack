/* eslint-env node */

module.exports = function (grunt) {
  'use strict';
  require('load-grunt-tasks')(grunt);

  require('time-grunt')(grunt);

  var appConfig = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    yeoman: appConfig,
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
            connect.static('.tmp'),
            connect().use('/bower_components', connect.static('./bower_components')),
            connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep:serve']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/**/*.js'],
        tasks: ['newer:eslint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '.tmp/styles/**/*.css',
          '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          sassDir: ['.tmp/styles'],
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    eslint: {
      all: [
      '<%= yeoman.app %>/scripts/**/*.js',
      'test/spec/**/*.js',
      'Gruntfile.js'
      ],
      test: [
      'test/spec/**/*.js'
      ]
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
          '.tmp',
          '<%= yeoman.dist %>/**/*',
          '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '**/*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    bower: {
      all: {
        rjsConfig: '<%= yeoman.app %>/scripts/build.js'
      }
    },

    wiredep: {
      serve: {
        src: ['<%= yeoman.app %>/styles/main.scss'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      },
      dist: {
        src: ['.tmp/styles/main.scss'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      },
      options: {
        fileTypes: {
          scss: {
            replace: {
              css: '@import \'{{filePath}}\';',
              sass: '@import \'{{filePath}}\';',
              scss: '@import \'{{filePath}}\';'
            }
          }
        }
      }
    },

    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/styles/**/*.css',
          '<%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*',
          '<%= yeoman.dist %>/views/**/*.html',
          '<%= yeoman.dist %>/scripts/**/*.js',
          '<%= yeoman.dist %>/bower_components/**/*.js',
          '!<%= yeoman.dist %>/images/static/*.jpg'
        ]
      },
      paths: {
          src: ['<%= yeoman.dist %>/scripts/paths.js']
      }
    },

    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    usemin: {
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/styles/**/*.css'],
      imagesAndViews: ['<%= yeoman.dist %>/scripts/**/*.js', '<%= yeoman.dist %>/views/**/*.html'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images'],
        patterns: {
          imagesAndViews: [
            [/(images\/.*?\.(?:gif|jpeg|jpg|png|webp))/gm, 'Update the JS to reference our revved images'],
            [/(views\/.*?\.(?:html))/gm, 'Update the JS to reference our revved html views']
          ]
        }
      }
    },

    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/bower_components',
          src: '**/*.js',
          dest: '<%= yeoman.dist %>/bower_components'
        }, {
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: '**/*.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '**/*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '**/*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/scripts',
          src: ['**/*.js'],
          dest: '.tmp/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      styles: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/styles',
          src: ['**/*.scss'],
          dest: '.tmp/styles'
        }]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/**/*.html',
            'images/**/*.{webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: '<%= yeoman.dist %>'
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/requirejs/require.js',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    requirejs: {
      compile: {
        options: {
          mainConfigFile: '.tmp/scripts/build.js',
          baseUrl: '.tmp/scripts',
          uglify2: {
            mangle: false
          },
          removeCombined: true,
          preserveLicenseComments: false,
          findNestedDependencies: true,
          dir: 'dist/scripts',
          modules: [
            {
              name: 'build'
            }
          ],
          optimize: 'uglify2',
          paths: {
            'crypto-js': 'empty:'
          }
        }
      }
    },

    jsrev: {
        dist: {
            options: {
                baseRoot: '<%= yeoman.dist %>/scripts',
                baseUrl: 'scripts',
                outputFile: '<%= yeoman.dist %>/scripts/paths.js'
            }
        }
    }
  });

  grunt.registerMultiTask('jsrev', 'Use filerev output to create require-js compatible path mappings', function () {

    if (!grunt.filerev) {
      grunt.fail.warn('Could not find grunt.filerev. Task "filerev" must be run first.');
      return;
    }

    if (!grunt.filerev.summary) {
      grunt.log.warn('No mappings in grunt.filerev.summary. Abort file creation.');
      return;
    }

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      baseRoot: '',
      baseUrl: ''
    });

    if (!options.outputFile) {
      grunt.fail.warn('Option `outputFile` not specified.');
    }

    var templateString = 'var paths = <%= JSON.stringify(moduleMappings, null, 2) %>;';

    var assets = grunt.filerev.summary;
    var path = require('path');
    var mappings = {};

    var removeExtension = function (p) {
        return p.substr(0, p.length - path.extname(p).length);
    };

    for (var longModule in assets) {

      if (assets.hasOwnProperty(longModule)) {
          var longPath = assets[longModule];
          if (path.extname(longPath) !== '.js') {
              continue;
          }

          var shortPath = path.relative(options.baseRoot, longPath);
          var shortModule = path.relative(options.baseRoot, longModule);

          mappings[removeExtension(shortModule)] = removeExtension(shortPath);
      }
    }

    var data = {
      baseUrl: options.baseUrl,
      moduleMappings: mappings
    };

    var outFile = options.outputFile;


    grunt.task.run('filerev:paths');

    // if the outFile is revved, respect that
    if (assets[outFile]) {
        outFile = assets[outFile];
    }

    var content = grunt.template.process(templateString, {data: data});
    grunt.file.write(options.outputFile, content);
    grunt.log.writeln('File "' + options.outputFile + '" created.');
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target) {
      return grunt.task.run(['build:' + target, 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep:serve',
      'concurrent:server',
      'autoprefixer',
      'bower',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('build', 'Compiles app for production or release candidate', function () {
    grunt.task.run([
      'clean:dist',
      // copy stylesheets, in: app/styles/ out: .tmp/styles
      'copy:styles',
      // Wires in bower dependencies where they belong in: <<>> out: <<>>
      'wiredep:dist',
      // In theory avoids problems related to name mangling by minifiers in: app/scripts out: .tmp/scripts
      'ngAnnotate',
      // Optimizer in: .tmp/scripts out: dist/scripts
      'requirejs',
      // pre-required setup for usemin
      'useminPrepare',
      // compass, imagemin, svgmin
      'concurrent:dist',
      // add css vendor prefixes, in: .tmp/styles out: .tmp/styles
      'autoprefixer',
      // copies non-javascripty things
      'copy:dist',
      // minify css in: <<>> out: <<>>
      'cssmin',
      // adds hash to file names in: <<>> out: <<>>
      'filerev',
      // Creates file map from filerev result in: <<>> out: <<>>
      'jsrev',
      // ???
      'cdnify',
      // minify js in: <<>> out: <<>>
      'uglify',
      // uses filerev data to rewrire file urls
      'usemin',
      // minify html
      'htmlmin'
    ]);
  });

  grunt.registerTask('default', [
    'newer:eslint',
    'build'
  ]);
};
