(function(angular, $){
	angular.module('folio.components.categoryCtrl', [
		'ui.router',
		'ui.bootstrap',
		'folio.components.categoryService',
		'folio.main.config'
	])
	.filter('textOnly', ['$sce', function($sce){
		return function(html){
			return $sce.trustAsHtml($(html).text());
		};
	}])
	.controller('CategoryCtrl', ['$scope', '$state', 'CategoryResource', '$sce', 'AppConfig', CategoryCtrl]);

	function CategoryCtrl($scope, $state, CategoryResource, $sce, AppConfig){
		$scope.$sce = $sce;
		var allTags = AppConfig.get('allTags');

		$(document).tooltip({
	      track: true,
	      show: {
	        delay: 250
      	  }
	    });

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
			var perYear = {};
			var projects = [];

			CategoryResource.getProjects({category: $state.params.category}).$promise.then(function(res){

				_.forEach(res, function(project){
					var year = moment(project.date).year();

					if(perYear[year]){
						perYear[year].push(project);
					}else{
						perYear[year] = [project];
					}

					project.tags = _.map(project.tags, function(tag){
						if(tag.type === 'app-type'){
							project.type = _.where(allTags, {name: tag})[0];
							return tag;
						}

						return _.where(allTags, {name: tag})[0];
					});
				});

				var years = _.keys(perYear).sort().reverse();

				_.forEach(years, function(year){
					projects.push(year);
					projects = projects.concat(perYear[year]);
				});

				$scope.projects = projects;

			});

		}

	}

})(window.angular, window.jQuery);