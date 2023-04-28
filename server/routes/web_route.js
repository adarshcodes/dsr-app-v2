const express = require("express");

const app = express();

// GET / : id Sends a new page to the user. It's used to create a new
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/new.html");
});

module.exports = app;
