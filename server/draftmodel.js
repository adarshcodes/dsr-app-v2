
const mongoose = require("mongoose");

const DraftSchema = new mongoose.Schema({
  taskDesc: {
    type: String,
    required: false,
  },
  date: {
    type : Date,
    required: false,
  },
  hoursWorked:{
    type : Number,
    required: false,
  },
  status:{
    type: Boolean,
    required: false,
  },
  remarks:{
    type: String,
    required: false,
  },
  isDraft:{
    type: Boolean,
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