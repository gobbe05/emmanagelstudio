const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    name: String,
    type: String,
    contact: String,
    date: String,
    time: String,
    dateofbooking: String
})

module.exports = mongoose.models.ConfirmedBooking || mongoose.model('ConfirmedBooking', PostSchema)