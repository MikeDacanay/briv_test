const User = require('../models/UserModel');
// const tryCatchHandlr = require('../shared/helpers');

exports.createUser = async (req, res, err) => {
    try {
        const user = await User.create({...req.body});
        const {_id, display_name} =  user;
        

        res.header('Access-Control-Allow-Origin', '*');

        res.status(201).json({
            status: 'success',
            user: {
                _id, display_name
            },
        });
    } catch (err) {
        //TODO need error message handler        
        res.status(401).json({
            err,
            message: 'failed to create user',
        });
    }
};

exports.loginUser = async(req, res) => {    
    const user = await User.findOne({...req.body});   

    if(user){
        const {_id, display_name} = user;

        res.header('Access-Control-Allow-Origin', '*');
        res.status(201).json({
            status: 'success',
            user: {_id, display_name}
        });
        return;
    }

    res.status(401).json({
        message: 'failed to find user',
    });
}