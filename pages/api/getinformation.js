const {google} = require("googleapis")

export default async () => {

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
        fields: "files(name, webViewLink, exportLinks)"
    }, (err,response) => {
        if(err) throw err;
        const files = response.data.files;
        
        if(files.length) {
            files.map((file) => {
                files.push(file)
                console.log(files)
              })
        }
    })

    console.log(files)
}