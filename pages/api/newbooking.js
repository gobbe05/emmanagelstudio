import { Mongoose } from "mongoose"
import dbConnect from "../../utils/dbConnect"
import AvailableBooking from "../../models/AvailableBooking"
import ConfirmedBooking from "../../models/ConfirmedBooking"

dbConnect()

export default async (req,res) => {
    let method = req.method

    if(method == "POST") {
        try {
            let date = req.body.dataBody.date
            let time = req.body.dataBody.time
            let newBooking = new ConfirmedBooking({
                name: req.body.dataBody.name,
                type: req.body.dataBody.type,
                contact: req.body.dataBody.contact,
                date: req.body.dataBody.date + " . " + time,
                dateofbooking: new Date()
            })
            console.log("From, newBooking : " + date)
            console.log("From, newBooking : " + time)
            if(await AvailableBooking.exists({date: date, time:time})) {
                await newBooking.save()
                console.log("success")
                res.json({success: true})
                
            }
            else {
                console.log("From, newBooking : error")
                console.log(await AvailableBooking.exists({date: date, time:time}))
                res.json({success: false})
                
            }
        
        }
        catch (error) {
            console.log("An error was encountered...")
            console.log("Error : " + error)
            res.json({error: error})
            
        }
    }
}
