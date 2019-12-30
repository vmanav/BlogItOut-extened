const express = require('express')

const dashboardRouter = express.Router()

var { Blog } = require('../models/blog')



dashboardRouter.get('/', (req, res) => {
    // , (req, res) => {

    const blogId = req.query.blogId
    if (blogId) { console.log("blogId -", blogId) }

    // find the Blog as per the BlogId and render it on dashboard


    // console.log("logging req.user in /dashboard")
    // console.log(req.user);

    res.render('dashboard', {
        firstName: req.user.firstName,
    })
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

    var newBlog = new Blog({
        blogTitle: req.body.title,
        blogBody: req.body.body,
        author: author,
        blogTags: req.body.tags,
        likesArray: likesArray,
        likesCount: 0,
        authorId: req.user._id
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

module.exports = { dashboardRouter }