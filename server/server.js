// Declares routes that should be routed to the right CRUD endpoints. This is a bit tricky because we don't want to require routes that are in the same group as any other route
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

// Adds the service limits to the app. This is a convenience function to allow developers to add more services
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

// Connects to the database and sets flags that allow writes to be retried. This is a no - op if there is an error
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
/**
 * / / object / list to be used in a call to
 */
db.once("open", function () {
  console.log("Connected successfully");
});

// Creates a transport that sends messages to Gmail. We do this by setting the transport's flags to allow HTTPS
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: "dhruv.ria@gmail.com",
    pass: "cjtcotzmdhjnhkvt",
  },
});

/**
 * Send email to DASHRAE RIABUV and UPAD HyayY
 */
function sendEmail() {
  let mailOptions = {
    from: "dhruv.ria@gmail.com",
    to: "dhruvv.upadhyayy@gmail.com",
    subject: "Your daily DSR is not submitted",
    text: "Hello, you have not submitted your daily DSR. Please do the same by end of day. Ignore if submitted.",
  };

  /**
   * @param error
   * @param info
   */
  transporter.sendMail(mailOptions, function (error, info) {
    // Send the email to the server.
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

// Schedule a cron job to send a daily email. This is a convenience function for use with services that don't need to worry about cron scheduling
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

// Adds routes to the app based on the configuration. This is called after all routes have been added
app.use(admin_route);
app.use(draft_route);
app.use(dsr_fetch_route);
app.use(dsr_save_route);
app.use(user_route);
app.use(web_route);

// Listen for HTTP requests on the port specified in environment variable or 3030
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
