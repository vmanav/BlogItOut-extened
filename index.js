const express = require('express');
const hbs = require('hbs')
const app = express();

app.use('/', express.static(__dirname + '/public'))
app.use('/scripts', express.static(__dirname + '/scripts'))
app.set('view engine', 'hbs')

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
        login: true
    })
})

// app.get('/login', (req, res) => {

//     res.render('login', {
//         title: "Log In",
//         login: true,
//         signup: false
//     })
// })

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