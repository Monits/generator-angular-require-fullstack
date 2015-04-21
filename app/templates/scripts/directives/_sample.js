define(['<%= appname %>'], function(<%= appname %>) {
	'use strict';

	<%= appname %>.directive('sample', function() {
		return {
			restrict: 'E',
			template: '<span>Sample</span>'
		};
	});
});
