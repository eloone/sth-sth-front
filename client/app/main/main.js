(function(angular){
	angular.module('folio.main', [
		'ui.bootstrap',
		'folio.main.config',
		'folio.main.routes',
		'folio.main.header'
	])
	.controller('MainCtrl', ['AppConfig', MainCtrl]);

	function MainCtrl(){
		$(document).tooltip({
	      track: true,
	      show: {
	        delay: 250
      	  }
	    });
	}

})(window.angular);