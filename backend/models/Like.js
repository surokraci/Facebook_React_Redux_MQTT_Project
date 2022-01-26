const { Schema, model } = require('mongoose');

const likeSchema = new Schema({
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    authors: [String]

});

module.exports = model('Like', likeSchema);