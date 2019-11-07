const express = require('express');
const hbs = require('hbs')
const app = express();

app.use('/', express.static(__dirname + '/public'))
app.use('/scripts', express.static(__dirname + '/scripts'))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// registering hbs partials
hbs.registerPartials(__dirname + '/views/partials')

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
        signup: false,
        login: true,
        signUpError: true
    })
})

app.post('/signup', (req, res) => {
    // res.send("Signup Succesfull hua !")
    const obj = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        number: req.body.number,
        bio: req.body.bio,
        lprofile: req.body.lprofile,
        password: req.body.password,
        passwordVerify: req.body.passwordVerify,
    }
    // console.log(obj)
    // res.send(obj)
    // Add User To database

    // If Error Show Error -> render signupPage with a msg
    // res.render('signup', {
    //     title: "Sign Up",
    //     signup: false,
    //     login: true,
    //     alertMsg: 'Signup Failure Test'
    // })

    // NO Error
    // render(Login with msg)
})

app.get('/login', (req, res) => {

    res.render('login', {
        title: "Log In",
        login: false,
        signup: true,
        logInError: true
    })
})

// Testing newFile fo hbs Partials
app.get('/newFile', (req, res) => {
    // res.send("Blog It Out REBORN")

    res.render('newFile', {
        login: true,
        signup: true,
    })
})


app.get('/about', (req, res) => {
    // res.send("Blog It Out REBORN")

    res.render('about')
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Application running on : http://localhost:3000/")
})