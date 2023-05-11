const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please input username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please input email'],
        unique: true
    },
    phonenumber: {
        type: String,
        required: [true, 'Please input phone number'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please input password']
    },
    address: {
        type: String, 
        required: [true, 'Please input address']
    },
    referral: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)