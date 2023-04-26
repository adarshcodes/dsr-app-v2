const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const admin_route = require("./routes/admin_route");
const draft_route = require("./routes/draft_route");
const dsr_fetch_route = require("./routes/dsr_fetch_route");
const dsr_save_route = require("./routes/dsr_save_route");
const user_route = require("./routes/user_route");
const web_route = require("./routes/web_route");
const cron = require("node-cron");
const nodemailer = require("nodemailer");

// create the Express app
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
//catalyst16812

// connect to the MongoDB database using Mongoose
mongoose
  .connect(
    "mongodb+srv://catalyst16812:nikhil11111@origindb.ginrwdp.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

//dhruv added automatic mail sender
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: "dhruv.ria@gmail.com",
    pass: "cjtcotzmdhjnhkvt",
  },
});

// send email function
function sendEmail() {
  let mailOptions = {
    from: "dhruv.ria@gmail.com",
    to: "dhruvv.upadhyayy@gmail.com",
    subject: "Your daily DSR is not submitted",
    text: "Hello, you have not submitted your daily DSR. Please do the same by end of day. Ignore if submitted.",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

// schedule task to run every day at 10:45am in IST
cron.schedule(
  "0 22 * * *",
  () => {
    console.log("Sending daily email...");
    sendEmail();
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  }
);

// start the server
app.use(admin_route);
app.use(draft_route);
app.use(dsr_fetch_route);
app.use(dsr_save_route);
app.use(user_route);
app.use(web_route);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
