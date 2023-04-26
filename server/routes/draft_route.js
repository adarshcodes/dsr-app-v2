const express = require("express");
const draftModel = require("../models/draftmodel")
const userModel = require("../models/usermodel")

const app = express();

//***************************Draft-calls*******************************8 */
    //save a Draft record related to a user
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
            date:date1,
        createdAt:date1,
        updatedAt:date1,
          });
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
            return response.status(708).send();
          }
          response.send("Draft deleted successfully");
        } catch (error) {
          response.status(500).send(error);
        }
      });
      
    module.exports = app;