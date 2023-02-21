const { Schema, model } = require("mongoose");

const socialSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  icon: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = model("social", socialSchema);
