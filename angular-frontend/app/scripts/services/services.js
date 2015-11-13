app.factory('LoginServices', [ '$http','$q', '$rootScope', function($http, $q, $rootScope) {
  var user = null;

  return {isLoggedIn: isLoggedIn,
          getUserStatus: getUserStatus,
          login: login,
          logout: logout,
          register: register,
          update: update};


    function isLoggedIn(){
      if (user){
        return true;
      }
      else {
        return false;
      }
    }

    function getUserStatus(){
      return user;
    }

    function update(updateThis){
      // create a new instance of deferred
      var deferred = $q.defer();
      $http.put('/users/update', updateThis)
      .success(function(data, status){
          if(status === 200 && data.status){
            console.log(data);
            user = true;
            deferred.resolve(data);
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });
      // return promise object
      return deferred.promise;
    }

    function login (username, password){
      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/users/login', {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = true;
            deferred.resolve(data);
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;
    }

    function logout() {
      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/users/logout')
        // handle success
        .success(function (data) {
          user = false;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });
      // return promise object
      return deferred.promise;
    }

  function register(username, password){
  // create a new instance of deferred
    var deferred = $q.defer();

    // send a post request to the server
    $http.post('/users/register', {username: username, password: password})
      // handle success
      .success(function (data, status) {
        if(status === 200 && data.status){
          login(username, password);
          // user = true;
          // $rootScope.user = username;

          deferred.resolve(data);
        } else {
          deferred.reject();
        }
      })
      // handle error
      .error(function (data) {
        deferred.reject(data);
      });

    // return promise object
    return deferred.promise;
  }

}]); //end login services
