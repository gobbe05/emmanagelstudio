import dbConnect from "../../utils/dbConnect"
import Images from '../../models/Images'


dbConnect()

export default async (req,res) => {
    let method = req.method

    if(method == "GET") {
    let image = "/nagelbilder/1.jpg";
    let type = "";
    let comment = "";

    let newImage =  new Images({
        image: image,
        type: type,
        comment: comment
    })

    await newImage.save()
    console.log("success")
    res.json({success: true})
    }
    else if (method == "POST") {
        let image = req.body.dataBody.image
        let newImage =  req.body.dataBody.image
        let type = req.body.dataBody.type
        let newType = req.body.dataBody.newType
        let comment = req.body.dataBody.comment
        let newComment = req.body.dataBody.newComment


        await Images.findOneAndUpdate({image: image, type: type, comment: comment}, {image: newImage, type: newType, comment: newComment})
    }
}