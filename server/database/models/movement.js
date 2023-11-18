const mongoose = require("mongoose");

const movementSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  typeAmount: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
    versionKey: false,
  });

module.exports = mongoose.model("Movement", movementSchema);
