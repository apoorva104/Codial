const express=require('express');
const router=express.Router();
const userController=require('../controlers/users_controller');
router.get('/profile',userController.profile);


module.exports=router;