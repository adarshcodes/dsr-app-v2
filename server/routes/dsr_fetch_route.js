const express = require("express");
const dsrModel = require("../models/dsrmodel");
const userModel = require("../models/usermodel");
const { decodeToken } = require("../helpers/webToken.js");
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
  let token = request.headers.authorization;
  if (token.includes("Bearer")) {
    token = token.split(" ")[1];
  }
  const decoded = decodeToken(token);
  const uservalid = await userModel.findById(decoded.user._id);
  try {
    const dsr = await dsrModel
      .find({ created_by: uservalid._id })
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
  let token = request.headers.authorization;
  if (token.includes("Bearer")) {
    token = token.split(" ")[1];
  }
  const decoded = decodeToken(token);
  const uservalid = await userModel.findById(decoded.user._id);
  let userId = uservalid._id;
  try {
    const dsr = await dsrModel
      .findOne({ created_by: userId })
      .sort({ _id: -1 });
    if (!dsr) {
      response.status(705).send("DSR id is not found");
    } else {
      response.send(dsr);
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

// Checks to see if there is a DSR for the user and if so sends a status
app.post("/todaystatus", async (request, response) => {
  let token = request.headers.authorization;
  if (token.includes("Bearer")) {
    token = token.split(" ")[1];
  }
  const decoded = decodeToken(token);
  const uservalid = await userModel.findById(decoded.user._id);

  try {
    if (!uservalid) {
      return response.status(702).send();
    } else if (uservalid.lastDsrTime === "") {
      return response.send("0");
    } else {
      let lastdate = new Date(uservalid.lastDsrTime);
      let today = new Date();
      if (
        lastdate.getDate() != today.getDate() ||
        (lastdate.getDate() == today.getDate() &&
          lastdate.getMonth() != today.getMonth()) ||
        (lastdate.getDate() == today.getDate() &&
          lastdate.getMonth() == today.getMonth() &&
          lastdate.getFullYear() != today.getFullYear())
      ) {
        //dsr not filled
        return response.send("0");
      } else {
        const dsr = await dsrModel
          .findOne({ created_by: decoded.user._id })
          .sort({ _id: -1 });
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
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
