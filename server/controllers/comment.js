const Comment = require('../models/commentModel');

exports.getComments = async (req, res) => {
    const {postId} = req.params;

    try{
        const comments = await Comment.find({'post._id': postId}).sort({'updatedAt': -1});

        if(comments.length){
            res.status(201).json({
                status: 'success',            
                comments
            })
        }

        res.status(201).json({
            status: 'success',            
            message: 'no comments under post',
            comments
        })
    }catch (err){
        res.status(401).json({
            status: 'failure',            
            error: err.message,
            message: 'failed to retrieve comments'
        })
    }
};

exports.createComment = async (req, res) => {      

    const {_id: token_userID, display_name} = req.user;
    const {comment: {
        user_id, 
        post_id, 
        contents}
    } = req.body;

    if(!req.user) {
        res.status(401).json({
            status: 'failed',
            message: 'token invalid'
        })
    }

    if(token_userID !== user_id){
        res.status(401).json({
            status: 'failed',
            message: 'User does not match token'
        })
    }

    try{
        const comment= await Comment.create({
            contents, 
            user: {
                _id: user_id,
                display_name
            },
            post: {
                _id: post_id,
            }
        });

        res.status(201).json({
            status: 'success',
            comment,
        });
    }catch(err){
        res.status(401).json({
            status: 'failed',
            error: err.message,
            message: 'failed to create post'
        })
    }
}

exports.deleteComment = async (req, res) => {
    const {id: postId} = req.params;     
    const { _id: userId} = req.user;

    const {deletedCount} = await Comment.deleteOne({
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
}

exports.patchComment = async (req, res) => {
    const {id: commentId} = req.params;     
    const { _id: userId} = req.user; 

    try{
        const updatedComment = await Comment.findOneAndUpdate({
            '_id': commentId,
            "user._id": userId,
        }, {...req.body});    
        
        res.status(200).json({
            status: 'success',
            message: `Updated post: ${commentId}`,
            updatedComment
        });
    }catch(err){
        res.status(401).json({
            error: err.message,
            message: 'failed to update COMMENT!'
        })
    }
}