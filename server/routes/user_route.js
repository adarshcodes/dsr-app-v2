const express = require("express");
const userModel = require("../models/usermodel");
const { ObjectId } = require('mongodb');
const app = express();

//*********************user calls***********************


//create a user
app.post("/add_user", async (request, response) => {

    let currdate = new Date();
    const user = new userModel({
      ...request.body
      
    });
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});

//retrieve all user
app.get("/users", async (request, response) => {
    const users = await userModel.find({});
  
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  

  //retrieve one user
app.post("/finduser", async (request, response) => {
  const userId = request.body.user;
  
  try {
    const user = await userModel.findOne({ _id: userId });

    if (!user) {
      return response.status(702).send();
    }
    response.send(user);
    // res.json(entity);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;