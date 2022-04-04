var mongoose = require("mongoose")
import { collection } from "../../models/PriserInformation"
import dbConnect from "../../utils/dbConnect"

dbConnect()

export default async (req,res) => {

    let method = req.method

    if(method == "POST") {
        try {
            var connection = mongoose.connection
            await connection.db.collection('priserinformation').findOneAndUpdate({}, {$set: {
                basic: req.body.basic,                  //Basic
                basicfärg: req.body.basicfärg,          //Basic + färg
                avancerat: req.body.avancerat,          //Avancerat
                fyllning: req.body.fyllning,            //Påfyllning
                borttagning: req.body.borttagning,      //Borttagning
            }})
        }
        catch {

        }
    }

    if(method == "GET") {
        try {
            var connection = mongoose.connection
            let object = await connection.db.collection('priserinformation').findOne({})

            await res.json({
            basic: object.basic,                  //Basic
            basicfärg: object.basicfärg,          //Basic + färg
            avancerat: object.avancerat,          //Avancerat
            fyllning: object.fyllning,            //Påfyllning
            borttagning: object.borttagning,
            })
        }
        catch {
            res.json({
                basic: "250:-",                  //Basic
                basicfärg: "280:-",          //Basic + färg
                avancerat: "350:-",          //Avancerat
                fyllning: "220:-",            //Påfyllning
                borttagning: "200:-",
            })
        }
    }

}