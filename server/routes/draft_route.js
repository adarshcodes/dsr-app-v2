const express = require("express");
const draftModel = require("../models/draftmodel");
const userModel = require("../models/usermodel");

const app = express();

// Adds a draft to the user's list of drafts. This is the first step in the process
app.post("/add_draft/", async (request, response) => {
  const user = request.body.user;
  const uservalid = await userModel.findById(user);

  const date1 = new Date();
  try {
    if (!uservalid) {
      return response.status(702).send();
    }

    const draft = new draftModel({
      ...request.body,
      date: date1,
      createdAt: date1,
      updatedAt: date1,
    });
    await draft.save();
    response.send(draft);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Retrieves the draft for the given user and sends it to the client. This is a POST
app.post("/users/draft", async (request, response) => {
  const userId = request.body.user;

  try {
    const draft = await draftModel.find({ user: userId }).sort({ _id: -1 });
    response.send(draft);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Deletes the given draft. This is a POST request and does not require authentication
app.delete("/draftdelete", async (request, response) => {
  const draftId = request.body.draft;

  try {
    const draft = await draftModel.findByIdAndDelete(draftId);
    if (!draft) {
      return response.status(708).send();
    }
    response.send("Draft deleted successfully");
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
