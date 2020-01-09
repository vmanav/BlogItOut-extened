const express = require('express');
const hbs = require('hbs')
const app = express();
var session = require('express-session')
var flash = require('connect-flash')

const PORT = 3000;
// const { addNewUser } = require('./database')

app.use('/', express.static(__dirname + '/public'))

app.use('/scripts', express.static(__dirname + '/scripts'))

app.set('view engine', 'hbs')

// registering hbs partials
hbs.registerPartials(__dirname + '/views/partials')

// bcrypt setup
const bcrypt = require('bcrypt');
const saltRounds = 10;

// HBS helpers

// helper splits the Date recieved from Mongodb and show only usefull Data
hbs.registerHelper('splitDate', function (data) {
    var part = data.toString().split(" ");
    splittedDate = part[1] + " " + part[2] + " " + part[3];
    return splittedDate;
});

hbs.registerHelper('countLikes', function (data) {
    console.log("data ki length - ", data.length)
    return data.length;
});

// flash middleware
app.use(flash())

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
    useFindAndModify: false
})

// Models
var { User } = require('./models/user')
var { Blog } = require('./models/blog')

const passport = require('./passportConfig')

// session middleware
app.use(
    session({
        secret: 'Stupify is the secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 180, // keeeps logged in for 30 seconds
        },
    })
)

// after session middleware
app.use(passport.initialize())
app.use(passport.session())

// Dashboard Router
const { dashboardRouter } = require('./dashboard')

app.get('/', (req, res) => {
    // console.log("get @ `/`");
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

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {

        var newUser = new User({
            firstName: req.body.fname,
            lastName: req.body.lname,
            contactNo: req.body.number,
            email: req.body.email,
            bio: req.body.bio,
            linkedInProfile: req.body.lprofile,
            password: hash,
        });
        console.log("The New User =>")
        console.log(newUser)


        newUser.save(function (err) {
            if (err) {

                // duplicate  email error
                console.log("This is the error ->");
                console.log(err);

                alertMsg = "";
                if (err.errmsg == `E11000 duplicate key error collection: biodb.users index: email_1 dup key: { : "zmanav.1999@gmail.com" }`) {
                    // console.log("Account Already Exisist")
                    alertMsg = "Account Already Exisist"
                }
                console.log(alertMsg)
                // console.log("---------")
                // console.log(err.errmsg.split(" ")[1])
                // console.log(err.errmsg.split(" ")[7])
                // If Error Show Error -> render signupPage with a msg

                // NOTE : Render maybe a Error PAge instaed of a Signup Page so that the user can go back and the form data is not lost

                res.render('signup', {
                    title: "Sign Up",
                    signUpError: true,
                    alertMsg: alertMsg
                })
                res.render('signup', {
                    title: "Sign Up",
                    signUpError: true,
                    alertMsg: alertMsg
                })

            }
            else {
                // NO Error - succesfullSignup
                console.log("Record Saved in Database.")

                res.render('login', {
                    title: "Log In",
                    login: false,
                    signup: true,
                    succesfullSignup: true
                })
            }
        });

    })

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
})

app.get('/login', (req, res) => {

    if (alertMsg = req.flash().error) {
        console.log("flash exists")

        console.log(alertMsg)
        alertMsg = alertMsg[0]
    }
    else {
        alertMsg = null
    }

    res.render('login', {
        title: "Log In",
        alertMsg: alertMsg
    })
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.'
}),
)

// CRAEATE LOGOUT FUNCTIONALITY
app.get('/logout', function (req, res) {
    req.logout();

    req.session.destroy(function (err) {
        // destroys session for whatever user is logged in.
        res.redirect('/');
    })
})

// About Page
app.get('/about', (req, res) => {
    // res.send("Blog It Out REBORN")
    res.render('about')
})


app.get('/checkLikedOrNot', (req, res) => {
    console.log('get @ /checkLikedOrNot ');

    const blogId = req.query.blogId
    console.log("blogId -", blogId)

    // console.log("typeof req.user._id - ");
    // console.log(typeof req.user._id);
    // if (req.user._id == "5dfafc384c65b425faf5fb71") {
    //     console.log("REQ.USER._ID MATCHES ------------------")
    // }

    // console.log("req.user -",req.user);
    let checkLike = {
        userId: req.user._id,
        userName: req.user.firstName + ' ' + req.user.lastName,
    }
    console.log("checkLike - ", checkLike);

    Blog.findById(blogId, function (err, result) {
        if (err) {
            console.log(err);

        }
        if (result) {
            // console.log("result - ", result);
            console.log("result - ", result.likesArray);
            // let x = result.likesArray;
            if (result.likesArray.some(like => JSON.stringify(like.userId) == JSON.stringify(checkLike.userId))) {
                console.log("Object found inside the array.");
                res.send({
                    found: true
                })
            }
            else {
                console.log("Object not found.");
                res.send({
                    found: false
                })
            }

        }
        else {
            console.log("No Data Found.");
        }

    });

})



app.post('/like', (req, res) => {
    console.log('`post` @ `/like`.');

    // console.log("req.body variables....")
    // console.log(req.body.authorId);
    // console.log(req.body.authorName);
    // console.log(req.body.blogId);
    // console.log(req.body.like);
    // console.log("-----------")
    // console.log("`req.user` --->", req.user);

    let userId = req.user._id;
    let userName = req.user.firstName + ' ' + req.user.lastName;
    let blogId = req.body.blogId;
    let like = req.body.like;
    // console.log("userId", userId);
    // console.log("userName", userName);

    // console.log("finding blog")
    // Blog.find({
    //     _id: blogId
    // }, function (err, docs) {
    //     if (err) {
    //         console.log(err)
    //     }
    //     else {
    //         // console.log("docs")
    //         // console.log(docs)
    //         // console.log(typeof docs)
    //         // console.log("---")
    //         console.log(docs[0])

    //     }
    // })
    console.log("like value - ", like)
    // console.log("typeof like", typeof like)

    if (like == "like") {
        // Liking post
        // console.log("LIKE CASE ---------")
        let newLike = {
            userId: userId,
            userName: userName
        }

        Blog.findOneAndUpdate({ _id: blogId }, { $push: { likesArray: newLike } }, () => {
            console.log("Post Liked ..?")
            res.send("Liked Post")
        })
    }
    else if (like == "dislike") {
        // Disliking post
        // console.log("DISLIKE CASE ---------")

        Blog.findOneAndUpdate({ _id: blogId }, { $pull: { likesArray: { userId: userId } } }, () => {
            console.log("Post Disliked ..?")
            res.send("Disliked Post")
        })

    }

    // Disliking post - ALTERNATIVE
    // Blog.findByIdAndUpdate(
    //     blogId,
    //     { $pull: { likesArray: { authorId: authorId } } }, (err, model) => {
    //         if (err) {
    //             console.log(err);
    //             // return res.send(err);
    //         }
    //         console.log("Succ")
    //         // return res.json(model);
    //     })
})

// Function to check if a user if logged in or not 
function isLoggedIn(req, res, next) {
    if (req.user) {
        console.log("`req.user` exists.");
        // console.log(req.user);

        return next()
    }
    res.redirect('/login')
    console.log("Redirected via checkLoggedIn() function ---->")
}

// req.user = {
//     _id: 5dfafc384c65b425faf5fb71,
//     firstName: 'Manav',
//     lastName: 'Verma',
//     contactNo: '8851729421',
//     email: 'zmanav.1999@gmail.com',
//     bio: 'aaaaaaaaaaaaaa',
//     linkedInProfile: 'bbbbbbbbbb',
//     password: 'nalksahs',
//     __v: 0
// }

// Routing to dashboardRouter
app.use('/dashboard', isLoggedIn, dashboardRouter)

// --------------------------------------------------------

// Post route for Not Logged in users
// app.get('/post', (req, res) => {
//     // const blogId = req.query.blogId;
//     // console.log(blogId)
// })

// Show post to not logged in users
// Show that to like it you have to logg in

// --------------------------------------------------------

// for all linkks in the dashboadr the user should be checked in 

app.listen(PORT, () => {
    // console.log("Application running on : http://localhost:3000/")
    // console.log("Signup on : http://localhost:3000/signup")
    console.log("Login on : http://localhost:3000/login")
    console.log("Dashboard on : http://localhost:3000/dashboard")
    // console.log("Add New Blog on : http://localhost:3000/addBlog")

})

// // JS some comparion of object

// if (x.some((like) => {
//     // like.userId == checkLike.userId
//     console.log("like =")
//     console.log(like)
//     console.log(like.userId)
//     console.log(typeof like.userId)
//     console.log(JSON.stringify(like.userId))
//     console.log(typeof JSON.stringify(like.userId))
//     console.log("checkLike - ", checkLike);
//     console.log(checkLike.userId)
//     console.log(typeof checkLike.userId)
//     if (like.userId === checkLike.userId) {
//         console.log("DONO EQUAL HAI...")
//     }
// })) {
//     console.log("Object found inside the array.");
// }




// app.get('/dashboard', isLoggedIn, (req, res) => {
//     // , (req, res) => {

//     console.log('get @ dashboard 1')
//     const blogId = req.query.blogId
//     if (blogId) { console.log("blogId -", blogId) }
//     // console.log("logging req.user in /dashboard")
//     // console.log(req.user);

//     res.render('dashboard', {
//         firstName: req.user.firstName,
//     })
// })

// app.get('/dashboard/addBlog', isLoggedIn, (req, res) => {
//     // , (req, res) => {
//     res.render('addBlog', {
//         firstName: req.user.firstName,
//         lastName: req.user.lastName
//     })
// })


// app.post('/addBlog', (req, res) => {

//     let author = req.user.firstName + " " + req.user.lastName;
//     let likesArray = [];

//     var newBlog = new Blog({
//         blogTitle: req.body.title,
//         blogBody: req.body.body,
//         author: author,
//         blogTags: req.body.tags,
//         likesArray: likesArray,
//         likesCount: 0,
//         authorId: req.user._id
//     });

//     console.log("new Blog ->")
//     console.log(newBlog)

//     newBlog.save(function (err) {
//         if (err) {
//             console.log("This is the error ->");
//             console.log(err);
//         }
//         else {
//             // NO Error -
//             console.log("Blog added.")
//             // console.log('/?blog=' + newBlog._id)
//             // redirect

//             // redirect to a post page intead of dashboard
//             res.redirect('/dashboard/?blogId=' + newBlog._id)
//             // render to the new blog
//         }
//     })
// })