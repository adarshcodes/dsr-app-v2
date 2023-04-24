const express = require("express");
const dsrModel = require("../models/dsrmodel");
const userModel = require("../models/usermodel");

const app = express();

//********************dsr calls************************
//retrive all dsr
app.get("/dsr", async (request, response) => {
  const dsr = await dsrModel.find({});

  try {
    response.send(dsr);
  } catch (error) {
    response.status(500).send(error);
  }
});

let time = new Date();
//const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

//save a DSR record related to a user
app.post("/add_dsr/", async (request, response) => {
  const user = request.body.user;
  const savetime = request.body.createdAt;
  const uservalid = await userModel.findById(user);
  const date1 = new Date(savetime);
  const date2 = new Date(uservalid.lastdsrtime);

  date1.setHours(0);
  date1.setMinutes(0);
  date1.setSeconds(0);

  date2.setHours(0);
  date2.setMinutes(0);
  date2.setSeconds(0);

  if (!uservalid) {
    return response.status(404).send("User not found" + user);
  } else if (date1.getDate() == date2.getDate()) {
    return response.send("Dsr already saved for today");
  } else {
    try {
      // Update the user's dsr date-time field
      uservalid.lastdsrtime = savetime;
      await uservalid.save();

      const dsr = new dsrModel({
        ...request.body,
      });

      await dsr.save();
      response.send(dsr);
    } catch (error) {
      response.status(500).send(error);
    }
  }
});

//retrieve the last 5 DSR records of a user
app.post("/users/dsr", async (request, response) => {
  const userId = request.body.user;
  try {
    const dsr = await dsrModel
      .find({ user: userId })
      .sort({ _id: -1 })
      .limit(5);
    //const reverdsr = dsr.reverse();
    response.send(dsr);
  } catch (error) {
    response.status(500).send(error);
  }
});

//when the user is on leave
app.post("/onleave", async (request, response) => {
  const userId = request.body.user;
  // const userId = "64417870bc83e4becb95f97d";
  const today = new Date();
  try {
    const dsr = new dsrModel({
      ...request.body,
      isupdated: true,
      date: today,
      projectName:"null",
      clientManager: "null",
      activitiesCompleted: "null",
      activitiesPlanned: "null",
      hoursWorked: 0,
      status: "null",
      comment: "null",
      openIssues: "null",
      isOnLeave: true,
      createdAt: today,
      updatedAt: today
    });
    await dsr.save();
    response.send(dsr);

  } catch (error) {
    response.status(500).send(error);
  }
});


//retrieve the last dsr that the user has submitted


module.exports = app;
