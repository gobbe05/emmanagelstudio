import styles from '../../components/pricelist.module.css'
import { useState, useEffect } from 'react'

export default function Pricelist() {

    const [prices, setPrices] = useState({
        basic: "...",              //Basic
        basicfärg: "...",          //Basic + färg
        avancerat: "...",          //Avancerat
        fyllning: "...",           //Påfyllning
        borttagning: "...",        //Borttagning
    }) 

    async function GetPrices() {
        const response = await fetch('/api/fetchprices', {  //Fetches the prices from API
          method: "GET",                                    //Method
          headers: {'Content-Type': "application/json"}     //Headers
        })
        const result = await response.json()    //Translates response
        setPrices(result)                       //Sets the prices object as API response
    }

    useEffect(() => {       //Calls once on page load
        GetPrices()         //Calls the GetPrices function and initializes the prices object
      }, [])

    return (
        <div className={styles.pricelistBODY}>
            <div className={styles.pricelistCTR}>
            <div className={styles.pricesCTR}>
                <u><h1>Prislista</h1></u>
                <div className={styles.linesCTR}>
                    <h2 className={styles.h2}>Basic: {prices.basic}</h2>
                    <div className={styles.line}></div>
                    <h2 className={styles.h2}>Basic + färg: {prices.basicfärg}</h2>
                    <div className={styles.line}></div>
                    <h2 className={styles.h2}>Avancerat : {prices.avancerat}</h2>
                    <div className={styles.line}></div>
                    <h2 className={styles.h2}>Påfyllning : {prices.fyllning}</h2>
                    <div className={styles.line}></div>
                    <h2 className={styles.h2}>Borttagning : {prices.borttagning}</h2>
                </div>
            </div>
            <div className={styles.timesCTR}>
            <div className={styles.pricesCTR}>
                <u><h1>Uppskattad tid</h1></u>
                <div className={styles.linesCTR}>
                    <h2 className={styles.h2}>Nytt set : 2h</h2>
                    <div className={styles.line}></div>
                    <h2 className={styles.h2}>Avancerat : 2.5h - 4h</h2>
                    <div className={styles.line}></div>
                    <h2 className={styles.h2}>Påfyllning : 2h</h2>
                    <div className={styles.line}></div>
                    <h2 className={styles.h2}>Borttagning : 1h</h2>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}