const express = require("express");
const dsrModel = require("../models/dsrmodel");
const userModel = require("../models/usermodel");

const app = express();

// Returns all of today's DSRs.
app.get("/todaydsr", async (request, response) => {
  let today = new Date();
  let todaylist=[];
  const dsr = await dsrModel.find({});
  for(let i of dsr){
    if(i.date.getDate()==today.getDate())
      todaylist.push(i);
  }
  try {
    response.send(todaylist);
  } catch (error) {
    response.status(500).send(error);
  }
});

//returns count of DSRs submitted today
app.get("/todaydsrcount", async (request, response) => {
  let today = new Date();
  let todaylist=[];
  const dsr = await dsrModel.find({});
  for(let i of dsr){
    if(i.date.getDate()==today.getDate())
      todaylist.push(i);
  }
  let count = todaylist.length;

  try {
    response.send(JSON.stringify(count));
  } catch (error) {
    response.status(500).send(error);
  }
});

//returns total number of dsrs saved in the database
app.get("/dsrcount", async (request, response) => {
  const dsr = await dsrModel.find({});
  let count=dsr.length;
  try {
    response.send(JSON.stringify(count));
  } catch (error) {
    response.status(500).send(error);
  }
});


//returns all the employees
app.get("/getemp", async (request, response) => {
  const users = await userModel.find({ isAdmin: false });
  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Returns a count of empirical users in the service. This endpoint is used to check if there are any employees who have the ability to join the service
app.get("/getempcount", async (request, response) => {
  const users = await userModel.find({ isAdmin: false });
  let count = users.length;
  try {
    response.send(JSON.stringify(count));
  } catch (error) {
    response.status(500).send(error);
  }
});

// returns all dsrs of a particular employee
app.post("/employee/dsr", async (request, response) => {
  const empId = request.body.user;
  try {
    const dsr = await dsrModel
      .find({ user: empId })
      .sort({ _id: -1 })
    response.send(dsr);
  } catch (error) {
    response.status(500).send(error);
  }
});


module.exports = app;
