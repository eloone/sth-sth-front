(function(angular, $){
	angular.module('folio.components.project', [
		'ngSanitize',
		'folio.components.project.carouselDirective',
		'folio.components.lib.categoryService'
	])
	.controller('ProjectCtrl', [
		'$scope',
		'ProjectResource',
		'$state',
		'$sce',
		'$anchorScroll',
		'$timeout',
		'CategoryResource',
		 ProjectCtrl
	]);

	function ProjectCtrl($scope, ProjectResource, $state, $sce, $anchorScroll, $timeout, CategoryResource){
		if($state.params.id){
			ProjectResource.get({id: $state.params.id}, function(res){
				$scope.project = res[0];
				$scope.project.summaryText = $sce.trustAsHtml($scope.project.summaryText);
				$scope.project.hasFullText = $($scope.project.fullText).text().trim() !== '';
				$scope.project.date = moment($scope.project.date).format('MMMM, Do YYYY');
				$timeout(function(){
					$anchorScroll()
				});

				CategoryResource.getTagsById({ ids: $scope.project.tags.join(';')}).$promise.then(function(results){
					$scope.categories = getTags(results, 'category').join(', ');
					$scope.skills = getTags(results, 'skill').join(', ');
					$scope.type = getTags(results, 'app-type').join(', ');
				});

				function getTags(tags, type) {
					return _.chain(tags).filter({ type: type}).map(function(c){ return c.title;}).value();
				}
			});
		}

		$scope.$state = $state;

		$scope.currentSlide = {};

		$scope.back = function(){
			$state.go($state.params.previousState.name, $state.params.previousState.params);
		};

		$scope.anchorscroll = function(){
			$anchorScroll();
		};
	}

})(window.angular, window.jQuery);