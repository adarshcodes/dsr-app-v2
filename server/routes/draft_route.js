const express = require("express");
const dsrModel = require("../models/dsrmodel");
const userModel = require("../models/usermodel");
const { decodeToken } = require("../helpers/webToken.js");
const app = express();

// Adds a draft to the user's list of drafts. This is the first step in the process
app.post("/add_draft/", async (request, response) => {
  let token = request.headers.authorization;
  if (token.includes("Bearer")) {
    token = token.split(" ")[1];
  }
  const decoded = decodeToken(token);
  const uservalid = await userModel.findById(decoded.user._id);

  const date1 = new Date();
  try {
    if (!uservalid) {
      return response.status(702).send();
    }else{
      const draft = new dsrModel({
        ...request.body,
        created_by:uservalid._id,
        dsrDate: date1,
        isDraft:true,
        isUpdated:false,
      });
      await draft.save();
      response.send(draft);
    }

   
  } catch (error) {
    response.status(500).send(error);
  }
});

// Retrieves the draft for the given user and sends it to the client. This is a POST
app.post("/users/draft", async (request, response) => {
  const userId = request.body.user;

  try {
    const draft = await dsrModel.find({ user: userId }).sort({ _id: -1 });
    response.send(draft);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Deletes the given draft. This is a POST request and does not require authentication
app.delete("/draftdelete", async (request, response) => {
  const draftId = request.body.draft;

  try {
    const draft = await dsrModel.findByIdAndDelete(draftId);
    if (!draft) {
      return response.status(708).send();
    }
    response.send("Draft deleted successfully");
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
