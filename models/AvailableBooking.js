const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    date: String,
    time: String,
})

module.exports = mongoose.models.AvailableBooking || mongoose.model('AvailableBooking', PostSchema)