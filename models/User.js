const { Schema, model } = require("mongoose");

const User = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
  admin: { type: Boolean, default: false },
});

module.exports = model("User", User);
