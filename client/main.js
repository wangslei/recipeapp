var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
    	templateUrl: '/partials/home.html',
    	constroller: 'homeController',
    	access: {restricted: true}
    })
    .when('/login', {
    	templateUrl: 'partials/login.html',
    	controller: 'loginController',
    	access: {restricted: false}
    })
    .when('/logout', {
    	controller: 'logoutController',
    	access: {restricted: true}
    })
    .when('/register', {
    	templateUrl: 'partials/register.html',
    	controller: 'registerController',
    	access: {restricted: false}
    })
    .when('/profile', {
    	templateUrl: 'partials/profile.html',
    	controller: 'profileController',
    	access: {restricted: true}
    })
    .when('/ingredients', {
      templateUrl: 'partials/ingredients.html',
      controller: 'ingredientsController',
      access: {restricted: true}
    })
    .otherwise({redirectTo: '/'});;
});

myApp.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
  	console.log('in routeChangeStart');
  	var userpromise = AuthService.updateUserStatus();
  	userpromise.then(function () {
  		if (next.access.restricted && !AuthService.getUserStatus()) {
	      console.log('redirecting because of restrictions');
	      $location.path('/login');
    	}
  	})
  });
});