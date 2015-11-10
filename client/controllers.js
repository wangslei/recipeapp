angular.module('myApp').controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    if(AuthService.getUserStatus())
      $location.path('/');

    $scope.login = function () {
      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });
    };
}]);

angular.module('myApp').controller('logoutController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });

    };

}]);

angular.module('myApp').controller('registerController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);

angular.module('myApp').controller('headerController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {
    $scope.loggedin = AuthService.getUserStatus();

    console.log('loggedin: ',$scope.loggedin);

    $scope.login = function () {
      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });
    };

    $scope.logout = function () {
      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });

    };

}]);

angular.module('myApp').controller('homeController',
  ['$scope', '$location', 'RecipeService',
  function ($scope, $location, RecipeService) {
    $scope.recipe = {};
    $scope.recipe.ingredients = [];

    $scope.addIngredient = function () {
      var new_ing = {};
      if(!$scope.cur_ingred || !$scope.cur_ingred.name || !$scope.cur_ingred.amount || !$scope.cur_ingred.unit) {
        alert('please fill out ingredient properly');
        return;
      }
      new_ing.name = $scope.cur_ingred.name;
      new_ing.amount = $scope.cur_ingred.amount;
      new_ing.unit = $scope.cur_ingred.unit;

      $scope.recipe.ingredients.push(new_ing);
      $scope.cur_ingred = {};
      // console.log($scope.recipe.ingredients);
    };

    $scope.addRecipe = function () {
      console.log($scope.recipe);
      RecipeService.saveRecipe($scope.recipe).then(function () {
        $scope.recipe = {};
        $scope.recipe.ingredients = [];
        console.log('successfully added recipe');
        $location.path('/profile');
      }).catch(function () {
        console.log('add recipe went awry');
      });
    };
}]);

angular.module('myApp').controller('ingredientsController',
  ['$scope', '$location', 'RecipeService', 
  function ($scope, $location, RecipeService) {
    console.log('in ingredientsController');
    $scope.useringredients = [];
    RecipeService.getUserIngredients().then(function (ingreds) {
      // $scope.useringredients = ingreds;
      console.log(ingreds);
      console.log('get useringredients success');
    });

    $scope.addIngredient = function () {
      var new_ing = {};
      if(!$scope.ingredient || !$scope.ingredient.name || !$scope.ingredient.amount || !$scope.ingredient.unit) {
        alert('please fill out ingredient properly');
        return;
      }
      new_ing.name = $scope.ingredient.name;
      new_ing.amount = $scope.ingredient.amount;
      new_ing.unit = $scope.ingredient.unit;

      RecipeService.saveUserIngredients($scope.useringredients).then(function () {
        $location.path('/ingredients');
      })
    };
}]);

angular.module('myApp').controller('profileController',
  ['$scope', '$location', 'RecipeService',
  function ($scope, $location, RecipeService) {
    console.log('in profileController');
    $scope.userrecipes = [];
    RecipeService.getRecipes().then(function (recipes) {
      $scope.userrecipes = recipes;
      console.log('successfully grabbed user recipes');
    });
}]);

