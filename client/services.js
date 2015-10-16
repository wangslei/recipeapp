angular.module('myApp').factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;

    function updateUserStatus() {
      var deferred = $q.defer();
      $http.get('/user/logincheck')
        .success(function (data) {
          if(data.status == 'logged in') {
            user = true;
          }
          else {
            user = false;
          }
          deferred.resolve();
        })
        .error(function (data) {
          user = false;
        });

        return deferred.promise;
    }

    function login(username, password) {
      var deferred = $q.defer();

      $http.post('/user/login', {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = true;
            deferred.resolve();
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

      return deferred.promise;
    }

    function getUserStatus() {
      return user;
    }

    function logout() {
      var deferred = $q.defer();

      $http.get('/user/logout')
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

      return deferred.promise;
    }

    function register(username, password) {
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/register', {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      return deferred.promise;
    }

    // return available functions for use in controllers
    return ({
      updateUserStatus: updateUserStatus,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });
}]);

angular.module('myApp').factory('RecipeService',
  ['$q', '$http',
  function ($q, $http) {

    function saveRecipe(recipe) {
      var deferred = $q.defer();
      $http.post('/recipe/saverecipe', recipe)
        .success(function (data) {
          deferred.resolve();
        })
        .error(function (data) {
          deferred.reject();
        });

        return deferred.promise;
    }

    function getRecipes() {
      console.log('in getRecipes');
      var deferred = $q.defer();
      $http.get('/recipe/getrecipes')
        .success(function (recipes) {
          deferred.resolve(recipes);
        })
        .error(function (data) {
          deferred.reject();
        });

        return deferred.promise;
    }

    // return available functions for use in controllers
    return ({
      saveRecipe: saveRecipe,
      getRecipes: getRecipes
    });
}]);