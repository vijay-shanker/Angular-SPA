
var app = angular.module('myApp', ['ngRoute']);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
  });

app.config(function($routeProvider){
	$routeProvider
	.when('/login/', {
		templateUrl:'/static/templates/login.html',
		controller  : 'loginController'

	})

	.when('/profile/', {
		templateUrl:'/static/templates/profile.html',
		controller : 'profileController'
	})

	.when('/register/',{
		templateUrl:'/static/templates/register.html',
		controller : 'registerController'
	})

    .when('/test1/', {
            templateUrl: '/static/templates/greetings.html',
            controller: 'testController'
    })

    .when('/cart/', {
            templateUrl: '/static/templates/cart.html',
            controller: 'cartController'
    })

	.otherwise({'redirectTo':'/'});
});
