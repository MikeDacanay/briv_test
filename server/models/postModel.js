const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: Number,
    display_name: String,
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
        }
    },
    { collection: 'post', timestamps: true }
); 

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

// {"post": {"title": "My post from React", "body": "Lorem ipsum..."}}
