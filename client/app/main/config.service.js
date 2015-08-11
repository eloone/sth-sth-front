(function(angular){
	angular.module('folio.main.config', [])
	.value('values', {})
	.factory('AppConfig', ['values', AppConfigService]);

	function AppConfigService(values){

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