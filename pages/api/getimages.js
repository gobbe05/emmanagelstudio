import dbConnect from "../../utils/dbConnect"
require('dotenv').config()

const {google} = require("googleapis")

dbConnect()

export default async (req,res) => {
    /* 
        
    Get images from google drive
        
    */
  
    let imageArray = []                           //Creates final response array
    const scopes = [                              //Define scopes
        "https://www.googleapis.com/auth/drive"   //Google Drive API
    ]
    const credentials = require('../../Credentials.json')   //Fetches Google worker credentials
    const auth = new google.auth.JWT(                       //Creates authentication profile
      credentials.client_email, null,
      credentials.private_key, scopes)

    const drive = google.drive({version: "v3", auth})       //Creates drive connection. Using v3
    
    drive.files.list({                                                //Starts listing of items
      fields: "files(name, webViewLink, exportLinks, contentHints)"   //What fields to import
  },

  (err,response) => {                                                 //Callback (err, response)
      if(err) throw err;                                              //Error check
      console.log("Fetching items from Google Drive.....")            
      const files = response.data.files;                              //Creates file variable
      if(files.length) {                                              //If files is not 0
          files.map((file) => {                                       //Map callback

            /* Starting file name manipulation to extract information */
            let split = file.webViewLink.split("/")                //Gets id from webViewLink             
            let id = split[5]                                     //Gets fifth part of link (ID)
            let name = file.name                                  //Initialize name
            let title = ""                                        //Initialize title
            let comment = ""                                      //Initialize comment
            if(name.split("?")[1]) {                              //Extracts text from file name
                title = file.name.split("?")[0]                   //Title
                comment = file.name.split("?")[1].split(".")[0]   //Comment
            }
            let image = "https://www.drive.google.com/uc?export=view&id=" + id  //Image link
            let object = {image: image, title: title, comment: comment, id: id}     //Create Object
            if(name.split(".")[1]) {      //Checks if file is an image
                imageArray.push(object)   //Pushes object to image array
            }
          })
          setTimeout(() => {
            res.json(imageArray)
        }, 1)
      }
      else {
          console.log("No files found!")
      }  
  })
    
}