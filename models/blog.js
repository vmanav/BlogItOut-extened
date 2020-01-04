const mongoose = require('mongoose')

// Creating blogSchema
const blogSchema = new mongoose.Schema({
    blogTitle: {
        type: String,
        required: true,
        trim: true
    },
    blogBody: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    blogTags: {
        type: String,
        trim: true
    },
    likesArray: {
        type: Array
    },
    authorId: {
        type: Object,
    },
    datePosted: {
        type: Date,
    }

});

// Creating Mongoose Model from blogSchema
var Blog = mongoose.model('Blog', blogSchema, 'blogs');// 'blogs' -> Collection Name

module.exports = {
    Blog
}
