import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie';
import styles from '../components/home.module.css';
import Link from "next/link";
import dbConnect from "../utils/dbConnect";
import AvailableBooking from "../models/AvailableBooking";
import ConfirmedBooking from "../models/ConfirmedBooking";
const credentials = require('../Credentials.json');
var mongoose = require("mongoose");
const {google} = require("googleapis");

export async function getStaticProps(context) {
  dbConnect();
  let dataRes = undefined
  let informationRes = undefined
  let picturesRes = undefined
  
  //Admin call
  
  try {
           let AvailableBookings = await AvailableBooking.find({})
            let ConfirmedBookings = await ConfirmedBooking.find({})
            console.log("From, admin-get : Fetched Available bookings")
            dataRes = {AvailableBookings: JSON.parse(JSON.stringify(AvailableBookings)), ConfirmedBookings: JSON.parse(JSON.stringify(ConfirmedBookings))}
            
        }
catch(error) {
            console.log("From admin-get, An error was encountered...")
            console.log("From admin-get, Error : " + error)
            dataRes = {error: error}
            
}
  
  //Fetchinformation call
  
  try {
  var connection = mongoose.connection
  let object = await connection.db.collection('information').findOne({})

  information = {text: object.text}
  }
  catch {
  informationRes = {}
  }
  
  //Getimages call
  
   let imageArray = []
    const scopes = [
        "https://www.googleapis.com/auth/drive"
    ]
    const auth = new google.auth.JWT(
        credentials.client_email, null,
        credentials.private_key, scopes
    )
    const drive = google.drive({version: "v3", auth})

    drive.files.list({
        fields: "files(name, webViewLink, exportLinks, contentHints)"
    },

    (err,response) => {
        if(err) throw err;
        console.log("Fetching items from Google Drive.....")
        const files = response.data.files;
        if(files.length) {
            files.map((file) => {
                console.log(file)
                let split = file.webViewLink.split("/")
                let id = split[5]
                let name = file.name
                let title = ""
                let comment = ""
                if(name.split("?")[1]) {
                    title = file.name.split("?")[0]
                    comment = file.name.split("?")[1].split(".")[0]
                }
                let image = "https://drive.google.com/uc?export=view&id=" + id
                let object = {image: image, title: title, comment: comment}
                if(name.split(".")[1]) {
                    imageArray.push(object)
                  console.log("Adding object")
                }
                else {
                    console.log("File is not an image, skipping!")
                }

            })
            console.log("Done")
        }
        else {
            console.log("No files found!")
        }  
      console.log(imageArray)
    })

    let information = informationRes
    
    if(information == undefined) {information = null}
  
  //Check bookings
        console.log("Checking bookings!")
        let AvailableBookings = await AvailableBooking.find({})
        let ConfirmedBookings = await ConfirmedBooking.find({})

        for (let i=0; i < AvailableBookings.length; i++) {
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
        dataRes = {AvailableBookings: JSON.parse(JSON.stringify(AvailableBookings)), ConfirmedBookings: JSON.parse(JSON.stringify(ConfirmedBookings))}

    return {props: {data: dataRes, information: information, pictures: JSON.parse(JSON.stringify(imageArray))}}
}

export default function Home({data, information, pictures}) {
    console.log(pictures)
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
  let slideIndex = 1
  let slideActivated = false

  let images = 0;
  let refId = 0;
  let myRefone = React.createRef()
  let myReftwo = React.createRef()
  let myRefthree = React.createRef()
  let myReffour = React.createRef()
  let refArr = [myRefone, myReftwo, myRefthree]

  let myDotone = React.createRef()
  let myDottwo = React.createRef()
  let myDotthree = React.createRef()
  const [loggedIn, setLoggedIn] = useCookies(["loggedin"])
  const [updateText, setUpdateText] = useState("")
  const [text, setText] = useState("")
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    showSlides(slideIndex)
    setText(information.text)
  })
  useEffect(() => {
    setInterval(() => {
      if (slideActivated) return
      slideIndex++
      showSlides(slideIndex)
    }, 5000)
  })
  
  function showSlides(n) {
    try {
      var i
      var slides = [myRefone.current, myReftwo.current, myRefthree.current]
      var dots = [myDotone.current, myDottwo.current, myDotthree.current]
      if (n > slides.length) {slideIndex = 1}
      if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].style.background = "#fff"
      }
      slides[slideIndex-1].style.display = "block";
      dots[slideIndex-1].style.background = "#717171";
    }
    catch {
    }
  }
  function plusSlides(n) {
    slideActivated = true
    if(n == -1) {
      showSlides(slideIndex += 1);
    }
    else {
      showSlides(slideIndex -= 1);
    }
    
  }
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  async function UpdateText() {
    const response = await fetch('/api/fetchinformation', {
      method: "POST",
      body: JSON.stringify({text: updateText}),
      headers: {
          'Content-Type': "application/json"
      }
  })
  }

  return (
<>
    <div className={styles.container}>
      <div className={styles.galleryCTR}>
        <div>
          <img src="/nagelbilder/1.jpg"></img>
        </div>
        <div>
          <img src="/nagelbilder/2.jpg"></img>
        </div>
        <div>
          <img src="/nagelbilder/3.jpg"></img>
        </div>
      </div>
      <div className={styles.sliderCTR} >

        {
          pictures.map((item) => {
            refId++;
            return (
              <div key={item.image} ref={refArr[refId-1] } className={`${styles.mySlides} ${styles.fade} `}>
                <img src={item.image}></img>
              </div>
            )
          })
        }

        <div ref={myRefthree} className={`${styles.mySlides} ${styles.fade} `}>
          <img src="/nagelbilder/2.jpg"></img>
        </div>

        <a className={styles.prev} onClick={() => {plusSlides(1)}}>&#10094;</a>
        <a className={styles.next} onClick={() => {plusSlides(-1)}}>&#10095;</a>
      
        <div className={styles.dotCTR}>
        <span ref={myDotone} className={styles.dot} onClick={() => {currentSlide(1)}}></span>
        <span ref={myDottwo} className={styles.dot} onClick={() => {currentSlide(2)}}></span>
        <span ref={myDotthree} className={styles.dot} onClick={() => {currentSlide(3)}}></span>
      </div>
      </div>
      

      <div className={styles.availableBkingsCTR}>
      {sortedBookings == 0 ? <h3>Det finns inga tider upplagda. Kontakta mig på Instagram för att boka tid!</h3> : <h1><u>Tider</u></h1>}
            <ul>
              {
              sortedBookings.map((element, index) => {
                      if(index < 6) {
                        const weekday = ["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"];
                        let day = weekday[new Date(element.date).getDay()]
                        return (
                          <Link href={"/bokning?" + "time=" + element.time + "&" + "date="+ element.date}>
                            <li className={styles.bookingItem}>
                                <div className={styles.bookingCTR}>
                                    <h2>{element.time}</h2>
                                    <h4>{day}</h4>
                                    <h4>{element.date}</h4>
                                </div>
                            </li>
                            </Link>
                        )
                      }
                      else return null
                  })}
          </ul>
      </div>

      <div className={styles.viktiginfoCTR}>
        <h2>Gällande Information!</h2>
        {edit ? <><textarea onChange={(e) => {setUpdateText(e.target.value)}}>{text}</textarea> <button onClick={() => {UpdateText()}}>Confirm</button></> : <p>{text}</p>}
        {loggedIn.loggedin ? <button onClick={(up) =>  {if(edit) {setEdit(false)} else {setEdit(true)}}}>Edit</button> : ""}
      </div>
    
    </div>
    </>
  )
}
