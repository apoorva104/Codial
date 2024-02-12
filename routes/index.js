const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home_controler')
//console.log('hello');
//console.log(passport.checkAuthentication)
router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/likes', require('./likes'));
router.use('/api', require('./api'));

module.exports = router;