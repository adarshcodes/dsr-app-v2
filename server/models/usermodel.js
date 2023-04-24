const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: 0,
  },

  lastdsrtime: {
    type: Date
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;