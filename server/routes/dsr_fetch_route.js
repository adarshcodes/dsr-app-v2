const express = require("express");
const dsrModel = require("../models/dsrmodel");
const userModel = require("../models/usermodel");

const app = express();

// Sends all DSRs that are in the database. This is a GET request
app.get("/dsr", async (request, response) => {
  const dsr = await dsrModel.find({});

  try {
    response.send(dsr);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Returns last 5 DSR for the user specified in the request body. This is a POST
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

// Returns the last DSR for the user sorted by ID. This is a POST
app.post("/lastdsr", async (request, response) => {
  const userId = request.body.user;

  try {
    const dsr = await dsrModel.findOne({ user: userId }).sort({ _id: -1 });

    if (!dsr) {
      response.status(705).send();
    }
    response.send(dsr);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Checks to see if there is a DSR for the user and if so sends a status
app.post("/todaystatus", async (request, response) => {
  const user = request.body.user;
  const uservalid = await userModel.findById(user);

  try {
    if (!uservalid) {
      return response.status(702).send();
    }
    if (uservalid.lastdsrtime === "") {
      return response.send("0");
    }
    let lastdate = new Date(uservalid.lastdsrtime);
    let today = new Date();
    if (lastdate.getDate() != today.getDate()) {
      //dsr not filled
      return response.send("0");
    } else {
      const dsr = await dsrModel.findOne({ user: user }).sort({ _id: -1 });
      if (!dsr) {
        return response.send("3");
      }
      if (dsr.isOnLeave) {
        //user was on leave
        return response.send("2");
      } else {
        //user has saved dsr
        return response.send("1");
      }
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
