(function(angular, $){
	angular.module('folio.components.categoryCtrl', [
		'ui.router'
	])
	.filter('textOnly', ['$sce', function($sce){
		return function(html){
			return $sce.trustAsHtml($(html).text());
		};
	}])
	.controller('CategoryCtrl', ['$scope', '$state', 'CategoryResource', 'AppConfig', 'ProjectList', CategoryCtrl]);

	function CategoryCtrl($scope, $state, CategoryResource, AppConfig, ProjectList){

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

		CategoryResource.getTagEntity({id: $state.params.category}).$promise.then(function(res){
			$scope.category = res[0];
		});

		function getProjects() {
			CategoryResource.getProjects({category: $state.params.category}).$promise.then(function(res){
				$scope.projects = _.get(ProjectList.get(res, allTags), 'projects');
			});
		}

	}

})(window.angular, window.jQuery);
