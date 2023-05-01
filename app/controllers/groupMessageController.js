const express = require('express');
const router = express.Router();

const Groups = require('../models/group');
const GroupMessages = require('../models/groupMessages');
const Users = require('../models/user');
const logger = require('../logger');

const sendMessage = async(req, res) =>{
    const {message, userId } = req.body || {};
    const {groupId} = req.params || {};

    try{
        const groupmsg = new GroupMessages({
            groupId,
            message,
            userId
        })
        await groupmsg.save();
        return res.status(201).json(groupmsg);
    }catch(err){
        logger.error(err)
        return res.status(500).send({message:"Internal Server Error"})
    }
}

const likeMessages = async(req, res) =>{
    const {groupId, messageId} = req.params || {};
    const userId = req.user._id

    try{
        const msg = await GroupMessages.findById(messageId);
        if(!msg || msg.groupId.toString() !== groupId){
            return res.status(404).json({ message: 'Message not found' });
        }
        if(msg.likes.includes(userId)){
            return res.status(400).json({ message: 'User already liked this message' });
        }
        msg.likes.push(userId);
        msg.likesCount +=1
        await msg.save();
        return res.json(msg)
    }catch(err){
        logger.error(err)
        return res.status(500).send({message:"Internal Server Error"})
    }
}


module.exports = {
    sendMessage,
    likeMessages
}
