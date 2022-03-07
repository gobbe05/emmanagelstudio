const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    image: String,
    type: String,
    comment: String
})

module.exports = mongoose.models.Images || mongoose.model('Images', PostSchema)