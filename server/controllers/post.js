const Post = require('../models/PostModel');
const moment = require('moment');
exports.createPost = async (req, res) => {      
    
    if(!req.user){
        res.status(401).json({
            message: 'INVALID TOKEN SOMEHOW'
        });
    } 

    const {_id, display_name} = req.user;
    
    try {
        const post = await Post.create({
            ...req.body,
            user: {
                _id,
                display_name
            },
        });

        res.status(201).json({
            status: 'success',
            post
        });
    }catch (err){
        res.status(401).json({
            error: err.message,
            message: 'failed to create POST!'
        })
    }
}

exports.getPosts = async (req, res) => {
    
    try {
        //TODO Establish Pagination
        const posts = await Post.find({}).sort({'updatedAt': -1});
        res.status(201).json({
            status: 'success',
            posts: [...posts].map(post => {
                const {createdAt} =  post
                return {...post._doc, createdAt: moment(createdAt).format('MM-DD-YYYY HH:SS')};
            }),
            meta: {
                "current_page": 'x',
                "per_page": 'xx',
                "total_entries": posts.length
            }
        }); 
    }catch (err){
        res.status(401).json({
            error: err.message,
            message: 'failed to retrieve posts!'
        })
    }
};

exports.deletePost = async (req, res) => {
    
    const {id: postId} = req.params;     
    const { _id: userId} = req.user;

    const {deletedCount} = await Post.deleteOne({
        '_id': postId,
        "user._id": userId,
    });    

    if(deletedCount){
        res.status(204).json({
            status: 'success',
        }); 
    }   

    res.status(401).json({
        status: 'fail',
        message: 'Cannot find post to delete'
    })
};

exports.patchPost = async (req, res) => {
    
    const {id: postId} = req.params;     
    const { _id: userId} = req.user; 

    try{
        const updatedPost = await Post.findOneAndUpdate({
            '_id': postId,
            "user._id": userId,
        }, {...req.body});    


        res.status(200).json({
            status: 'success',
            message: `Updated post: ${postId}`,
            updatedPost
        });
    } catch(err){
        res.status(401).json({
            error: err.message,
            message: 'failed to update POST!'
        })
    }
}

exports.checkPost = async (req, res, next) => { 
    
    const {comment: {post_id}} = req.body;

    try{
        const post = await Post.findById(post_id);
        console.log(post);
        next();
    }catch(err) {
        res.status(401).json({
            status: 'failed',
            error: err.message,
            message: 'cannot find post'
        });
    }    
}