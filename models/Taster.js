const mongoose = require("mongoose");
const { Schema } = mongoose;

const tasterSchema = new Schema(
  {
    twitter: String,
    tastings: Number,
    name: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Taster", tasterSchema);
