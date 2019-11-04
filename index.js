const express = require('express');
const app = express();

app.use('/', express.static(__dirname + '/public'))
app.use('/scripts', express.static(__dirname + '/scripts'))
app.set('view engine', 'hbs')

const hbs = require('hbs')
hbs.registerPartials(__dirname + '/views/partials')

app.get('/', (req, res) => {
    // res.send("Blog It Out REBORN")

    res.render('index')
})

// Testing newFile fo hbs Partials
app.get('/newFile', (req, res) => {
    // res.send("Blog It Out REBORN")

    res.render('newFile', {
        login: false,
        signup: true,
    })
})


app.get('/signup', (req, res) => {
    // res.send("Blog It Out REBORN")

    res.render('signup')
})

app.get('/login', (req, res) => {
    // res.send("Blog It Out REBORN")

    res.render('login')
})

app.get('/about', (req, res) => {
    // res.send("Blog It Out REBORN")

    res.render('about')
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Application running on : http://localhost:3000/")
})