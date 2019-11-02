const express = require('express');
const app = express();

app.use('/', express.static(__dirname + '/public'))
app.use('/scripts', express.static(__dirname + '/scripts'))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    // res.send("Blog It Out REBORN")

    res.render('index')
})

app.get('/about', (req, res) => {
    // res.send("Blog It Out REBORN")

    res.render('about')
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Application running on : http://localhost:3000/")
})