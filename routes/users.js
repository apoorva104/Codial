const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users_controller');
router.get('/profile/:id', (passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }

  // if the user is not signed in
  return res.redirect("/users/sign-in");
}), userController.profile);
router.post('/update/:id', passport.checkAuthentication, userController.update);
router.get('/sign-in', userController.sign_in);
router.get('/sign-up', userController.sign_up);

router.post('/create', userController.create);
router.get('/sign-out', userController.destroySession);


router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/users/sign-in' }), userController.createSession);


// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
  'local',
  { failureRedirect: '/users/sign-in' },
), userController.createSession);

module.exports = router;