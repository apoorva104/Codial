const User = require('../models/user');

module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: "User Profile"
    });
}

module.exports.sign_in = function (req, res) {
    // if (req.isAuthenticated) {
    //     return res.redirect('/users/profile');
    // }

    return res.render('user_sign_in', {
        title: "Sign-in"
    });
}

module.exports.sign_up = function (req, res) {
    // if (req.isAuthenticated) {
    //     return res.redirect('/users/profile');
    // }

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
    return res.redirect('/');
}


//sign-out
module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log("error in logging out");
        }
    });

    return res.redirect('/');
}
