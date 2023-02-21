const { Schema, model } = require("mongoose");

const mediaSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  file: {
    type: String,
    required: true,
    trim: true,
  },
  table_name: {
    type: String,
    required: true,
    trim: true,
  },
  table_id: {
    type: Schema.Types.ObjectId,
  },
});

module.exports = model("media", mediaSchema);
