
app.controller('loginController', function($scope, $http, $window, $rootScope){
	$scope.message = 'Hello from loginController';
	$scope.loginSubmit = function() {
		var email = $scope.email;
		var password = $scope.password;
		$http.post( '/userprofile/login/',
			{'email':email, 'password':password}
		).success(function(data, status, headers, config){
			if (status == 200){
				localStorage.setItem('token', data.token);
				localStorage.setItem('userid', data.userid);
				$window.location.href = '#/profile/';
			}
		});
	};

});

app.controller('profileController', function($scope, $http, $rootScope){
	var token = localStorage.getItem('token');
	var userid = localStorage.getItem('userid');
	var userprofile_url = '/userprofile/users/' + userid + '/'
	var headers = {headers: {'Authorization': 'Token '+token} };

	$http.get(userprofile_url, headers).success(function(data, status, headers,config){
		if (status==200){
			$scope.username=data.username;
			$scope.email = data.email;
			$scope.contact_no = data.contact_no;
			if (data.profile_pic){
				$scope.profile_pic = data.profile_pic
			}else{
				$scope.profile_pic = ''
			}
		}
	});

});

