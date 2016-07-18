
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
		templateUrl:'static/templates/profile.html'
	})
	
	.otherwise({'redirectTo':'/'});
});