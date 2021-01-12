const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/user");

require('dotenv').config();

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL || "http://localhost:3000/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            var user = await User.findOne({ email: profile._json.email });
            // Check if email has already been used and registered !
            if (user) {
                // replace the local user name with google account name
                user.name = profile._json.name;
                await user.save();
            } else {
                // email not used, then add it to db !            
                user = await User.create({
                    name: profile._json.name,
                    email: profile._json.email,
                    isConfirmed: true,
                });
            }
            return done(null, user);
        } catch (err) {
            console.log(err);
        }
    }
));


