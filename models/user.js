const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    pfp: {type: File, required: false},
    coverPhoto: {type: File, required: false},
    joinedOn: {type: Date, required: true},
    followers: {type: Number, required: true},
    following: {type: Number, required: true},
    Bio: {type: String, required: false},
    productReviews: {type: Object, required: false},
    sellerReviews: {type: Object, required: false}
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;