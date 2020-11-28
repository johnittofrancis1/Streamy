const mongoose = require('mongoose');

const stream_schema = new mongoose.Schema(
    {
        title: String,
        description: String,
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    }
);
module.exports = mongoose.model("Stream", stream_schema);