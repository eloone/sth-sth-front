(function(angular){
	angular.module('folio.components.homeCtrl', [])
	.controller('HomeCtrl', [
		'$scope',
		'ProjectList',
		'AppConfig',
		'CategoryResource',
		'ProjectResource',
		 HomeCtrl
	]);

	function HomeCtrl($scope, ProjectList, AppConfig, CategoryResource, ProjectResource){
		var allTags = AppConfig.get('allTags');

		if(!allTags) {
			CategoryResource.getAllTags().$promise.then(function(res) {
				allTags = res;
				AppConfig.set('allTags', allTags);
				getProjects();
			});
		}else {
			getProjects();
		}

		function getProjects() {
			ProjectResource.get(function(res){
				var projectList = ProjectList.get(res, allTags);
				$scope.projects = projectList.projects;
				$scope.startYear = projectList.years.pop();
			});
		}
	}

})(window.angular);