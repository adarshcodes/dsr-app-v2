const express = require("express");
const dsrModel = require("../models/dsrmodel");
const userModel = require("../models/usermodel");
const { decodeToken } = require("../helpers/webToken.js");
const app = express();

// Adds a DSR to the conversation. This is the first step in the DSR processing
app.post("/add_dsr/", async (request, response) => {
  let token = request.headers.authorization;
  if (token.includes("Bearer")) {
    token = token.split(" ")[1];
  }
  const decoded = decodeToken(token);
  const uservalid = await userModel.findById(decoded.user._id);
  try {
    if (!uservalid) {
      return response.status(702).send("User id not found in database");
    } else {
      const date1 = new Date();
      const date2 = new Date(uservalid.lastDsrTime);
      if ( date2.getDate() != date1.getDate() ||
        (date2.getDate() == date1.getDate() &&
          date2.getMonth() != date1.getMonth()) ||
        (date2.getDate() == date1.getDate() &&
          date2.getMonth() == date1.getMonth() &&
          date2.getFullYear() != date1.getFullYear())) {
          const dsr = new dsrModel({
            ...request.body,
            created_by: decoded.user._id,
            isUpdated: false,
            dsrDate: date1,
            isDraft: false,
          });
          await dsr.save();
          uservalid.lastDsrTime = date1;
          await uservalid.save();
          response.send(dsr);
      } else {
            return response.status(703).send("Dsr is already saved for today");  
        }
      }
  } catch (error) {
    response.status(500).send(error);
  }
});

// Handles onleave requests. This is the last step in the conversation process. We need to know if the user is valid
app.post("/onleave", async (request, response) => {
  let token = request.headers.authorization;
  if (token.includes("Bearer")) {
    token = token.split(" ")[1];
  }
  const decoded = decodeToken(token);
  const uservalid = await userModel.findById(decoded.user._id);
  try {
    if (!uservalid) {
      return response.status(702).send("User id not found in database");
    } else {
      const date1 = new Date();
      const date2 = new Date(uservalid.lastDsrTime);
      let savetime = date1;
      if (date2.getDate() != date1.getDate() ||
      (date2.getDate() == date1.getDate() &&
        date2.getMonth() != date1.getMonth()) ||
      (date2.getDate() == date1.getDate() &&
        date2.getMonth() == date1.getMonth() &&
        date2.getFullYear() != date1.getFullYear())) {
        uservalid.lastDsrTime = savetime;
        const dsr = new dsrModel({
          isUpdated: true,
          dsrDate: savetime,
          project: null,
          activitiesCompleted: "null",
          activitiesPlanned: "null",
          hoursWorked: 0,
          health: "null",
          comment: "null",
          openIssues: "null",
          isOnLeave: true,
          isDraft: false,
          created_by: decoded.user._id,
        });
        await dsr.save();
        await uservalid.save();
        response.send(dsr);
      }else {
            return response.status(703).send("Already Marked Leave for today");
          }
        }
      }
    catch (error) {
    response.status(500).send(error);
  }
});

// Updates or creates a DSR. This is a POST / saveupdate request
app.post("/saveupdate", async (request, response) => {
  const dsr = request.body._id;
  const dsrvalid = await dsrModel.findById(dsr);
  try {
    if (!dsrvalid) {
      return response.status(409).send();
    }
    if (dsrvalid.isUpdated == true) {
      return response.status(706).send("Dsr is already updated for today");
    } else {
      dsrvalid.project = request.body.project;
      dsrvalid.activitiesCompleted = request.body.activitiesCompleted;
      dsrvalid.activitiesPlanned = request.body.activitiesPlanned;
      dsrvalid.hoursWorked = request.body.hoursWorked;
      dsrvalid.health = request.body.health;
      dsrvalid.comment = request.body.comment;
      dsrvalid.openIssues = request.body.openIssues;
      dsrvalid.isUpdated = true;
    }
    await dsrvalid.save();
    response.send(dsrvalid);
  } catch (error) {
    response.status(500).send(error);
  }
});
module.exports = app;
