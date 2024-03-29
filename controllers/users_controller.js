const User = require('../models/user');
const fs = require('fs');
const path = require('path');
module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });

}
// module.exports.update = async function (req, res) {    
// if (req.user.id == req.params.id) {    
// try {     
// let user= await User.findById(req.params.id);       
// User.uploadedAvatar(req, res, function(err)
// {         
//      if(err){      
//         console.log('*****Multer Error', err)          }    
//         user.name = req.body.name;     
//         user.email = req.body.email;       
//         if (req.file)
//         {        
//           if(user.avatar)
//           {      
//                  fs.unlinkSync(path.join(__dirname, '..', user.avatar));           
//           }     
//                  //this is saving the path of the uploaded file into the avatar field in the user          
//                  user.avatar = User.avatarPath + '/' + req.file.filename;        
//         }         
//                  user.save();    
//                  return res.redirect('back');       
//  }) }         
//      catch (err) {    

//             req.flash('error', err);  
//                 return res.redirect('back');     
//             }  }
//             else {    
//                 req.flash('error', 'Unauthorized');
//                     return res.status(401).send('Unauthorized');  }  }

module.exports.update = async function (req, res) {


    if (req.user.id == req.params.id) {

        try {

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) { console.log('*****Multer Error: ', err) }

                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {
                    // console.log(user.avatar)

                    if (user.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }


                    //     // this is saving the path of the uploaded file into the avatar field in the user
                    //     user.avatar = User.avatarPath + '/' + req.file.filename;
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }


    } else {
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}

module.exports.sign_in = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: "Sign-in"
    });
}

module.exports.sign_up = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Sign-up"
    });
}

module.exports.create = function (req, res) {

    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log("error in finding user"); return };

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log("error in finding user"); return };

                return res.redirect('/users/sign-in');

            })
        }
        else {
            return res.redirect('back');
        }
    });

}

module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}


//sign-out
module.exports.destroySession = function (req, res) {
    req.flash('success', 'You are Logged out!');
    req.logout(function (err) {
        if (err) {
            console.log("error in logging out");
        }
    });


    return res.redirect('/');
}
