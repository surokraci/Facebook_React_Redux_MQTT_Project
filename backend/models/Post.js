const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    photoUrl: String,
    responses: Number,
    creationDate: Date,
    author: {type: Schema.Types.ObjectId, ref: 'User'}

});

module.exports = model('Post', postSchema);