import styles from '../../components/bookings.module.css'
import {Router, useRouter} from 'next/router'
import {useState} from "react"
export default function Booking({data}) {

    const [nameInput, setNameInput] = useState()
    const [typeInput, setTypeInput] = useState()
    const [contactInput, setContactInput] = useState()
    const [dateInput, setDateInput] = useState()
    const [pris, setPris] = useState("0kr")
    
    function GetUrlQuery() {
        const query = useRouter();
        let time = ""
        let date = ""
        let props = undefined
        let url = query.asPath
        try{
            url = url.split('?')[1]
            time = url.split('&')[0].split('=')[1]
            date = url.split('&')[1].split('=')[1]
        }
        catch {
            
        }
        return {time: time, date: date}
    }

    let time = GetUrlQuery().time
    let date = GetUrlQuery().date

    async function ConfirmBooking(name, type, contact, date, time) {
        let dataBody = {
            name: name,
            type: type,
            contact: contact,
            date: date,
            time: time,
        }
        SendEmail()
        const responsetwo = await fetch('/api/newbooking', {
            method: "POST",
            body: JSON.stringify({dataBody}),
            headers: {
                'Content-Type': "application/json"
            }
        })
        RemoveBooking()
    }
    async function RemoveBooking() {
        let dataBody = {
            bookingdate: date,
            bookingtime: time
        }
        const response = await fetch('/api/admin', {
            method: "DELETE",
            body: JSON.stringify({dataBody}),
            headers: {
                'Content-Type': "application/json"
            }
        })
    }
    async function SendEmail() {
        let dataBody = {
            email: contactInput,
            bookingdate: date,
            bookingtime: time
        }
        const response = await fetch('/api/sendconfirmation', {
            method: "POST",
            body: JSON.stringify({dataBody}),
            headers: {
                'Content-Type': "application/json"
            }
        }) 
    }
    
    return (
    <div className={styles.bookingsCTR}>
        <div className={styles.bookingidCTR}>
            <h2>{"Tid : " + time}</h2>
            <h2>{"Datum : " + date}</h2>
        </div>

      <form>
            <h3>Namn</h3>
            <input onChange={(e)=> {setNameInput(e.target.value)}}></input>
            <h3>Beställning</h3>
            <select onChange={(e)=> {
                setTypeInput(e.target.value)
                setPris(e.target.value.split(":")[1])
                }}>
                <option>Välj</option>
                <option>Basic Set : 250kr</option>
                <option>Avancerat Set : 350kr</option>
                <option>Påfyllning : 220kr</option>
                <option>Bortagning : 180kr</option>
                <option>Bortagning + nytt set: 350kr</option>
                <option>Gellack : 200kr</option>
                <option>Manikyr : 120kr</option>
            </select>
            <h3>Mail Adress</h3>
            <input onChange={(e)=> {setContactInput(e.target.value)}}></input>
            <button onClick={
                (e) => {
                    e.preventDefault()
                    ConfirmBooking(nameInput, typeInput, contactInput, date, time)
                }
                }>Boka</button>
                <h3>Pris {pris}</h3>
                <h6><i>* Betalning sker på plats via Swish</i></h6>
      </form>
    </div>    
    )
} 