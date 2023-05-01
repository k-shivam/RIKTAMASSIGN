const express = require('express');
const router = express.Router();

const Groups = require('../models/group');
const Users = require('../models/user');
const logger = require('../logger');


const createGroup = async(req, res) =>{
    const {name, description } = req.body || {};
    const userEmail = req.user.email;
    try{
        const group = new Groups({
            name,
            description,
            createdBy: userEmail,
            updatedBy: userEmail
        })
        await group.save();
        onslotchange.lo
        return res.status(201).send({message:"Group created successfully", data:group._id})
    }catch(err){
        logger.error(`Error occured ${err}`);
        return res.status(500).send({message:"Internal Server Error"});
    }
}


const deleteGroup = async(req, res) =>{
    const {groupId} = req.params || {};
    try{
        const group = await Groups.findOne({_id: groupId, active:true});
        if(!group){
            return res.status(404).json({ message: 'Group not found' });
        }
        if(group.createdBy == req.user.email || req.user.isAdmin){
            await group.updateOne({
                "$set":{
                    active: false,
                    updatedBy: req.user.email
                }
            });
            return res.status(200).send({message: "Group deleted successfully"});
        }
        return res.status(400).send({message: "Cannot delete as other user created this group"})
    }catch(err){
        logger.error(err)
        return res.status(500).send({message: "Internal Server Error"});
    }
}


const searchGroup = async(req, res) =>{
    const {groupId} = req.params || {};
    let groups;
    try{
        if(groupId){
            groups = await Groups.findOne({_id: groupId, active:true});
        }else{
            groups = await Groups.find();
        }
        if(groups){
            return res.status(200).json(groups);
        }
        else{
            return res.status(404).send({message:"No groups found"});
        }
    }catch(err){
        logger.error(err);
        return res.status(500).send({message: "Internal Server Error"});
    }
}


const addMembers = async(req, res) =>{
    const {groupId} = req.params || {};
    const {userId} = req.body || {};
    try{
        const group = await Groups.findById(groupId);
        if(!group){
            return res.status(404).json({message: "Group not found"});
        }
        const user = await Users.findById(userId);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const {name, email, _id} = user || {}
        group.members.push({
            name, email, _id
        });
        await group.save();
        return res.json(group)
    }catch(err){
        logger.error(err);
        return res.status(500).send({message:"Internal server error"});
    }
}


module.exports = {
    createGroup,
    deleteGroup,
    searchGroup,
    addMembers
}
