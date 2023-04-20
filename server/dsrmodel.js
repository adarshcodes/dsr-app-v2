
const mongoose = require("mongoose");

const DsrSchema = new mongoose.Schema({
  taskDesc: {
    type: String,
    required: true,
  },
  date: {
    type : Date,
    required: true,
  },
  hoursWorked:{
    type : Number,
    required: true,
  },
  status:{
    type: Boolean,
    required: true,
  },
  remarks:{
    type: String,
    required: true,
  },
  isDraft:{
    type: Boolean,
    required: true,
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