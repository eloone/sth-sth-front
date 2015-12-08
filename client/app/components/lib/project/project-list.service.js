(function(angular){
	angular.module('folio.components.lib.projectList', [])
	.factory('ProjectList', ProjectListFactory);

	function ProjectListFactory(){
		function ProjectListService(){

			this.get = function(responseProjects, allTags){
				var projects = [];
				var perYear = {};
				var projectCards = [];

				_.forEach(responseProjects, function(project){
					var year = moment(project.date).year();

					if(perYear[year]){
						perYear[year].push(project);
					}else{
						perYear[year] = [project];
					}

					project.tags = _.map(project.tags, function(tag){
						if(_.contains(tag, 'app-type')) {
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
					projectCards = projectCards.concat(perYear[year]);
				});

				return {
					projects: projects,
					years: years,
					count: projectCards.length
				};
			};
		}

		return new ProjectListService();
	}

})(window.angular);