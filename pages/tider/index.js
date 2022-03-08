import styles from '../../components/times.module.css'
import stylestwo from '../../components/home.module.css'
import dbConnect from "../../utils/dbConnect"
import AvailableBooking from "../../models/AvailableBooking"
import ConfirmedBooking from "../../models/ConfirmedBooking"
import Link from 'next/link'

export async function getStaticProps(context) {
    dbConnect()
    let response = undefined
    try {
            let AvailableBookings = await AvailableBooking.find({})
            let ConfirmedBookings = await ConfirmedBooking.find({})
            console.log("From, admin-get : Fetched Available bookings")
            response = {AvailableBookings: JSON.parse(JSON.stringify(AvailableBookings)), ConfirmedBookings: JSON.parse(JSON.stringify(ConfirmedBookings))}
            
        }
        catch(error) {
            console.log("From admin-get, An error was encountered...")
            console.log("From admin-get, Error : " + error)
            response = {error: error}
            
        }
  
  const data = response
  
  return {props: {data: data}}
  }

export default function Tider({data}) {
    let AvailableBookings = data.AvailableBookings
    let sortedBookings = AvailableBookings.sort((a,b) => {
        try {
          a = a.date.split('-').reverse().join('')
          b = b.date.split('-').reverse().join('')
          console.log(a > b ? 1 : a < b ? -1 : 0)
          return a > b ? 1 : a < b ? -1 : 0
        }
        catch {
    
        }
      })
      
    return (
        <div className={styles.timesCTR}>
            {sortedBookings == 0 ? <h3>Det finns inga tider upplagda. Kontakta mig på Instagram för att boka tid!</h3> : <h1><u>Tider</u></h1>} 

            <div style={{minHeight: "60vh"}} className={stylestwo.availableBkingsCTR}>
                <ul>
              {AvailableBookings.map((element) => {
                      return (
                        <Link key={element.date + element.time} href={"/bokning?" + "time=" + element.time + "&" + "date="+ element.date}>
                          <li className={stylestwo.bookingItem}>
                              <div className={stylestwo.bookingCTR}>
                                  <h2>{element.time}</h2>
                                  <h4>{element.date}</h4>
                              </div>
                          </li>
                          </Link>
                      )
                  })}
                </ul>
            </div>

        </div>
    )
}
