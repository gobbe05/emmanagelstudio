import { Mongoose } from "mongoose"
import dbConnect from "../../../utils/dbConnect"
import AvailableBooking from "../../../models/AvailableBooking"
import ConfirmedBooking from "../../../models/ConfirmedBooking"

dbConnect()

export default async (req,res) => {
    let method = req.method

    if(method == "POST") {
        try {
            let newBooking = new AvailableBooking({
                date: req.body.dataBody.newBookingDate,
                time: req.body.dataBody.newBookingTime
            })
            console.log("From, admin : Posting....")
            await newBooking.save()
            console.log("From, admin : Posted Booking")
            res.json({success: true})
            
        }
        catch(error) {
            console.log("From, admin : An error was encountered...")
            console.log("From, admin : Error : " + error)
            res.json({error: error})
            
        }
    }
    if(method == "DELETE") {
        console.log(req.body.dataBody.bookingdate)
        try {
            let bookingdate = req.body.dataBody.bookingdate
            let bookingtime = req.body.dataBody.bookingtime
            console.log(await AvailableBooking.findOne({date: bookingdate, time: bookingtime}))
            await AvailableBooking.findOneAndDelete({date: bookingdate, time: bookingtime}, (err ,docs) => {
                if(err) {
                    console.log("From, admin, : There was an error")
                    console.log(err)
                    res.json({error: err})
                    
                }
                else {
                    console.log("From, admin, : Deleted ",docs)
                    res.json({success: true})
                    
                }
            })
        }
        catch (error) {
            console.log("From, admin : An error was encountered...")
            console.log("From, admin : Error : " + error)
            res.json({error: error})
            
        }
    }

    if(method == "GET"){
        try {
            let AvailableBookings = await AvailableBooking.find({})
            let ConfirmedBookings = await ConfirmedBooking.find({})
            console.log("From, admin-get : Fetched Available bookings")
            res.json({AvailableBookings: AvailableBookings, ConfirmedBookings: ConfirmedBookings})
            
        }
        catch(error) {
            console.log("From admin-get, An error was encountered...")
            console.log("From admin-get, Error : " + error)
            res.json({error: error})
            
        }
    }
}
