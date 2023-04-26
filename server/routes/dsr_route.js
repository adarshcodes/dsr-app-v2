const express = require("express");
const dsrModel = require("../models/dsrmodel");
const userModel = require("../models/usermodel");

const app = express();

//global.userString = new String("User not found");
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

// let time = new Date();
//const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

//save a DSR record related to a user
app.post("/add_dsr/", async (request, response) => {
  const user = request.body.user;
  const uservalid = await userModel.findById(user);

  

  try {
    if (!uservalid) {
      return response.status(702).send();
    }
    const date1 = new Date();
    const date2 = new Date(uservalid.lastdsrtime);
    if (date1.getDate() == date2.getDate()) {
      return response.status(703).send();
    }
    // Update the user's dsr date-time field
    else {
      uservalid.lastdsrtime = date1;

      const dsr = new dsrModel({
        ...request.body,
        isupdated: false,
        date:date1,
        createdAt:date1,
        updatedAt:date1,
      });

      await uservalid.save();
      await dsr.save();
      response.send(dsr);
    }
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

//when the user is on leave
app.post("/onleave", async (request, response) => {
  const user = request.body.user;
  const uservalid = await userModel.findById(user);

  

  try {
    if (!uservalid) {
      return response.status(702).send();
    }
  
    // const userId = "64417870bc83e4becb95f97d";
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
        date: savetime,
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




//edit dsr
app.post("/saveupdate", async (request, response) => {
  const dsr = request.body._id;
  const dsrvalid = await dsrModel.findById(dsr);


  let updatetime = new Date() ;
  
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

app.post("/todaystatus", async (request, response) => {
  const user = request.body.user;
  const uservalid = await userModel.findById(user);
  
  try {
    if (!uservalid) {
      return response.status(702).send();
    }
    if(uservalid.lastdsrtime===""){
      return response.send("0");
    }
    let lastdate = new Date(uservalid.lastdsrtime);
    let today = new Date();
    if (lastdate.getDate() != today.getDate()){
      //dsr not filled
      return response.send("0");
    }
    else {
      const dsr = await dsrModel.findOne({ user: user }).sort({ _id: -1 });
      if(!dsr){
        return   response.send("3");
      }
      if(dsr.isOnLeave){
        //user was on leave
        return  response.send("2");}
      else{
        //user has saved dsr
        return response.send("1");}

    }
  } catch (error) {
    response.status(500).send(error);
  }
});
module.exports = app;
