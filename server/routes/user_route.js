const express = require("express");
const userModel = require("../models/usermodel");
const app = express();

// Adds a user to the service. This is a POST request and will return a response
app.post("/register", async (request, response) => {
  try {
    const existingUser = await userModel.findOne({ email: request.body.email });
    if (existingUser) {
      return response.status(710).send(710);
    }
    let adm = false;
    if (request.body.isAdmin == true) {
      adm = true;
    }
    const myDate = new Date(1950, 0, 1, 0, 0, 0);
    const user = new userModel({
      ...request.body,
      isAdmin: adm,
      lastdsrtime: myDate,
    });
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

// verify user when using custom login method
app.post("/login", async (req,res)=>{
  const user=await userModel.find({});
  var userName=req.body.email;
  var password=req.body.password;
  const i = user.findIndex(e => e.email === userName);
  try{
    if (i > -1) {
      if(user[i].password===password){
        console.log("logged in");
        res.json({
          id:user[i]._id,
          name:user[i].name,
          email:user[i].email,
          isAdmin:user[i].isAdmin
        });
      }
      else{
        console.log("wrong password");
        res.json({
          msg:"incorect password"
        });
      }
    }
    else{
      console.log("wrong username/email");
      res.json({
        msg:"incorrect username/email"
      });
    }  
  }catch (error) {
    response.status(500).send(error);
  }
});

// Returns all users that are in the database. This is a GET request and should be used to make sure that we don't get an error from the service
app.get("/users", async (request, response) => {
  const users = await userModel.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Finds a user by ID and sends it to the response. This is a POST
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

// Updates the last DSR time for all users. This is used to determine when to stop the server
app.post("/changedate", async (request, response) => {
  try {
    // Find all non-admin users
    const users = await userModel.find({ isAdmin: false });
    const myDate = new Date(1950, 0, 1, 0, 0, 0);

    // Update lastdsrtime field for each user
    for (const user of users) {
      user.lastdsrtime = myDate;
      await user.save();
    }

    response.send("Last DSR time updated for all non-admin users");
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
