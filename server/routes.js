const express = require("express");
const userModel = require("./model");
const dsrModel = require("./dsrmodel");
const draftModel = require("./draftmodel")

const app = express();

app.get("/view",(req,res)=>{
  res.sendFile(__dirname+"/new.html");
})


//*********************user calls***********************

//create a user


app.post("/add_user", async (request, response) => {
    const user = new userModel(request.body);
  
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

  //********************dsr calls************************

  //save ds`r only without any relation
  app.post("/add_dsr", async (request, response) => {
    const dsr = new dsrModel(request.body);
  
    try {
      await dsr.save();
      response.send(dsr);
    } catch (error) {
      response.status(500).send(error);
    }
});

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
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  //save a DSR record related to a user
  app.post("/add_dsr/:userId", async (request, response) => {
    const userId = request.params.userId;
    const user = await userModel.findById(userId);
  
    if (!user) {
      return response.status(404).send("User not found");
    }
  
    const dsr = new dsrModel({
      ...request.body,
      user: userId
    });
  
    try {
      await dsr.save();
      response.send(dsr);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  //retrieve the DSR records of a user
  app.get("/users/:userId/dsr", async (request, response) => {
    const userId = request.params.userId;
  
    try {
      const dsr = await dsrModel.find({ user: userId });
      response.send(dsr);
    } catch (error) {
      response.status(500).send(error);
    }
  });

//***************************Draft-calls*******************************8 */

    //save a Draft record related to a user
    app.post("/add_draft/:userId", async (request, response) => {
      const userId = request.params.userId;
      const user = await userModel.findById(userId);
    
      if (!user) {
        return response.status(404).send("User not found");
      }
    
      const draft = new draftModel({
        ...request.body,
        user: userId
      });
    
      try {
        await draft.save();
        response.send(draft);
      } catch (error) {
        response.status(500).send(error);
      }
    });
  
    //retrieve the draft records of a user
    app.get("/users/:userId/draft", async (request, response) => {
      const userId = request.params.userId;
    
      try {
        const draft = await draftModel.find({ user: userId });
        response.send(draft);
      } catch (error) {
        response.status(500).send(error);
      }
    });

    //delete the draft record
    app.delete("/drafts/:draftId", async (request, response) => {
      const draftId = request.params.draftId;
    
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