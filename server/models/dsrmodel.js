const mongoose = require("mongoose");

// const DsrSchema = new mongoose.Schema({
//   date: {
//     type: Date,
//     required: true,
//   },
//   projectName: {
//     type: String,
//     required: true,
//     default: "Leave",
//   },
//   clientManager: {
//     type: String,
//     required: true,
//   },

//   activitiesCompleted: {
//     type: String,
//     required: true,
//   },
//   activitiesPlanned: {
//     type: String,
//     required: true,
//   },

//   hoursWorked: {
//     type: Number,
//     required: true,
//   },
//   status: {
//     type: String,
//     required: true,
//   },
//   comment: {
//     type: String,
//   },
//   openIssues: {
//     type: String,
//   },
//   isOnLeave: {
//     type: Boolean,
//     required: true,
//     default: false,
//   },
//   createdAt: {
//     type: Date,
//     required: true,
//   },
//   updatedAt: {
//     type: Date,
//     required: true,
//   },
//   isupdated: {
//     type: Boolean,
//     required: true,
//     default: false,
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
// });
const DsrSchema = new mongoose.Schema({
  
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  other_project:{
    type: String,
    // required: true,
  },
  other_manager:{
    type: String,
    // required: true,
  },
  dsrDate: {
    type: Date,
    required: true,
  },
  activitiesCompleted: {
    type: String,
  },
  activitiesPlanned: {
    type: String,
  },
  health:{
    type: String,
  },
  hoursWorked: {
    type: Number,
    default:8
  },
  comment: {
    type: String,
  },
  openIssues: {
    type: String,
  },
  isDraft: {
    type: Boolean,
    required: true,
    default: false,
  },
  isOnLeave: {
    type: Boolean,
    required: true,
    default: false,
  },
  isActive:{
    type:String,
    required: true,
    default:'active',
  },
  status: {
    type:Number,
    default:1,
  },
  isUpdated:{
    type:Boolean,
    required:true
  }
},{
  timestamps: true
});

const Dsr = mongoose.model("dsr", DsrSchema);

module.exports = Dsr;
