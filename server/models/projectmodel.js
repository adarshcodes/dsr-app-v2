const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
      //required: true,
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
      //required: true,
    },
    name: {
      type: String,
      required: true,
    },
    manager: {
      type: String,
      required: true,
    },
    governanceTeam: {
      type: String,
      // required: true,
    },
    lead: {
      type: String,
      // required: true,
    },
    baTeam: {
      type: String,
      // required: true,
    },
    devTeam: {
      type: String,
      // required: true,
    },
    qaTeam: {
      type: String,
      // required: true,
    },
    deliveryTimeLine: {
      type: String,
      // required: true,
    },
    deliveryDeadLine: {
      type: String,
      // required: true,
    },
    devTimeLine: {
      type: String,
      // required: true,
    },
    devDeadLine: {
      type: String,
      // required: true,
    },
    qaTimeLine: {
      type: String,
      // required: true,
    },
    qaDeadLine: {
      type: String,
      // required: true,
    },
    qaDeployment: {
      type: String,
      // required: true,
    },
    uatDeployment: {
      type: String,
      // required: true,
    },
    uatDate: {
      type: String,
      // required: true,
    },
    prodDeployment: {
      type: String,
      // required: true,
    },
    goLive: {
      type: String,
      // required: true,
    },
    projectStaus: {
      type: String,
      // required: true,
    },
    isActive: {
      type: String,
      required: true,
      default: "active",
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("project", ProjectSchema);

module.exports = Project;
