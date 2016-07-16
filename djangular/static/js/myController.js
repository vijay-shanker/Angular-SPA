
app.controller('loginController', function($scope, $http){
	$scope.message = 'Hello from loginController';
	$scope.loginSubmit = function() {
		var email = $scope.email;
		var password = $scope.password;
		$http.post( '/userprofile/login/',
			{'email':email, 'password':password}
		).success(function(data, status, headers, config){
			alert(status);
			alert(header);
			alert(config);
		})
	}

});
