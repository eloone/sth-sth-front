(function(angular){
	angular.module('folio.main', [
		'folio.main.config',
		'folio.main.routes',
		'folio.main.header'
	])
	.controller('MainCtrl', ['AppConfig', MainCtrl]);

	function MainCtrl(){

	}

})(window.angular);