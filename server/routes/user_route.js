const express = require("express");
const {generateToken, decodeToken} = require("../helpers/webToken.js");
const userModel = require("../models/usermodel");
const app = express();



// Adds a user to the service. This is a POST request and will return a response
app.post("/register", async (request, response) => {
  try {
    request.body.email = request.body.email.toLowerCase();
    const existingUser = await userModel.findOne({ email: request.body.email });
    if (existingUser) {
      return response.sendStatus(710);
    }
    const myDate = new Date(1950, 0, 1, 0, 0, 0);
    const user = new userModel({
      ...request.body,
      dsr: true,
      lastDsrTime: myDate,
    });
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

//

// verify user when using custom login method
app.post("/login", async (req, res) => {
  const user = await userModel.find({});
  var userName = req.body.email;
  var password = req.body.password;
  const i = user.findIndex((e) => e.email === userName);
  try {
    if (i > -1) {
      if (user[i].password === password) {
        console.log("logged in");
        res.json({
          id: user[i]._id,
          name: user[i].name,
          email: user[i].email,
          dsr: user[i].dsr,
        });
      } else {
        console.log("wrong password");
        res.json({
          msg: "incorect password",
        });
      }
    } else {
      console.log("wrong username/email");
      res.json({
        msg: "incorrect username/email",
      });
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

//login with m,icrosoft
app.post("/microsoft", async (req, res) => {
  var userName = req.body.username;
  var name = req.body.name;
  const user = await userModel.findOne({ email: userName });
  try {
    if (!user) {
      const myDate = new Date(1950,0,1,0,0,0);
      const newuser = new userModel({
        name: name,
        email: userName,
        dsr: true,
        lastDsrTime: myDate
      });
      await newuser.save();
      const savedUser = await userModel.findOne({ email: userName });
      const token=generateToken(savedUser);
      console.log('jwt token',token);
      console.log('id',savedUser._id);
      res.send(token);
    } else {
      const token=generateToken(user);
      console.log('jwt token',token);
      res.send(token);
    }
  } catch (error) {
    res.status(500).send(error);
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
    const users = await userModel.find({ dsr: true });
    const myDate = new Date(1950, 0, 1, 0, 0, 0);

    // Update lastdsrtime field for each user
    for (const user of users) {
      user.lastDsrTime = myDate;
      await user.save();
    }

    response.send("Last DSR time updated for all non-admin users");
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
