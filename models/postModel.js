const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    display_name: {
        type: String,
        required: true
    }
});

const postSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true
        },
        user: {
            type: userSchema,
        },
    },
    { collection: 'post', timestamps: true }
); 

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

// {"post": {"title": "My post from React", "body": "Lorem ipsum..."}}
