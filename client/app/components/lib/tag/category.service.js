(function(angular){
	angular.module('folio.components.lib.categoryService', ['ngResource'])
	.factory('CategoryResource', ['$resource', CategoryResource]);

	function CategoryResource($resource){
		return $resource('/api/projects/category/:category-category', {category: '@category'}, {
			getProjects : {
				method: 'GET',
				isArray: true
			},
			getTagEntity: {
				url: '/api/tags/:id-category',
				method: 'GET',
				isArray: true,
				params: {
					id: '@id'
				}
			},
			getTagsById: {
				url: '/api/tags/:ids',
				method: 'GET',
				isArray: true,
				params: {
					ids: '@ids'
				}
			},
			getAllTags: {
				url: '/api/tags',
				method: 'GET',
				isArray: true
			}
		})
	}

})(window.angular);