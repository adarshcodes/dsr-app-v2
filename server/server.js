const express = require('express');
const mongoose = require('mongoose');
const Router = require("./routes");

// const model = require("./model")
// const jsonData = require('./data.json');

// create the Express app
const app = express();
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
  console.log("Server is running at port ${PORT}");
});