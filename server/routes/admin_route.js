const express = require("express");
const dsrModel = require("../models/dsrmodel");
const userModel = require("../models/usermodel");

const app = express();

//retrieve today dsr
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

//retrieve employee
app.get("/getemp", async (request, response) => {
  const users = await userModel.find({ isAdmin: false });
  // let count=await users.count();
  let count = users.length;
  console.log(count);
  try {
    response.send(JSON.stringify(count));
  } catch (error) {
    response.status(500).send(error);
  }
});
module.exports = app;
