(function(angular){
	angular.module('folio.main.config', ['folio.components.categoryService'])
	.value('values', {})
	.factory('AppConfig', ['CategoryResource', 'values', AppConfigService]);

	function AppConfigService(CategoryResource, values){

		return {
			get: function(key){
				return values[key];
			},
			set: function(key, value){
				values[key] = value;
			}
		};
	}

})(window.angular);