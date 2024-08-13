const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    interest: {
      type: [String],
      default: [],
    },
    sex: {
      type: String,
      enum: ["male", "female", "Other"],
      required: true,
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    coverPhoto: {
      type: String,
      default: "",
    },
    mobileNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please fill a valid mobile number"],
    },
  },
  {
    timestamps: true,
  }
);

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
