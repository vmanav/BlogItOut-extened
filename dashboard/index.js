const express = require('express')

const dashboardRouter = express.Router()

var { Blog } = require('../models/blog')


dashboardRouter.get('/', (req, res) => {
    // , (req, res) => {

    const blogId = req.query.blogId
    console.log("blogId -", blogId)

    if (blogId) {
        console.log("query exists")

        Blog.find({
            _id: blogId
        }, function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                // console.log("docs")
                // console.log(docs)
                // console.log(typeof docs)
                // console.log("---")
                console.log(docs[0])
                res.render('dashboard', {
                    // firstName: req.user.firstName,
                    post: docs[0]
                })
            }
        })

    }
    else {
        res.render('dashboard', {
            // firstName: req.user.firstName,
        })

    }
    // find the Blog as per the BlogId and render it on dashboard


    // console.log("logging req.user in /dashboard")
    // console.log(req.user);

})

dashboardRouter.get('/addBlog', (req, res) => {
    // , (req, res) => {
       
    res.render('addBlog', {
        firstName: req.user.firstName,
        lastName: req.user.lastName
    })
})


dashboardRouter.post('/addBlog', (req, res) => {

    let author = req.user.firstName + " " + req.user.lastName;
    let likesArray = [];
    
    let datePosted = new Date();
    console.log(datePosted);

    var newBlog = new Blog({
        blogTitle: req.body.title,
        blogBody: req.body.body,
        author: author,
        blogTags: req.body.tags,
        likesArray: likesArray,
        authorId: req.user._id,
        datePosted: datePosted
    });

    console.log("new Blog ->")
    console.log(newBlog)

    newBlog.save(function (err) {
        if (err) {
            console.log("This is the error ->");
            console.log(err);
        }
        else {
            // NO Error -
            console.log("Blog added.")
            // console.log('/?blog=' + newBlog._id)
            // redirect

            // redirect to a post page intead of dashboard
            res.redirect('/dashboard/?blogId=' + newBlog._id)
            // render to the new blog
        }
    })
})


dashboardRouter.get('/userBlogs', (req, res) => {
    // , (req, res) => {

    res.render('userBlogs', {
        // firstName: req.user.firstName,
        // lastName: req.user.lastName
    })
})


module.exports = { dashboardRouter }