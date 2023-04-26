const express = require("express");
const userModel = require("../models/usermodel");
const app = express();

// Adds a user to the service. This is a POST request and will return a response
app.post("/add_user", async (request, response) => {
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
  try {
    await user.save();
    response.send(user);
  } catch (error) {
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

module.exports = app;
