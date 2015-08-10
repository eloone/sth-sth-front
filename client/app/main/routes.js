(function(angular){
	angular.module('folio.main.routes', ['ui.router'])
	.config(function($stateProvider){

	$stateProvider
	    .state('root', {
	      abstract: true,
	      templateUrl: '/app/main/main.html'
	    })
	    .state('root.404', {
	      url: '/404',
	      templateUrl: '/app/components/404.html'
	    })
	    .state('root.error', {
	      url: '/server-error',
	      templateUrl: '/app/components/server-error.html'
	    })
	    .state('root.home', {
	    	url: '/',
	    	templateUrl: '/app/components/home.html'
	    })
	    .state('root.about', {
	    	url: '/about',
	    	templateUrl: '/app/components/about.html'
	    })
	    .state('root.category', {
	    	url: '/:category',
	    	templateUrl: '/app/components/category/category.html',
	    	controller: 'CategoryCtrl'
	    });
	});

})(window.angular);