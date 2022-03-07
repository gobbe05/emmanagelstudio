require('dotenv').config()

export default async (req, res) => {
    
    var nodemailer = require('nodemailer')
    const hbs = require('nodemailer-express-handlebars')
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD
        }
      });
      transporter.use('compile', hbs({
        viewEngine: {
          extname: ".handlebars",
          partialsDir: './views/',
          defaultLayout: false,
        },
        viewPath: './views/',
        extname: ".handlebars"
      }))

      //Mail options Emma
      var mailOptions = {
        from: process.env.MAIL_USER,
        to: 'gabbe05gr@gmail.com',
        subject: 'Bokning!',
        context: {
          bookingdate: req.body.dataBody.bookingdate,
          bookingtime: req.body.dataBody.bookingtime
        },
        text: 'Du har bokat en nageltid hos Emma!' + req.body.dataBody.bookingdate + " " + req.body.dataBody.bookingtime,
        template: 'template',
      };

      //Send mail to Emma
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      //Mail options booker
      var mailOptions = {
        from: process.env.MAIL_USER,
        to: req.body.dataBody.email,
        subject: 'Bokning bekräftad',
        text: 'Hej du har nu en bokad tid hos mig. Vi ses! /Emma' + req.body.dataBody.bookingdate + " " + req.body.dataBody.bookingtime
      };


      //Send mail to booker
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    res.json({})
}