const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    name: { type: String },
    contact: { type: Number },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 5 },
  },
  { timestamps: true }
);

const User = mongoose.model('user', userSchema);
module.exports = User;
