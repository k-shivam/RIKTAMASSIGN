const mongoose = require('mongoose');

const groupMessageSchema = new mongoose.Schema({
    groupId:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    likes:[String],
    likesCount:{
        type: Number,
        default: 0
    }
},{
    timestamps: true
});

const GroupMessages = mongoose.model('groupMessages', groupMessageSchema);

module.exports = GroupMessages;
