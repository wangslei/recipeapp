var express = require('express'),
    router = express.Router(),
    passport = require('passport');
    User = require('../models/user.js'),
    Recipe = require('../models/recipe.js');


router.post('/user/register', function(req, res) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({err: err})
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({status: 'Registration successful!'})
    });
  });
});

router.post('/user/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return res.status(401).json({err: info})
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'})
      }
      res.status(200).json({status: 'Login successful!'})
    });
  })(req, res, next);
});

router.get('/user/logincheck', function(req, res) {
  if(req.user)
    return res.status(200).json({status: 'logged in'});
  else
    return res.status(200).json({status: 'not logged in'});
});

router.get('/user/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'});
});

router.post('/recipe/saverecipe', function(req, res) {
  if(req.user) {
    var newRecipe = Recipe(req.body);
    newRecipe.creator = req.user.username;
    newRecipe.save(function(err) {
      if(err) throw err;
      console.log('recipe saved!');
      res.status(200).json({status: 'recipe created!'});
    });
  }
});

router.get('/recipe/getrecipes', function(req, res) {
  if(req.user) {
    Recipe.find({'creator': req.user.username}, function (err, recipes) {
      if(err) throw err;
      res.status(200).json(recipes);
    });
  }
});

module.exports = router;