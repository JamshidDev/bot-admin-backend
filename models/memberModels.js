const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
  fullName: {
    type: String,
  },
  user_id: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    default: null,
  },
  lang: {
    type: String,
    required:true,
  },
  invited_users: {
    type: Number,
    default: 0,
  },
  referal_id: {
    type: String,
    default: null,
  },
  active: {
    type: Boolean,
    default: true,
  },
},  {
  timestamps: {
    createdAt: "created_at", // Use `created_at` to store the created date
    updatedAt: "updated_at", // and `updated_at` to store the last updated date
  },
}
);


const MEMBER = mongoose.model("MEMBER", memberSchema)

module.exports = MEMBER;