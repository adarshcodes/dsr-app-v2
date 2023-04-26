const express = require("express");
const dsrModel = require("../models/dsrmodel");
const userModel = require("../models/usermodel");

const app = express();

//retrive all dsr
app.get("/dsr", async (request, response) => {
  const dsr = await dsrModel.find({});

  try {
    response.send(dsr);
  } catch (error) {
    response.status(500).send(error);
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

//retrieve the last dsr that the user has submitted
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
