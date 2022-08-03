const mongoose = require("mongoose");
const validator = require("validator");
const Client = mongoose.model("Client", {
  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("invalid email");
    },
  },
  accountIntialBalance: {
    type: Number,
    trim: true,
    required: true,
  },
  currentBalnce: {
    type: Number,
    trim: true,
  },
  transaction: [
    {
      date: { type: Date, trim: true, required: true },
      type: { type: String, trim: true, enum: ["add", "withdraw"] },
      status: { type: Date, trim: true, required: true },
    },
  ],
});
module.exports = Client;
