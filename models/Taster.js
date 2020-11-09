const mongoose = require("mongoose");
const { Schema } = mongoose;

const tasterSchema = new Schema(
  {
    twitter: String,
    tastings: { type: Number, default: 0 },
    name: { type: String, required: [true, 'Name is required'], minlength: [3, "Name must be 4 chars long"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Taster", tasterSchema);
