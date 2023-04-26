const express = require("express");
const userModel = require("../models/usermodel");
const app = express();

//*********************user calls***********************


//create a user
app.post("/add_user", async (request, response) => {

    let adm=false;
    if(request.body.isAdmin==true)
    {
      adm =true;
    }
  const myDate = new Date(1950, 0, 1, 0, 0, 0);
    const user = new userModel({
      ...request.body,
      isAdmin:adm,
      lastdsrtime:myDate
      
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

  //retrieve employee
  app.get("/getemp", async (request, response) => {
    const users = await userModel.find({isAdmin:false});
    // let count=await users.count();
    let count=users.length;
    console.log(count);
    try {
      response.send(JSON.stringify(count));
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