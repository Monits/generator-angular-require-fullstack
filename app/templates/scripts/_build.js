/* global paths */
'use strict';
require.config({
    baseUrl: '/scripts',
    paths: {
        'affix': '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix',
        'alert': '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert',
        'angular': '../../bower_components/angular/angular',
        'angular-route': '../../bower_components/angular-route/angular-route',
        'angular-translate': '../../bower_components/angular-translate/angular-translate',
        'button': '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button',
        'bootstrap': '../../bower_components/bootstrap/dist/js/bootstrap',
        'carousel': '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel',
        'collapse': '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse',
        'dropdown': '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown',
        'es5-shim': '../../bower_components/es5-shim/es5-shim',
        'jquery': '../../bower_components/jquery/dist/jquery',
        'json3': '../../bower_components/json3/lib/json3',
        'modal': '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal',
        'moment': '../../bower_components/moment/moment',
        'popover': '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover',
        'requirejs': '../../bower_components/requirejs/require',
        'scrollspy': '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy',
        'tab': '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab',
        'tooltip': '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip',
        'transition': '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition'
    },
    shim: {
        angular: {
            deps: [
                'jquery'
            ]
        },
        'angular-route': {
            deps: [
                'angular'
            ]
        },
        bootstrap: {
            deps: [
                'jquery',
                'modal'
            ]
        },
        modal: {
            deps: [
                'jquery'
            ]
        },
        tooltip: {
            deps: [
                'jquery'
            ]
        },
        'angular-translate': {
            deps: [
                'angular'
            ]
        }
    },
    packages: [

    ]
});

if (paths) {
    require.config({
        paths: paths
    });
}

require([
        'angular',
        '<%= appname %>',
        'controllers/IndexCtrl'
    ],
    function() {
        angular.bootstrap(document, ['<%= appname %>']);
    }
);
