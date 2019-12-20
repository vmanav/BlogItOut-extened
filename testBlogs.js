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

var { Blog } = require('./models/blog')


var newBlog = new Blog({
    blogTitle: "TestBlog",
    blogBody: "TestBlogBodyTestBlogBodyTestBlogBodyTestBlogBodyTestBlogBody",
    author: "TestAuthor",
    blogTags: "TestTags,TestTags,TestTags",
    
    likesArray: ["TestLike", "TestLike", "TestLike", "TestLike"],
    // if Array vala hata dia then => EMPTY ARRAY
    likesCount: 10,
    // if Likes Count hata dia then => NO such record in database

})

console.log(newBlog)

newBlog.save(function (err) {
    if (err) {
        // error
        console.log("This is the error ->");
        console.log(err);
    }
    else {
        // NO Error - succesfullSignup
        console.log("Record Saved in Database.")
    }
});