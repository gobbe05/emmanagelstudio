import styles from '../../components/times.module.css'
import stylestwo from '../../components/home.module.css'
import Link from 'next/link'

export async function getStaticProps(context) {
    const response = await fetch('http://localhost:3000/api/admin', {
    method: "GET",
  })
  
  const data = await response.json()
  
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
                        <Link href={"/bokning?" + "time=" + element.time + "&" + "date="+ element.date}>
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