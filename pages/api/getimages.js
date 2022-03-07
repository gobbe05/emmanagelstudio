import dbConnect from "../../utils/dbConnect"
import Images from '../../models/Images'
require('dotenv').config()

const {google} = require("googleapis")

dbConnect()

export default async (req,res) => {
    let imageArray = []
    const scopes = [
        "https://www.googleapis.com/auth/drive"
    ]

    const credentials = require('../../Credentials.json')
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
                }
                else {
                    console.log("File is not an image, skipping!")
                }

            })
            console.log("Done")
            setTimeout(() => {
                res.json(imageArray)
            }, 1)
        }
        else {
            console.log("No files found!")
        }  
    })

}