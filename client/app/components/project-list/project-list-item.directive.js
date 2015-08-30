(function(angular){
	angular.module('folio.components.projectInListDirective', ['ui.router'])
	.directive('projectListItem', ['$state', function($state){
		return {
			templateUrl: '/app/components/project-list/project-list-item.html',
			restrict: 'E',
			replace: true,
			scope: {
				project: '='
			},
			link: function(scope){
				scope.$state = $state;
				scope.previousState = _.merge($state.current, {params: $state.params});
			}
		};
	}]);
})(window.angular);