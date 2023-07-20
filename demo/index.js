const express=require('express');
const router= express.Router();
const passport=require('passport');
console.log(passport.checkAuthentication);

module.exports=router;