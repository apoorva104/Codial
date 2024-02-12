const Post = require('../models/post');
//const user = require('../models/user');
const User = require('../models/user');
module.exports.home = async function (req, res) {
    try {
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('comments')
        .populate('likes');


        let users = await User.find({});
        console.log(users)
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        })


    }
    catch (err) {
        console.log("Err in home controller", err);
    }


}
