const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: String,
  data: {
    first_name: String,
    last_name: String,
    username: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: String,
  },
  password: String,
  active: Boolean,
  socket_id: String,
});

const roomSchema = mongoose.Schema({
  admin: String,
  name: {
    required: true,
    type: String,
    unique: true,
  },
  code: String,
  password: String,
  members: [{ id: Number, userName: String }],
});

const messageSchema = mongoose.Schema({
  message: {
    type: String,
    required: false,
  },
  id: {
    type: String,
    required: true,
  },
});

module.exports.userModel = new mongoose.model("document", userSchema);
module.exports.roomModel = new mongoose.model("room", roomSchema);
module.exports.messageModel = new mongoose.model("message", messageSchema);
