const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/user');
const { SECRET, HASHNUM } = require('../settings');
const logger = require('../logger');
const { ObjectId } = require('mongodb');

const addUser = async(req, res) =>{
    const {name, email, password, isAdmin} = req.body || {};
    try{
        const hash = await bcrypt.hash(password, parseInt(HASHNUM));
        if(!hash){
            logger.error('Unable to generate hash');
            return res.status(500).send({message: 'Internal Server Error'})
        }
        const user = new Users({
            name,
            email,
            password: hash,
            isAdmin
        })
        await user.save();
        return res.status(201).send({
            message: "User added successfully",
            auth: true
        })
    }catch(err){
        console.log(err)
        logger.error(err);
        return res.status(500).send({message: 'Internal Server Error'})
    }
}

const editUser = async(req, res) =>{
    const { id } = req.params || {};
    const { name, email, isAdmin} = req.body || {};
    try{
        await Users.updateOne({ _id: ObjectId(id)},
        {
            "$set":{
                name,
                email,
                isAdmin
            }
        })
        res.status(200).send('User Updated');
        return
    }catch(err){
        logger.error(`Error while updating user ${err}`);
        res.status(500).send('Internal Server Error');
    }
}


module.exports = {
    addUser,
    editUser
}
