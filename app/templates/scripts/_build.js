/* global paths */
require.config({
    baseUrl: '/scripts',
    paths: {
        angular: '../../bower_components/angular/angular',
        'angular-route': '../../bower_components/angular-route/angular-route',
        bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap',
        jquery: '../../bower_components/jquery/dist/jquery',
        'angular-mocks': '../../bower_components/angular-mocks/angular-mocks',
        'angular-scenario': '../../bower_components/angular-scenario/angular-scenario',
        affix: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix',
        alert: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert',
        button: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button',
        carousel: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel',
        collapse: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse',
        dropdown: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown',
        tab: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab',
        transition: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition',
        scrollspy: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy',
        modal: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal',
        tooltip: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip',
        popover: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover',
        'es5-shim': '../../bower_components/es5-shim/es5-shim',
        json3: '../../bower_components/json3/lib/json3',
        moment: '../../bower_components/moment/moment',
        requirejs: '../../bower_components/requirejs/require',
        underscore: '../../bower_components/underscore/underscore',
        'angular-translate': '../../bower_components/angular-translate/angular-translate'
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
        'use strict';
        angular.bootstrap(document, ['<%= appname %>']);
    }
);
