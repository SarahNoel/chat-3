app.controller('LoginController', ['$scope', '$location', '$rootScope', 'LoginServices', function($scope, $location, $rootScope, LoginServices){

$scope.logout = function(){
    LoginServices.logout().
    then(function(){
      $location.path('/loginpage');
    });
  };

  //register User
  $scope.register = function () {
    // initial values
    $scope.error = false;
    // call register from service
    LoginServices.register($scope.registerForm.username, $scope.registerForm.password)
      .then(function(data){
        $rootScope.user = data.user;
        $scope.showUser = data.user;
        $location.path('/play');
        $scope.registerForm = {};
    }).catch(function (data){
        $scope.registerForm = {};
        $scope.error = true;
        $scope.errorMessage = data.err.message;
      });
    };

    //user login
    $scope.login = function () {
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      LoginServices.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function (data) {
          $rootScope.userid = data.user._id;
          $rootScope.user = data.user;
          $scope.showUser = data.user;
          $location.path('/play');
          $scope.loginForm = {};
        })
        // handle error
        .catch(function (err) {
          console.log(err);
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });
      };
}]);
