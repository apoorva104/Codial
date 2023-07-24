const Post = require('../models/post');

module.exports.home = function(req, res){
console.log(req.user)
    // populate the user of each post
    Post.find({}).populate('user').exec(function(err, posts){
      //  console.log(posts)
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts
        });
    })

}
