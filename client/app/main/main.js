(function(angular){
	angular.module('folio.main', [
		'ui.router',
		'ui.bootstrap',
		'folio.main.config',
		'folio.main.routes',
		'folio.main.header'
	])
	.controller('MainCtrl', ['$state', '$scope', MainCtrl]);

	function MainCtrl($state, $scope){
		$.widget.bridge('uitooltip', $.ui.tooltip);
		$scope.$state = $state;
		console.log('$state', $state)
		$(document).uitooltip({
	      track: true,
	      show: {
	        delay: 250
      	  }
	    });
	}

})(window.angular);