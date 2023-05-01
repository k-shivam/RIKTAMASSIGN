const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    members:[{
        type: Object
    }],
    messageId:[String],
    createdBy:{
        type: String
    },
    updatedBy:{
        type:String
    },
    active:{
        type: Boolean,
        default: true
    }
},{
    timestamps: true
})

const Groups = mongoose.model('groups', groupSchema);

module.exports = Groups;
