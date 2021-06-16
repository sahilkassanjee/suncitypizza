const express = require('express')
const bodyParser = require('body-parser')
const exp = require('express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path');
const { google } = require('googleapis');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');
const { gmail } = require('googleapis/build/src/apis/gmail');

require('dotenv').config()


const app = express()
//view engine setup
app.engine('handlebars', exp());
app.set('view engine', 'handlebars');
app.set('views',  'views')

//static folder
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.static('views/images')); 


//body parser middleware
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.render('main')
})


// app.post('/send',(req, res) => {
    
//     const output = `
//     <p> You have a new contact request  </p>
//     <h3> Contact Details </h3>
//     <ul>
//         <li> name: ${req.body.Name}</li>
//         <li> People: ${req.body.People}</li>
//         <li> Message: ${req.body.Message}</li>
//         <li> Date: ${req.body.Date}</li>
//     </ul>
//         `
//     let testAccount = await nodemailer.createTestAccount();
//     let transporter = nodemailer.createTransport({
//       host: "smtp-mail.outlook.com",
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: process.env.email, // generated ethereal user
//         pass: process.env.password, // generated ethereal password
//       },
//       tls: { 
//         rejectUnauthorized: false
//       }
//     });
  

//     let info = await transporter.sendMail({
//       from: ' "nodemailer Contact" <skthedev22test@outlook.com>', // sender address
//       to: "skthedev22test@outlook.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: output, // html body
//     });
  
//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
//     // Preview only available when sending through an Ethereal account
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

//     res.render('main', {msg: 'email has been sent'})
//   }
  
//   main().catch(console.error);

// })

app.post('/send', (req, res) => {

  const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env_REDIRECT_URI)

  oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})
  
  async function sendMail(){
    try{
      const accessToken = await oAuth2Client.getAccessToken()
  
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth:{
          type: 'OAUTH2',
          user: process.env.email,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken
        },
        tls: { rejectUnauthorized: false }
      })
  
      const mailOptions = {
        from: 'satish <skthedev22@gmail.com>',
        to: 'skassanjee@gmail.com',
        subject: 'Hello from the API',
        text: 'hello fromm api text',
        html: '<h1>hello from html </h1>'
      };

  
      const result = await transport.sendMail(mailOptions)
      return result
    }catch(error){
        return error
      }
    }
  


    
  sendMail().then((result) => console.log('email sent.......', result)
  ).catch((error) => console.log(error.message))
  

  
  res.render('main', {msg: 'email has been sent'})
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('Server started...'));

  