const express = require("express");
const draftModel = require("../models/draftmodel")
const userModel = require("../models/usermodel")

const app = express();

//***************************Draft-calls*******************************8 */
    //save a Draft record related to a user
    app.post("/add_draft/", async (request, response) => {
        const user = request.body.user;
        const uservalid = await userModel.findById(user);
      
        if (!uservalid) {
          return response.status(404).send("User not found"+user);
        }
      
        const draft = new draftModel({
          ...request.body
        });
      
        try {
          await draft.save();
          response.send(draft);
        } catch (error) {
          response.status(500).send(error);
        }
      });
    
      //retrieve the draft records of a user
      app.post("/users/draft", async (request, response) => {
        const userId = request.body.user;
      
        try {
          const draft = await draftModel.find({ user: userId }).sort({_id:-1});
          response.send(draft);
        } 
        catch (error) {
          response.status(500).send(error);
        }
      });
  
      //delete the draft record
      app.delete("/draftdelete", async (request, response) => {
        const draftId = request.body.draft;
      
        try {
          const draft = await draftModel.findByIdAndDelete(draftId);
          if (!draft) {
            return response.status(404).send("Draft not found");
          }
          response.send("Draft deleted successfully");
        } catch (error) {
          response.status(500).send(error);
        }
      });
      
    module.exports = app;