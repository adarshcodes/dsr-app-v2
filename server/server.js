const express = require('express');
const mongoose = require('mongoose');
const Router = require("./routes");
const cors  = require("cors");


const cron = require('node-cron');
const nodemailer = require('nodemailer');
// const model = require("./model")
// const jsonData = require('./data.json');

// create the Express app
const app = express();
app.use(cors());
app.use(express.json());
//catalyst16812

// connect to the MongoDB database using Mongoose
mongoose.connect('mongodb+srv://catalyst16812:nikhil11111@origindb.ginrwdp.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error(err));

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
  });

//dhruv added automatic mail sender 
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
      user: 'dhruv.ria@gmail.com',
      pass: 'cjtcotzmdhjnhkvt'
  }
});

// send email function
function sendEmail() {
    let mailOptions = {
        from: 'dhruv.ria@gmail.com',
        to: 'dhruvv.upadhyayy@gmail.com',
        subject: 'Your daily DSR is not submitted',
        text: 'Hello, you have not submitted your daily DSR. Please do the same by end of day. Ignore if submitted.'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

// schedule task to run every day at 10:45am in IST
cron.schedule('0 22 * * *', () => {
    console.log('Sending daily email...');
    sendEmail();
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});



  // model.insertMany(jsonData)
  // .then(function(docs) {
  //   console.log(docs.length + ' documents inserted');
  //   mongoose.disconnect();
  // })
  // .catch(function(err) {
  //   console.error(err);
  //   mongoose.disconnect();
  // });





// start the server
app.use(Router);


const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});