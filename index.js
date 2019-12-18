const express = require('express');
const hbs = require('hbs')
const app = express();
var session = require('express-session')


// const { addNewUser } = require('./database')


app.use('/', express.static(__dirname + '/public'))
app.use('/scripts', express.static(__dirname + '/scripts'))
app.set('view engine', 'hbs')

// registering hbs partials
hbs.registerPartials(__dirname + '/views/partials')

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


const mongoose = require('mongoose')
// Url to connect to db 'naya-db'
const dbURL = 'mongodb://localhost:27017/biodb';

mongoose.connect(dbURL, {
    // useMongoClient: true,  -- NOT NESSACRY
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

var db = mongoose.connection;

var { User } = require('./models/user')

const passport = require('./passportConfig')

// session middleware
app.use(
    session({
        secret: 'Stupify is the secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 30, // keeeps logged in for 30 seconds
        },
    })
)


// after session middleware
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {

    res.render('index', {
        title: "Homepage",
        login: true,
        signup: true,
    })
})

app.get('/signup', (req, res) => {

    res.render('signup', {
        title: "Sign Up",
        signUpError: true
    })
})

app.post('/signup', (req, res) => {

    // console.log("Email ->", req.body.email)

    var newUser = new User({
        firstName: req.body.fname,
        lastName: req.body.lname,
        contactNo: req.body.number,
        email: req.body.email,
        bio: req.body.bio,
        linkedInProfile: req.body.lprofile,
        password: req.body.password,
    });
    console.log(newUser)
    // res.send(newUser)

    newUser.save(function (err) {
        if (err) {
            console.log(err)
            console.log("---------")
            console.log(err.errmsg)
            console.log("---------")
            console.log(err.errmsg.split(" ")[1])
            console.log(err.errmsg.split(" ")[7])
            // If Error Show Error -> render signupPage with a msg
            // res.render('signup', {
            //     title: "Sign Up",
            //     signup: false,
            //     login: true,
            //     alertMsg: 'Signup Failure Test'
            // })

            // res.render('signup', {
            //     title: "Sign Up",
            //     signUpError: true,
            //     alertMsg: ''
            // })

        }
        else {
            console.log("Record Saved in Database.")
            // NO Error
            // succesfullSignup
            res.render('login', {
                title: "Log In",
                login: false,
                signup: true,
                succesfullSignup: true
            })
        }
    });



    // db.collection('manuKiColl').insertOne({
    //     fname: req.body.fname,
    //     lname: req.body.lname,
    //     email: req.body.email,   
    //     number: req.body.number,
    //     bio: req.body.bio,
    //     lprofile: req.body.lprofile,
    //     password: req.body.password,
    //     passwordVerify: req.body.passwordVerify
    // })

    // ------------------------------------------------------------


    // res.send("Signup Succesfull hua !")
    // const obj = {
    //     fname: req.body.fname,
    //     lname: req.body.lname,
    //     email: req.body.email,
    //     number: req.body.number,
    //     bio: req.body.bio,
    //     lprofile: req.body.lprofile,
    //     password: req.body.password,
    //     passwordVerify: req.body.passwordVerify
    // }
    // console.log(obj)
    // res.send(obj)

    // Add User To database using 'addNewUser' from database.js
    // addNewUser({
    //     fname: req.body.fname,
    //     lname: req.body.lname,
    //     email: req.body.email,
    //     number: req.body.number,
    //     bio: req.body.bio,
    //     lprofile: req.body.lprofile,
    //     password: req.body.password,
    //     passwordVerify: req.body.passwordVerify
    // })

    // If Error Show Error -> render signupPage with a msg
    // res.render('signup', {
    //     title: "Sign Up",
    //     signup: false,
    //     login: true,
    //     alertMsg: 'Signup Failure Test'
    // })


    // // NO Error
    // // succesfullSignup
    // res.render('login', {
    //     title: "Log In",
    //     login: false,
    //     signup: true,
    //     succesfullSignup: true
    // })

})

app.get('/login', (req, res) => {

    res.render('login', {
        title: "Log In",
        logInError: true
    })
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
}),
)

app.get('/logout', function (req, res) {
    req.logout();

    req.session.destroy(function (err) {
        // destroys session for whatever user is logged in.
        res.redirect('/home');
    })
})

// About Page
app.get('/about', (req, res) => {
    // res.send("Blog It Out REBORN")

    res.render('about')
})

function isLoggedIn(req, res, next) {
    if (req.user) {
        console.log("`req.user` EXISTS", req.user)
        return next()
    }
    res.redirect('/login')
    console.log("Redirected via checkLoggedIn() function ---->")
}

app.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('dashboard')
})


// // Testing newFile fo hbs Partials
// app.get('/newFile', (req, res) => {
//     // res.send("Blog It Out REBORN")

//     res.render('newFile', {
//         login: true,
//         signup: true,
//     })
// })
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Application running on : http://localhost:3000/")
    console.log("Signup on : http://localhost:3000/signup")
    console.log("Login on : http://localhost:3000/login")
})