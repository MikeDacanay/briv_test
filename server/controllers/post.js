const Post = require('../models/PostModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: '../config.env'});

exports.createPost = async (req, res) => {
    try {
        const post = await Post.create({...req.body});
        res.status(201).json({
            status: 'success',
            message: 'CREATING POSTSSS!!!'
        });
    }catch (err){
        res.status(401).json({
            err,
            message: 'failed to create POST!'
        })
    }
}