const jwt = require('jsonwebtoken');

const {SECRET} = require('../settings');
const logger = require('../logger');
const Users = require('../models/user');

const invalidateSet = new Set();
global['invalidateSet'] = invalidateSet

const authenticateRoutes = async(req, res, next) =>{
    var token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    try{
        const decoded = await jwt.verify(token, SECRET);
        if(!decoded.isAdmin){
            return res.status(401).send({message:'User not authorized to add new user.'})
        }
        next();
    }catch(err){
        logger.error(err);
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'});
    }
}

const authRoutes = async(req, res, next) =>{
    var token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    try{
        const decoded = await jwt.verify(token, SECRET);
        const user = await Users.findById(decoded.userId);
        if(!user){
            return res.json({message:"Unauthorized Access"});
        }
        req.user = user;
        next();
    }catch(err){
        console.log(err)
        logger.error(err);
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'});
    }
}


module.exports = {
    authenticateRoutes,
    authRoutes
}
