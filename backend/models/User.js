const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    registrationDate: Date,
    dateOfBirth: {
        type: Date,
        required: true
    },
    profilePicture: {
        type: String
    }

});

module.exports = model('User', userSchema);