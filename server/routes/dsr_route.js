const express = require("express");
const dsrModel = require("../models/dsrmodel");
const userModel = require("../models/usermodel")

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
    const uservalid = await userModel.findById(user);
  
    if (!uservalid) {
      return response.status(404).send("User not found"+user);
    }
  
    const dsr = new dsrModel({
      ...request.body
      
    });
  
    try {
      await dsr.save();
      response.send(dsr);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  //retrieve the last 5 DSR records of a user
  app.post("/users/dsr", async (request, response) => {
    const userId = request.body.user;
    try {
      const dsr = await dsrModel.find({ user: userId }).sort({_id:-1}).limit(5);
      //const reverdsr = dsr.reverse();
      response.send(dsr);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  module.exports = app;