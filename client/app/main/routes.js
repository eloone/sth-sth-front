(function(angular){
	angular.module('folio.main.routes', ['ui.router'])
	.config(function($stateProvider){

	$stateProvider
	    .state('root', {
	      abstract: true,
	      templateUrl: '/app/main/main.html',
	      controller: 'MainCtrl'
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
	    	templateUrl: '/app/components/home/home.html',
	    	controller: 'HomeCtrl'
	    })
	    .state('root.about', {
	    	url: '/about',
	    	templateUrl: '/app/components/about.html'
	    })
	    .state('root.category', {
	    	url: '/:category',
	    	templateUrl: '/app/components/category/category.html',
	    	controller: 'CategoryCtrl'
	    })
	    .state('root.project', {
	    	url: '/project/:id',
	    	templateUrl: '/app/components/project/project.html',
	    	 params: { previousState: null },
	    	controller: 'ProjectCtrl'
	    })
	    .state('root.media', {
	    	url: '/media/:mediaId',
	    	templateUrl: '/app/components/project/media.html',
	    	controller: 'ProjectCtrl'
	    });
	});

})(window.angular);