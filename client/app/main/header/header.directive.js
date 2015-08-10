(function(angular){
	angular.module('folio.main.header', [])
	.directive('folioHeader', function(){
		return {
			templateUrl: '/app/main/header/header.html'
		};
	});
})(window.angular);