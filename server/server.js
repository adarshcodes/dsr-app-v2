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
const helper = require("./helper.js")
const cron = require("node-cron");


const userModel = require("./models/usermodel");
const { ClientConfigurationError } = require("@azure/msal-node");
// const nodemailer = require("nodemailer");

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








//getting email of users who have not submitted dsrs today
async function findEmail() {
  const user = await userModel.find({ isAdmin: false });
  var todayDate = new Date();
  var emailArray = [];
  for (let i of user) {
    if (i.lastdsrtime.getFullYear() == todayDate.getFullYear()) {
      if ((i.lastdsrtime.getMonth()) != todayDate.getMonth() + 1) {
        if (i.lastdsrtime.getDate() != todayDate.getDate()) {
          emailArray.push(i.email)
        }
      }
    }

  }
  return emailArray;
}




// Schedule a cron job to send a daily email. This is a convenience function for use with services that don't need to worry about cron scheduling
cron.schedule(
  "0 22 * * *",
  async () => {
    let arr = await findEmail();
    console.log(arr);
    console.log("Sending daily remainder email...");
    for (let i = 0; i < arr.length; i++) {
      helper(arr[i]);
    }
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
