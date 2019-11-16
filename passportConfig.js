const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy

const { User } = require('./models/user')

// * { usernameField: 'email' } * --> tells passport that the usernameField is the 'email' FileReader.

passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({
            email: email
        },
            function (err, user) {

                // console.log("INSIDE THE PASSPORT CONFGI KA PURPOSE....");
                // console.log("-------------------------------------------------------");
                console.log(user)
                if (err) {
                    console.log("-----------ERROR-----------")
                    return done(err);
                }
                if (!user) {
                    console.log("-----------no user exists-----------")
                    return done(null, false);
                }
                if (user.password != password) {
                    console.log("-----------PASSWORDS do not macth-----------")
                    return done(null, false);
                }

                return done(null, user);
            });
    }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});


passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = passport