const express=require('express');
const router= express.Router();
const homeController=require('../controlers/home_controler')
//console.log('hello');

router.get('/',homeController.home);
module.exports=router;