import styles from '../../components/admin.module.css'
import {useState, useEffect} from "react"
import Router from 'next/router'
import {useCookies} from 'react-cookie'
import dbConnect from "../../utils/dbConnect"
import AvailableBooking from "../../models/AvailableBooking"
import ConfirmedBooking from "../../models/ConfirmedBooking"

export async function getStaticProps(context) {
    dbConnect()
    let response = undefined
        try {
            let AvailableBookings = await AvailableBooking.find({})
            let ConfirmedBookings = await ConfirmedBooking.find({})
            console.log("From, admin-get : Fetched Available bookings")
            response = {AvailableBookings: AvailableBookings, ConfirmedBookings: ConfirmedBookings}
            
        }
        catch(error) {
            console.log("From admin-get, An error was encountered...")
            console.log("From admin-get, Error : " + error)
            response = {error: error}
        }

    await console.log(JSON.stringify(response))

    const data = {}
    await fetch('http://localhost:3000/api/checkbookings')
    return {props: {data: data}}
}

export default function Admin({data}) {
    const [newBookingDate, setNewBookingDate] = useState()
    const [newBookingTime, setNewBookingTime] = useState()
    const [loggedin, setLoggedin] = useState(false)
    const [cookie, setCookie] = useCookies(["loggedin"])

    let AvailableBookings = data.AvailableBookings
    let ConfirmedBookings = data.ConfirmedBookings

    useEffect(() => {
        if(cookie.loggedin == undefined) {
            setCookie("loggedin", JSON.stringify({loggedin: false}), {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
            })
        }
        try {
            setLoggedin(cookie.loggedin.loggedin)
        }
        catch {
            console.log("Cookie has not loaded yet")
        }
        console.log(loggedin)
    })

    async function NewBooking() {
        let dataBody = {
            newBookingDate: newBookingDate,
            newBookingTime: newBookingTime,
            funcMethod: "POST AvailableBooking",
        }
        const response = await fetch('http://localhost:3000/api/admin', {
            method: "POST",
            body: JSON.stringify({dataBody}),
            headers: {
                'Content-Type': "application/json"
            }
        })
        Router.reload()
    }

    async function RemoveBooking(date, time) {
        let dataBody = {
            bookingdate: date,
            bookingtime: time
        }
        
        const response = await fetch('http://localhost:3000/api/admin', {
            method: "DELETE",
            body: JSON.stringify({dataBody}),
            headers: {
                'Content-Type': "application/json"
            }
        })
        Router.reload()
    }

    return (
        <>
        {loggedin ? <>
            <div className={styles.adminCTR}>
                <div className={styles.bookingsCTR}>
                    <ul className={styles.bookingsList}>
                        {ConfirmedBookings.map((element) => {
                            let date = element.date
                            let time = element.date.split(".")[1]
                            return (
                                <li key={date + time} className={styles.bookingItem}>
                                    <div className={styles.bookingCTR}>
                                        <h1>{"Namn : " + element.name}</h1>
                                        <h2>{"Typ : " + element.type}</h2>
                                        <h3>{"Kontakt : " + element.contact}</h3>
                                        <h4>{"Dag : " + date}</h4>
                                        <h4>{"Time : " + time}</h4>
                                        <h5>{"Tidpunkt vid bokning : " + element.dateofbooking}</h5>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className={styles.availabletimesCTR}>
                <div className={styles.addtimesCTR}>
                    <div className={styles.datetimeCTR}>
                        <div>
                            {/** Insert a component to choose data n' time */}
                            <h1>Skapa ledig tid</h1>
                            <input onChange={(e) => setNewBookingDate(e.target.value)} type="date"></input>
                            <input onChange={(e) => setNewBookingTime(e.target.value)} type="time"></input>
                            <input onClick={() => {NewBooking()}} type="submit"></input>
                        </div>
                    </div>
                    
                </div>
                <div className={styles.availableBkingsCTR}>
                    <ul>
                    {AvailableBookings.map((element) => {
                            return (
                                <li key={element.date + element.time} className={styles.bookingItem}>
                                    <div className={styles.bookingCTR}>
                                        <h3>{element.date}</h3>
                                        <h2>{element.time}</h2>
                                        <button onClick={() => {
                                            RemoveBooking(element.date, element.time)
                                            
                                        }}>Remove</button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                </div>
            </div>
        </> : <h1>404 Not Found</h1>}
        </>
    )
}
