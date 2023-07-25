const Post = require('../models/post');

module.exports.home =async function (req, res) {
    try{

        let posts= await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
                 return res.render('home', {
                title: "Codeial | Home",
                posts: posts
            });
        

    }
    catch(err){
        console.log("Err in home controller", err);
    }
    

}

// module.exports.actionName = function(req, res){}