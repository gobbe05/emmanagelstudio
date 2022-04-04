const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    basic: String,
    basicfärg: String,
    avancerat: String,
    fyllning: String,
    borttagning: String,
})

module.exports = mongoose.models.PriserInformation || mongoose.model('PriserInformation', PostSchema)