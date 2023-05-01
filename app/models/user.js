const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    groupId:[String],
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    },
    likedMessages:[String],
    token:[{
        type:Object
    }]
},{
    timestamps: true
})

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
