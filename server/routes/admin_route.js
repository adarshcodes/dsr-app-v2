const express = require("express");
const dsrModel = require("../models/dsrmodel");
const userModel = require("../models/usermodel");

const app = express();

// Returns today's DSR. This is a view that only works if you're the author
app.get("/todaydsr", async (request, response) => {
  let date = new Date();

  console.log(date.getDate());
  const dsr = await dsrModel.find({});
  console.log(dsr[0].date.getDate());
  let count = dsr.length;
  try {
    response.send(dsr);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Returns a count of empirical users in the service. This endpoint is used to check if there are any employees who have the ability to join the service
app.get("/getemp", async (request, response) => {
  const users = await userModel.find({ isAdmin: false });
  let count = users.length;
  console.log(count);
  try {
    response.send(JSON.stringify(count));
  } catch (error) {
    response.status(500).send(error);
  }
});
module.exports = app;
