define(['<%= appname %>'], function(<%= appname %>) {

    'use strict';
    <%= appname %>.directive('<%= directiveName %>', function() {
        return {
            restrict: 'E',
            template: '<span>Sample</span>'
        }
    });

});