const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  lastdsrtime: {
    type: Date,
  },
  isAdmin: {
    type: Boolean,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
