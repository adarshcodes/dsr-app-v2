const express = require("express");
const dsrModel = require("../models/dsrmodel");
const userModel = require("../models/usermodel");

const app = express();

//save a DSR record related to a user
app.post("/add_dsr/", async (request, response) => {
  const user = request.body.user;
  const uservalid = await userModel.findById(user);

  try {
    if (!uservalid) {
      return response.status(702).send();
    }
    const date1 = new Date();
    {
      const day = date1.getDate();
      const month = date1.getMonth() + 1; // Add 1 because getMonth() returns a zero-based month (January is 0)
      const year = date1.getFullYear();
      const onlydate = `${day}-${month}-${year}`;
    }
    const date2 = new Date(uservalid.lastdsrtime);
    if (date1.getDate() == date2.getDate()) {
      return response.status(703).send();
    } else {
      uservalid.lastdsrtime = date1;

      const dsr = new dsrModel({
        ...request.body,
        isupdated: false,
        date: onlydate,
        createdAt: date1,
        updatedAt: date1,
      });

      await uservalid.save();
      await dsr.save();
      response.send(dsr);
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

//when the user is on leave
app.post("/onleave", async (request, response) => {
  const user = request.body.user;
  const uservalid = await userModel.findById(user);

  try {
    if (!uservalid) {
      return response.status(702).send();
    }
    {
      const day = date1.getDate();
      const month = date1.getMonth() + 1; // Add 1 because getMonth() returns a zero-based month (January is 0)
      const year = date1.getFullYear();
      const onlydate = `${day}-${month}-${year}`;
    }
    const today = new Date();
    const savetime = new Date();
    const date1 = new Date(uservalid.lastdsrtime);
    if (date1.getDate() == today.getDate()) {
      return response.status(704).send();
    } else {
      uservalid.lastdsrtime = savetime;

      const dsr = new dsrModel({
        ...request.body,
        isupdated: true,
        date: onlydate,
        projectName: "null",
        clientManager: "null",
        activitiesCompleted: "null",
        activitiesPlanned: "null",
        hoursWorked: 0,
        status: "null",
        comment: "null",
        openIssues: "null",
        isOnLeave: true,
        createdAt: savetime,
        updatedAt: savetime,
      });

      await dsr.save();
      await uservalid.save();
      response.send(dsr);
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

//edit dsr
app.post("/saveupdate", async (request, response) => {
  const dsr = request.body._id;
  const dsrvalid = await dsrModel.findById(dsr);

  let updatetime = new Date();

  try {
    if (!dsrvalid) {
      return response.status(409).send();
    }
    if (dsrvalid.isupdated == true) {
      return response.status(706).send();
    } else {
      dsrvalid.projectName = request.body.projectName;
      dsrvalid.clientManager = request.body.clientManager;
      dsrvalid.activitiesCompleted = request.body.activitiesCompleted;
      dsrvalid.activitiesPlanned = request.body.activitiesPlanned;
      dsrvalid.hoursWorked = request.body.hoursWorked;
      dsrvalid.status = request.body.status;
      dsrvalid.comment = request.body.comment;
      dsrvalid.openIssues = request.body.openIssues;
      dsrvalid.isupdated = true;
      dsrvalid.updatedAt = updatetime;
    }
    await dsrvalid.save();
    response.send(dsrvalid);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
