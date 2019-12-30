const express = require('express')

const dashboardRouter = express.Router()

dashboardRouter.get('/dashboard', (req, res) => {
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

dashboardRouter.get('/dashboard/addBlog', (req, res) => {
    // , (req, res) => {

    res.render('addBlog', {
        firstName: req.user.firstName,
        lastName: req.user.lastName
    })
})

module.exports = { dashboardRouter }