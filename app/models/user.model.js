const mongoose = require("mongoose")
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

let UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        max: 100
    },
    email: {
        type: String,
        max: 50
    },
    hashedPassword: {
        type: String,
        required: true,
        max: 100
    }
});

module.exports = mongoose.model('User', UserSchema)