'use strict';
/*
 * With this method we enable lazy loading of AngularJS dependencies using RequireJS.
 * We do it by returning a promise to the dependencies passed as parameter, to be
 * used as routes in the routeProvider. They will be resolved when needed.
 */
define([], function() {

    return function(dependencies) {
        var definition = {
            resolver: ['$q', '$rootScope', function($q, $rootScope) {
                var deferred = $q.defer();
                require(dependencies, function() {
                    $rootScope.$apply(function() {
                        deferred.resolve();
                    });
                });

                return deferred.promise;
            }]
        };

        return definition;
    };
});
