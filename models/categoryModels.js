const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name_uz: {
    type: String,
    required:true,
  },
  name_ru: {
    type: String,
    required:true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});


const CATEGORY = mongoose.model("CATEGORY", categorySchema)

module.exports = CATEGORY;