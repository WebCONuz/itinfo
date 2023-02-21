const { Schema, model } = require("mongoose");

const descrSchema = Schema({
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = model("description", descrSchema);
