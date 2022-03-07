var mongoose = require('mongoose')
import dbConnect from "../../utils/dbConnect"
import AvailableBooking from "../../models/AvailableBooking"
import ConfirmedBooking from "../../models/ConfirmedBooking"

dbConnect();

export default async (req,res) => {
        console.log("Checking bookings!")
        let AvailableBookings = await AvailableBooking.find({})
        let ConfirmedBookings = await ConfirmedBooking.find({})

        for (let i=0; i < AvailableBooking.length; i++) {
            try{
                if(Date.parse(AvailableBookings[i].date)-Date.parse(new Date()) <= 0) {
                    console.log("Trying to delete date")
                    await AvailableBooking.findOneAndDelete({date: AvailableBookings[i].date})
                }
            }
            catch {

            }
        }
        
        for (let i=0; i < ConfirmedBookings.length; i++) {
            let day = ConfirmedBookings[i].date.split("-")
            if(parseInt(day[2]) < new Date().getDate()) {
                console.log("Removing confirmed booking")
                await ConfirmedBooking.findOneAndDelete({date: ConfirmedBookings[i].date}, (err) => {
                    console.log(err)
                })
            }
        
            
        }

        console.log("From, admin-get : Fetched Available bookings")
        res.json({AvailableBookings: AvailableBookings, ConfirmedBookings: ConfirmedBookings})
        


}