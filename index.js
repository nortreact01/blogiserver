const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')

const app = express()

app.use(cors())
app.use(express.json())

const kontaktid = []

app.get('/', (req, res) => {

    res.send(`
        <h1>Tervitus</h1>
        <h3>Tere maailm ja Sina ka</h3>
    `)
})

app.get('/api/tervitus', (req, res) => {
    console.log(req.query)
    res.json({
        message: 'Tervitus',
        detailid: "maailm ja sina ka"
    })
})

app.get('/api/kontakt', (req, res) => {
    res.json(kontaktid)
})

app.post('/api/kontakt', (req, res) => {
    console.log(req.body)

    if (!req.body.email) {
        res.status(400)
        res.json({error: 'Email on kohustuslik'})
        return;
    }

    kontaktid.push(req.body)

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sonum.proovimine@gmail.com',
          pass: 'Test123Test'
        }
      });
      
      var mailOptions = {
        from: 'minukoduleht@gmail.com',
        to: 'conv.m4mf8qjd3djunz@fleep.io',
        subject: 'Teade Sinu koduleheküljelt',
        text: `Nimi: ${req.body.nimi} Teade: ${req.body.email}  - ${req.body.teade}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    res.status(201)
    res.end()
})

app.listen(8000)