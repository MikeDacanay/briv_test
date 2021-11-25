const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    display_name: {
        type: String,
        unique: true,
    }
  },
  { collection: 'user', timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
