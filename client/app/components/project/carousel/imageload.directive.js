(function(angular){
	angular.module('folio.components.project.imageLoad', [])
	.directive('imageload', ['$parse', function($parse){
		return {
			restrict: 'A',
			scope: {
				imageload: '='
			},
			link: function(scope, elt, attrs){
				elt.bind('load', function(e){
					scope.imageload(elt);
				});
			}
		};
	}]);
})(window.angular);