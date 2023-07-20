const express = require('express');
const router = express.Router();
const passport = require('passport');
//const passport=require('../config/passport-local-strategy');
const userController = require('../controlers/users_controller');
router.get('/profile', (passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }

  // if the user is not signed in
  return res.redirect("/users/sign-in");
}), userController.profile);
router.get('/sign-in', userController.sign_in);
router.get('/sign-up', userController.sign_up);

router.post('/create', userController.create);
router.get('/sign-out', userController.destroySession);


// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
  'local',
  { failureRedirect: '/users/sign-in' },
), userController.createSession);

module.exports = router;