(function(angular){
	angular.module('folio.components.lib.projectService', ['ngResource'])
	.factory('ProjectResource', ['$resource', ProjectResource]);

	function ProjectResource($resource){
		return $resource('/api/projects/:id', {id: '@id'}, {
			get : {
				method: 'GET',
				isArray: true
			}
		})
	}

})(window.angular);