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

const postSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    }
});

const commentSchema = mongoose.Schema({
        contents: {
            type: String,
            required: true
        },
        user: {
            type: userSchema
        },
        post: {
            type: postSchema,
        }
    },
    { collection: 'comment', timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

