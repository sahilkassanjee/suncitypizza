const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path');

const app = express()

//view engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


//static folder
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.static('views/images')); 


//body parser middleware
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.render('contact')
})
app.post('/send', (req, res) => {
    const output = `
        <p> You have a new reservation </p>
        <h3>Guest Details </h3>
        <ul>
        <li> Name: ${req.body.Name} </li>
        <li> Party Size: ${req.body.People} </li>
        <li> Reservation Date: ${req.body.date} </li>
        <li> Message: ${req.body.Message} </li>
        </ul>
        
        
    `
    
async function main() {
       // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    auth: {
        user: 'skthedev22test@outlook.com',
        pass: 'Forsaken2!'
    },
    tls: {
        rejectUnauthorized: false
      }
});


  // send mail with defined transport object
  let 
  
  
  info = await transporter.sendMail({
    from: '"NODE TEST" <skthedev22test@outlook.com>', // sender address
    to: "skassanjee@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.render('contact', {msg: 'email has been sent'})
    console.log('yay')
    }
main().catch(console.error);

});



app.post('/send', (req, res) =>{
    console.log(req.body)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('Server started...'));

