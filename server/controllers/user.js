const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: '../config.env'});

exports.createUser = async (req, res) => {
    try {
        const user = await User.create({...req.body});
        const {_id, display_name} =  user;
        //TODO CREATE EXPIRE FOR JWT TOKEN
        const token = jwt.sign({_id, display_name}, process.env.JWT_KEY);
        res.status(201).json({
            status: 'success',
            user: {
                _id, display_name
            },
            token
        });
    } catch (err) {
        //TODO need error message handler        
        res.status(401).json({
            error: err.message,
            message: 'failed to create user',
        });
    }
};

exports.loginUser = async(req, res) => {        
    const user = await User.findOne({...req.body});   

    if(user){
        const {_id, display_name} = user;
        //TODO CREATE EXPIRE FOR JWT TOKEN
        const token = jwt.sign({_id, display_name}, process.env.JWT_KEY);
        res.status(201).json({
            status: 'success',
            user: {_id, display_name},
            token
        });
        return;
    }

    res.status(401).json({
        status: 'failed',
        message: 'failed to find user'
    });
}