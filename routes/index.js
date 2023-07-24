const express=require('express');
const router= express.Router();
const passport = require('passport');
const homeController=require('../controlers/home_controler')
//console.log('hello');
//console.log(passport.checkAuthentication)
router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts', require('./posts'));

module.exports=router;