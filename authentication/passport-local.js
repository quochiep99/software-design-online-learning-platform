const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require('bcryptjs');

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});
passport.deserializeUser(function (id, cb) {
    User.findById(id, function (err, user) {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    })
})

// Log in
passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
},
    async function (email, password, cb) {
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                return cb(null, false, { message: "Incorrect email." });
            }

            // if user has not confirmed their emails then we prevent their login
            if (!user.isConfirmed) {
                return cb(null, false, { message: "You must confirm your email first before login !" });
            }

            // user exists, check for password 
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return cb(null, false, { message: "Incorrect password." });
            }

            //now user has been verified
            return cb(null, user);

        } catch (err) {
            console.log(err);
        }
    }
));