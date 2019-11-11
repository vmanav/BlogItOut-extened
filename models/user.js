const mongoose = require('mongoose')

// Creating userSchema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    }, lastName: {
        type: String,
        required: true,
        trim: true
    },
    contactNo: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    bio: {
        type: String,
    },
    LinkedInProfile: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }

});

// Creating Mongoose Model from userSchema
var User = mongoose.model('User', userSchema);

module.exports = {
    User
}
// mongoose.connect('mongodb://localhost:27017/chaljabhai', { useNewUrlParser: true, useUnifiedTopology: true, });
// var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     console.log("Connected To Database")
//     // console.log("-->", db)
// });

// var kittySchema = mongoose.Schema({
//     name: String
// });

// var kitten = mongoose.model('kitten', kittySchema);

// var a = new kitten({ name: 'Silence' });
// console.log(a)
// var b = new kitten({ name: 'Loud' });
// console.log(b)
// // console.log("silence ka name->", silence.name)

// // console.log("->");
// // kitten.find(function (err, kittens) {
// //     if (err) return console.error(err);
// //     console.log(kittens);
// // })

// db.collection('testColl').insertOne(a)