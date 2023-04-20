
const mongoose = require("mongoose");

const DraftSchema = new mongoose.Schema({
  
  date: {
    type : Date,
    required: false,
  },
  
  projectName: {
    type: String,
    required: false,
  },
  activitiesCompleted: {
    type: String,
    required: false,
  },
  activitiesPlanned: {
    type: String,
    required: false,
  },
  
  hoursWorked:{
    type : Number,
    required: false,
  },
  status:{
    type: String,
    required: false,
  },
  comment:{
    type: String,
    required: false,
  },
  openIssues:{
    type:String,
    required: false,
  },
  isOnLeave:{
    type: Boolean,
    required: false,
  },
  createdAt:{
    type: Date,
    required: false,
  },
  updatedAt:{
    type: Date,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Draft = mongoose.model("draft", DraftSchema);

module.exports = Draft;