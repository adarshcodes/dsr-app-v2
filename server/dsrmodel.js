
const mongoose = require("mongoose");

const DsrSchema = new mongoose.Schema({

  date: {
    type : Date,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  activitiesCompleted: {
    type: String,
    required: true,
  },
  activitiesPlanned: {
    type: String,
    required: true,
  },
  
  hoursWorked:{
    type : Number,
    required: true,
  },
  status:{
    type: String,
    required: true,
  },
  comment:{
    type: String,
    required: true,
  },
  openIssues:{
    type:String,
    required:true
  },
  isOnLeave:{
    type: Boolean,
    required: true,
  },
  createdAt:{
    type: Date,
    required: true,
  },
  updatedAt:{
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Dsr = mongoose.model("dsr", DsrSchema);

module.exports = Dsr;