const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

const clientID = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const callbackURL = process.env.CALLBACK_URL

const options = {
    clientID,
    clientSecret,
    callbackURL,
    passReqToCallback: true,
}

const callback = async (request, accessToken, refreshToken, profile, done) => {
    try {
        console.log(request, accessToken, refreshToken, profile);

        return done(null, profile);
    } catch (err) {
        console.log(request, accessToken, refreshToken, profile, err);
        // return done(err);
    }
}

passport.use(new GoogleStrategy(options, callback));

// Serialization
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialization
passport.deserializeUser((user, done) => {
    userService
        .findOne({ _id: user._id })
        .then((data) => {
            return done(null, data);
        })
        .catch((err) => {
            return done(err);
        });
});