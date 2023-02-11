const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user needs to have specified name"],
    maxlenght: [40, "A user name must have no more than 40 characters"],
    minlenght: [5, "A user name must have more than 5 characters"],
  },
  email: {
    type: String,
    required: [true, "A user needs to have specified email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Password is required"],
    minlenght: [8, "Password min lenght is 8"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Password confirm is required"],
    validate: {
      // This only works on SAVE!!!
      validator: function (el) {
        return el == this.password;
      },
    },
  },
});

userSchema.pre("save", async function (next) {
  // Only run this function when password has been modified
  if (!this.isModified("password")) {
    return next();
  }
  // Hash the password with cost of 10
  this.password = await bcrypt.hash(this.password, 10);

  // Delete this field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
