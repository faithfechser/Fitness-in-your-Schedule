const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const Exercise = require("./Exercise");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    savedexercises: [Exercise.schema],
  },

  {
    toJSON: {
      virtuals: true,
    },
  }
);

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;