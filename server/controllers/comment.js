const Comment = require('../models/commentModel');
const moment = require('moment');

exports.getAllComments = async (req, res) => {
    try{
        //TODO aggregate this 
        const comments = await Comment.find({}).sort({'createdAt': -1});

        res.status(201).json({
            status: 'success',
            message: `${comments.length ? `Retrieved ${comments.length} comments` : 'Sorry no comments retrieved'}`, 
            comments: [...comments].map(comment => {
                const {createdAt: newCreatedAt} = comment;
                const createdAt = moment(newCreatedAt).format('MM-DD-YYYY HH:MM');
                const dateToCompare = moment(newCreatedAt).valueOf();

                return {...comment._doc, createdAt, dateToCompare}
            }),
        })
    }catch (err) {
        res.status(401).json({
            status: 'failure',            
            message: 'failed to retrieve comments',
        })
    }
}

// exports.getComments = async (req, res) => {
//     const {postId} = req.params;
    

//     try{
//         const comments = await Comment.find({'post._id': postId}).sort({'updatedAt': -1});

//         if(comments.length){


//             res.status(201).json({
//                 status: 'success', 
//                 message: `${comments.length ? `Retrieved ${comments.length} comments` : 'Sorry no comments retrieved'}`,           
//                 // comments: xxx,
//                 comments: [...comments].map(comment => {
//                     const {createdAt} =  comment
//                     return {...comment._doc, createdAt: moment(createdAt).format('MM-DD-YYYY HH:MM')};
//                 }),
//             })
//         }
//     }catch (err){
//         res.status(401).json({
//             status: 'failure',            
//             message: 'failed to retrieve comments',
//         })
//     }
// };

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

        const {createdAt: newCreatedAt} = comment;
        const createdAt = moment(newCreatedAt).format('MM-DD-YYYY HH:MM');
        const dateToCompare = moment(newCreatedAt).valueOf();

        res.status(201).json({
            status: 'success',
            comment: {...comment._doc, createdAt, dateToCompare}
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
        return;
    }else{
        res.status(401).json({
            status: 'fail',
            message: 'Cannot find post to delete'
        })
    }
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