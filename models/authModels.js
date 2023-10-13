const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "no picture",
    },
    login: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

const ADMIN = mongoose.model("ADMIN", adminSchema);

module.exports = ADMIN;
