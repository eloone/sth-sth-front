(function(angular){
	angular.module('folio', [
		'folio.lib',
		'folio.main',
		'folio.components'
	])
	.config(function($stateProvider, $urlRouterProvider, $locationProvider){
		 $locationProvider.html5Mode(true);
	});
})(window.angular);