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
});


const MEMBER = mongoose.model("MEMBER", memberSchema)

module.exports = MEMBER;