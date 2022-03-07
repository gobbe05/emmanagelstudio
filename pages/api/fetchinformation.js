var mongoose = require("mongoose")
import { collection } from "../../models/AvailableBooking"
import dbConnect from "../../utils/dbConnect"

dbConnect()

export default async (req,res) => {

    let method = req.method

    if(method == "POST") {
        try {
            var connection = mongoose.connection
            await connection.db.collection('information').findOneAndUpdate({}, {$set: {text: req.body.text}})
        }
        catch {

        }
    }

    if(method == "GET") {
        try {
            var connection = mongoose.connection
            let object = await connection.db.collection('information').findOne({})

            await res.json({text: object.text})
        }
        catch {
            res.json({})
        }
    }

}