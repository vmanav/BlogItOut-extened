const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy

const { User } = require('./models/user')

// bcrypt setup
const bcrypt = require('bcrypt');
const saltRounds = 10;

// * { usernameField: 'email' } * --> tells passport that the usernameField is the 'email' field.

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
                
                // Users Exists beyond this 

                console.log("Eneterd password - ", password);
                console.log("Database ka user.password - ", user.password);

                bcrypt.compare(password, user.password, function (err, response) {

                    if (response == false) {
                        console.log("PASSWORDS do not macth");
                        return done(null, false);
                    }
                    else {
                        console.log("PASSWORDS MATCH");
                        return done(null, user);
                    }
                })

                // old code
                // if (user.password != password) {
                //     console.log("-----------PASSWORDS do not macth-----------")
                //     return done(null, false);
                // }
                // return done(null, user);

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