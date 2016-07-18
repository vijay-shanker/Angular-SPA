
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

app.controller('profileController', function($scope, $http, $rootScope, $window){
	var token = localStorage.getItem('token');
	var userid = localStorage.getItem('userid');
	var userprofile_url = '/userprofile/users/' + userid + '/'
	var headers = {headers: {'Authorization': 'Token '+token} };

	$http.get(userprofile_url, headers).success(function(data, status, headers,config){
		if (status==200){
			$scope.username=data.username;
			$scope.email = data.email;
			$scope.contact_no = data.contact_no;
			$scope.userid=data.id;

			if (data.profile_pic){
				$scope.profile_pic = data.profile_pic
			}else{
				$scope.profile_pic = ''
			}

		}
	});
	$scope.uploadFile = function(files) {
	    var fd = new FormData();
	    //Take the first selected file
	    fd.append("file", files[0]);
	    fd.append("user_id", $scope.userid)

	    $http.post('/userprofile/upload-pic/', fd, {
	        withCredentials: false,
	        headers: {'Content-Type': undefined },
	        transformRequest: angular.identity
	    }).success(function(data){
	    	$window.location.reload();
	    });

};

});

app.controller('registerController', function($scope, $http){
	$scope.submitForm = function(){
		var fd = new FormData();
		var token = localStorage.getItem('token')
		var headers = {headers:{''}}
		fd.append('email', $scope.email);
		fd.append('contact_no', $scope.contact_no);
		fd.append('password', $scope.password);


		$http.post

	}
});

