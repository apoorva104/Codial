const { request } = require('express');
const Post = require('../models/post')
const user=require('../models/user');


module.exports.create = async function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then((post)=>{
       // if(err){console.log('error in creating a post'); return;}

        return res.redirect('back');
    }).catch(err=>{
        console.log(err);
    });
    
}