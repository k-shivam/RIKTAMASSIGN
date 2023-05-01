const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Users = require('../models/user');
const logger = require('../logger');
const { SECRET } = require('../settings');


const getAllUsers = async(req, res) =>{
    try{
        if(req.user.token.length == 0){
            return res.json({message:"Unauthorized Access"})
        }
        const users = await Users.find({});
        if(!users){
            res.status(404).send({message: 'User list empty'})
            return
        }
        res.json(users)
        return
    }catch(err){
        logger.error(err)
        res.status(500).send({message: "Internal Server Error"});
    }
}


const login = async(req, res) =>{
    const {email, password} = req.body || {};
    let result = {}
    try{
        const user = await Users.findOne({email});
        if(!user){
            res.status('401').send({message: "Invalid email or password"})
            return
        }else{
            result = await bcrypt.compare(password, user.password)
        }
        if(!result){
            return res.status(401).send('Invalid Email or Password');
        }else{
           const token = await jwt.sign({email, isAdmin: user.isAdmin, userId: user._id}, SECRET,{
               expiresIn: '1d',
           });

           let oldTokens = user.token || [];
           if(oldTokens.oldTokens){
              oldTokens = oldTokens.filter((t) =>{
                  const timediff = (Date.now() - parseInt(t.signedAt))/1000
                  console.log(timediff)
                  if(timediff < 86400){
                      return t
                  }
               })
           }
           await Users.findByIdAndUpdate(user._id, {token:[...oldTokens,{token, signedAt:Date.now().toString()}]})
           return res.status(200).send({token})
        }
    }catch(err){
        logger.error(err);
        return res.status(500).send({message: "Internal Server Error"});
    }
}


const logout = async(req, res) =>{
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            message:"Authorization failed"
        })
    }
    const tokens = req.user.token;
    const newTokens = tokens.filter((t) => t.token!==token)
    console.log(req.user._id)
    await Users.updateOne({_id:req.user._id},{
        "$set":{
            token:newTokens
        }
    })
    return res.json({success:true, message:"signout sucess"});
}

module.exports = {
    login,
    getAllUsers,
    logout
}
