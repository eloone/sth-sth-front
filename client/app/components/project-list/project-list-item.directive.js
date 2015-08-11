(function(angular){
	angular.module('folio.components.projectInListDirective', [])
	.directive('projectListItem', function(){
		return {
			templateUrl: '/app/components/project-list/project-list-item.html',
			restrict: 'E',
			replace: true,
			scope: {
				project: '='
			}
		};
	});
})(window.angular);