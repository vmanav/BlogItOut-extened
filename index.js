const express = require('express');
const app = express()
0
app.use('/', express.static(__dirname + 'public'))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.send("Blog It Out REBORN")
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Application running on :http://localhost:3000/")
})